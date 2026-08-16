import * as THREE from 'three';
import { createCourse, laneToX, lerpLaneX, type Course, type Lane } from './course';
import { createGlyphTexture } from './glyph-texture';

export interface GameView {
  setLane(lane: Lane): void;
  setGateTerms(terms: readonly [string, string, string]): void;
  setPaused(paused: boolean): void;
  render(elapsedSeconds: number): void;
  dispose(): void;
}

export interface RendererLike {
  readonly domElement: HTMLCanvasElement;
  setPixelRatio(pixelRatio: number): void;
  setSize(width: number, height: number): void;
  render(scene: THREE.Scene, camera: THREE.Camera): void;
  setAnimationLoop(callback: null): void;
  dispose(): void;
  forceContextLoss?(): void;
}

export interface GameViewOptions {
  reducedMotion?: boolean;
  createRenderer?: (canvas: HTMLCanvasElement) => RendererLike;
  createGlyphTexture?: (term: string) => THREE.Texture;
  createResizeObserver?: (callback: ResizeObserverCallback) => Pick<ResizeObserver, 'observe' | 'disconnect'>;
}

function defaultRenderer(canvas: HTMLCanvasElement): RendererLike {
  return new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
}

function createGlider(): { mesh: THREE.Mesh; dispose(): void } {
  const geometry = new THREE.ConeGeometry(0.34, 0.9, 8);
  geometry.rotateX(Math.PI / 2);
  const material = new THREE.MeshStandardMaterial({ color: 0xffd166, emissive: 0x3b2600, emissiveIntensity: 0.7 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 2.1);
  return {
    mesh,
    dispose() {
      mesh.removeFromParent();
      geometry.dispose();
      material.dispose();
    },
  };
}

export function createGameView(container: HTMLElement, options: GameViewOptions = {}): GameView {
  const renderer = (options.createRenderer ?? defaultRenderer)(document.createElement('canvas'));
  const glyphTextureFactory = options.createGlyphTexture ?? createGlyphTexture;
  const reducedMotion = options.reducedMotion ?? window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const canvas = renderer.domElement;
  container.append(canvas);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(58, 1, 0.1, 70);
  let course: Course | null = null;
  let glider: ReturnType<typeof createGlider> | null = null;
  let lane: Lane = 1;
  let visualX = laneToX(lane);
  let paused = false;
  let contextLost = false;
  let disposed = false;
  let previousElapsed: number | null = null;
  let gateTerms: readonly [string, string, string] | null = null;
  let gateTextures: THREE.Texture[] = [];

  const disposeGateTextures = () => {
    for (const texture of gateTextures) texture.dispose();
    gateTextures = [];
  };

  const disposeSceneGraph = () => {
    course?.dispose();
    course = null;
    glider?.dispose();
    glider = null;
  };

  const applyGateTerms = (terms: readonly [string, string, string]) => {
    if (!course) return;
    disposeGateTextures();
    gateTextures = terms.map((term, index) => {
      const texture = glyphTextureFactory(term);
      course?.setGateTexture(index as Lane, texture);
      return texture;
    });
  };

  const buildSceneGraph = () => {
    disposeSceneGraph();
    disposeGateTextures();
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06101e);
    scene.fog = new THREE.Fog(0x06101e, 8, 48);
    camera = new THREE.PerspectiveCamera(58, 1, 0.1, 70);
    camera.position.set(0, 2.5, 6.6);
    camera.lookAt(0, 0.4, -14);
    scene.add(new THREE.AmbientLight(0x88a6d8, 1.4));
    const keyLight = new THREE.DirectionalLight(0xa2d8ff, 2.1);
    keyLight.position.set(3, 7, 4);
    scene.add(keyLight);
    course = createCourse();
    scene.add(course.root);
    glider = createGlider();
    scene.add(glider.mesh);
    if (gateTerms) applyGateTerms(gateTerms);
  };

  const resize = () => {
    if (disposed) return;
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  const onContextLost = (event: Event) => {
    event.preventDefault();
    contextLost = true;
    paused = true;
    renderer.setAnimationLoop(null);
  };
  const onContextRestored = () => {
    if (disposed) return;
    contextLost = false;
    buildSceneGraph();
    resize();
  };
  canvas.addEventListener('webglcontextlost', onContextLost);
  canvas.addEventListener('webglcontextrestored', onContextRestored);

  const observerFactory = options.createResizeObserver ??
    (typeof ResizeObserver === 'undefined' ? undefined : (callback: ResizeObserverCallback) => new ResizeObserver(callback));
  const resizeObserver = observerFactory?.(resize);
  resizeObserver?.observe(container);
  const usingWindowResize = !resizeObserver;
  if (usingWindowResize) window.addEventListener('resize', resize);

  buildSceneGraph();
  resize();

  return {
    setLane(nextLane) {
      if (!disposed) lane = nextLane;
    },
    setGateTerms(terms) {
      if (disposed) return;
      gateTerms = [...terms] as [string, string, string];
      applyGateTerms(gateTerms);
    },
    setPaused(nextPaused) {
      if (!disposed) paused = nextPaused;
    },
    render(elapsedSeconds) {
      if (disposed || paused || contextLost || !Number.isFinite(elapsedSeconds) || !course || !glider) return;
      const delta = previousElapsed === null ? 0 : Math.max(0, Math.min(0.1, elapsedSeconds - previousElapsed));
      previousElapsed = elapsedSeconds;
      const transition = 1 - Math.exp(-(reducedMotion ? 22 : 11) * delta);
      visualX = lerpLaneX(visualX, laneToX(lane), transition);
      glider.mesh.position.x = visualX;
      glider.mesh.rotation.z = (laneToX(lane) - visualX) * -0.1;
      glider.mesh.position.y = reducedMotion ? 0 : Math.sin(elapsedSeconds * 3.2) * 0.025;
      camera.position.x = visualX * 0.1 + (reducedMotion ? 0 : Math.sin(elapsedSeconds * 4.4) * 0.035);
      camera.lookAt(visualX * 0.08, 0.4, -14);
      course.update(elapsedSeconds);
      renderer.render(scene, camera);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      resizeObserver?.disconnect();
      if (usingWindowResize) window.removeEventListener('resize', resize);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      renderer.setAnimationLoop(null);
      disposeGateTextures();
      disposeSceneGraph();
      renderer.dispose();
      renderer.forceContextLoss?.();
      canvas.remove();
    },
  };
}

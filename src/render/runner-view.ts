import * as THREE from 'three';
import type { RendererDiagnostics } from '../diagnostics/perf-overlay';
import type { Lane, RunnerState } from '../simulation/runner-types';
import { createEntityField, type EntityField } from './neon/entity-field';
import { createNeonMaterials, type NeonMaterials } from './neon/materials';
import {
  createPostFx,
  type PostFx,
  type RendererLike,
} from './neon/post-fx';
import { createNeonShip, type NeonShip } from './neon/ship';
import { createNeonTunnel, type NeonTunnel } from './neon/tunnel';

export type { RendererLike } from './neon/post-fx';

export const MAX_RUNNER_FRAME_DELTA_SECONDS = 0.25;

const LANE_X: Record<Lane, number> = { 0: -3, 1: 0, 2: 3 };
const MOBILE_WIDTH = 640;

export interface FramingDiagnostics {
  gliderNdcX: number;
  gliderNdcY: number;
  gliderBounds: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    minZ: number;
    maxZ: number;
  };
  gliderVisible: boolean;
}

export interface RunnerView {
  setSnapshot(snapshot: RunnerState): void;
  setPaused(paused: boolean): void;
  render(elapsedSeconds: number): void;
  getDiagnostics(): RendererDiagnostics;
  getFramingDiagnostics(): FramingDiagnostics;
  dispose(): void;
}

export interface RunnerViewOptions {
  reducedMotion?: boolean;
  forceQuality?: 'desktop' | 'mobile';
  createRenderer?: (canvas: HTMLCanvasElement) => RendererLike;
  createPostFx?: typeof createPostFx;
  createResizeObserver?: (callback: ResizeObserverCallback) => Pick<ResizeObserver, 'observe' | 'disconnect'> | undefined;
  onContextLost?: () => void;
  onContextRestored?: () => void;
}

interface SpeedStreaks {
  readonly points: THREE.Points;
  update(distance: number, elapsedSeconds: number, speed: number, reducedMotion: boolean): void;
  dispose(): void;
}

interface SceneGraph {
  readonly quality: 'desktop' | 'mobile';
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly materials: NeonMaterials;
  readonly tunnel: NeonTunnel;
  readonly ship: NeonShip;
  readonly shipAnchor: THREE.Group;
  readonly entityField: EntityField;
  readonly streaks: SpeedStreaks;
  readonly postFx: PostFx;
  dispose(): void;
}

function defaultRenderer(canvas: HTMLCanvasElement): RendererLike {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  return renderer;
}

function createSpeedStreaks(quality: 'desktop' | 'mobile', materials: NeonMaterials): SpeedStreaks {
  const count = quality === 'desktop' ? 72 : 40;
  const positions = new Float32Array(count * 3);
  const baseZ = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  const cyan = new THREE.Color(materials.cyan.emissive);
  const magenta = new THREE.Color(materials.magenta.emissive);
  for (let index = 0; index < count; index += 1) {
    const side = index % 2 === 0 ? -1 : 1;
    positions[index * 3] = side * (3.65 + ((index * 17) % 19) * 0.12);
    positions[index * 3 + 1] = -2.9 + ((index * 11) % 23) * 0.25;
    baseZ[index] = 4 + ((index * 37) % 173);
    const color = index % 3 === 0 ? magenta : cyan;
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }
  const geometry = new THREE.BufferGeometry();
  const positionAttribute = new THREE.BufferAttribute(positions, 3);
  positionAttribute.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('position', positionAttribute);
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size: quality === 'desktop' ? 0.075 : 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const points = new THREE.Points(geometry, material);
  points.name = 'speed-streaks';
  points.frustumCulled = false;
  let disposed = false;

  return {
    points,
    update(distance, elapsedSeconds, speed, reducedMotion) {
      if (disposed) return;
      const safeDistance = Number.isFinite(distance) ? distance : 0;
      const safeTime = Number.isFinite(elapsedSeconds) ? elapsedSeconds : 0;
      const speedPhase = reducedMotion ? 0 : safeTime * THREE.MathUtils.clamp(speed, 26, 52) * 0.35;
      for (let index = 0; index < count; index += 1) {
        positions[index * 3 + 2] = -(((baseZ[index] + safeDistance + speedPhase) % 177) + 3);
      }
      positionAttribute.needsUpdate = true;
      material.opacity = reducedMotion ? 0.42 : 0.72;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      points.removeFromParent();
      geometry.dispose();
      material.dispose();
    },
  };
}

function cloneSnapshot(snapshot: RunnerState): RunnerState {
  return {
    ...snapshot,
    reachableLanes: [...snapshot.reachableLanes],
    entities: snapshot.entities.map((entity) => ({ ...entity })),
  };
}

function sceneResourceCounts(scene: THREE.Scene): { geometries: number; textures: number } {
  const geometries = new Set<THREE.BufferGeometry>();
  const textures = new Set<THREE.Texture>();
  scene.traverse((object) => {
    const renderable = object as THREE.Object3D & {
      geometry?: THREE.BufferGeometry;
      material?: THREE.Material | THREE.Material[];
    };
    if (renderable.geometry) geometries.add(renderable.geometry);
    const materials = Array.isArray(renderable.material) ? renderable.material : renderable.material ? [renderable.material] : [];
    for (const material of materials) {
      for (const value of Object.values(material)) {
        if (value instanceof THREE.Texture) textures.add(value);
      }
    }
  });
  return { geometries: geometries.size, textures: textures.size };
}

function directPostFx(renderer: RendererLike, scene: THREE.Scene, camera: THREE.Camera): PostFx {
  return {
    render: () => renderer.render(scene, camera),
    setSize: () => undefined,
    dispose: () => undefined,
  };
}

export function createRunnerView(container: HTMLElement, options: RunnerViewOptions = {}): RunnerView {
  const renderer = (options.createRenderer ?? defaultRenderer)(document.createElement('canvas'));
  const canvas = renderer.domElement;
  container.append(canvas);

  let disposed = false;
  let contextLost = false;
  let manuallyPaused = false;
  let externalElapsedAnchor: number | null = null;
  let visualElapsedSeconds = 0;
  let latestSnapshot: RunnerState | null = null;
  let graph: SceneGraph;
  const projectedPosition = new THREE.Vector3();
  const shipBoundCorners = Array.from({ length: 8 }, () => new THREE.Vector3());
  const lookTarget = new THREE.Vector3();

  function dimensions(): { width: number; height: number } {
    return {
      width: Math.max(1, container.clientWidth),
      height: Math.max(1, container.clientHeight),
    };
  }

  function responsiveQuality(width: number, height: number): 'desktop' | 'mobile' {
    return options.forceQuality ?? (width <= MOBILE_WIDTH || height > width ? 'mobile' : 'desktop');
  }

  function effectiveReducedMotion(): boolean {
    if (options.reducedMotion !== undefined) return options.reducedMotion;
    if (latestSnapshot) return latestSnapshot.reducedMotion;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }

  function createSceneGraph(quality: 'desktop' | 'mobile', width: number, height: number): SceneGraph {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x01030d);
    scene.fog = new THREE.Fog(0x03031a, 24, quality === 'desktop' ? 176 : 132);
    const camera = new THREE.PerspectiveCamera(64, width / height, 0.1, 220);
    const materials = createNeonMaterials();
    // Transmission triggers a full opaque-scene prepass; mobile keeps the emissive transparent crystal without it.
    if (quality === 'mobile') materials.crystal.transmission = 0;
    let tunnel: NeonTunnel | null = null;
    let ship: NeonShip | null = null;
    let entityField: EntityField | null = null;
    let streaks: SpeedStreaks | null = null;
    let postFx: PostFx | null = null;
    try {
      tunnel = createNeonTunnel({ quality, materials });
      ship = createNeonShip(materials);
      entityField = createEntityField(materials);
      streaks = createSpeedStreaks(quality, materials);
      const shipAnchor = new THREE.Group();
      shipAnchor.name = 'neon-ship-anchor';
      shipAnchor.position.set(0, quality === 'mobile' ? -2.25 : -1.7, quality === 'mobile' ? 2.2 : -1);
      shipAnchor.scale.setScalar(quality === 'mobile' ? 0.55 : 0.76);
      shipAnchor.add(ship.root);

      scene.add(tunnel.root, entityField.root, streaks.points, shipAnchor);
      scene.add(new THREE.HemisphereLight(0x72cfff, 0x160016, 1.45));
      const key = new THREE.DirectionalLight(0xb7eaff, 2.4);
      key.position.set(2.5, 7, 5);
      scene.add(key);
      const magentaFill = new THREE.PointLight(0xff20c8, 8, 28, 1.6);
      magentaFill.position.set(-3.5, -0.5, 2);
      scene.add(magentaFill);
      const cyanFill = new THREE.PointLight(0x00cfff, 7, 34, 1.7);
      cyanFill.position.set(3.2, 1.8, -6);
      scene.add(cyanFill);

      const postFxFactory = options.createPostFx ?? createPostFx;
      try {
        postFx = postFxFactory(renderer, scene, camera, {
          enabled: true,
          quality,
          width,
          height,
        });
      } catch {
        postFx = directPostFx(renderer, scene, camera);
      }

      let graphDisposed = false;
      const complete: SceneGraph = {
        quality,
        scene,
        camera,
        materials,
        tunnel,
        ship,
        shipAnchor,
        entityField,
        streaks,
        postFx,
        dispose() {
          if (graphDisposed) return;
          graphDisposed = true;
          postFx?.dispose();
          streaks?.dispose();
          entityField?.dispose();
          ship?.dispose();
          tunnel?.dispose();
          materials.dispose();
          scene.clear();
        },
      };
      return complete;
    } catch (error) {
      postFx?.dispose();
      streaks?.dispose();
      entityField?.dispose();
      ship?.dispose();
      tunnel?.dispose();
      materials.dispose();
      scene.clear();
      throw error;
    }
  }

  function applyCameraLayout(target: SceneGraph, width: number, height: number): void {
    const aspect = width / height;
    target.camera.aspect = aspect;
    target.camera.updateProjectionMatrix();
    target.shipAnchor.scale.setScalar(target.quality === 'mobile' ? 0.55 : 0.76);
  }

  function reconcile(target: SceneGraph, deltaSeconds: number): void {
    const snapshot = latestSnapshot;
    const reducedMotion = effectiveReducedMotion();
    if (snapshot) {
      target.tunnel.update(snapshot.distance, snapshot.gates + 1);
      target.entityField.sync(snapshot.entities, snapshot.distance);
      target.ship.setLaneX(LANE_X[snapshot.lane], deltaSeconds, reducedMotion);
      target.ship.update(visualElapsedSeconds, snapshot.speed, reducedMotion);
      target.streaks.update(snapshot.distance, visualElapsedSeconds, snapshot.speed, reducedMotion);
    } else {
      target.tunnel.update(0, 1);
      target.entityField.sync([], 0);
      target.ship.setLaneX(0, deltaSeconds, reducedMotion);
      target.ship.update(visualElapsedSeconds, 26, reducedMotion);
      target.streaks.update(0, visualElapsedSeconds, 26, reducedMotion);
    }

    const shipX = target.ship.root.position.x * target.shipAnchor.scale.x;
    const portrait = target.camera.aspect < 0.8;
    const cameraTracking = portrait ? 0.84 : 0.18;
    const lookTracking = portrait ? 0.7 : 0.05;
    target.camera.position.set(shipX * cameraTracking, portrait ? 1.2 : 1.45, portrait ? 10.4 : 8.8);
    lookTarget.set(shipX * lookTracking, -0.45, -20);
    target.camera.lookAt(lookTarget);
  }

  function replaceGraph(quality: 'desktop' | 'mobile', width: number, height: number): void {
    const replacement = createSceneGraph(quality, width, height);
    applyCameraLayout(replacement, width, height);
    reconcile(replacement, 0);
    replacement.postFx.setSize(width, height);
    const previous = graph;
    graph = replacement;
    previous?.dispose();
  }

  function resize(): void {
    if (disposed) return;
    const { width, height } = dimensions();
    const quality = responsiveQuality(width, height);
    if (graph && quality !== graph.quality) replaceGraph(quality, width, height);
    applyCameraLayout(graph, width, height);
    const portraitOrMobile = quality === 'mobile' || height > width;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, portraitOrMobile ? 1.35 : 2));
    renderer.setSize(width, height);
    graph.postFx.setSize(width, height);
  }

  const initialSize = dimensions();
  graph = createSceneGraph(responsiveQuality(initialSize.width, initialSize.height), initialSize.width, initialSize.height);

  const onContextLost = (event: Event) => {
    event.preventDefault();
    if (disposed || contextLost) return;
    contextLost = true;
    externalElapsedAnchor = null;
    renderer.setAnimationLoop(null);
    options.onContextLost?.();
  };
  const onContextRestored = () => {
    if (disposed || !contextLost) return;
    const { width, height } = dimensions();
    replaceGraph(responsiveQuality(width, height), width, height);
    contextLost = false;
    externalElapsedAnchor = null;
    resize();
    options.onContextRestored?.();
  };
  canvas.addEventListener('webglcontextlost', onContextLost);
  canvas.addEventListener('webglcontextrestored', onContextRestored);

  const observerFactory = options.createResizeObserver
    ?? (typeof ResizeObserver === 'undefined' ? undefined : (callback: ResizeObserverCallback) => new ResizeObserver(callback));
  const resizeObserver = observerFactory?.(resize);
  resizeObserver?.observe(container);
  const usingWindowResize = !resizeObserver;
  if (usingWindowResize) window.addEventListener('resize', resize);
  resize();

  return {
    setSnapshot(snapshot) {
      if (disposed) return;
      latestSnapshot = cloneSnapshot(snapshot);
    },
    setPaused(paused) {
      if (disposed || manuallyPaused === paused) return;
      manuallyPaused = paused;
      externalElapsedAnchor = null;
    },
    render(elapsedSeconds) {
      if (disposed || manuallyPaused || contextLost) return;
      if (!Number.isFinite(elapsedSeconds)) return;
      if (externalElapsedAnchor === null) {
        externalElapsedAnchor = elapsedSeconds;
      }
      const delta = elapsedSeconds - externalElapsedAnchor;
      if (delta < 0) return;
      externalElapsedAnchor = elapsedSeconds;
      const acceptedDelta = delta <= MAX_RUNNER_FRAME_DELTA_SECONDS ? delta : 0;
      visualElapsedSeconds += acceptedDelta;
      reconcile(graph, acceptedDelta);
      graph.postFx.render();
    },
    getDiagnostics() {
      const local = sceneResourceCounts(graph.scene);
      return {
        drawCalls: renderer.info?.render.calls ?? 0,
        geometries: renderer.info?.memory.geometries || local.geometries,
        textures: renderer.info?.memory.textures || local.textures,
      };
    },
    getFramingDiagnostics() {
      graph.camera.updateMatrixWorld(true);
      graph.ship.root.getWorldPosition(projectedPosition).project(graph.camera);
      graph.ship.root.updateWorldMatrix(true, true);
      let minX = Number.POSITIVE_INFINITY;
      let maxX = Number.NEGATIVE_INFINITY;
      let minY = Number.POSITIVE_INFINITY;
      let maxY = Number.NEGATIVE_INFINITY;
      let minZ = Number.POSITIVE_INFINITY;
      let maxZ = Number.NEGATIVE_INFINITY;
      graph.ship.root.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        if (!object.geometry.boundingBox) object.geometry.computeBoundingBox();
        const bounds = object.geometry.boundingBox;
        if (!bounds) return;
        for (let index = 0; index < shipBoundCorners.length; index += 1) {
          const corner = shipBoundCorners[index];
          corner.set(
            index & 1 ? bounds.max.x : bounds.min.x,
            index & 2 ? bounds.max.y : bounds.min.y,
            index & 4 ? bounds.max.z : bounds.min.z,
          ).applyMatrix4(object.matrixWorld).project(graph.camera);
          minX = Math.min(minX, corner.x);
          maxX = Math.max(maxX, corner.x);
          minY = Math.min(minY, corner.y);
          maxY = Math.max(maxY, corner.y);
          minZ = Math.min(minZ, corner.z);
          maxZ = Math.max(maxZ, corner.z);
        }
      });
      const gliderBounds = { minX, maxX, minY, maxY, minZ, maxZ };
      return {
        gliderNdcX: projectedPosition.x,
        gliderNdcY: projectedPosition.y,
        gliderBounds,
        gliderVisible: minX >= -1 && maxX <= 1
          && minY >= -1 && maxY <= 1
          && minZ >= -1 && maxZ <= 1,
      };
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      resizeObserver?.disconnect();
      if (usingWindowResize) window.removeEventListener('resize', resize);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      renderer.setAnimationLoop(null);
      graph.dispose();
      renderer.dispose();
      renderer.forceContextLoss?.();
      canvas.remove();
      latestSnapshot = null;
    },
  };
}

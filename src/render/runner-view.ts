import * as THREE from 'three';
import type { RendererDiagnostics } from '../diagnostics/perf-overlay';
import type { Lane, RunnerState } from '../simulation/runner-types';
import { createNeonAtmosphere, type NeonAtmosphere } from './neon/atmosphere';
import { createEntityField, type EntityField } from './neon/entity-field';
import {
  createNeonFeedbackEffects,
  type NeonFeedbackEffects,
  type RunnerFeedback,
} from './neon/feedback-effects';
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
const BLOOM_LAYER = 1;
const DETAIL_LAYER = 2;

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
  playFeedback(event: RunnerFeedback): void;
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

interface SceneGraph {
  readonly quality: 'desktop' | 'mobile';
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly materials: NeonMaterials;
  readonly tunnel: NeonTunnel;
  readonly ship: NeonShip;
  readonly shipAnchor: THREE.Group;
  readonly feedback: NeonFeedbackEffects;
  readonly entityField: EntityField;
  readonly atmosphere: NeonAtmosphere;
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
  renderer.toneMappingExposure = 0.82;
  return renderer;
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
    render: () => {
      const originalLayerMask = camera.layers.mask;
      camera.layers.enableAll();
      try {
        renderer.render(scene, camera);
      } finally {
        camera.layers.mask = originalLayerMask;
      }
    },
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
    let tunnel: NeonTunnel | null = null;
    let ship: NeonShip | null = null;
    let feedback: NeonFeedbackEffects | null = null;
    let entityField: EntityField | null = null;
    let atmosphere: NeonAtmosphere | null = null;
    let postFx: PostFx | null = null;
    try {
      tunnel = createNeonTunnel({ quality, materials });
      ship = createNeonShip(materials);
      feedback = createNeonFeedbackEffects();
      feedback.root.name = 'runner-feedback-effects';
      entityField = createEntityField(materials);
      atmosphere = createNeonAtmosphere(quality, materials);
      const shipAnchor = new THREE.Group();
      shipAnchor.name = 'neon-ship-anchor';
      shipAnchor.position.set(0, quality === 'mobile' ? -2.25 : -0.9, quality === 'mobile' ? 2.2 : -3);
      shipAnchor.scale.setScalar(quality === 'mobile' ? 0.5 : 0.75);
      shipAnchor.add(ship.root);
      shipAnchor.add(feedback.root);

      scene.add(tunnel.root, entityField.root, atmosphere.root, shipAnchor);
      if (quality === 'desktop') {
        const moveRenderablesToDetailLayer = (object: THREE.Object3D): void => {
          object.traverse((descendant) => {
            if (descendant instanceof THREE.Mesh || descendant instanceof THREE.Points) descendant.layers.set(DETAIL_LAYER);
          });
        };
        moveRenderablesToDetailLayer(ship.root);
        moveRenderablesToDetailLayer(entityField.root);
        for (const name of [
          'cyan-ribs',
          'magenta-ribs',
          'floor-seam-instances',
          'panel-detail-instances',
          'active-gate-frame',
          'active-gate-accent',
          'gate-number',
        ]) {
          const detail = scene.getObjectByName(name);
          if (detail) detail.layers.set(DETAIL_LAYER);
        }
      }
      for (const name of [
        'cyan-ribs',
        'magenta-ribs',
        'active-gate-frame',
        'active-gate-accent',
        'crystal-entity-batch',
        'speed-streaks',
      ]) {
        scene.getObjectByName(name)?.layers.enable(BLOOM_LAYER);
      }
      const feedbackParticles = feedback.root.getObjectByName('feedback-particles');
      feedbackParticles?.layers.set(BLOOM_LAYER);
      const feedbackShockwave = feedback.root.getObjectByName('feedback-shockwave');
      feedbackShockwave?.layers.set(quality === 'desktop' ? DETAIL_LAYER : 0);
      const hemisphere = new THREE.HemisphereLight(0x74d9ff, 0x210019, 0.9);
      const key = new THREE.DirectionalLight(0xb889ff, 1.7);
      key.position.set(2.5, 7, 5);
      const cyanFill = new THREE.PointLight(0x00cfff, quality === 'desktop' ? 4.2 : 3.2, 34, 2);
      cyanFill.position.set(-4, -0.5, 4);
      const magentaRim = new THREE.PointLight(0xff20c8, quality === 'desktop' ? 2.8 : 2.2, 28, 2);
      magentaRim.position.set(4, 1.4, -6);
      if (quality === 'desktop') {
        for (const light of [hemisphere, key, cyanFill, magentaRim]) light.layers.enable(DETAIL_LAYER);
      }
      scene.add(hemisphere, key, cyanFill, magentaRim);
      const postFxFactory = options.createPostFx ?? createPostFx;
      try {
        postFx = postFxFactory(renderer, scene, camera, {
          enabled: true,
          bloomLayer: BLOOM_LAYER,
          detailLayer: quality === 'desktop' ? DETAIL_LAYER : undefined,
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
        feedback,
        entityField,
        atmosphere,
        postFx,
        dispose() {
          if (graphDisposed) return;
          graphDisposed = true;
          postFx?.dispose();
          atmosphere?.dispose();
          entityField?.dispose();
          ship?.dispose();
          feedback?.dispose();
          tunnel?.dispose();
          materials.dispose();
          scene.clear();
        },
      };
      return complete;
    } catch (error) {
      postFx?.dispose();
      atmosphere?.dispose();
      entityField?.dispose();
      ship?.dispose();
      feedback?.dispose();
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
    target.shipAnchor.scale.setScalar(target.quality === 'mobile' ? 0.5 : 0.75);
  }

  function reconcile(target: SceneGraph, deltaSeconds: number, snapLane = false): void {
    const snapshot = latestSnapshot;
    const reducedMotion = effectiveReducedMotion();
    let distance = 0;
    let speed = 26;
    if (snapshot) {
      distance = snapshot.distance;
      speed = snapshot.speed;
      target.tunnel.update(snapshot.distance, snapshot.gates + 1);
      target.entityField.sync(snapshot.entities, snapshot.distance);
      target.ship.setLaneX(LANE_X[snapshot.lane], deltaSeconds, snapLane || reducedMotion);
      target.ship.update(visualElapsedSeconds, snapshot.speed, reducedMotion);
    } else {
      target.tunnel.update(0, 1);
      target.entityField.sync([], 0);
      target.ship.setLaneX(0, deltaSeconds, reducedMotion);
      target.ship.update(visualElapsedSeconds, 26, reducedMotion);
    }
    target.feedback.update(deltaSeconds, reducedMotion);
    target.ship.setFeedbackPulse(target.feedback.getShipPulse());
    target.atmosphere.update(distance, visualElapsedSeconds, speed, reducedMotion);

    const shipX = target.ship.root.position.x * target.shipAnchor.scale.x;
    const portrait = target.camera.aspect < 0.8;
    const cameraTracking = portrait ? 0.84 : 0.18;
    const lookTracking = portrait ? 0.7 : 0.05;
    target.camera.position.set(shipX * cameraTracking, portrait ? 1.2 : 1.45, portrait ? 10.4 : 5.2);
    lookTarget.set(shipX * lookTracking, -0.45, -20);
    target.camera.lookAt(lookTarget);
    target.feedback.applyCameraShake(target.camera, reducedMotion);
  }

  function replaceGraph(quality: 'desktop' | 'mobile', width: number, height: number): void {
    const replacement = createSceneGraph(quality, width, height);
    applyCameraLayout(replacement, width, height);
    reconcile(replacement, 0, true);
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
    const devicePixelRatio = window.devicePixelRatio || 1;
    renderer.setPixelRatio(Math.min(devicePixelRatio, graph.quality === 'mobile' ? 1.35 : 1));
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
    playFeedback(event) {
      if (disposed || contextLost) return;
      graph.feedback.play(event, effectiveReducedMotion());
      graph.postFx.invalidateBloom?.();
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

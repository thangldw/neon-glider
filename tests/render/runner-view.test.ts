import * as THREE from 'three';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { chromium } from '@playwright/test';
import type { AddressInfo } from 'node:net';
import { createServer } from 'vite';
import { createRunner } from '../../src/simulation/runner';
import {
  createRunnerView,
  type RunnerViewOptions,
} from '../../src/render/runner-view';
import type { RendererLike } from '../../src/render/neon/post-fx';

interface MutableRenderer extends RendererLike {
  info: {
    render: { calls: number };
    memory: { geometries: number; textures: number };
  };
}

function rendererFixture(): MutableRenderer {
  const info = { render: { calls: 0 }, memory: { geometries: 0, textures: 0 } };
  return {
    domElement: document.createElement('canvas'),
    setPixelRatio: vi.fn(),
    setSize: vi.fn(),
    render: vi.fn(),
    setAnimationLoop: vi.fn(),
    dispose: vi.fn(),
    forceContextLoss: vi.fn(),
    info,
  };
}

function setContainerSize(container: HTMLElement, width: number, height: number): void {
  Object.defineProperties(container, {
    clientWidth: { configurable: true, value: width },
    clientHeight: { configurable: true, value: height },
  });
}

function containerFixture(width = 800, height = 600): HTMLDivElement {
  const container = document.createElement('div');
  setContainerSize(container, width, height);
  document.body.append(container);
  return container;
}

function fixtureOptions(renderer = rendererFixture()): RunnerViewOptions {
  return {
    createRenderer: () => renderer,
    createPostFx: (target, scene, camera) => ({
      render: () => target.render(scene, camera),
      setSize: vi.fn(),
      dispose: vi.fn(),
    }),
    createResizeObserver: () => ({ observe: vi.fn(), disconnect: vi.fn() }),
  };
}

let getContext: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  const context = {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    font: '',
    textAlign: '',
    textBaseline: '',
    shadowBlur: 0,
    shadowColor: '',
    set fillStyle(_value: string) {},
  } as unknown as CanvasRenderingContext2D;
  getContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
});

afterEach(() => {
  getContext.mockRestore();
  document.body.replaceChildren();
  vi.restoreAllMocks();
});

it('builds the chase scene and mirrors snapshots without mutating simulation state', () => {
  const renderer = rendererFixture();
  const container = containerFixture();
  const run = createRunner(9);
  const frozen = structuredClone(run);
  const view = createRunnerView(container, fixtureOptions(renderer));
  view.setSnapshot(run);
  view.render(1);

  expect(run).toEqual(frozen);
  const [scene, camera] = (renderer.render as ReturnType<typeof vi.fn>).mock.calls[0] as [THREE.Scene, THREE.PerspectiveCamera];
  expect(camera).toMatchObject({ fov: 64, near: 0.1, far: 220 });
  expect(camera.position.z).toBeLessThanOrEqual(5.5);
  for (const name of ['neon-ship-anchor', 'neon-tunnel', 'entity-field', 'speed-streaks']) {
    expect(scene.getObjectByName(name)).toBeTruthy();
  }
  expect(scene.fog).toBeInstanceOf(THREE.Fog);
  view.dispose();
});

it('does not re-upload static world instance buffers until the snapshot changes', () => {
  const renderer = rendererFixture();
  const view = createRunnerView(containerFixture(), fixtureOptions(renderer));
  const run = createRunner(9);
  view.setSnapshot(run);
  view.render(1);
  const scene = (renderer.render as ReturnType<typeof vi.fn>).mock.calls[0][0] as THREE.Scene;
  const ribs = scene.getObjectByName('cyan-ribs') as THREE.InstancedMesh;
  const firstVersion = ribs.instanceMatrix.version;

  view.render(1.016);
  expect(ribs.instanceMatrix.version).toBe(firstVersion);

  view.setSnapshot({ ...run, distance: run.distance + 1 });
  view.render(1.032);
  expect(ribs.instanceMatrix.version).toBeGreaterThan(firstVersion);
  view.dispose();
});

it('uses the bounded cinematic cyan-magenta light rig', () => {
  const renderer = rendererFixture();
  const view = createRunnerView(containerFixture(), fixtureOptions(renderer));
  view.setSnapshot(createRunner(5));
  view.render(1);
  const scene = (renderer.render as ReturnType<typeof vi.fn>).mock.calls[0][0] as THREE.Scene;
  const fills = scene.children.filter((object): object is THREE.PointLight => object instanceof THREE.PointLight);

  expect(fills).toHaveLength(2);
  expect(fills[0].color.getHex()).toBe(0x00cfff);
  expect(fills[0]).toMatchObject({ intensity: 4.2, distance: 34, decay: 2 });
  expect(fills[1].color.getHex()).toBe(0xff20c8);
  expect(fills[1]).toMatchObject({ intensity: 2.8, distance: 28, decay: 2 });
  const hemisphere = scene.children.find((object): object is THREE.HemisphereLight => object instanceof THREE.HemisphereLight);
  const key = scene.children.find((object): object is THREE.DirectionalLight => object instanceof THREE.DirectionalLight);
  expect(hemisphere).toMatchObject({ intensity: 0.9 });
  expect(key).toMatchObject({ intensity: 1.7 });
  view.dispose();
});

it.each([
  ['desktop' as const, 1_536, 1_024],
  ['mobile' as const, 412, 915],
])('enables the production composer path for the %s quality profile', (quality, width, height) => {
  const renderer = rendererFixture();
  let enabled: boolean | undefined;
  const view = createRunnerView(containerFixture(width, height), {
    ...fixtureOptions(renderer),
    forceQuality: quality,
    createPostFx: (target, scene, camera, options) => {
      enabled = options.enabled;
      return { render: () => target.render(scene, camera), setSize: vi.fn(), dispose: vi.fn() };
    },
  });

  expect(enabled).toBe(true);
  view.dispose();
});

it('moves desktop gameplay silhouettes to the full-resolution detail layer', () => {
  const renderer = rendererFixture();
  let scene: THREE.Scene | undefined;
  let detailLayer: number | undefined;
  const view = createRunnerView(containerFixture(1_536, 1_024), {
    ...fixtureOptions(renderer),
    forceQuality: 'desktop',
    createPostFx: (target, createdScene, camera, options) => {
      scene = createdScene;
      detailLayer = options.detailLayer;
      return { render: () => target.render(createdScene, camera), setSize: vi.fn(), dispose: vi.fn() };
    },
  });

  expect(detailLayer).toBe(2);
  for (const name of [
    'cyan-ribs',
    'magenta-ribs',
    'floor-seam-instances',
    'panel-detail-instances',
    'active-gate-frame',
    'active-gate-accent',
    'gate-number',
  ]) {
    const object = scene?.getObjectByName(name);
    expect(object?.layers.isEnabled(2), name).toBe(true);
    expect(object?.layers.isEnabled(0), name).toBe(false);
  }
  for (const rootName of ['neon-ship', 'entity-field']) {
    scene?.getObjectByName(rootName)?.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        expect(object.layers.isEnabled(2), object.name).toBe(true);
        expect(object.layers.isEnabled(0), object.name).toBe(false);
      }
    });
  }
  const particles = scene?.getObjectByName('feedback-particles');
  expect(particles?.layers.isEnabled(1)).toBe(true);
  expect(particles?.layers.isEnabled(0)).toBe(false);
  expect(particles?.layers.isEnabled(2)).toBe(false);
  const shockwave = scene?.getObjectByName('feedback-shockwave');
  expect(shockwave?.layers.isEnabled(2)).toBe(true);
  expect(shockwave?.layers.isEnabled(0)).toBe(false);
  expect(shockwave?.layers.isEnabled(1)).toBe(false);
  expect(scene?.getObjectByName('speed-streaks')?.layers.isEnabled(0)).toBe(true);
  expect(scene?.getObjectByName('speed-streaks')?.layers.isEnabled(2)).toBe(false);
  view.dispose();
});

it('routes mobile feedback particles through bloom and shockwave through the base pass', () => {
  const renderer = rendererFixture();
  let scene: THREE.Scene | undefined;
  const view = createRunnerView(containerFixture(412, 915), {
    ...fixtureOptions(renderer),
    forceQuality: 'mobile',
    createPostFx: (target, createdScene, camera) => {
      scene = createdScene;
      return { render: () => target.render(createdScene, camera), setSize: vi.fn(), dispose: vi.fn() };
    },
  });

  const particles = scene?.getObjectByName('feedback-particles');
  expect(particles?.layers.isEnabled(1)).toBe(true);
  expect(particles?.layers.isEnabled(0)).toBe(false);
  const shockwave = scene?.getObjectByName('feedback-shockwave');
  expect(shockwave?.layers.isEnabled(0)).toBe(true);
  expect(shockwave?.layers.isEnabled(1)).toBe(false);
  view.dispose();
});

it('attaches feedback to the ship anchor and exposes explicit playback', () => {
  const renderer = rendererFixture();
  const view = createRunnerView(containerFixture(), fixtureOptions(renderer));
  view.setSnapshot(createRunner(4));

  view.playFeedback({ kind: 'collect', count: 1 });
  view.render(1);

  const scene = (renderer.render as ReturnType<typeof vi.fn>).mock.calls[0][0] as THREE.Scene;
  const effects = scene.getObjectByName('runner-feedback-effects');
  expect(effects?.parent?.name).toBe('neon-ship-anchor');
  expect(scene.getObjectByName('feedback-particles')?.visible).toBe(true);
  view.dispose();
});

it('tracks the rendered ship position without inheriting its bank', () => {
  const renderer = rendererFixture();
  const view = createRunnerView(containerFixture(), fixtureOptions(renderer));
  view.setSnapshot({ ...createRunner(4), lane: 2 });
  view.render(1);
  view.render(1.1);

  const scene = (renderer.render as ReturnType<typeof vi.fn>).mock.calls.at(-1)![0] as THREE.Scene;
  const ship = scene.getObjectByName('neon-ship') as THREE.Group;
  const feedback = scene.getObjectByName('runner-feedback-effects') as THREE.Group;
  const shipWorld = ship.getWorldPosition(new THREE.Vector3());
  const feedbackWorld = feedback.getWorldPosition(new THREE.Vector3());
  expect(ship.rotation.z).not.toBe(0);
  expect(feedback.rotation.z).toBe(0);
  expect(feedback.position.x).toBeCloseTo(ship.position.x, 10);
  expect(feedback.position.y).toBeCloseTo(ship.position.y, 10);
  expect(feedbackWorld.x).toBeCloseTo(shipWorld.x, 10);
  expect(feedbackWorld.y).toBeCloseTo(shipWorld.y, 10);
  const framing = view.getFramingDiagnostics() as ReturnType<typeof view.getFramingDiagnostics> & {
    feedbackNdcX?: number;
    feedbackNdcY?: number;
  };
  expect(framing.feedbackNdcX).toBeCloseTo(framing.gliderNdcX, 10);
  expect(framing.feedbackNdcY).toBeCloseTo(framing.gliderNdcY, 10);
  view.dispose();
});

it('does not infer feedback from ordinary snapshot replacement', () => {
  const renderer = rendererFixture();
  const view = createRunnerView(containerFixture(), fixtureOptions(renderer));
  view.setSnapshot({ ...createRunner(4), crystals: 3 });

  view.render(1);

  const scene = (renderer.render as ReturnType<typeof vi.fn>).mock.calls[0][0] as THREE.Scene;
  expect(scene.getObjectByName('feedback-particles')?.visible).toBe(false);
  view.dispose();
});

it('keeps every split scene layer visible when post-processing construction falls back', () => {
  const renderer = rendererFixture();
  const renderedLayerMasks: number[] = [];
  (renderer.render as ReturnType<typeof vi.fn>).mockImplementation((_scene, camera: THREE.Camera) => {
    renderedLayerMasks.push(camera.layers.mask);
  });
  const view = createRunnerView(containerFixture(1_536, 1_024), {
    ...fixtureOptions(renderer),
    forceQuality: 'desktop',
    createPostFx: () => { throw new Error('unsupported post-processing'); },
  });

  view.setSnapshot(createRunner(2));
  view.render(1);

  expect(renderedLayerMasks).toEqual([-1]);
  const renderedCamera = (renderer.render as ReturnType<typeof vi.fn>).mock.calls[0][1] as THREE.Camera;
  expect(renderedCamera.layers.mask).toBe(1);
  view.dispose();
});

it.each([
  [1536, 1024, 'desktop' as const],
  [412, 915, 'mobile' as const],
])('keeps every transformed ship corner inside clip volume at %sx%s', (width, height, quality) => {
  const renderer = rendererFixture();
  const container = containerFixture(width, height);
  const view = createRunnerView(container, { ...fixtureOptions(renderer), forceQuality: quality });
  for (const lane of [0, 1, 2] as const) {
    view.setSnapshot({ ...createRunner(1), lane });
    view.render(lane * 2 + 1);
    for (let frame = 1; frame <= 90; frame += 1) view.render(lane * 2 + 1 + frame / 60);
    const framing = view.getFramingDiagnostics();
    expect(framing.gliderVisible, `lane ${lane}: ${JSON.stringify(framing)}`).toBe(true);
    expect(Math.abs(framing.gliderNdcX)).toBeLessThan(0.72);
    expect(framing.gliderNdcY).toBeLessThan(-0.2);
    expect(framing.gliderNdcY).toBeGreaterThan(-0.88);
    expect(framing.gliderBounds.minX).toBeGreaterThanOrEqual(-1);
    expect(framing.gliderBounds.maxX).toBeLessThanOrEqual(1);
    expect(framing.gliderBounds.minY).toBeGreaterThanOrEqual(-1);
    expect(framing.gliderBounds.maxY).toBeLessThanOrEqual(1);
    expect(framing.gliderBounds.minZ).toBeGreaterThanOrEqual(-1);
    expect(framing.gliderBounds.maxZ).toBeLessThanOrEqual(1);
    if (quality === 'desktop') {
      expect(
        framing.gliderBounds.maxX - framing.gliderBounds.minX,
        `lane ${lane}: ${JSON.stringify(framing)}`,
      ).toBeGreaterThanOrEqual(0.5);
    }
  }
  view.dispose();
});

it('measures actual WebGL scene submissions excluding post-FX and counts extra material groups', async () => {
  const server = await createServer({
    configFile: false,
    root: process.cwd(),
    logLevel: 'silent',
    server: { host: '127.0.0.1', port: 0 },
    plugins: [{
      name: 'runner-view-test-page',
      configureServer(vite) {
        vite.middlewares.use('/__runner-view-test.html', (_request, response) => {
          response.statusCode = 200;
          response.setHeader('Content-Type', 'text/html');
          response.end('<!doctype html><html><body></body></html>');
        });
      },
    }],
  });
  await server.listen();
  const address = server.httpServer?.address() as AddressInfo;
  const browser = await chromium.launch({ headless: true });
  try {
    const results: Array<{
      width: number;
      height: number;
      lane: number;
      sceneDrawCalls: number;
      geometries: number;
      groupedDrawCalls: number;
      framing: {
        gliderVisible: boolean;
        gliderBounds: { minX: number; maxX: number; minY: number; maxY: number; minZ: number; maxZ: number };
      };
    }> = [];
    for (const [width, height, deviceScaleFactor, quality] of [
      [1536, 1024, 1, 'desktop'],
      [412, 839, 2.625, 'mobile'],
    ] as const) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor });
      await page.goto(`http://127.0.0.1:${address.port}/__runner-view-test.html`);
      const viewportResults = await page.evaluate(async ({ width, height, quality }) => {
        const dynamicImport = new Function('specifier', 'return import(specifier)') as (specifier: string) => Promise<Record<string, unknown>>;
        const [viewModule, runnerModule] = await Promise.all([
          dynamicImport('/src/render/runner-view.ts'),
          dynamicImport('/src/simulation/runner.ts'),
        ]);
        const createRunnerView = viewModule.createRunnerView as typeof import('../../src/render/runner-view').createRunnerView;
        const createRunner = runnerModule.createRunner as typeof import('../../src/simulation/runner').createRunner;
        const container = document.createElement('div');
        Object.assign(container.style, { width: `${width}px`, height: `${height}px` });
        document.body.append(container);
        let renderedScene: import('three').Scene | undefined;
        const view = createRunnerView(container, {
          forceQuality: quality,
          reducedMotion: true,
          createPostFx: (renderer, scene, camera) => {
            renderedScene = scene;
            return {
              render: () => {
                const originalLayerMask = camera.layers.mask;
                camera.layers.enableAll();
                renderer.render(scene, camera);
                camera.layers.mask = originalLayerMask;
              },
              setSize: () => undefined,
              dispose: () => undefined,
            };
          },
          createResizeObserver: () => undefined,
        });
        const laneResults = [];
        for (const lane of [0, 1, 2] as const) {
          view.setSnapshot({ ...createRunner(1), lane });
          view.render(lane + 1);
          view.render(lane + 1);
          const diagnostics = view.getDiagnostics();
          const sceneDrawCalls = diagnostics.drawCalls;
          const framing = view.getFramingDiagnostics();
          const fuselage = renderedScene?.getObjectByName('airframe') as import('three').Mesh;
          const geometry = fuselage.geometry;
          const originalMaterial = fuselage.material as import('three').Material;
          const extraMaterial = originalMaterial.clone();
          const drawCount = geometry.index?.count ?? geometry.getAttribute('position').count;
          geometry.clearGroups();
          geometry.addGroup(0, drawCount, 0);
          geometry.addGroup(0, drawCount, 1);
          fuselage.material = [originalMaterial, extraMaterial];
          view.render(lane + 1);
          const groupedDrawCalls = view.getDiagnostics().drawCalls;
          geometry.clearGroups();
          fuselage.material = originalMaterial;
          extraMaterial.dispose();
          laneResults.push({ lane, sceneDrawCalls, geometries: diagnostics.geometries, groupedDrawCalls, framing });
        }
        view.dispose();
        return laneResults;
      }, { width, height, quality });
      for (const result of viewportResults) results.push({ width, height, ...result });
      await page.close();
    }

    for (const result of results) {
      const budget = result.width === 1536 ? 60 : 45;
      const representativeCeiling = result.width === 1536 ? 40 : 34;
      expect(result.framing.gliderVisible, JSON.stringify(result)).toBe(true);
      expect(result.sceneDrawCalls, JSON.stringify(result)).toBeLessThanOrEqual(budget);
      expect(result.sceneDrawCalls, JSON.stringify(result)).toBeLessThanOrEqual(representativeCeiling);
      expect(result.geometries, JSON.stringify(result)).toBeLessThan(45);
      expect(result.groupedDrawCalls, JSON.stringify(result)).toBeGreaterThan(result.sceneDrawCalls);
    }
  } finally {
    await browser.close();
    await server.close();
  }
}, 20_000);

it('keeps production-composer feedback within two complete-frame submissions', async () => {
  const server = await createServer({
    configFile: false,
    root: process.cwd(),
    logLevel: 'silent',
    server: { host: '127.0.0.1', port: 0 },
    plugins: [{
      name: 'runner-feedback-production-test-page',
      configureServer(vite) {
        vite.middlewares.use('/__runner-feedback-production-test.html', (_request, response) => {
          response.statusCode = 200;
          response.setHeader('Content-Type', 'text/html');
          response.end('<!doctype html><html><head><script type="importmap">{"imports":{"three":"/node_modules/three/build/three.module.js"}}</script></head><body></body></html>');
        });
      },
    }],
  });
  await server.listen();
  const address = server.httpServer?.address() as AddressInfo;
  const browser = await chromium.launch({ headless: true });
  try {
    const results: Array<{
      quality: 'desktop' | 'mobile';
      bloomBaseline: number;
      cachedBaseline: number;
      activeFirstFrame: number;
      activeCachedFrame: number;
      geometries: number;
      baseShipLuma: number;
      activeShipLuma: number;
      activeShockwaveOpacity: number;
    }> = [];
    for (const [width, height, quality] of [
      [1536, 1024, 'desktop'],
      [412, 915, 'mobile'],
    ] as const) {
      const page = await browser.newPage({ viewport: { width, height } });
      await page.goto(`http://127.0.0.1:${address.port}/__runner-feedback-production-test.html`);
      const result = await page.evaluate(async ({ quality }) => {
        const dynamicImport = new Function('specifier', 'return import(specifier)') as (specifier: string) => Promise<Record<string, unknown>>;
        const [three, viewModule, runnerModule] = await Promise.all([
          dynamicImport('three'),
          dynamicImport('/src/render/runner-view.ts'),
          dynamicImport('/src/simulation/runner.ts'),
        ]);
        const THREE = three as typeof import('three');
        const createRunnerView = viewModule.createRunnerView as typeof import('../../src/render/runner-view').createRunnerView;
        const createRunner = runnerModule.createRunner as typeof import('../../src/simulation/runner').createRunner;
        const container = document.createElement('div');
        Object.assign(container.style, { width: quality === 'desktop' ? '1536px' : '412px', height: quality === 'desktop' ? '1024px' : '915px' });
        document.body.append(container);
        let baseShipLuma = 0;
        let activeShipLuma = 0;
        let activeShockwaveOpacity = 0;
        let captureActive = false;
        const view = createRunnerView(container, {
          forceQuality: quality,
          createRenderer: (canvas) => {
            const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
            const render = renderer.render.bind(renderer);
            renderer.render = (scene, camera) => {
              if (quality === 'desktop' && camera.layers.mask === 4) {
                const ship = scene.getObjectByName('airframe') as import('three').Mesh;
                const shockwave = scene.getObjectByName('feedback-shockwave') as import('three').Mesh;
                const shipMaterial = ship.material as import('three').MeshBasicMaterial;
                const shockwaveMaterial = shockwave.material as import('three').MeshBasicMaterial;
                const luma = shipMaterial.color.r + shipMaterial.color.g + shipMaterial.color.b;
                if (captureActive) {
                  activeShipLuma = luma;
                  activeShockwaveOpacity = shockwaveMaterial.opacity;
                } else {
                  baseShipLuma = luma;
                }
              }
              render(scene, camera);
            };
            return renderer;
          },
          createResizeObserver: () => undefined,
        });
        view.setSnapshot(createRunner(1));
        view.render(1);
        const bloomBaseline = view.getDiagnostics().drawCalls;
        view.render(1.01);
        const cachedBaseline = view.getDiagnostics().drawCalls;
        captureActive = true;
        view.playFeedback({ kind: 'collision' });
        view.render(1.02);
        const activeFirstFrame = view.getDiagnostics().drawCalls;
        view.render(1.03);
        const activeCachedFrame = view.getDiagnostics().drawCalls;
        const geometries = view.getDiagnostics().geometries;
        view.dispose();
        return { quality, bloomBaseline, cachedBaseline, activeFirstFrame, activeCachedFrame, geometries, baseShipLuma, activeShipLuma, activeShockwaveOpacity };
      }, { quality });
      results.push(result);
      await page.close();
    }

    for (const result of results) {
      expect(result.activeFirstFrame - result.bloomBaseline, JSON.stringify(result)).toBe(2);
      expect(result.activeCachedFrame - result.cachedBaseline, JSON.stringify(result)).toBe(result.quality === 'desktop' ? 1 : 2);
      expect(result.activeFirstFrame, JSON.stringify(result)).toBeLessThan(60);
      expect(result.geometries, JSON.stringify(result)).toBeLessThan(45);
      if (result.quality === 'desktop') {
        expect(result.activeShipLuma, JSON.stringify(result)).toBeGreaterThan(result.baseShipLuma);
        expect(result.activeShockwaveOpacity, JSON.stringify(result)).toBeGreaterThan(0);
      }
    }
  } finally {
    await browser.close();
    await server.close();
  }
}, 20_000);

it('renders mutation-sensitive cyan and red-orange particle pixels through the production composer', async () => {
  const server = await createServer({
    configFile: false,
    root: process.cwd(),
    logLevel: 'silent',
    server: { host: '127.0.0.1', port: 0 },
    plugins: [{
      name: 'runner-feedback-pixel-test-page',
      configureServer(vite) {
        vite.middlewares.use('/__runner-feedback-pixels.html', (_request, response) => {
          response.statusCode = 200;
          response.setHeader('Content-Type', 'text/html');
          response.end('<!doctype html><html><head><script type="importmap">{"imports":{"three":"/node_modules/three/build/three.module.js"}}</script></head><body></body></html>');
        });
      },
    }],
  });
  await server.listen();
  const address = server.httpServer?.address() as AddressInfo;
  const browser = await chromium.launch({ headless: true });
  try {
    const results = [];
    for (const [width, height, deviceScaleFactor, quality] of [
      [1536, 1024, 1, 'desktop'],
      [412, 839, 2.625, 'mobile'],
    ] as const) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor });
      await page.goto(`http://127.0.0.1:${address.port}/__runner-feedback-pixels.html`);
      results.push(await page.evaluate(async ({ width, height, quality }) => {
        const dynamicImport = new Function('specifier', 'return import(specifier)') as (specifier: string) => Promise<Record<string, unknown>>;
        const [three, viewModule, runnerModule] = await Promise.all([
          dynamicImport('three'),
          dynamicImport('/src/render/runner-view.ts'),
          dynamicImport('/src/simulation/runner.ts'),
        ]);
        const THREE = three as typeof import('three');
        const createRunnerView = viewModule.createRunnerView as typeof import('../../src/render/runner-view').createRunnerView;
        const createRunner = runnerModule.createRunner as typeof import('../../src/simulation/runner').createRunner;
        const container = document.createElement('div');
        Object.assign(container.style, { width: `${width}px`, height: `${height}px` });
        document.body.append(container);
        let renderedScene: import('three').Scene | undefined;
        let renderedCamera: import('three').Camera | undefined;
        let canvas: HTMLCanvasElement | undefined;
        const view = createRunnerView(container, {
          forceQuality: quality,
          reducedMotion: true,
          createRenderer: (targetCanvas) => {
            canvas = targetCanvas;
            const renderer = new THREE.WebGLRenderer({ canvas: targetCanvas, antialias: true, preserveDrawingBuffer: true });
            const render = renderer.render.bind(renderer);
            renderer.render = (scene, camera) => {
              if (scene.getObjectByName('neon-ship-anchor')) {
                renderedScene = scene as import('three').Scene;
                renderedCamera = camera;
              }
              render(scene, camera);
            };
            return renderer;
          },
          createResizeObserver: () => undefined,
        });

        const readPixels = (kind: 'cyan' | 'orange') => {
          if (!canvas || !renderedScene || !renderedCamera) throw new Error('Missing production render state');
          const copy = document.createElement('canvas');
          copy.width = canvas.width;
          copy.height = canvas.height;
          const context = copy.getContext('2d', { willReadFrequently: true });
          if (!context) throw new Error('Missing pixel context');
          context.drawImage(canvas, 0, 0);
          const data = context.getImageData(0, 0, copy.width, copy.height).data;
          const center = renderedScene.getObjectByName('runner-feedback-effects')!.getWorldPosition(new THREE.Vector3()).project(renderedCamera);
          const centerX = (center.x + 1) * 0.5 * copy.width;
          const centerY = (1 - center.y) * 0.5 * copy.height;
          let pixels = 0;
          let sectors = 0;
          let nonBlack = 0;
          let maxRed = 0;
          let maxGreen = 0;
          let maxBlue = 0;
          for (let y = 0; y < copy.height; y += 1) {
            for (let x = 0; x < copy.width; x += 1) {
              const offset = (y * copy.width + x) * 4;
              const red = data[offset];
              const green = data[offset + 1];
              const blue = data[offset + 2];
              if (red + green + blue > 24) nonBlack += 1;
              maxRed = Math.max(maxRed, red);
              maxGreen = Math.max(maxGreen, green);
              maxBlue = Math.max(maxBlue, blue);
              const colored = kind === 'cyan'
                ? blue >= 48 && green >= 36 && blue > red * 1.35 && green > red * 1.2
                : red >= 36 && red > green * 1.005 && red > blue * 1.8;
              if (!colored) continue;
              const dx = x - centerX;
              const dy = y - centerY;
              const radius = Math.hypot(dx, dy);
              if (radius < 8 || radius > Math.min(copy.width, copy.height) * 0.32) continue;
              pixels += 1;
              const sector = Math.floor(((Math.atan2(dy, dx) + Math.PI) / (Math.PI * 2)) * 8) % 8;
              sectors |= 1 << sector;
            }
          }
          let sectorCount = 0;
          for (let index = 0; index < 8; index += 1) sectorCount += (sectors >> index) & 1;
          return { pixels, sectorCount, nonBlack, maxRed, maxGreen, maxBlue };
        };

        view.setSnapshot({ ...createRunner(1), lane: 2 });
        view.render(1);
        const scene = renderedScene!;
        for (const child of scene.children) child.visible = child.name === 'neon-ship-anchor';
        scene.getObjectByName('neon-ship')!.visible = false;
        scene.background = new THREE.Color(0x000000);
        scene.fog = null;

        view.playFeedback({ kind: 'collect', count: 1 });
        view.render(1.02);
        const collect = readPixels('cyan');
        const particles = scene.getObjectByName('feedback-particles') as import('three').Points;
        const particleMaterial = particles.material as import('three').PointsMaterial;
        const collectState = {
          visible: particles.visible,
          count: particles.geometry.drawRange.count,
          opacity: particleMaterial.opacity,
          size: particleMaterial.size,
          colorWrite: particleMaterial.colorWrite,
          root: scene.getObjectByName('runner-feedback-effects')!.position.toArray(),
          first: (particles.geometry.getAttribute('position') as import('three').BufferAttribute).getX(0),
        };
        particleMaterial.colorWrite = false;
        view.playFeedback({ kind: 'collect', count: 1 });
        view.render(1.04);
        const collectMuted = readPixels('cyan');

        particleMaterial.colorWrite = true;
        view.playFeedback({ kind: 'collision' });
        scene.getObjectByName('feedback-shockwave')!.layers.disableAll();
        view.render(1.06);
        const collision = readPixels('orange');
        particleMaterial.colorWrite = false;
        view.playFeedback({ kind: 'collision' });
        scene.getObjectByName('feedback-shockwave')!.layers.disableAll();
        view.render(1.08);
        const collisionMuted = readPixels('orange');
        const diagnostics = view.getDiagnostics();
        view.dispose();
        return { quality, collect, collectMuted, collision, collisionMuted, collectState, diagnostics };
      }, { width, height, quality }));
      await page.close();
    }

    for (const result of results) {
      const readablePixelFloor = result.quality === 'desktop' ? 5_000 : 750;
      const readablePixelCeiling = result.quality === 'desktop' ? 20_000 : 8_000;
      expect(result.collect.pixels, JSON.stringify(result)).toBeGreaterThan(readablePixelFloor);
      expect(result.collect.pixels, JSON.stringify(result)).toBeLessThan(readablePixelCeiling);
      expect(result.collect.sectorCount, JSON.stringify(result)).toBeGreaterThanOrEqual(5);
      expect(result.collectMuted.pixels, JSON.stringify(result)).toBeLessThan(result.collect.pixels * 0.15);
      expect(result.collision.pixels, JSON.stringify(result)).toBeGreaterThan(readablePixelFloor);
      expect(result.collision.pixels, JSON.stringify(result)).toBeLessThan(readablePixelCeiling);
      expect(result.collision.sectorCount, JSON.stringify(result)).toBeGreaterThanOrEqual(5);
      expect(result.collisionMuted.pixels, JSON.stringify(result)).toBeLessThan(result.collision.pixels * 0.15);
      expect(result.diagnostics.drawCalls, JSON.stringify(result)).toBeLessThan(60);
      expect(result.diagnostics.geometries, JSON.stringify(result)).toBeLessThan(45);
    }
  } finally {
    await browser.close();
    await server.close();
  }
}, 30_000);

it('uses the release render scale by responsive quality and resizes the camera and post FX', () => {
  const descriptor = Object.getOwnPropertyDescriptor(window, 'devicePixelRatio');
  Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 3 });
  try {
    const desktopRenderer = rendererFixture();
    const desktopContainer = containerFixture(1536, 1024);
    let resizeDesktop: ResizeObserverCallback | undefined;
    const fxSize = vi.fn();
    const desktop = createRunnerView(desktopContainer, {
      ...fixtureOptions(desktopRenderer),
      createPostFx: (renderer, scene, camera) => ({ render: () => renderer.render(scene, camera), setSize: fxSize, dispose: vi.fn() }),
      createResizeObserver: (callback) => {
        resizeDesktop = callback;
        return { observe: vi.fn(), disconnect: vi.fn() };
      },
    });
    expect(desktopRenderer.setPixelRatio).toHaveBeenLastCalledWith(1);
    setContainerSize(desktopContainer, 412, 915);
    resizeDesktop?.([], {} as ResizeObserver);
    expect(desktopRenderer.setPixelRatio).toHaveBeenLastCalledWith(1.35);
    expect(desktopRenderer.setSize).toHaveBeenLastCalledWith(412, 915);
    expect(fxSize).toHaveBeenLastCalledWith(412, 915);
    desktop.dispose();

    const mobileRenderer = rendererFixture();
    const mobile = createRunnerView(containerFixture(412, 915), { ...fixtureOptions(mobileRenderer), forceQuality: 'mobile' });
    expect(mobileRenderer.setPixelRatio).toHaveBeenLastCalledWith(1.35);
    mobile.dispose();
  } finally {
    if (descriptor) Object.defineProperty(window, 'devicePixelRatio', descriptor);
  }
});

it('accepts only finite monotonic visual deltas at or below 0.25 seconds and freezes while paused', () => {
  const renderer = rendererFixture();
  const view = createRunnerView(containerFixture(), fixtureOptions(renderer));
  view.setSnapshot(createRunner(4));
  view.render(10);
  const scene = (renderer.render as ReturnType<typeof vi.fn>).mock.calls[0][0] as THREE.Scene;
  const ship = scene.getObjectByName('neon-ship')!;
  const y0 = ship.position.y;
  view.render(10.2);
  const y1 = ship.position.y;
  expect(y1).not.toBe(y0);

  view.render(9);
  view.render(9.1);
  expect(ship.position.y).toBe(y1);

  for (const elapsed of [10.5, 10.4, Number.NaN, Number.POSITIVE_INFINITY]) view.render(elapsed);
  expect(ship.position.y).toBe(y1);
  view.setPaused(true);
  view.render(10.45);
  expect(ship.position.y).toBe(y1);
  view.setPaused(false);
  view.render(20);
  expect(ship.position.y).toBe(y1);
  view.render(20.25);
  expect(ship.position.y).not.toBe(y1);
  view.dispose();
});

it('freezes visual output while lost and transactionally replays the complete latest snapshot', () => {
  const renderer = rendererFixture();
  const onContextLost = vi.fn();
  const onContextRestored = vi.fn();
  const fxDisposals: Array<ReturnType<typeof vi.fn>> = [];
  const container = containerFixture();
  const view = createRunnerView(container, {
    ...fixtureOptions(renderer),
    onContextLost,
    onContextRestored,
    createPostFx: (target, scene, camera) => {
      const dispose = vi.fn();
      fxDisposals.push(dispose);
      return { render: () => target.render(scene, camera), setSize: vi.fn(), dispose };
    },
  });
  const snapshot = { ...createRunner(2), lane: 2 as const, distance: 333, gates: 1 };
  view.setSnapshot(snapshot);
  view.render(1);
  const canvas = renderer.domElement;

  const originalScene = (renderer.render as ReturnType<typeof vi.fn>).mock.calls.at(-1)![0] as THREE.Scene;
  view.playFeedback({ kind: 'collision' });
  const originalParticles = originalScene.getObjectByName('feedback-particles') as THREE.Points;
  const feedbackGeometryDispose = vi.spyOn(originalParticles.geometry, 'dispose');
  expect(originalParticles.visible).toBe(true);
  const originalShipY = originalScene.getObjectByName('neon-ship')!.position.y;
  const renderCountBeforeLoss = (renderer.render as ReturnType<typeof vi.fn>).mock.calls.length;

  const lost = new Event('webglcontextlost', { cancelable: true });
  canvas.dispatchEvent(lost);
  canvas.dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
  expect(lost.defaultPrevented).toBe(true);
  view.render(20);
  expect(renderer.render).toHaveBeenCalledTimes(renderCountBeforeLoss);
  expect(originalScene.getObjectByName('neon-ship')!.position.y).toBe(originalShipY);
  canvas.dispatchEvent(new Event('webglcontextrestored'));
  canvas.dispatchEvent(new Event('webglcontextrestored'));
  view.render(21);

  expect(onContextLost).toHaveBeenCalledOnce();
  expect(onContextRestored).toHaveBeenCalledOnce();
  expect(container.querySelectorAll('canvas')).toHaveLength(1);
  expect(fxDisposals[0]).toHaveBeenCalledOnce();
  expect(feedbackGeometryDispose).toHaveBeenCalledOnce();
  const latestScene = (renderer.render as ReturnType<typeof vi.fn>).mock.calls.at(-1)![0] as THREE.Scene;
  expect(latestScene.getObjectByName('feedback-particles')?.visible).toBe(false);
  const field = latestScene.getObjectByName('entity-field')!;
  const ship = latestScene.getObjectByName('neon-ship')!;
  const feedback = latestScene.getObjectByName('runner-feedback-effects')!;
  const gate = latestScene.getObjectByName('active-gate')!;
  expect(ship.position.x).toBe(3);
  expect(feedback.position.x).toBe(ship.position.x);
  expect(feedback.position.y).toBe(ship.position.y);
  expect(gate.position.z).toBe(-(500 - snapshot.distance) - 1);
  for (const entity of snapshot.entities) {
    const marker = field.getObjectByName(entity.id);
    expect(marker, entity.id).toBeDefined();
    expect(marker?.position.x).toBe([-3, 0, 3][entity.lane]);
    expect(marker?.position.z).toBe(-(entity.distance - snapshot.distance));
  }
  expect(view.getDiagnostics().geometries).toBeGreaterThan(0);
  view.dispose();
});

it('uses pooled scene resources and disposes every owned lifecycle once', () => {
  const renderer = rendererFixture();
  const observer = { observe: vi.fn(), disconnect: vi.fn() };
  const fxDispose = vi.fn();
  const container = containerFixture();
  const view = createRunnerView(container, {
    ...fixtureOptions(renderer),
    createResizeObserver: () => observer,
    createPostFx: (target, scene, camera) => ({ render: () => target.render(scene, camera), setSize: vi.fn(), dispose: fxDispose }),
  });
  const run = createRunner(1);
  view.setSnapshot(run);
  view.render(1);
  const first = view.getDiagnostics();
  view.setSnapshot({ ...run, distance: 20, entities: run.entities.slice(4) });
  view.render(1.1);
  view.setSnapshot(run);
  view.render(1.2);
  expect(view.getDiagnostics().geometries).toBe(first.geometries);

  view.dispose();
  view.dispose();
  expect(observer.disconnect).toHaveBeenCalledOnce();
  expect(fxDispose).toHaveBeenCalledOnce();
  expect(renderer.dispose).toHaveBeenCalledOnce();
  expect(renderer.forceContextLoss).toHaveBeenCalledOnce();
  expect(container.querySelectorAll('canvas')).toHaveLength(0);
});

it('uses and removes the window resize fallback', () => {
  const add = vi.spyOn(window, 'addEventListener');
  const remove = vi.spyOn(window, 'removeEventListener');
  const renderer = rendererFixture();
  const container = containerFixture(320, 480);
  const view = createRunnerView(container, { ...fixtureOptions(renderer), createResizeObserver: () => undefined });
  setContainerSize(container, 480, 320);
  window.dispatchEvent(new Event('resize'));

  expect(renderer.setSize).toHaveBeenLastCalledWith(480, 320);
  expect(add).toHaveBeenCalledWith('resize', expect.any(Function));
  view.dispose();
  expect(remove).toHaveBeenCalledWith('resize', expect.any(Function));
});

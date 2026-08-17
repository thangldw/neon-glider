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

it('keeps scene fill lights bounded so emissive geometry retains surface detail', () => {
  const renderer = rendererFixture();
  const view = createRunnerView(containerFixture(), fixtureOptions(renderer));
  view.setSnapshot(createRunner(5));
  view.render(1);
  const scene = (renderer.render as ReturnType<typeof vi.fn>).mock.calls[0][0] as THREE.Scene;
  const fills = scene.children.filter((object): object is THREE.PointLight => object instanceof THREE.PointLight);

  expect(fills).toHaveLength(2);
  expect(Math.max(...fills.map(({ intensity }) => intensity))).toBeLessThanOrEqual(3);
  view.dispose();
});

it.each([
  ['desktop' as const, 1_536, 1_024, false],
  ['mobile' as const, 412, 915, true],
])('selects post-processing for the %s release budget', (quality, width, height, expectedEnabled) => {
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

  expect(enabled).toBe(expectedEnabled);
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
      ).toBeGreaterThanOrEqual(0.68);
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
      groupedDrawCalls: number;
      framing: {
        gliderVisible: boolean;
        gliderBounds: { minX: number; maxX: number; minY: number; maxY: number; minZ: number; maxZ: number };
      };
    }> = [];
    for (const [width, height, quality] of [
      [1536, 1024, 'desktop'],
      [412, 915, 'mobile'],
    ] as const) {
      const page = await browser.newPage({ viewport: { width, height } });
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
              render: () => renderer.render(scene, camera),
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
          const sceneDrawCalls = view.getDiagnostics().drawCalls;
          const framing = view.getFramingDiagnostics();
          const fuselage = renderedScene?.getObjectByName('fuselage') as import('three').Mesh;
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
          laneResults.push({ lane, sceneDrawCalls, groupedDrawCalls, framing });
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
      expect(result.groupedDrawCalls, JSON.stringify(result)).toBeGreaterThan(result.sceneDrawCalls);
    }
  } finally {
    await browser.close();
    await server.close();
  }
}, 20_000);

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
    expect(desktopRenderer.setPixelRatio).toHaveBeenLastCalledWith(0.5);
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

it('rebuilds the latest snapshot across repeated context losses without duplicate canvas or callbacks', () => {
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
  const snapshot = { ...createRunner(2), distance: 333, gates: 1 };
  view.setSnapshot(snapshot);
  view.render(1);
  const canvas = renderer.domElement;

  for (let cycle = 0; cycle < 2; cycle += 1) {
    const lost = new Event('webglcontextlost', { cancelable: true });
    canvas.dispatchEvent(lost);
    canvas.dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
    expect(lost.defaultPrevented).toBe(true);
    view.render(2 + cycle);
    canvas.dispatchEvent(new Event('webglcontextrestored'));
    canvas.dispatchEvent(new Event('webglcontextrestored'));
    view.render(3 + cycle);
  }

  expect(onContextLost).toHaveBeenCalledTimes(2);
  expect(onContextRestored).toHaveBeenCalledTimes(2);
  expect(container.querySelectorAll('canvas')).toHaveLength(1);
  expect(fxDisposals[0]).toHaveBeenCalledOnce();
  expect(fxDisposals[1]).toHaveBeenCalledOnce();
  const latestScene = (renderer.render as ReturnType<typeof vi.fn>).mock.calls.at(-1)![0] as THREE.Scene;
  const field = latestScene.getObjectByName('entity-field')!;
  const entity = snapshot.entities[0];
  expect(field.getObjectByName(entity.id)?.position.z).toBe(-(entity.distance - snapshot.distance));
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

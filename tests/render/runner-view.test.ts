import * as THREE from 'three';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
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

function rendererFixture(countVisibleDraws = false): MutableRenderer {
  const info = { render: { calls: 0 }, memory: { geometries: 0, textures: 0 } };
  const render = vi.fn((scene: THREE.Scene, camera: THREE.Camera) => {
    if (!countVisibleDraws) return;
    scene.updateMatrixWorld(true);
    camera.updateMatrixWorld(true);
    const projection = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    const frustum = new THREE.Frustum().setFromProjectionMatrix(projection);
    let calls = 0;
    scene.traverseVisible((object) => {
      if (!(object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line)) return;
      if (!object.frustumCulled || frustum.intersectsObject(object)) calls += 1;
    });
    info.render.calls = calls;
  });
  return {
    domElement: document.createElement('canvas'),
    setPixelRatio: vi.fn(),
    setSize: vi.fn(),
    render,
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
  for (const name of ['neon-ship-anchor', 'neon-tunnel', 'entity-field', 'speed-streaks']) {
    expect(scene.getObjectByName(name)).toBeTruthy();
  }
  expect(scene.fog).toBeInstanceOf(THREE.Fog);
  view.dispose();
});

it.each([
  [1536, 1024, 'desktop' as const, 60],
  [412, 915, 'mobile' as const, 45],
])('keeps every lane low in frame and under the draw budget at %sx%s', (width, height, quality, budget) => {
  const renderer = rendererFixture(true);
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
    expect(view.getDiagnostics().drawCalls).toBeLessThanOrEqual(budget);
  }
  view.dispose();
});

it('caps DPR by responsive quality and resizes the camera and post FX', () => {
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
    expect(desktopRenderer.setPixelRatio).toHaveBeenLastCalledWith(2);
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

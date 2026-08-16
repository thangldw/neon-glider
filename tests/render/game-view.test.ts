import * as THREE from 'three';
import { expect, it, vi } from 'vitest';
import { createGameView, type RendererLike } from '../../src/render/game-view';

function rendererFixture(): RendererLike {
  return {
    domElement: document.createElement('canvas'),
    setPixelRatio: vi.fn(),
    setSize: vi.fn(),
    render: vi.fn(),
    setAnimationLoop: vi.fn(),
    dispose: vi.fn(),
    forceContextLoss: vi.fn(),
  };
}

function containerFixture(): HTMLDivElement {
  const container = document.createElement('div');
  Object.defineProperties(container, {
    clientWidth: { value: 360 },
    clientHeight: { value: 240 },
  });
  return container;
}

it('renders only while active and releases its canvas resources on disposal', () => {
  const renderer = rendererFixture();
  const view = createGameView(containerFixture(), { createRenderer: () => renderer });
  view.setLane(2);
  view.render(1);
  view.setPaused(true);
  view.render(2);
  view.dispose();
  view.dispose();

  expect(renderer.render).toHaveBeenCalledOnce();
  expect(renderer.setPixelRatio).toHaveBeenCalledWith(expect.any(Number));
  expect(renderer.setAnimationLoop).toHaveBeenCalledWith(null);
  expect(renderer.dispose).toHaveBeenCalledOnce();
  expect(renderer.forceContextLoss).toHaveBeenCalledOnce();
});

it('disposes the prior term textures before replacing gate labels', () => {
  const textures: THREE.Texture[] = [];
  const view = createGameView(containerFixture(), {
    createRenderer: rendererFixture,
    createGlyphTexture: () => {
      const texture = new THREE.Texture();
      texture.dispose = vi.fn();
      textures.push(texture);
      return texture;
    },
  });

  view.setGateTerms(['爱', '人', '书']);
  view.setGateTerms(['好', '水', '山']);
  for (const texture of textures.slice(0, 3)) expect(texture.dispose).toHaveBeenCalledOnce();
  view.dispose();
});

it('keeps live gate textures intact when replacement texture creation fails', () => {
  const textures: THREE.Texture[] = [];
  let calls = 0;
  const view = createGameView(containerFixture(), {
    createRenderer: rendererFixture,
    createGlyphTexture: () => {
      calls += 1;
      if (calls === 5) throw new Error('texture factory failed');
      const texture = new THREE.Texture();
      texture.dispose = vi.fn();
      textures.push(texture);
      return texture;
    },
  });
  view.setGateTerms(['爱', '人', '书']);

  expect(() => view.setGateTerms(['好', '水', '山'])).toThrow('texture factory failed');
  for (const texture of textures.slice(0, 3)) expect(texture.dispose).not.toHaveBeenCalled();
  expect(textures[3].dispose).toHaveBeenCalledOnce();
  view.dispose();
});

it('notifies the controller once, prevents default, rebuilds once, and resumes only an active view after context restore', () => {
  const renderer = rendererFixture();
  const lost = vi.fn();
  const restored = vi.fn();
  const textures: THREE.Texture[] = [];
  const view = createGameView(containerFixture(), {
    createRenderer: () => renderer,
    onContextLost: lost,
    onContextRestored: restored,
    createGlyphTexture: () => {
      const texture = new THREE.Texture();
      textures.push(texture);
      return texture;
    },
  });
  view.setGateTerms(['爱', '人', '书']);
  view.render(0);
  const event = new Event('webglcontextlost', { cancelable: true });
  renderer.domElement.dispatchEvent(event);
  view.render(1);
  renderer.domElement.dispatchEvent(new Event('webglcontextrestored'));
  renderer.domElement.dispatchEvent(new Event('webglcontextrestored'));
  view.render(2);

  expect(event.defaultPrevented).toBe(true);
  expect(lost).toHaveBeenCalledOnce();
  expect(restored).toHaveBeenCalledWith(true);
  expect(restored).toHaveBeenCalledOnce();
  expect(textures).toHaveLength(6);
  expect(renderer.render).toHaveBeenCalledTimes(2);
  view.dispose();
});

it('preserves an already paused state through context restoration', () => {
  const renderer = rendererFixture();
  const restored = vi.fn();
  const view = createGameView(containerFixture(), { createRenderer: () => renderer, onContextRestored: restored });
  view.setPaused(true);
  renderer.domElement.dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
  renderer.domElement.dispatchEvent(new Event('webglcontextrestored'));
  view.render(1);

  expect(restored).toHaveBeenCalledWith(false);
  expect(renderer.render).not.toHaveBeenCalled();
  view.dispose();
});

it('caps DPR, reacts to ResizeObserver, and removes reduced-motion bobbing', () => {
  const originalDpr = Object.getOwnPropertyDescriptor(window, 'devicePixelRatio');
  Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 3 });
  try {
    const renderer = rendererFixture();
    let resize: ResizeObserverCallback | undefined;
    const observer = { observe: vi.fn(), disconnect: vi.fn() };
    const container = containerFixture();
    const view = createGameView(container, {
      createRenderer: () => renderer,
      reducedMotion: true,
      createResizeObserver: (callback) => {
        resize = callback;
        return observer;
      },
    });
    view.render(1);
    const scene = (renderer.render as ReturnType<typeof vi.fn>).mock.calls[0][0] as THREE.Scene;
    expect(scene.getObjectByName('glider')!.position.y).toBe(0);
    expect(renderer.setPixelRatio).toHaveBeenCalledWith(2);
    expect(observer.observe).toHaveBeenCalledWith(container);
    resize?.([], {} as ResizeObserver);
    expect(renderer.setSize).toHaveBeenCalledTimes(2);
    view.dispose();
    expect(observer.disconnect).toHaveBeenCalledOnce();
  } finally {
    if (originalDpr) Object.defineProperty(window, 'devicePixelRatio', originalDpr);
    else Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 1 });
  }
});

it('uses the window resize fallback when ResizeObserver is unavailable', () => {
  let width = 360;
  const container = document.createElement('div');
  Object.defineProperties(container, {
    clientWidth: { get: () => width },
    clientHeight: { get: () => 240 },
  });
  const renderer = rendererFixture();
  const view = createGameView(container, { createRenderer: () => renderer, createResizeObserver: () => undefined });
  width = 480;
  window.dispatchEvent(new Event('resize'));
  expect(renderer.setSize).toHaveBeenLastCalledWith(480, 240);
  view.dispose();
});

function latestGateZ(renderer: RendererLike): number {
  const calls = (renderer.render as ReturnType<typeof vi.fn>).mock.calls;
  const scene = calls.at(-1)![0] as THREE.Scene;
  return scene.getObjectByName('gate-1')!.position.z;
}

function latestCoursePose(renderer: RendererLike): number[] {
  const calls = (renderer.render as ReturnType<typeof vi.fn>).mock.calls;
  const scene = calls.at(-1)![0] as THREE.Scene;
  const obstacleZ = scene.children
    .flatMap((node) => node.children)
    .filter((node) => {
      const material = (node as THREE.Mesh).material;
      return material instanceof THREE.MeshBasicMaterial && material.wireframe;
    })
    .map((node) => node.position.z);
  return [scene.getObjectByName('gate-1')!.position.z, obstacleZ[0], obstacleZ[3]];
}

it('anchors a reset before the first external frame at visual time zero', () => {
  const renderer = rendererFixture();
  const view = createGameView(containerFixture(), { createRenderer: () => renderer });
  view.resetGatePhase();
  view.render(30);

  expect(latestGateZ(renderer)).toBe(-22);
  view.dispose();
});

it('preserves the configured gate reading distance after WebGL context restoration', () => {
  const renderer = rendererFixture();
  const view = createGameView(containerFixture(), { createRenderer: () => renderer });
  view.setQuestionDuration(5.4);
  view.resetGatePhase();
  view.render(0);
  expect(latestGateZ(renderer)).toBe(-25);

  renderer.domElement.dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
  renderer.domElement.dispatchEvent(new Event('webglcontextrestored'));
  view.render(10);
  expect(latestGateZ(renderer)).toBe(-25);
  view.dispose();
});

it('freezes local visual time across pauses, invalid frames, and context restore before accepting a new frame delta', () => {
  const renderer = rendererFixture();
  const view = createGameView(containerFixture(), { createRenderer: () => renderer });
  view.render(10);
  view.render(10.1);
  const beforePause = latestGateZ(renderer);
  view.render(20);
  expect(latestGateZ(renderer)).toBe(beforePause);
  view.setPaused(true);
  view.render(100);
  view.setPaused(false);
  view.render(100);
  expect(latestGateZ(renderer)).toBe(beforePause);
  view.render(Number.NaN);
  view.render(99);
  expect(latestGateZ(renderer)).toBe(beforePause);

  renderer.domElement.dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
  view.render(1_000);
  renderer.domElement.dispatchEvent(new Event('webglcontextrestored'));
  view.render(1_000);
  expect(latestGateZ(renderer)).toBe(beforePause);
  view.render(1_000.1);
  expect(latestGateZ(renderer)).toBeGreaterThan(beforePause);
  view.dispose();
});

it('replays a positive-time gate reset exactly across context restoration', () => {
  const renderer = rendererFixture();
  const view = createGameView(containerFixture(), { createRenderer: () => renderer });
  view.render(10);
  view.render(10.2);
  view.resetGatePhase();
  view.render(10.3);
  const beforeLoss = latestCoursePose(renderer);

  renderer.domElement.dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
  renderer.domElement.dispatchEvent(new Event('webglcontextrestored'));
  view.render(100);

  expect(latestCoursePose(renderer)).toEqual(beforeLoss);
  view.dispose();
});

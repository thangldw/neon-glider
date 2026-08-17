import * as THREE from 'three';
import { expect, it, vi } from 'vitest';
import {
  createPostFx,
  type ComposerLike,
  type RendererLike,
} from '../../src/render/neon/post-fx';

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

function composerFixture() {
  const passes: unknown[] = [];
  const composer: ComposerLike = {
    addPass: (pass) => passes.push(pass),
    render: vi.fn(),
    setSize: vi.fn(),
    dispose: vi.fn(),
  };
  return { composer, passes };
}

it('uses bloom when composer creation succeeds and direct rendering when it fails', () => {
  const renderer = rendererFixture();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  const composedFixture = composerFixture();
  const composed = createPostFx(renderer, scene, camera, {
    enabled: true,
    width: 800,
    height: 600,
    createComposer: () => composedFixture.composer,
  });
  composed.render();
  expect(composedFixture.composer.render).toHaveBeenCalledOnce();
  expect(renderer.render).not.toHaveBeenCalled();
  expect(composedFixture.passes.map((pass) => (pass as { constructor: { name: string } }).constructor.name))
    .toEqual(['RenderPass', 'UnrealBloomPass', 'OutputPass']);
  composed.dispose();

  const fallback = createPostFx(renderer, scene, camera, {
    enabled: true,
    width: 800,
    height: 600,
    createComposer: () => { throw new Error('unsupported'); },
  });
  fallback.render();
  expect(renderer.render).toHaveBeenCalledWith(scene, camera);
});

it('falls back permanently when a composed frame fails', () => {
  const renderer = rendererFixture();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  const fixture = composerFixture();
  (fixture.composer.render as ReturnType<typeof vi.fn>).mockImplementationOnce(() => {
    throw new Error('context capability changed');
  });
  const fx = createPostFx(renderer, scene, camera, {
    enabled: true,
    width: 640,
    height: 360,
    createComposer: () => fixture.composer,
  });

  fx.render();
  fx.render();

  expect(fixture.composer.render).toHaveBeenCalledOnce();
  expect(fixture.composer.dispose).toHaveBeenCalledOnce();
  expect(renderer.render).toHaveBeenCalledTimes(2);
  fx.dispose();
});

it('uses reduced internal bloom resolution on mobile and disposes once', () => {
  const renderer = rendererFixture();
  const fixture = composerFixture();
  const fx = createPostFx(renderer, new THREE.Scene(), new THREE.PerspectiveCamera(), {
    enabled: true,
    quality: 'mobile',
    width: 412,
    height: 915,
    createComposer: () => fixture.composer,
  });

  expect(fixture.composer.setSize).toHaveBeenLastCalledWith(268, 595);
  const bloom = fixture.passes[1] as { strength: number; radius: number; threshold: number };
  expect(bloom).toMatchObject({ strength: 0.9, radius: 0.45, threshold: 0.18 });
  fx.setSize(400, 800);
  expect(fixture.composer.setSize).toHaveBeenLastCalledWith(260, 520);
  fx.dispose();
  fx.dispose();
  expect(fixture.composer.dispose).toHaveBeenCalledOnce();
});

it('renders directly when bloom is disabled', () => {
  const renderer = rendererFixture();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  const createComposer = vi.fn();
  const fx = createPostFx(renderer, scene, camera, {
    enabled: false,
    width: 800,
    height: 600,
    createComposer,
  });

  fx.render();

  expect(createComposer).not.toHaveBeenCalled();
  expect(renderer.render).toHaveBeenCalledWith(scene, camera);
});

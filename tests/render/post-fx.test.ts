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

it('uses the approved lower-resolution mobile Unreal bloom and disposes once', () => {
  const renderer = rendererFixture();
  const fixture = composerFixture();
  const fx = createPostFx(renderer, new THREE.Scene(), new THREE.PerspectiveCamera(), {
    enabled: true,
    quality: 'mobile',
    width: 412,
    height: 915,
    createComposer: () => fixture.composer,
  });

  expect(fixture.composer.setSize).toHaveBeenLastCalledWith(309, 686);
  const glow = fixture.passes[1] as import('three/examples/jsm/postprocessing/UnrealBloomPass.js').UnrealBloomPass;
  expect(glow.strength).toBe(0.32);
  expect(glow.radius).toBe(0.28);
  expect(glow.threshold).toBe(0.62);
  expect(glow.renderTargetBright).toMatchObject({ width: 101, height: 223 });
  fx.setSize(400, 800);
  expect(fixture.composer.setSize).toHaveBeenLastCalledWith(300, 600);
  expect(glow.renderTargetBright).toMatchObject({ width: 98, height: 195 });
  fx.dispose();
  fx.dispose();
  expect(fixture.composer.dispose).toHaveBeenCalledOnce();
});

it('uses the approved desktop Unreal bloom with scaled bloom buffers', () => {
  const fixture = composerFixture();
  let target: THREE.WebGLRenderTarget | undefined;
  const fx = createPostFx(rendererFixture(), new THREE.Scene(), new THREE.PerspectiveCamera(), {
    enabled: true,
    quality: 'desktop',
    width: 1_536,
    height: 1_024,
    createComposer: (_renderer, renderTarget) => {
      target = renderTarget;
      return fixture.composer;
    },
  });

  expect(fixture.composer.setSize).toHaveBeenLastCalledWith(538, 358);
  expect(target?.texture.type).toBe(THREE.UnsignedByteType);
  const glow = fixture.passes[1] as import('three/examples/jsm/postprocessing/UnrealBloomPass.js').UnrealBloomPass;
  expect(glow.strength).toBe(0.44);
  expect(glow.radius).toBe(0.34);
  expect(glow.threshold).toBe(0.58);
  expect(glow.renderTargetBright).toMatchObject({ width: 215, height: 143 });
  fx.dispose();
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

it('preserves actual draw submissions across the complete post-processing frame', () => {
  const renderer = rendererFixture() as RendererLike & {
    info: {
      autoReset: boolean;
      reset: ReturnType<typeof vi.fn>;
      render: { calls: number };
      memory: { geometries: number; textures: number };
    };
  };
  renderer.info = {
    autoReset: true,
    reset: vi.fn(() => { renderer.info.render.calls = 0; }),
    render: { calls: 0 },
    memory: { geometries: 0, textures: 0 },
  };
  const fixture = composerFixture();
  (fixture.composer.render as ReturnType<typeof vi.fn>).mockImplementation(() => {
    renderer.info.render.calls = 31;
  });
  const fx = createPostFx(renderer, new THREE.Scene(), new THREE.PerspectiveCamera(), {
    enabled: true,
    width: 800,
    height: 600,
    createComposer: () => fixture.composer,
  });

  fx.render();

  expect(renderer.info.autoReset).toBe(false);
  expect(renderer.info.reset).toHaveBeenCalledOnce();
  expect(renderer.info.render.calls).toBe(31);
  fx.dispose();
});

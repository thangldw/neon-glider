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
  const renderer = rendererFixture() as RendererLike & {
    autoClear: boolean;
    setRenderTarget: ReturnType<typeof vi.fn>;
  };
  renderer.autoClear = true;
  renderer.setRenderTarget = vi.fn();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  const renderedLayerMasks: number[] = [];
  (renderer.render as ReturnType<typeof vi.fn>).mockImplementation((renderedScene, renderedCamera) => {
    if (renderedScene === scene && renderedCamera === camera) renderedLayerMasks.push(camera.layers.mask);
  });
  const fixture = composerFixture();
  (fixture.composer.render as ReturnType<typeof vi.fn>).mockImplementationOnce(() => {
    throw new Error('context capability changed');
  });
  const fx = createPostFx(renderer, scene, camera, {
    enabled: true,
    quality: 'desktop',
    bloomLayer: 1,
    detailLayer: 2,
    width: 640,
    height: 360,
    createComposer: () => fixture.composer,
  });

  fx.render();
  fx.render();

  expect(fixture.composer.render).toHaveBeenCalledOnce();
  expect(fixture.composer.dispose).toHaveBeenCalledOnce();
  expect(renderer.render).toHaveBeenCalledTimes(2);
  expect(renderedLayerMasks).toEqual([-1, -1]);
  expect(camera.layers.mask).toBe(1);
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

  expect(fixture.composer.setSize).toHaveBeenLastCalledWith(307, 205);
  expect(target?.texture.type).toBe(THREE.UnsignedByteType);
  const glow = fixture.passes[1] as import('three/examples/jsm/postprocessing/UnrealBloomPass.js').UnrealBloomPass;
  expect(glow.strength).toBe(0.44);
  expect(glow.radius).toBe(0.34);
  expect(glow.threshold).toBe(0.58);
  expect(glow.renderTargetBright).toMatchObject({ width: 123, height: 82 });
  fx.dispose();
});

it('reconstructs the bounded desktop base through a single-sample viewport pass', () => {
  const renderer = rendererFixture() as RendererLike & {
    autoClear: boolean;
    setRenderTarget: ReturnType<typeof vi.fn>;
  };
  renderer.autoClear = true;
  renderer.setRenderTarget = vi.fn();
  const fixture = composerFixture();
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x123456);
  const originalDetailMaterial = new THREE.MeshStandardMaterial({
    color: 0x244466,
    emissive: 0x00cfff,
    emissiveIntensity: 1.3,
  });
  const detailMesh = new THREE.Mesh(new THREE.BoxGeometry(), originalDetailMaterial);
  detailMesh.layers.set(2);
  scene.add(detailMesh);
  const camera = new THREE.PerspectiveCamera();
  const scenePasses: Array<{ layerMask: number; background: THREE.Scene['background']; autoClear: boolean }> = [];
  let renderedDetailMaterial: THREE.Material | undefined;
  (renderer.render as ReturnType<typeof vi.fn>).mockImplementation((renderedScene, renderedCamera) => {
    if (renderedScene === scene && renderedCamera === camera) {
      scenePasses.push({ layerMask: camera.layers.mask, background: scene.background, autoClear: renderer.autoClear });
      if (camera.layers.mask === 4) renderedDetailMaterial = detailMesh.material;
    }
  });
  const fx = createPostFx(renderer, scene, camera, {
    enabled: true,
    quality: 'desktop',
    bloomLayer: 1,
    detailLayer: 2,
    width: 1_536,
    height: 1_024,
    createComposer: () => fixture.composer,
  });

  fx.render();
  fx.render();
  fx.render();

  const glow = fixture.passes[1] as import('three/examples/jsm/postprocessing/UnrealBloomPass.js').UnrealBloomPass;
  const baseTarget = renderer.setRenderTarget.mock.calls.find(([target]) => target !== null)?.[0] as
    | THREE.WebGLRenderTarget
    | undefined;
  const reconstructionCall = (renderer.render as ReturnType<typeof vi.fn>).mock.calls.find(([object]) => (
    object instanceof THREE.Mesh && object.material instanceof THREE.ShaderMaterial
  ));
  const reconstruction = reconstructionCall?.[0] as THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | undefined;
  expect(baseTarget).toMatchObject({ width: 768, height: 512, samples: 0 });
  expect(reconstruction).toBeTruthy();
  expect(reconstruction?.material.fragmentShader.match(/texture2D\(inputTexture/g)).toHaveLength(1);
  expect(reconstruction?.material.uniforms.bloomTexture.value).toBe(glow.renderTargetsHorizontal[0].texture);
  expect(reconstruction?.material.uniforms.inputTexel.value).toMatchObject({ x: 1 / 768, y: 1 / 512 });
  const separateBloomOverlays = (renderer.render as ReturnType<typeof vi.fn>).mock.calls.filter(([object]) => (
    object instanceof THREE.Mesh
      && object.geometry instanceof THREE.PlaneGeometry
      && object.material instanceof THREE.MeshBasicMaterial
  ));
  expect(separateBloomOverlays).toHaveLength(0);
  expect(fixture.composer.render).toHaveBeenCalledTimes(2);
  expect(scenePasses).toEqual([
    { layerMask: 1, background: scene.background, autoClear: true },
    { layerMask: 4, background: null, autoClear: false },
    { layerMask: 1, background: scene.background, autoClear: true },
    { layerMask: 4, background: null, autoClear: false },
    { layerMask: 1, background: scene.background, autoClear: true },
    { layerMask: 4, background: null, autoClear: false },
  ]);
  expect(camera.layers.mask).toBe(1);
  expect(scene.background).toBeInstanceOf(THREE.Color);
  expect(renderer.autoClear).toBe(true);
  expect(renderedDetailMaterial).toBeInstanceOf(THREE.MeshBasicMaterial);
  expect(renderedDetailMaterial).not.toBe(originalDetailMaterial);
  expect(detailMesh.material).toBe(originalDetailMaterial);
  const detailProxyDispose = vi.spyOn(renderedDetailMaterial!, 'dispose');
  fx.dispose();
  expect(detailProxyDispose).toHaveBeenCalledOnce();
  detailMesh.geometry.dispose();
  originalDetailMaterial.dispose();
});

it('syncs live source material state into reusable desktop detail proxies', () => {
  const renderer = rendererFixture() as RendererLike & {
    autoClear: boolean;
    setRenderTarget: ReturnType<typeof vi.fn>;
  };
  renderer.autoClear = true;
  renderer.setRenderTarget = vi.fn();
  const fixture = composerFixture();
  const scene = new THREE.Scene();
  const shipMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffffff, emissiveIntensity: 1 });
  const shockwaveMaterial = new THREE.MeshBasicMaterial({ color: 0xff4a24, transparent: true, opacity: 0 });
  const ship = new THREE.Mesh(new THREE.BoxGeometry(), shipMaterial);
  const shockwave = new THREE.Mesh(new THREE.RingGeometry(0.4, 0.5, 8), shockwaveMaterial);
  ship.layers.set(2);
  shockwave.layers.set(2);
  scene.add(ship, shockwave);
  const camera = new THREE.PerspectiveCamera();
  const renderedDetails: Array<{
    ship: THREE.MeshBasicMaterial;
    shockwave: THREE.MeshBasicMaterial;
    shipColor: number;
    shockwaveColor: number;
    shockwaveOpacity: number;
  }> = [];
  (renderer.render as ReturnType<typeof vi.fn>).mockImplementation((_scene, renderedCamera) => {
    if (renderedCamera.layers.mask === 4) {
      const detailShip = ship.material as unknown as THREE.MeshBasicMaterial;
      const detailShockwave = shockwave.material as THREE.MeshBasicMaterial;
      renderedDetails.push({
        ship: detailShip,
        shockwave: detailShockwave,
        shipColor: detailShip.color.r,
        shockwaveColor: detailShockwave.color.getHex(),
        shockwaveOpacity: detailShockwave.opacity,
      });
    }
  });
  const fx = createPostFx(renderer, scene, camera, {
    enabled: true,
    quality: 'desktop',
    bloomLayer: 1,
    detailLayer: 2,
    width: 800,
    height: 600,
    createComposer: () => fixture.composer,
  });

  shipMaterial.emissiveIntensity = 2;
  shockwaveMaterial.color.setHex(0x112233);
  shockwaveMaterial.opacity = 0.73;
  fx.render();
  shipMaterial.emissiveIntensity = 3;
  shockwaveMaterial.opacity = 0.41;
  fx.render();

  expect(renderedDetails).toHaveLength(2);
  expect(renderedDetails[0].ship).toBe(renderedDetails[1].ship);
  expect(renderedDetails[0].shockwave).toBe(renderedDetails[1].shockwave);
  expect(renderedDetails[0].shipColor).toBeCloseTo(1.44, 6);
  expect(renderedDetails[1].shipColor).toBeCloseTo(2.16, 6);
  expect(renderedDetails[0].shockwaveColor).toBe(0x112233);
  expect(renderedDetails[0].shockwaveOpacity).toBeCloseTo(0.73, 6);
  expect(renderedDetails[1].shockwaveOpacity).toBeCloseTo(0.41, 6);
  fx.dispose();
  ship.geometry.dispose();
  shockwave.geometry.dispose();
  shipMaterial.dispose();
  shockwaveMaterial.dispose();
});

it('syncs each shared detail material proxy only once per frame', () => {
  const renderer = rendererFixture() as RendererLike & {
    autoClear: boolean;
    setRenderTarget: ReturnType<typeof vi.fn>;
  };
  renderer.autoClear = true;
  renderer.setRenderTarget = vi.fn();
  const fixture = composerFixture();
  const scene = new THREE.Scene();
  const sharedMaterial = new THREE.MeshStandardMaterial({ color: 0x123456, emissive: 0x00cfff });
  let opacity = sharedMaterial.opacity;
  let opacityReads = 0;
  Object.defineProperty(sharedMaterial, 'opacity', {
    configurable: true,
    get: () => {
      opacityReads += 1;
      return opacity;
    },
    set: (value: number) => { opacity = value; },
  });
  const first = new THREE.Mesh(new THREE.BoxGeometry(), sharedMaterial);
  const second = new THREE.Mesh(new THREE.BoxGeometry(), sharedMaterial);
  first.layers.set(2);
  second.layers.set(2);
  scene.add(first, second);
  const fx = createPostFx(renderer, scene, new THREE.PerspectiveCamera(), {
    enabled: true,
    quality: 'desktop',
    bloomLayer: 1,
    detailLayer: 2,
    width: 800,
    height: 600,
    createComposer: () => fixture.composer,
  });

  opacityReads = 0;
  fx.render();

  expect(opacityReads).toBe(1);
  fx.dispose();
  first.geometry.dispose();
  second.geometry.dispose();
  sharedMaterial.dispose();
});

it('refreshes cached desktop bloom after invalidation', () => {
  const renderer = rendererFixture() as RendererLike & {
    autoClear: boolean;
    setRenderTarget: ReturnType<typeof vi.fn>;
  };
  renderer.autoClear = true;
  renderer.setRenderTarget = vi.fn();
  const fixture = composerFixture();
  const fx = createPostFx(renderer, new THREE.Scene(), new THREE.PerspectiveCamera(), {
    enabled: true,
    quality: 'desktop',
    bloomLayer: 1,
    detailLayer: 2,
    width: 800,
    height: 600,
    createComposer: () => fixture.composer,
  });

  fx.render();
  fx.invalidateBloom?.();
  fx.render();

  expect(fixture.composer.render).toHaveBeenCalledTimes(2);
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

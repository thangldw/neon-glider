import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { FullScreenQuad, type Pass } from 'three/examples/jsm/postprocessing/Pass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export interface RendererLike {
  readonly domElement: HTMLCanvasElement;
  readonly info?: {
    autoReset?: boolean;
    reset?(): void;
    readonly render: { readonly calls: number };
    readonly memory: { readonly geometries: number; readonly textures: number };
  };
  setPixelRatio(value: number): void;
  setSize(width: number, height: number): void;
  render(scene: THREE.Scene, camera: THREE.Camera): void;
  setAnimationLoop(callback: null): void;
  dispose(): void;
  forceContextLoss?(): void;
}

export interface PostFx {
  render(): void;
  setSize(width: number, height: number): void;
  dispose(): void;
}

export interface ComposerLike {
  renderToScreen?: boolean;
  addPass(pass: Pass): void;
  render(): void;
  setSize(width: number, height: number): void;
  setPixelRatio?(pixelRatio: number): void;
  dispose(): void;
}

export interface PostFxOptions {
  enabled: boolean;
  width: number;
  height: number;
  quality?: 'desktop' | 'mobile';
  bloomLayer?: number;
  createComposer?: (renderer: RendererLike, renderTarget: THREE.WebGLRenderTarget) => ComposerLike;
}

const DESKTOP_BLOOM_RESOLUTION_SCALE = 0.8;
const MOBILE_BLOOM_RESOLUTION_SCALE = 0.65;
const DESKTOP_COMPOSER_RESOLUTION_SCALE = 0.25;
const MOBILE_COMPOSER_RESOLUTION_SCALE = 0.75;
const DESKTOP_BASE_RESOLUTION_SCALE = 0.34;

function defaultComposer(renderer: RendererLike, renderTarget: THREE.WebGLRenderTarget): ComposerLike {
  return new EffectComposer(renderer as THREE.WebGLRenderer, renderTarget);
}

export function createPostFx(
  renderer: RendererLike,
  scene: THREE.Scene,
  camera: THREE.Camera,
  options: PostFxOptions,
): PostFx {
  const bloomScale = options.quality === 'mobile' ? MOBILE_BLOOM_RESOLUTION_SCALE : DESKTOP_BLOOM_RESOLUTION_SCALE;
  const composerScale = options.quality === 'mobile' ? MOBILE_COMPOSER_RESOLUTION_SCALE : DESKTOP_COMPOSER_RESOLUTION_SCALE;
  const composerFactory = options.createComposer ?? defaultComposer;
  const passes: Pass[] = [];
  let composer: ComposerLike | null = null;
  let bloomPass: UnrealBloomPass | null = null;
  let bloomOverlay: FullScreenQuad | null = null;
  let bloomOverlayMaterial: THREE.MeshBasicMaterial | null = null;
  let baseTarget: THREE.WebGLRenderTarget | null = null;
  let baseQuad: FullScreenQuad | null = null;
  let baseMaterial: THREE.MeshBasicMaterial | null = null;
  let hybridComposition = false;
  let disposed = false;

  if (renderer.info) renderer.info.autoReset = false;

  function directRender(): void {
    renderer.render(scene, camera);
  }

  function scaledSize(width: number, height: number, scale: number): [number, number] {
    return [Math.max(1, Math.round(width * scale)), Math.max(1, Math.round(height * scale))];
  }

  function disposeComposition(): void {
    const current = composer;
    if (!current) return;
    composer = null;
    bloomPass = null;
    bloomOverlay?.dispose();
    bloomOverlay = null;
    bloomOverlayMaterial?.dispose();
    bloomOverlayMaterial = null;
    baseQuad?.dispose();
    baseQuad = null;
    baseMaterial?.dispose();
    baseMaterial = null;
    baseTarget?.dispose();
    baseTarget = null;
    hybridComposition = false;
    for (const pass of passes.splice(0)) pass.dispose();
    current.dispose();
  }

  if (options.enabled) {
    const [composerWidth, composerHeight] = scaledSize(options.width, options.height, composerScale);
    const renderTarget = new THREE.WebGLRenderTarget(composerWidth, composerHeight, { type: THREE.UnsignedByteType });
    try {
      composer = composerFactory(renderer, renderTarget);
      composer.setPixelRatio?.(1);
      const renderPass = new RenderPass(scene, camera);
      const [bloomWidth, bloomHeight] = scaledSize(composerWidth, composerHeight, bloomScale);
      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(bloomWidth, bloomHeight),
        options.quality === 'mobile' ? 0.32 : 0.44,
        options.quality === 'mobile' ? 0.28 : 0.34,
        options.quality === 'mobile' ? 0.62 : 0.58,
      );
      const outputPass = new OutputPass();
      passes.push(renderPass, bloomPass, outputPass);
      for (const pass of passes) composer.addPass(pass);
      composer.setSize(composerWidth, composerHeight);
      bloomPass.setSize(bloomWidth, bloomHeight);
      hybridComposition = options.bloomLayer !== undefined
        && typeof (renderer as THREE.WebGLRenderer).setRenderTarget === 'function';
      if (hybridComposition) {
        composer.renderToScreen = false;
        bloomOverlayMaterial = new THREE.MeshBasicMaterial({
          map: bloomPass.renderTargetsHorizontal[0].texture,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthTest: false,
          depthWrite: false,
          toneMapped: false,
        });
        bloomOverlay = new FullScreenQuad(bloomOverlayMaterial);
        if (options.quality === 'desktop') {
          const [baseWidth, baseHeight] = scaledSize(options.width, options.height, DESKTOP_BASE_RESOLUTION_SCALE);
          baseTarget = new THREE.WebGLRenderTarget(baseWidth, baseHeight, { type: THREE.UnsignedByteType });
          baseMaterial = new THREE.MeshBasicMaterial({ map: baseTarget.texture, depthTest: false, depthWrite: false });
          baseQuad = new FullScreenQuad(baseMaterial);
        }
      }
    } catch {
      renderTarget.dispose();
      disposeComposition();
    }
  }

  return {
    render() {
      if (disposed) return;
      renderer.info?.reset?.();
      if (!composer) {
        directRender();
        return;
      }
      try {
        if (!hybridComposition || options.bloomLayer === undefined || !bloomOverlay) {
          composer.render();
          return;
        }
        const originalLayerMask = camera.layers.mask;
        camera.layers.set(options.bloomLayer);
        try {
          composer.render();
        } finally {
          camera.layers.mask = originalLayerMask;
        }
        const webglRenderer = renderer as THREE.WebGLRenderer;
        if (baseTarget && baseQuad) {
          webglRenderer.setRenderTarget(baseTarget);
          directRender();
          webglRenderer.setRenderTarget(null);
          baseQuad.render(webglRenderer);
        } else {
          directRender();
        }
        const originalAutoClear = webglRenderer.autoClear;
        webglRenderer.autoClear = false;
        webglRenderer.setRenderTarget(null);
        bloomOverlay.render(webglRenderer);
        webglRenderer.autoClear = originalAutoClear;
      } catch {
        disposeComposition();
        directRender();
      }
    },
    setSize(width, height) {
      if (disposed || !composer) return;
      try {
        const [composerWidth, composerHeight] = scaledSize(width, height, composerScale);
        composer.setSize(composerWidth, composerHeight);
      const [bloomWidth, bloomHeight] = scaledSize(composerWidth, composerHeight, bloomScale);
      bloomPass?.setSize(bloomWidth, bloomHeight);
      if (baseTarget) {
        const [baseWidth, baseHeight] = scaledSize(width, height, DESKTOP_BASE_RESOLUTION_SCALE);
        baseTarget.setSize(baseWidth, baseHeight);
      }
      } catch {
        disposeComposition();
      }
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      disposeComposition();
    },
  };
}

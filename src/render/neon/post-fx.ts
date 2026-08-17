import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import type { Pass } from 'three/examples/jsm/postprocessing/Pass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export interface RendererLike {
  readonly domElement: HTMLCanvasElement;
  readonly info?: {
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
  addPass(pass: Pass): void;
  render(): void;
  setSize(width: number, height: number): void;
  dispose(): void;
}

export interface PostFxOptions {
  enabled: boolean;
  width: number;
  height: number;
  quality?: 'desktop' | 'mobile';
  createComposer?: (renderer: RendererLike, renderTarget: THREE.WebGLRenderTarget) => ComposerLike;
}

const MOBILE_RESOLUTION_SCALE = 0.65;

function defaultComposer(renderer: RendererLike, renderTarget: THREE.WebGLRenderTarget): ComposerLike {
  return new EffectComposer(renderer as THREE.WebGLRenderer, renderTarget);
}

export function createPostFx(
  renderer: RendererLike,
  scene: THREE.Scene,
  camera: THREE.Camera,
  options: PostFxOptions,
): PostFx {
  const scale = options.quality === 'mobile' ? MOBILE_RESOLUTION_SCALE : 1;
  const composerFactory = options.createComposer ?? defaultComposer;
  const passes: Pass[] = [];
  let composer: ComposerLike | null = null;
  let disposed = false;

  function directRender(): void {
    renderer.render(scene, camera);
  }

  function scaledSize(width: number, height: number): [number, number] {
    return [Math.max(1, Math.round(width * scale)), Math.max(1, Math.round(height * scale))];
  }

  function disposeComposition(): void {
    const current = composer;
    if (!current) return;
    composer = null;
    for (const pass of passes.splice(0)) pass.dispose();
    current.dispose();
  }

  if (options.enabled) {
    const [width, height] = scaledSize(options.width, options.height);
    const renderTarget = new THREE.WebGLRenderTarget(width, height, { type: THREE.HalfFloatType });
    try {
      composer = composerFactory(renderer, renderTarget);
      const renderPass = new RenderPass(scene, camera);
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        options.quality === 'mobile' ? 0.9 : 1.25,
        0.45,
        0.18,
      );
      const outputPass = new OutputPass();
      passes.push(renderPass, bloomPass, outputPass);
      for (const pass of passes) composer.addPass(pass);
      composer.setSize(width, height);
    } catch {
      renderTarget.dispose();
      disposeComposition();
    }
  }

  return {
    render() {
      if (disposed) return;
      if (!composer) {
        directRender();
        return;
      }
      try {
        composer.render();
      } catch {
        disposeComposition();
        directRender();
      }
    },
    setSize(width, height) {
      if (disposed || !composer) return;
      const [scaledWidth, scaledHeight] = scaledSize(width, height);
      try {
        composer.setSize(scaledWidth, scaledHeight);
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

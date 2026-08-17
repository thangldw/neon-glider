import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import type { Pass } from 'three/examples/jsm/postprocessing/Pass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

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

const DESKTOP_RESOLUTION_SCALE = 1;
const MOBILE_RESOLUTION_SCALE = 1;

const NEON_GLOW_SHADER = {
  name: 'NeonGlowShader',
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new THREE.Vector2(1, 1) },
    strength: { value: 0.34 },
    threshold: { value: 0.68 },
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform float strength;
    uniform float threshold;
    varying vec2 vUv;

    vec3 bright(vec3 color) {
      float peak = max(max(color.r, color.g), color.b);
      return color * smoothstep(threshold, 1.0, peak);
    }

    void main() {
      vec4 base = texture2D(tDiffuse, vUv);
      vec2 offset = 2.5 / resolution;
      vec3 halo = bright(texture2D(tDiffuse, vUv + vec2(offset.x, 0.0)).rgb)
        + bright(texture2D(tDiffuse, vUv - vec2(offset.x, 0.0)).rgb)
        + bright(texture2D(tDiffuse, vUv + vec2(0.0, offset.y)).rgb)
        + bright(texture2D(tDiffuse, vUv - vec2(0.0, offset.y)).rgb);
      gl_FragColor = vec4(base.rgb + halo * (strength / 4.0), base.a);
    }
  `,
};

function defaultComposer(renderer: RendererLike, renderTarget: THREE.WebGLRenderTarget): ComposerLike {
  return new EffectComposer(renderer as THREE.WebGLRenderer, renderTarget);
}

export function createPostFx(
  renderer: RendererLike,
  scene: THREE.Scene,
  camera: THREE.Camera,
  options: PostFxOptions,
): PostFx {
  const scale = options.quality === 'mobile' ? MOBILE_RESOLUTION_SCALE : DESKTOP_RESOLUTION_SCALE;
  const composerFactory = options.createComposer ?? defaultComposer;
  const passes: Pass[] = [];
  let composer: ComposerLike | null = null;
  let glowPass: ShaderPass | null = null;
  let disposed = false;

  if (renderer.info) renderer.info.autoReset = false;

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
    glowPass = null;
    for (const pass of passes.splice(0)) pass.dispose();
    current.dispose();
  }

  if (options.enabled) {
    const [width, height] = scaledSize(options.width, options.height);
    const renderTarget = new THREE.WebGLRenderTarget(width, height, { type: THREE.UnsignedByteType });
    try {
      composer = composerFactory(renderer, renderTarget);
      const renderPass = new RenderPass(scene, camera);
      glowPass = new ShaderPass(NEON_GLOW_SHADER);
      glowPass.uniforms.resolution.value.set(width, height);
      glowPass.uniforms.strength.value = options.quality === 'mobile' ? 0.28 : 0.34;
      glowPass.uniforms.threshold.value = options.quality === 'mobile' ? 0.7 : 0.68;
      const outputPass = new OutputPass();
      passes.push(renderPass, glowPass, outputPass);
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
      renderer.info?.reset?.();
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
        glowPass?.uniforms.resolution.value.set(scaledWidth, scaledHeight);
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

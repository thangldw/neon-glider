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
  detailLayer?: number;
  createComposer?: (renderer: RendererLike, renderTarget: THREE.WebGLRenderTarget) => ComposerLike;
}

const DESKTOP_BLOOM_RESOLUTION_SCALE = 0.8;
const MOBILE_BLOOM_RESOLUTION_SCALE = 0.65;
const DESKTOP_COMPOSER_RESOLUTION_SCALE = 0.2;
const MOBILE_COMPOSER_RESOLUTION_SCALE = 0.75;
const DESKTOP_BASE_RESOLUTION_SCALE = 0.5;

const RECONSTRUCTION_VERTEX_SHADER = /* glsl */`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const RECONSTRUCTION_FRAGMENT_SHADER = /* glsl */`
  uniform sampler2D inputTexture;
  uniform vec2 inputTexel;
  varying vec2 vUv;

  float neonLuma(vec3 color) {
    return dot(color, vec3(0.2126, 0.7152, 0.0722));
  }

  void main() {
    vec3 center = texture2D(inputTexture, vUv).rgb;
    float centerLuma = neonLuma(center);
    vec2 gradient = vec2(dFdx(centerLuma), dFdy(centerLuma));
    float edgeStrength = clamp(length(gradient) * 4.0, 0.0, 1.0);
    vec2 edgeDirection = length(gradient) > 0.0001
      ? normalize(vec2(-gradient.y, gradient.x))
      : vec2(1.0, 0.0);
    vec2 edgeOffset = edgeDirection * inputTexel * 0.82;
    vec3 edgeA = texture2D(inputTexture, vUv + edgeOffset).rgb;
    vec3 edgeB = texture2D(inputTexture, vUv - edgeOffset).rgb;
    vec3 reconstructed = mix(center, (edgeA + edgeB) * 0.5, edgeStrength * 0.34);

    vec3 neighborhoodMin = min(center, min(edgeA, edgeB));
    vec3 neighborhoodMax = max(center, max(edgeA, edgeB));
    gl_FragColor = vec4(clamp(reconstructed, neighborhoodMin, neighborhoodMax), 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

interface DetailMaterialBinding {
  readonly object: THREE.Mesh;
  readonly original: THREE.Material | THREE.Material[];
  readonly proxy: THREE.Material | THREE.Material[];
}

function createDetailMaterialProxy(source: THREE.Material): THREE.Material {
  if (source instanceof THREE.MeshBasicMaterial) return source.clone();
  const colored = source as THREE.Material & {
    color?: THREE.Color;
    emissive?: THREE.Color;
    emissiveIntensity?: number;
    map?: THREE.Texture | null;
    wireframe?: boolean;
    vertexColors?: boolean;
  };
  const color = colored.color?.clone() ?? new THREE.Color(0xffffff);
  color.multiplyScalar(0.72);
  if (colored.emissive) {
    color.add(colored.emissive.clone().multiplyScalar((colored.emissiveIntensity ?? 1) * 0.72));
  }
  const proxy = new THREE.MeshBasicMaterial({
    color,
    map: colored.map ?? null,
    wireframe: colored.wireframe ?? false,
    vertexColors: colored.vertexColors ?? false,
  });
  proxy.name = `${source.name || source.type}-detail-proxy`;
  proxy.transparent = source.transparent;
  proxy.opacity = source.opacity;
  proxy.alphaTest = source.alphaTest;
  proxy.blending = source.blending;
  proxy.side = source.side;
  proxy.depthTest = source.depthTest;
  proxy.depthWrite = source.depthWrite;
  proxy.colorWrite = source.colorWrite;
  proxy.polygonOffset = source.polygonOffset;
  proxy.polygonOffsetFactor = source.polygonOffsetFactor;
  proxy.polygonOffsetUnits = source.polygonOffsetUnits;
  proxy.premultipliedAlpha = source.premultipliedAlpha;
  proxy.toneMapped = source.toneMapped;
  return proxy;
}

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
  let baseMaterial: THREE.ShaderMaterial | null = null;
  let hybridComposition = false;
  let hybridFrame = 0;
  const detailMaterialProxies = new Map<THREE.Material, THREE.Material>();
  const detailMaterialBindings: DetailMaterialBinding[] = [];
  let disposed = false;

  if (renderer.info) renderer.info.autoReset = false;

  function directRender(): void {
    renderer.render(scene, camera);
  }

  function completeDirectRender(): void {
    if (options.detailLayer === undefined) {
      directRender();
      return;
    }
    const originalLayerMask = camera.layers.mask;
    camera.layers.enableAll();
    try {
      directRender();
    } finally {
      camera.layers.mask = originalLayerMask;
    }
  }

  function renderDetail(webglRenderer: THREE.WebGLRenderer): void {
    if (options.detailLayer === undefined) return;
    const originalLayerMask = camera.layers.mask;
    const originalBackground = scene.background;
    const originalAutoClear = webglRenderer.autoClear;
    camera.layers.set(options.detailLayer);
    scene.background = null;
    webglRenderer.autoClear = false;
    for (const binding of detailMaterialBindings) binding.object.material = binding.proxy;
    try {
      webglRenderer.setRenderTarget(null);
      directRender();
    } finally {
      for (const binding of detailMaterialBindings) binding.object.material = binding.original;
      camera.layers.mask = originalLayerMask;
      scene.background = originalBackground;
      webglRenderer.autoClear = originalAutoClear;
    }
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
    for (const proxy of detailMaterialProxies.values()) proxy.dispose();
    detailMaterialProxies.clear();
    detailMaterialBindings.length = 0;
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
          baseTarget.texture.minFilter = THREE.LinearFilter;
          baseTarget.texture.magFilter = THREE.LinearFilter;
          baseTarget.texture.generateMipmaps = false;
          baseMaterial = new THREE.ShaderMaterial({
            uniforms: {
              inputTexture: { value: baseTarget.texture },
              inputTexel: { value: new THREE.Vector2(1 / baseWidth, 1 / baseHeight) },
            },
            vertexShader: RECONSTRUCTION_VERTEX_SHADER,
            fragmentShader: RECONSTRUCTION_FRAGMENT_SHADER,
            depthTest: false,
            depthWrite: false,
          });
          baseQuad = new FullScreenQuad(baseMaterial);
        }
        if (options.detailLayer !== undefined) {
          scene.traverse((object) => {
            if (!(object instanceof THREE.Mesh) || !object.layers.isEnabled(options.detailLayer!)) return;
            const original = object.material;
            const sourceMaterials = Array.isArray(original) ? original : [original];
            const proxyMaterials = sourceMaterials.map((source) => {
              let proxy = detailMaterialProxies.get(source);
              if (!proxy) {
                proxy = createDetailMaterialProxy(source);
                detailMaterialProxies.set(source, proxy);
              }
              return proxy;
            });
            detailMaterialBindings.push({
              object,
              original,
              proxy: Array.isArray(original) ? proxyMaterials : proxyMaterials[0],
            });
          });
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
        completeDirectRender();
        return;
      }
      try {
        if (!hybridComposition || options.bloomLayer === undefined || !bloomOverlay) {
          composer.render();
          return;
        }
        const refreshBloom = options.quality !== 'desktop' || hybridFrame % 2 === 0;
        hybridFrame = (hybridFrame + 1) % 2;
        if (refreshBloom) {
          const originalLayerMask = camera.layers.mask;
          camera.layers.set(options.bloomLayer);
          try {
            composer.render();
          } finally {
            camera.layers.mask = originalLayerMask;
          }
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
        renderDetail(webglRenderer);
        const originalAutoClear = webglRenderer.autoClear;
        webglRenderer.autoClear = false;
        webglRenderer.setRenderTarget(null);
        bloomOverlay.render(webglRenderer);
        webglRenderer.autoClear = originalAutoClear;
      } catch {
        disposeComposition();
        completeDirectRender();
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
          (baseMaterial?.uniforms.inputTexel.value as THREE.Vector2 | undefined)?.set(1 / baseWidth, 1 / baseHeight);
        }
        hybridFrame = 0;
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

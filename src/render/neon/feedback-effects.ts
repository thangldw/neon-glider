import * as THREE from 'three';

export type RunnerFeedback =
  | { kind: 'collect'; count: number }
  | { kind: 'collision' };

export const COLLECTION_FEEDBACK_MS = 250;
export const COLLISION_FEEDBACK_MS = 320;
export const REDUCED_FEEDBACK_MS = 120;

const MAX_PARTICLES = 20;
const COLLECTION_PARTICLES = 12;
const COLLECTION_BASE_PARTICLES = 10;
const REDUCED_COLLECTION_PARTICLES = 6;
const REDUCED_COLLISION_PARTICLES = 8;
const TAU = Math.PI * 2;

export interface NeonFeedbackEffects {
  readonly root: THREE.Group;
  readonly maxParticles: 20;
  play(event: RunnerFeedback, reducedMotion: boolean): void;
  update(deltaSeconds: number, reducedMotion: boolean): void;
  getShipPulse(): number;
  applyCameraShake(camera: THREE.Camera, reducedMotion: boolean): void;
  reset(): void;
  dispose(): void;
}

export function feedbackDurationMs(event: RunnerFeedback, reducedMotion: boolean): number {
  if (reducedMotion) return REDUCED_FEEDBACK_MS;
  return event.kind === 'collision' ? COLLISION_FEEDBACK_MS : COLLECTION_FEEDBACK_MS;
}

export function createNeonFeedbackEffects(particleSizeScale = 1): NeonFeedbackEffects {
  const sizeScale = Number.isFinite(particleSizeScale)
    ? THREE.MathUtils.clamp(particleSizeScale, 0.5, 2.5)
    : 1;
  const positions = new Float32Array(MAX_PARTICLES * 3);
  const colors = new Float32Array(MAX_PARTICLES * 3);
  const radii = new Float32Array(MAX_PARTICLES);
  const angles = new Float32Array(MAX_PARTICLES);
  const heights = new Float32Array(MAX_PARTICLES);

  for (let index = 0; index < MAX_PARTICLES; index += 1) {
    const angle = (index / MAX_PARTICLES) * TAU;
    radii[index] = 2.4 + (index % 5) * 0.3;
    angles[index] = angle;
    heights[index] = ((index % 4) - 1.5) * 0.075;
  }

  const geometry = new THREE.BufferGeometry();
  const positionAttribute = new THREE.BufferAttribute(positions, 3);
  positionAttribute.setUsage(THREE.DynamicDrawUsage);
  const colorAttribute = new THREE.BufferAttribute(colors, 3);
  colorAttribute.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('position', positionAttribute);
  geometry.setAttribute('color', colorAttribute);
  geometry.setDrawRange(0, 0);

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.17 * sizeScale,
    vertexColors: true,
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const particles = new THREE.Points(geometry, particleMaterial);
  particles.name = 'feedback-particles';
  particles.frustumCulled = false;
  particles.visible = false;

  const shockwaveGeometry = new THREE.RingGeometry(1.1, 1.24, 32);
  const shockwaveMaterial = new THREE.MeshBasicMaterial({
    color: 0xff4a24,
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const shockwave = new THREE.Mesh(shockwaveGeometry, shockwaveMaterial);
  shockwave.name = 'feedback-shockwave';
  shockwave.position.z = 0.2;
  shockwave.visible = false;

  const root = new THREE.Group();
  root.name = 'neon-feedback-effects';
  root.add(particles, shockwave);

  let activeEvent: RunnerFeedback | null = null;
  let activeParticleCount = 0;
  let elapsedSeconds = 0;
  let durationMs = 0;
  let disposed = false;
  let shakenCamera: THREE.Camera | null = null;
  let previousShakeX = 0;
  let previousShakeY = 0;

  const clearPreviousShake = (camera: THREE.Camera): void => {
    if (shakenCamera !== camera) return;
    camera.position.x -= previousShakeX;
    camera.position.y -= previousShakeY;
    previousShakeX = 0;
    previousShakeY = 0;
  };

  const clearStoredShake = (): void => {
    if (shakenCamera === null) return;
    shakenCamera.position.x -= previousShakeX;
    shakenCamera.position.y -= previousShakeY;
    previousShakeX = 0;
    previousShakeY = 0;
    shakenCamera = null;
  };

  const hideRenderables = (): void => {
    particles.visible = false;
    shockwave.visible = false;
    geometry.setDrawRange(0, 0);
    particleMaterial.opacity = 0;
    shockwaveMaterial.opacity = 0;
  };

  hideRenderables();

  return {
    root,
    maxParticles: MAX_PARTICLES,
    play(event, reducedMotion) {
      if (disposed) return;
      clearStoredShake();
      activeEvent = event;
      elapsedSeconds = 0;
      durationMs = feedbackDurationMs(event, reducedMotion);
      if (event.kind === 'collision') {
        activeParticleCount = reducedMotion ? REDUCED_COLLISION_PARTICLES : MAX_PARTICLES;
      } else {
        const requested = Math.max(0, Number.isFinite(event.count) ? Math.floor(event.count) : 0);
        const cap = reducedMotion ? REDUCED_COLLECTION_PARTICLES : COLLECTION_PARTICLES;
        const base = reducedMotion ? REDUCED_COLLECTION_PARTICLES : COLLECTION_BASE_PARTICLES;
        activeParticleCount = requested === 0 ? 0 : Math.min(cap, base + (requested - 1) * 2);
      }

      const isCollision = event.kind === 'collision';
      for (let index = 0; index < MAX_PARTICLES; index += 1) {
        const offset = index * 3;
        const angle = activeParticleCount > 0 && index < activeParticleCount
          ? (index / activeParticleCount) * TAU
          : angles[index];
        angles[index] = angle;
        const radius = radii[index];
        positions[offset] = Math.cos(angle) * radius;
        positions[offset + 1] = Math.sin(angle) * radius * 0.58;
        positions[offset + 2] = 0.3 + heights[index];
        colors[offset] = isCollision ? 1 : 0.04 + (index % 3) * 0.035;
        colors[offset + 1] = isCollision ? 0.78 + (index % 3) * 0.06 : 0.78 + (index % 3) * 0.08;
        colors[offset + 2] = isCollision ? 0.015 + (index % 2) * 0.025 : 1;
      }
      positionAttribute.needsUpdate = true;
      colorAttribute.needsUpdate = true;
      geometry.setDrawRange(0, activeParticleCount);
      particles.visible = activeParticleCount > 0;
      particleMaterial.size = (isCollision ? 0.14 : 0.17) * sizeScale;
      particleMaterial.opacity = 1;
      shockwave.visible = isCollision;
      shockwave.scale.set(1, 1, 1);
      shockwaveMaterial.opacity = isCollision ? 0.9 : 0;
    },
    update(deltaSeconds, reducedMotion) {
      if (disposed || activeEvent === null) return;
      const safeDelta = Number.isFinite(deltaSeconds) && deltaSeconds > 0 ? deltaSeconds : 0;
      elapsedSeconds += safeDelta;
      durationMs = feedbackDurationMs(activeEvent, reducedMotion);
      const durationSeconds = durationMs / 1000;
      if (elapsedSeconds >= durationSeconds) {
        clearStoredShake();
        activeEvent = null;
        activeParticleCount = 0;
        elapsedSeconds = durationSeconds;
        hideRenderables();
        return;
      }

      const progress = durationSeconds > 0 ? elapsedSeconds / durationSeconds : 1;
      const isCollision = activeEvent.kind === 'collision';
      const fade = 1 - progress;
      particleMaterial.opacity = Math.sqrt(fade);
      for (let index = 0; index < activeParticleCount; index += 1) {
        const offset = index * 3;
        const angle = angles[index] + (reducedMotion ? 0 : progress * (isCollision ? 0.9 : 3.2));
        const radius = isCollision ? radii[index] * (1 + progress * 2.5) : radii[index] * (1 - progress);
        positions[offset] = Math.cos(angle) * radius;
        positions[offset + 1] = Math.sin(angle) * radius * (isCollision ? 0.5 : 0.58);
        positions[offset + 2] = 0.3 + heights[index] * (isCollision ? 1 + progress : 1 - progress * 0.4);
      }
      positionAttribute.needsUpdate = true;

      if (isCollision) {
        shockwave.visible = true;
        shockwave.scale.setScalar(1 + progress * 2.2);
        shockwaveMaterial.opacity = 0.9 * fade;
      } else {
        shockwave.visible = false;
        shockwaveMaterial.opacity = 0;
      }
    },
    getShipPulse() {
      if (disposed || activeEvent === null || durationMs <= 0) return 0;
      return 1 - THREE.MathUtils.clamp(elapsedSeconds / (durationMs / 1000), 0, 1);
    },
    applyCameraShake(camera, reducedMotion) {
      if (disposed) return;
      if (shakenCamera !== null && shakenCamera !== camera) {
        clearStoredShake();
      }
      clearPreviousShake(camera);
      shakenCamera = camera;
      if (reducedMotion || activeEvent?.kind !== 'collision' || durationMs <= 0) return;
      const progress = THREE.MathUtils.clamp(elapsedSeconds / (durationMs / 1000), 0, 1);
      if (progress >= 1) return;
      const amplitude = 0.055 * (1 - progress);
      previousShakeX = Math.sin(elapsedSeconds * 73) * amplitude;
      previousShakeY = Math.cos(elapsedSeconds * 61) * amplitude;
      camera.position.x += previousShakeX;
      camera.position.y += previousShakeY;
    },
    reset() {
      if (disposed) return;
      clearStoredShake();
      activeEvent = null;
      activeParticleCount = 0;
      elapsedSeconds = 0;
      durationMs = 0;
      hideRenderables();
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      clearStoredShake();
      root.removeFromParent();
      root.clear();
      geometry.dispose();
      particleMaterial.dispose();
      shockwaveGeometry.dispose();
      shockwaveMaterial.dispose();
    },
  };
}

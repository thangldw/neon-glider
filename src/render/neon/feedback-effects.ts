import * as THREE from 'three';

export type RunnerFeedback =
  | { kind: 'collect'; count: number }
  | { kind: 'collision' };

export const COLLECTION_FEEDBACK_MS = 250;
export const COLLISION_FEEDBACK_MS = 320;
export const REDUCED_FEEDBACK_MS = 120;

const MAX_PARTICLES = 20;
const COLLECTION_PARTICLES = 12;
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

export function createNeonFeedbackEffects(): NeonFeedbackEffects {
  const positions = new Float32Array(MAX_PARTICLES * 3);
  const colors = new Float32Array(MAX_PARTICLES * 3);
  const radii = new Float32Array(MAX_PARTICLES);
  const angles = new Float32Array(MAX_PARTICLES);
  const heights = new Float32Array(MAX_PARTICLES);

  for (let index = 0; index < MAX_PARTICLES; index += 1) {
    const angle = (index / MAX_PARTICLES) * TAU;
    radii[index] = 0.32 + (index % 5) * 0.12;
    angles[index] = angle;
    heights[index] = ((index % 4) - 1.5) * 0.11;
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
    size: 0.14,
    vertexColors: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const particles = new THREE.Points(geometry, particleMaterial);
  particles.name = 'feedback-particles';
  particles.frustumCulled = false;
  particles.visible = false;

  const shockwaveGeometry = new THREE.RingGeometry(0.42, 0.48, 32);
  const shockwaveMaterial = new THREE.MeshBasicMaterial({
    color: 0xff4a24,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const shockwave = new THREE.Mesh(shockwaveGeometry, shockwaveMaterial);
  shockwave.name = 'feedback-shockwave';
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
      activeParticleCount = event.kind === 'collision'
        ? (reducedMotion ? REDUCED_COLLISION_PARTICLES : MAX_PARTICLES)
        : Math.min(
            reducedMotion ? REDUCED_COLLECTION_PARTICLES : COLLECTION_PARTICLES,
            Math.max(0, Number.isFinite(event.count) ? Math.floor(event.count) : 0),
          );

      const isCollision = event.kind === 'collision';
      const red = 1;
      const green = isCollision ? 0.16 : 0.82;
      const blue = isCollision ? 0.025 : 1;
      for (let index = 0; index < MAX_PARTICLES; index += 1) {
        const offset = index * 3;
        const angle = angles[index];
        const radius = radii[index];
        positions[offset] = Math.cos(angle) * radius;
        positions[offset + 1] = heights[index];
        positions[offset + 2] = Math.sin(angle) * radius;
        colors[offset] = red;
        colors[offset + 1] = green;
        colors[offset + 2] = blue;
      }
      positionAttribute.needsUpdate = true;
      colorAttribute.needsUpdate = true;
      geometry.setDrawRange(0, activeParticleCount);
      particles.visible = activeParticleCount > 0;
      particleMaterial.opacity = isCollision ? 0.95 : 0.85;
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
      particleMaterial.opacity = (isCollision ? 0.95 : 0.85) * fade;
      for (let index = 0; index < activeParticleCount; index += 1) {
        const offset = index * 3;
        const angle = angles[index] + (reducedMotion ? 0 : progress * (isCollision ? 0.9 : 3.2));
        const radius = isCollision ? radii[index] * (1 + progress * 2.5) : radii[index] * (1 - progress);
        positions[offset] = Math.cos(angle) * radius;
        positions[offset + 1] = heights[index] * (isCollision ? 1 + progress : 1 - progress * 0.4);
        positions[offset + 2] = Math.sin(angle) * radius;
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

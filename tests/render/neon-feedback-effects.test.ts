import * as THREE from 'three';
import { expect, it, vi } from 'vitest';
import { createNeonFeedbackEffects, feedbackDurationMs } from '../../src/render/neon/feedback-effects';

it('uses exact normal and reduced feedback durations', () => {
  expect(feedbackDurationMs({ kind: 'collect', count: 1 }, false)).toBe(250);
  expect(feedbackDurationMs({ kind: 'collision' }, false)).toBe(320);
  expect(feedbackDurationMs({ kind: 'collect', count: 1 }, true)).toBe(120);
  expect(feedbackDurationMs({ kind: 'collision' }, true)).toBe(120);
});

it('preallocates one bounded particle pool and one reusable shockwave', () => {
  const effects = createNeonFeedbackEffects();
  expect(effects.maxParticles).toBe(20);
  expect(effects.root.getObjectByName('feedback-particles')).toBeInstanceOf(THREE.Points);
  expect(effects.root.getObjectByName('feedback-shockwave')).toBeInstanceOf(THREE.Mesh);
  effects.dispose();
});

it('turns one pickup into a readable bounded cyan burst in the camera-facing plane', () => {
  const effects = createNeonFeedbackEffects();
  const points = effects.root.getObjectByName('feedback-particles') as THREE.Points;
  const material = points.material as THREE.PointsMaterial;

  effects.play({ kind: 'collect', count: 1 }, false);

  const position = points.geometry.getAttribute('position');
  const color = points.geometry.getAttribute('color');
  const active = points.geometry.drawRange.count;
  let maxAbsX = 0;
  let maxAbsY = 0;
  let maxAbsZ = 0;
  for (let index = 0; index < active; index += 1) {
    maxAbsX = Math.max(maxAbsX, Math.abs(position.getX(index)));
    maxAbsY = Math.max(maxAbsY, Math.abs(position.getY(index)));
    maxAbsZ = Math.max(maxAbsZ, Math.abs(position.getZ(index)));
    expect(color.getZ(index)).toBeGreaterThan(color.getX(index));
    expect(color.getY(index)).toBeGreaterThan(color.getX(index));
  }
  expect(active).toBeGreaterThanOrEqual(8);
  expect(active).toBeLessThanOrEqual(12);
  expect(maxAbsX).toBeGreaterThan(1.5);
  expect(maxAbsY).toBeGreaterThan(0.7);
  expect(maxAbsZ).toBeLessThan(0.5);
  expect(material.size).toBeGreaterThanOrEqual(0.1);
  expect(material.size).toBeLessThanOrEqual(0.2);
  expect(material.depthTest).toBe(false);
  effects.dispose();
});

it('bounds particles and disables shake under reduced motion', () => {
  const effects = createNeonFeedbackEffects();
  const camera = new THREE.PerspectiveCamera();
  effects.play({ kind: 'collision' }, true);
  const points = effects.root.getObjectByName('feedback-particles') as THREE.Points;
  expect(points.geometry.drawRange.count).toBe(8);
  const before = camera.position.clone();
  effects.update(0.06, true);
  effects.applyCameraShake(camera, true);
  expect(camera.position).toEqual(before);
  effects.dispose();
});

it('reuses attributes and disposes owned resources once', () => {
  const effects = createNeonFeedbackEffects();
  const points = effects.root.getObjectByName('feedback-particles') as THREE.Points;
  const attribute = points.geometry.getAttribute('position');
  const geometryDispose = vi.spyOn(points.geometry, 'dispose');
  effects.play({ kind: 'collect', count: 3 }, false);
  effects.update(0.1, false);
  expect(points.geometry.getAttribute('position')).toBe(attribute);
  effects.dispose();
  effects.dispose();
  expect(geometryDispose).toHaveBeenCalledOnce();
});

it('reuses every owned resource through playback and disposes each exactly once', () => {
  const effects = createNeonFeedbackEffects();
  const particles = effects.root.getObjectByName('feedback-particles') as THREE.Points;
  const shockwave = effects.root.getObjectByName('feedback-shockwave') as THREE.Mesh;
  const resources = [
    particles.geometry,
    particles.material as THREE.Material,
    shockwave.geometry,
    shockwave.material as THREE.Material,
  ] as const;
  const disposals = resources.map((resource) => vi.spyOn(resource, 'dispose'));
  const position = particles.geometry.getAttribute('position');
  const color = particles.geometry.getAttribute('color');
  const positionArray = position.array;
  const colorArray = color.array;
  const children = [...effects.root.children];
  const camera = new THREE.PerspectiveCamera();

  effects.play({ kind: 'collect', count: 1 }, false);
  effects.update(0.05, false);
  effects.play({ kind: 'collision' }, false);
  effects.update(0.05, false);
  effects.applyCameraShake(camera, false);

  expect(effects.root.children).toEqual(children);
  expect(particles.geometry.getAttribute('position')).toBe(position);
  expect(particles.geometry.getAttribute('color')).toBe(color);
  expect(position.array).toBe(positionArray);
  expect(color.array).toBe(colorArray);
  expect([particles.geometry, particles.material, shockwave.geometry, shockwave.material]).toEqual(resources);

  effects.dispose();
  effects.dispose();
  for (const dispose of disposals) expect(dispose).toHaveBeenCalledOnce();
});

it('animates collection particles inward and collision feedback outward', () => {
  const effects = createNeonFeedbackEffects();
  const points = effects.root.getObjectByName('feedback-particles') as THREE.Points;
  const shockwave = effects.root.getObjectByName('feedback-shockwave') as THREE.Mesh;

  effects.play({ kind: 'collect', count: 99 }, false);
  const initialRadius = Math.hypot(
    points.geometry.getAttribute('position').getX(1),
    points.geometry.getAttribute('position').getY(1) / 0.58,
  );
  effects.update(0.1, false);
  const inwardRadius = Math.hypot(
    points.geometry.getAttribute('position').getX(1),
    points.geometry.getAttribute('position').getY(1) / 0.58,
  );
  expect(points.geometry.drawRange.count).toBe(12);
  expect(inwardRadius).toBeLessThan(initialRadius);

  effects.play({ kind: 'collision' }, false);
  effects.update(0.1, false);
  shockwave.geometry.computeBoundingSphere();
  expect(shockwave.visible).toBe(true);
  expect(shockwave.geometry.boundingSphere?.radius).toBeGreaterThan(1);
  expect((shockwave.material as THREE.MeshBasicMaterial).depthTest).toBe(false);
  expect(shockwave.scale.x).toBeGreaterThan(1);
  expect((shockwave.material as THREE.MeshBasicMaterial).opacity).toBeLessThan(0.9);
  effects.dispose();
});

it('resets active feedback and its camera offset', () => {
  const effects = createNeonFeedbackEffects();
  const camera = new THREE.PerspectiveCamera();
  effects.play({ kind: 'collision' }, false);
  effects.update(0.05, false);
  const beforeShake = camera.position.clone();
  effects.applyCameraShake(camera, false);
  expect(camera.position).not.toEqual(beforeShake);
  effects.reset();
  expect(camera.position).toEqual(beforeShake);
  expect(effects.getShipPulse()).toBe(0);
  expect((effects.root.getObjectByName('feedback-particles') as THREE.Points).visible).toBe(false);
  expect((effects.root.getObjectByName('feedback-particles') as THREE.Points).geometry.drawRange.count).toBe(0);
  effects.dispose();
});

it('only applies deterministic shake to a normal collision', () => {
  const effects = createNeonFeedbackEffects();
  const camera = new THREE.PerspectiveCamera();
  effects.play({ kind: 'collect', count: 1 }, false);
  effects.applyCameraShake(camera, false);
  expect(camera.position).toEqual(new THREE.Vector3());
  effects.play({ kind: 'collision' }, true);
  effects.applyCameraShake(camera, true);
  expect(camera.position).toEqual(new THREE.Vector3());
  effects.play({ kind: 'collision' }, false);
  effects.update(0.04, false);
  effects.applyCameraShake(camera, false);
  const shaken = camera.position.clone();
  effects.applyCameraShake(camera, false);
  expect(camera.position).toEqual(shaken);
  effects.dispose();
});

it('enforces every particle cap and clears completed renderables', () => {
  const effects = createNeonFeedbackEffects();
  const points = effects.root.getObjectByName('feedback-particles') as THREE.Points;
  const shockwave = effects.root.getObjectByName('feedback-shockwave') as THREE.Mesh;

  effects.play({ kind: 'collect', count: 99 }, false);
  expect(points.geometry.drawRange.count).toBe(12);
  effects.update(0.251, false);
  expect(points.visible).toBe(false);
  expect(shockwave.visible).toBe(false);
  expect(points.geometry.drawRange.count).toBe(0);

  effects.play({ kind: 'collect', count: 99 }, true);
  expect(points.geometry.drawRange.count).toBe(6);
  effects.update(0.121, true);
  expect(points.visible).toBe(false);
  expect(shockwave.visible).toBe(false);
  expect(points.geometry.drawRange.count).toBe(0);

  effects.play({ kind: 'collision' }, false);
  expect(points.geometry.drawRange.count).toBe(20);
  effects.update(0.321, false);
  expect(points.visible).toBe(false);
  expect(shockwave.visible).toBe(false);
  expect(points.geometry.drawRange.count).toBe(0);

  effects.play({ kind: 'collision' }, true);
  expect(points.geometry.drawRange.count).toBe(8);
  effects.update(0.121, true);
  expect(points.visible).toBe(false);
  expect(shockwave.visible).toBe(false);
  expect(points.geometry.drawRange.count).toBe(0);
  effects.dispose();
});

it('preserves reduced-motion particle angular direction', () => {
  const effects = createNeonFeedbackEffects();
  const points = effects.root.getObjectByName('feedback-particles') as THREE.Points;
  effects.play({ kind: 'collect', count: 6 }, true);
  const position = points.geometry.getAttribute('position');
  const initialAngle = Math.atan2(position.getY(1) / 0.58, position.getX(1));
  effects.update(0.06, true);
  const reducedAngle = Math.atan2(position.getY(1) / 0.58, position.getX(1));
  expect(reducedAngle).toBeCloseTo(initialAngle, 6);
  effects.dispose();
});

it('clears camera shake immediately when collision expires', () => {
  const effects = createNeonFeedbackEffects();
  const camera = new THREE.PerspectiveCamera();
  const baseline = camera.position.clone();
  effects.play({ kind: 'collision' }, false);
  effects.update(0.05, false);
  effects.applyCameraShake(camera, false);
  expect(camera.position).not.toEqual(baseline);
  effects.update(0.271, false);
  expect(camera.position).toEqual(baseline);
  effects.dispose();
});

it('clears collision shake before replacing it with collection feedback', () => {
  const effects = createNeonFeedbackEffects();
  const camera = new THREE.PerspectiveCamera();
  const baseline = camera.position.clone();
  effects.play({ kind: 'collision' }, false);
  effects.update(0.05, false);
  effects.applyCameraShake(camera, false);
  expect(camera.position).not.toEqual(baseline);
  effects.play({ kind: 'collect', count: 1 }, false);
  expect(camera.position).toEqual(baseline);
  effects.dispose();
});

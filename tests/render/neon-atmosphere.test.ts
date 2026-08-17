import * as THREE from 'three';
import { expect, it, vi } from 'vitest';
import { createNeonAtmosphere } from '../../src/render/neon/atmosphere';
import { createNeonMaterials } from '../../src/render/neon/materials';

it('uses bounded desktop and mobile particle budgets', () => {
  const materials = createNeonMaterials();
  const desktop = createNeonAtmosphere('desktop', materials);
  const mobile = createNeonAtmosphere('mobile', materials);

  expect(desktop.particleCount).toBe(72);
  expect(mobile.particleCount).toBe(36);
  expect(desktop.root.getObjectByName('speed-streaks')).toBeInstanceOf(THREE.Points);
  expect(mobile.root.getObjectByName('speed-streaks')?.visible).toBe(true);

  desktop.dispose();
  mobile.dispose();
  materials.dispose();
});

it('reuses one position buffer and reduces motion without hiding depth cues', () => {
  const materials = createNeonMaterials();
  const atmosphere = createNeonAtmosphere('desktop', materials);
  const points = atmosphere.root.getObjectByName('speed-streaks') as THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
  const position = points.geometry.getAttribute('position');

  atmosphere.update(10, 1, 52, false);
  const animatedZ = position.getZ(0);
  atmosphere.update(20, 2, 52, true);

  expect(points.geometry.getAttribute('position')).toBe(position);
  expect(position.getZ(0)).not.toBe(animatedZ);
  expect(points.material.opacity).toBeGreaterThan(0);
  expect(points.material.opacity).toBeLessThanOrEqual(0.42);

  atmosphere.dispose();
  materials.dispose();
});

it('reuses owned buffers across updates and disposes resources once', () => {
  const materials = createNeonMaterials();
  const atmosphere = createNeonAtmosphere('desktop', materials);
  const points = atmosphere.root.getObjectByName('speed-streaks') as THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
  const position = points.geometry.getAttribute('position');
  const positionArray = position.array;
  const color = points.geometry.getAttribute('color');
  const child = atmosphere.root.children[0];
  const geometryDispose = vi.spyOn(points.geometry, 'dispose');
  const materialDispose = vi.spyOn(points.material, 'dispose');

  for (let frame = 0; frame < 120; frame += 1) {
    atmosphere.update(frame * 2, frame / 60, 52, false);
  }

  expect(points.geometry.getAttribute('position')).toBe(position);
  expect(points.geometry.getAttribute('position').array).toBe(positionArray);
  expect(points.geometry.getAttribute('color')).toBe(color);
  expect(atmosphere.root.children[0]).toBe(child);
  atmosphere.dispose();
  atmosphere.dispose();
  expect(geometryDispose).toHaveBeenCalledOnce();
  expect(materialDispose).toHaveBeenCalledOnce();
  expect(atmosphere.root.parent).toBeNull();
  materials.dispose();
});

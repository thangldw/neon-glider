import * as THREE from 'three';
import { expect, it, vi } from 'vitest';
import { createNeonMaterials } from '../../src/render/neon/materials';

it('creates the approved cyan-magenta metallic palette', () => {
  const materials = createNeonMaterials();

  expect(materials.cyan.emissive.getHex()).toBe(0x00cfff);
  expect(materials.magenta.emissive.getHex()).toBe(0xff20c8);
  expect(materials.metal.metalness).toBeGreaterThanOrEqual(0.8);
  expect(materials.metal.wireframe).toBe(true);
  expect(materials.floor.metalness).toBeGreaterThanOrEqual(0.8);
  expect(materials.crystal).toBeInstanceOf(THREE.MeshPhysicalMaterial);
  expect(materials.crystal.transmission).toBe(0);
  expect(materials.cyan.emissiveIntensity).toBeLessThanOrEqual(1.25);
  expect(materials.magenta.emissiveIntensity).toBeLessThanOrEqual(1.2);
  expect(materials.crystal.emissiveIntensity).toBeLessThanOrEqual(2.2);
  expect(materials.trailMagenta.emissiveIntensity).toBeLessThanOrEqual(2.4);
  expect(materials.obstacle.color.getHex()).not.toBe(0x000000);
  expect(materials.obstacle.wireframe).toBe(true);
  const metalTone = { h: 0, s: 0, l: 0 };
  const floorTone = { h: 0, s: 0, l: 0 };
  materials.metal.color.getHSL(metalTone);
  materials.floor.color.getHSL(floorTone);
  expect(metalTone.l).toBeGreaterThan(0.09);
  expect(metalTone.l).toBeLessThan(0.11);
  expect(floorTone.l).toBeGreaterThan(0.05);
  expect(floorTone.l).toBeLessThan(0.06);

  materials.dispose();
});

it('owns and idempotently disposes every shared material', () => {
  const materials = createNeonMaterials();
  const palette = [
    materials.cyan,
    materials.magenta,
    materials.metal,
    materials.obstacle,
    materials.crystal,
    materials.floor,
    materials.trailCyan,
    materials.trailMagenta,
  ];
  const dispose = palette.map((material) => vi.spyOn(material, 'dispose'));

  materials.dispose();
  materials.dispose();

  for (const spy of dispose) expect(spy).toHaveBeenCalledOnce();
});

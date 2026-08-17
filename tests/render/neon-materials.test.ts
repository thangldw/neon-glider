import * as THREE from 'three';
import { expect, it, vi } from 'vitest';
import { createNeonMaterials } from '../../src/render/neon/materials';

it('creates the approved cyan-magenta metallic palette', () => {
  const materials = createNeonMaterials();

  expect(materials.cyan.emissive.getHex()).toBe(0x00cfff);
  expect(materials.magenta.emissive.getHex()).toBe(0xff20c8);
  expect(materials.metal.metalness).toBeGreaterThanOrEqual(0.8);
  expect(materials.floor.metalness).toBeGreaterThanOrEqual(0.8);
  expect(materials.crystal).toBeInstanceOf(THREE.MeshPhysicalMaterial);

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

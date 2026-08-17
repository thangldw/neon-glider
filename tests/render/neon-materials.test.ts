import * as THREE from 'three';
import { expect, it, vi } from 'vitest';
import { createNeonMaterials } from '../../src/render/neon/materials';

it('creates a solid low-cost cyan-magenta depth palette', () => {
  const materials = createNeonMaterials();

  expect(materials.cyan).toBeInstanceOf(THREE.MeshBasicMaterial);
  expect(materials.magenta).toBeInstanceOf(THREE.MeshBasicMaterial);
  expect(materials.metal).toBeInstanceOf(THREE.MeshPhongMaterial);
  expect(materials.obstacle).toBeInstanceOf(THREE.MeshPhongMaterial);
  expect(materials.floor).toBeInstanceOf(THREE.MeshPhongMaterial);
  expect(materials.crystal).toBeInstanceOf(THREE.MeshPhongMaterial);
  expect(materials.cyan.color.getHex()).toBe(0x3cecff);
  expect(materials.magenta.color.getHex()).toBe(0xff31cf);
  expect(materials.metal.wireframe).toBe(false);
  expect(materials.floor.wireframe).toBe(false);
  expect(materials.obstacle.color.getHex()).not.toBe(0x000000);
  expect(materials.obstacle.wireframe).toBe(false);
  const obstacleEdge = (materials as unknown as { obstacleEdge?: THREE.Material }).obstacleEdge;
  expect(obstacleEdge).toBeInstanceOf(THREE.MeshBasicMaterial);
  const metalTone = { h: 0, s: 0, l: 0 };
  const floorTone = { h: 0, s: 0, l: 0 };
  materials.metal.color.getHSL(metalTone);
  materials.floor.color.getHSL(floorTone);
  expect(metalTone.l).toBeGreaterThan(0.1);
  expect(metalTone.l).toBeLessThan(0.18);
  expect(floorTone.l).toBeGreaterThan(0.1);
  expect(floorTone.l).toBeLessThan(0.2);

  materials.dispose();
});

it('owns and idempotently disposes every shared material', () => {
  const materials = createNeonMaterials();
  const obstacleEdge = (materials as unknown as { obstacleEdge?: THREE.Material }).obstacleEdge;
  expect(obstacleEdge).toBeDefined();
  const palette = [
    materials.cyan,
    materials.magenta,
    materials.metal,
    materials.obstacle,
    obstacleEdge!,
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

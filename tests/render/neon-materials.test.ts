import * as THREE from 'three';
import { expect, it, vi } from 'vitest';
import { createNeonMaterials } from '../../src/render/neon/materials';

it('creates the approved emissive PBR cyan-magenta metallic palette', () => {
  const materials = createNeonMaterials();

  expect(materials.cyan).toBeInstanceOf(THREE.MeshStandardMaterial);
  expect(materials.magenta).toBeInstanceOf(THREE.MeshStandardMaterial);
  expect(materials.metal).toBeInstanceOf(THREE.MeshStandardMaterial);
  expect(materials.obstacle).toBeInstanceOf(THREE.MeshStandardMaterial);
  expect(materials.floor).toBeInstanceOf(THREE.MeshStandardMaterial);
  expect(materials.crystal).toBeInstanceOf(THREE.MeshPhysicalMaterial);
  expect(materials.cyan.emissive.getHex()).toBe(0x00cfff);
  expect(materials.magenta.emissive.getHex()).toBe(0xff20c8);
  expect(materials.cyan.emissiveIntensity).toBeGreaterThan(1);
  expect(materials.magenta.emissiveIntensity).toBeGreaterThan(1);
  expect(materials.metal.metalness).toBeGreaterThanOrEqual(0.6);
  expect(materials.floor.metalness).toBeGreaterThanOrEqual(0.7);
  expect(materials.floor.roughness).toBeLessThanOrEqual(0.3);
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
  expect(metalTone.l).toBeGreaterThan(0.02);
  expect(metalTone.l).toBeLessThan(0.3);
  expect(floorTone.l).toBeGreaterThan(0.02);
  expect(floorTone.l).toBeLessThan(0.3);

  materials.dispose();
});

it('adds owned recess and gate-glass PBR materials', () => {
  const materials = createNeonMaterials();

  expect(materials.panelRecess).toBeInstanceOf(THREE.MeshStandardMaterial);
  expect(materials.panelRecess.roughness).toBeGreaterThanOrEqual(0.45);
  expect(materials.gateGlass).toBeInstanceOf(THREE.MeshPhysicalMaterial);
  expect(materials.gateGlass.transmission).toBeGreaterThan(0);

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
    materials.panelRecess,
    materials.gateGlass,
    materials.trailCyan,
    materials.trailMagenta,
  ];
  const dispose = palette.map((material) => vi.spyOn(material, 'dispose'));

  materials.dispose();
  materials.dispose();

  for (const spy of dispose) expect(spy).toHaveBeenCalledOnce();
});

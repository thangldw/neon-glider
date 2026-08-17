import * as THREE from 'three';
import { expect, it, vi } from 'vitest';
import { createNeonMaterials } from '../../src/render/neon/materials';
import { createNeonShip } from '../../src/render/neon/ship';

it('builds the armored ship silhouette from named procedural parts', () => {
  const materials = createNeonMaterials();
  const ship = createNeonShip(materials);

  for (const name of [
    'fuselage',
    'wing-left',
    'wing-right',
    'engine-left',
    'engine-right',
    'cockpit-light',
    'edge-light-left',
    'edge-light-right',
    'trail-left',
    'trail-right',
  ]) {
    expect(ship.root.getObjectByName(name)).toBeTruthy();
  }
  expect(ship.root.getObjectByName('wing-left')!.position.x).toBeLessThan(0);
  expect(ship.root.getObjectByName('wing-right')!.position.x).toBeGreaterThan(0);
  expect(ship.root.getObjectByName('ship-panel-lights')?.userData.panelCount).toBe(3);
  const fuselageMaterial = (ship.root.getObjectByName('fuselage') as THREE.Mesh).material as THREE.MeshStandardMaterial;
  const shipTone = { h: 0, s: 0, l: 0 };
  fuselageMaterial.color.getHSL(shipTone);
  expect(fuselageMaterial).not.toBe(materials.metal);
  expect(fuselageMaterial.wireframe).toBe(false);
  expect(shipTone.l).toBeGreaterThan(0.16);

  ship.dispose();
  materials.dispose();
});

it('eases toward a lane and banks opposite the lateral movement', () => {
  const materials = createNeonMaterials();
  const ship = createNeonShip(materials);

  ship.setLaneX(3, 0.2, false);

  expect(ship.root.position.x).toBeGreaterThan(0);
  expect(ship.root.position.x).toBeLessThan(3);
  expect(ship.root.rotation.z).toBeLessThan(0);
  ship.dispose();
  materials.dispose();
});

it('removes presentation motion when reduced motion is enabled', () => {
  const materials = createNeonMaterials();
  const ship = createNeonShip(materials);

  ship.setLaneX(-3, 0.2, true);
  ship.update(4.25, 40, true);

  expect(ship.root.position.x).toBe(-3);
  expect(ship.root.position.y).toBe(0);
  expect(ship.root.rotation.z).toBe(0);
  ship.dispose();
  materials.dispose();
});

it('idempotently disposes owned geometry without disposing the shared palette', () => {
  const materials = createNeonMaterials();
  const materialDispose = vi.spyOn(materials.cyan, 'dispose');
  const ship = createNeonShip(materials);
  const shipMaterial = (ship.root.getObjectByName('fuselage') as THREE.Mesh).material as THREE.Material;
  const shipMaterialDispose = vi.spyOn(shipMaterial, 'dispose');
  const geometries = new Set<THREE.BufferGeometry>();
  let meshCount = 0;
  ship.root.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      geometries.add(object.geometry);
      meshCount += 1;
    }
  });
  const geometryDispose = [...geometries].map((geometry) => vi.spyOn(geometry, 'dispose'));

  ship.dispose();
  ship.dispose();

  expect(geometries.size).toBeLessThan(meshCount);
  for (const spy of geometryDispose) expect(spy).toHaveBeenCalledOnce();
  expect(shipMaterialDispose).toHaveBeenCalledOnce();
  expect(materialDispose).not.toHaveBeenCalled();
  materials.dispose();
});

import * as THREE from 'three';
import { expect, it, vi } from 'vitest';
import { createEntityField } from '../../src/render/neon/entity-field';
import { createNeonMaterials } from '../../src/render/neon/materials';

it('reuses meshes by deterministic entity id and removes stale entities', () => {
  const materials = createNeonMaterials();
  const field = createEntityField(materials);
  const entity = { id: 's1-c', kind: 'crystal' as const, lane: 2 as const, distance: 100, segment: 1 };

  field.sync([entity], 20);
  const first = field.root.getObjectByName(entity.id);
  field.sync([entity], 30);
  expect(field.root.getObjectByName(entity.id)).toBe(first);
  field.sync([], 40);
  expect(field.root.getObjectByName(entity.id)).toBeUndefined();

  field.dispose();
  materials.dispose();
});

it('maps lanes and forward distance without mutating simulation entities', () => {
  const materials = createNeonMaterials();
  const field = createEntityField(materials);
  const entities = [
    { id: 'cube-left', kind: 'cube' as const, lane: 0 as const, distance: 50, segment: 0 },
    { id: 'prism-center', kind: 'prism' as const, lane: 1 as const, distance: 60, segment: 1 },
    { id: 'wall-right', kind: 'wall' as const, lane: 2 as const, distance: 70, segment: 2 },
  ];
  const snapshot = structuredClone(entities);

  field.sync(entities, 20);

  expect(field.root.getObjectByName('cube-left')!.position.x).toBe(-3);
  expect(field.root.getObjectByName('prism-center')!.position.x).toBe(0);
  expect(field.root.getObjectByName('wall-right')!.position.x).toBe(3);
  expect(field.root.getObjectByName('cube-left')!.position.z).toBe(-30);
  expect(entities).toEqual(snapshot);
  field.dispose();
  materials.dispose();
});

it('returns stale meshes to a kind-specific pool', () => {
  const materials = createNeonMaterials();
  const field = createEntityField(materials);
  const firstEntity = { id: 'crystal-a', kind: 'crystal' as const, lane: 0 as const, distance: 50, segment: 0 };
  const secondEntity = { id: 'crystal-b', kind: 'crystal' as const, lane: 2 as const, distance: 80, segment: 1 };

  field.sync([firstEntity], 0);
  const firstMesh = field.root.getObjectByName(firstEntity.id);
  field.sync([], 0);
  field.sync([secondEntity], 0);

  expect(field.root.getObjectByName(secondEntity.id)).toBe(firstMesh);
  field.dispose();
  materials.dispose();
});

it('animates crystals and idempotently disposes only field-owned geometry', () => {
  const materials = createNeonMaterials();
  const materialDispose = vi.spyOn(materials.crystal, 'dispose');
  const field = createEntityField(materials);
  const crystal = { id: 'crystal', kind: 'crystal' as const, lane: 1 as const, distance: 100, segment: 3 };
  field.sync([crystal], 10);
  const mesh = field.root.getObjectByName(crystal.id) as THREE.Mesh;
  const startingRotation = mesh.rotation.y;
  const geometryDispose = vi.spyOn(mesh.geometry, 'dispose');

  field.sync([crystal], 20);
  expect(mesh.rotation.y).not.toBe(startingRotation);
  field.dispose();
  field.dispose();

  expect(geometryDispose).toHaveBeenCalledOnce();
  expect(materialDispose).not.toHaveBeenCalled();
  materials.dispose();
});

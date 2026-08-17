import * as THREE from 'three';
import type { Lane, TrackEntity, TrackEntityKind } from '../../simulation/runner-types';
import type { NeonMaterials } from './materials';

const LANE_X: Record<Lane, number> = { 0: -3, 1: 0, 2: 3 };
const ENTITY_Y: Record<TrackEntityKind, number> = {
  cube: -2.72,
  prism: -2.34,
  wall: -2.08,
  crystal: -1.9,
};
const ENTITY_KINDS = ['cube', 'prism', 'wall', 'crystal'] as const;
const MAX_INSTANCES_PER_KIND = 64;

export interface EntityField {
  readonly root: THREE.Group;
  sync(entities: readonly TrackEntity[], playerDistance: number): void;
  dispose(): void;
}

export function createEntityField(materials: NeonMaterials): EntityField {
  const root = new THREE.Group();
  root.name = 'entity-field';
  const geometries: Record<TrackEntityKind, THREE.BufferGeometry> = {
    cube: new THREE.BoxGeometry(2.2, 2.2, 2.2),
    prism: new THREE.ConeGeometry(1.55, 3.1, 3),
    wall: new THREE.BoxGeometry(2.7, 3.65, 0.78),
    crystal: new THREE.OctahedronGeometry(0.72, 0),
  };

  function materialFor(kind: TrackEntityKind): THREE.Material {
    return kind === 'crystal' ? materials.crystal : materials.obstacle;
  }

  const batches = {} as Record<TrackEntityKind, THREE.InstancedMesh>;
  for (const kind of ENTITY_KINDS) {
    const batch = new THREE.InstancedMesh(geometries[kind], materialFor(kind), MAX_INSTANCES_PER_KIND);
    batch.name = `${kind}-entity-batch`;
    batch.count = 0;
    batch.frustumCulled = false;
    batch.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    batches[kind] = batch;
    root.add(batch);
  }

  const active = new Map<string, THREE.Object3D>();
  const pools: Record<TrackEntityKind, THREE.Object3D[]> = {
    cube: [],
    prism: [],
    wall: [],
    crystal: [],
  };
  let disposed = false;

  function acquire(kind: TrackEntityKind): THREE.Object3D {
    const marker = pools[kind].pop() ?? new THREE.Object3D();
    marker.userData.entityKind = kind;
    return marker;
  }

  function release(id: string, marker: THREE.Object3D): void {
    active.delete(id);
    root.remove(marker);
    marker.name = '';
    pools[marker.userData.entityKind as TrackEntityKind].push(marker);
  }

  return {
    root,
    sync(entities, playerDistance) {
      if (disposed) return;
      const desiredIds = new Set(entities.map((entity) => entity.id));
      for (const [id, marker] of active) {
        if (!desiredIds.has(id)) release(id, marker);
      }

      const safePlayerDistance = Number.isFinite(playerDistance) ? playerDistance : 0;
      for (const entity of entities) {
        let marker = active.get(entity.id);
        if (marker && marker.userData.entityKind !== entity.kind) {
          release(entity.id, marker);
          marker = undefined;
        }
        if (!marker) {
          marker = acquire(entity.kind);
          marker.name = entity.id;
          active.set(entity.id, marker);
          root.add(marker);
        }
        marker.position.set(LANE_X[entity.lane], ENTITY_Y[entity.kind], -(entity.distance - safePlayerDistance));
        if (entity.kind === 'crystal') {
          marker.rotation.set(
            Math.PI / 4,
            safePlayerDistance * 0.08 + entity.segment * 0.61,
            safePlayerDistance * 0.035 + Math.PI / 4,
          );
        } else {
          marker.rotation.set(0, entity.kind === 'prism' ? Math.PI / 6 : 0, 0);
        }
      }

      const counts: Record<TrackEntityKind, number> = { cube: 0, prism: 0, wall: 0, crystal: 0 };
      for (const marker of active.values()) {
        const kind = marker.userData.entityKind as TrackEntityKind;
        const index = counts[kind];
        if (index >= MAX_INSTANCES_PER_KIND) throw new RangeError(`Too many ${kind} entities`);
        marker.updateMatrix();
        batches[kind].setMatrixAt(index, marker.matrix);
        counts[kind] += 1;
      }
      for (const kind of ENTITY_KINDS) {
        batches[kind].count = counts[kind];
        batches[kind].instanceMatrix.needsUpdate = true;
      }
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      active.clear();
      for (const pool of Object.values(pools)) pool.length = 0;
      root.clear();
      for (const geometry of Object.values(geometries)) geometry.dispose();
    },
  };
}

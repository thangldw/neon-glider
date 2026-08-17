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
  const active = new Map<string, THREE.Mesh>();
  const pools: Record<TrackEntityKind, THREE.Mesh[]> = {
    cube: [],
    prism: [],
    wall: [],
    crystal: [],
  };
  let disposed = false;

  function materialFor(kind: TrackEntityKind): THREE.Material {
    return kind === 'crystal' ? materials.crystal : materials.obstacle;
  }

  function acquire(kind: TrackEntityKind): THREE.Mesh {
    const mesh = pools[kind].pop() ?? new THREE.Mesh(geometries[kind], materialFor(kind));
    mesh.userData.entityKind = kind;
    mesh.visible = true;
    return mesh;
  }

  function release(id: string, mesh: THREE.Mesh): void {
    active.delete(id);
    root.remove(mesh);
    mesh.name = '';
    mesh.visible = false;
    const kind = mesh.userData.entityKind as TrackEntityKind;
    pools[kind].push(mesh);
  }

  return {
    root,
    sync(entities, playerDistance) {
      if (disposed) return;
      const desiredIds = new Set(entities.map((entity) => entity.id));
      for (const [id, mesh] of active) {
        if (!desiredIds.has(id)) release(id, mesh);
      }

      const safePlayerDistance = Number.isFinite(playerDistance) ? playerDistance : 0;
      for (const entity of entities) {
        let mesh = active.get(entity.id);
        if (mesh && mesh.userData.entityKind !== entity.kind) {
          release(entity.id, mesh);
          mesh = undefined;
        }
        if (!mesh) {
          mesh = acquire(entity.kind);
          mesh.name = entity.id;
          active.set(entity.id, mesh);
          root.add(mesh);
        }
        mesh.position.set(LANE_X[entity.lane], ENTITY_Y[entity.kind], -(entity.distance - safePlayerDistance));
        if (entity.kind === 'crystal') {
          mesh.rotation.set(
            Math.PI / 4,
            safePlayerDistance * 0.08 + entity.segment * 0.61,
            safePlayerDistance * 0.035 + Math.PI / 4,
          );
        } else {
          mesh.rotation.set(0, entity.kind === 'prism' ? Math.PI / 6 : 0, 0);
        }
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

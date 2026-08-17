import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { NeonMaterials } from './materials';

export interface NeonShip {
  readonly root: THREE.Group;
  setLaneX(targetX: number, deltaSeconds: number, reducedMotion: boolean): void;
  update(elapsedSeconds: number, speed: number, reducedMotion: boolean): void;
  dispose(): void;
}

function createWingGeometry(): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([
    0.25, 0.08, -1.28,
    3.15, 0.02, 1.12,
    0.72, 0.13, 0.62,
    0.25, -0.14, -1.28,
    3.15, -0.14, 1.12,
    0.72, -0.14, 0.62,
  ], 3));
  geometry.setIndex([
    0, 1, 2,
    5, 4, 3,
    0, 3, 4, 0, 4, 1,
    1, 4, 5, 1, 5, 2,
    2, 5, 3, 2, 3, 0,
  ]);
  geometry.computeVertexNormals();
  return geometry;
}

export function createNeonShip(materials: NeonMaterials): NeonShip {
  const root = new THREE.Group();
  root.name = 'neon-ship';
  const geometries = new Set<THREE.BufferGeometry>();
  const shipMetal = materials.metal.clone();
  shipMetal.color.setHex(0x46689c);
  shipMetal.emissive.setHex(0x0a1c4c);
  shipMetal.emissiveIntensity = 0.72;
  shipMetal.metalness = 0.76;
  shipMetal.roughness = 0.35;
  shipMetal.wireframe = false;

  function own<T extends THREE.BufferGeometry>(geometry: T): T {
    geometries.add(geometry);
    return geometry;
  }

  function add(
    name: string,
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    position: readonly [number, number, number],
  ): THREE.Mesh {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.set(...position);
    root.add(mesh);
    return mesh;
  }

  const unitBox = own(new THREE.BoxGeometry(1, 1, 1));
  const fuselageGeometry = own(new THREE.ConeGeometry(0.9, 3.9, 5));
  fuselageGeometry.rotateX(-Math.PI / 2);
  const wingGeometry = own(createWingGeometry());
  const engineGeometry = own(new THREE.CylinderGeometry(0.34, 0.4, 1.28, 8));
  engineGeometry.rotateX(Math.PI / 2);
  const glowGeometry = own(new THREE.CylinderGeometry(0.23, 0.23, 0.12, 8));
  glowGeometry.rotateX(Math.PI / 2);
  const cockpitCore = new THREE.ConeGeometry(0.43, 1.38, 5);
  cockpitCore.rotateX(-Math.PI / 2);
  const cockpitParts: THREE.BufferGeometry[] = [cockpitCore];
  const panelTransform = new THREE.Object3D();
  for (const [x, y, z, sx, sy, sz, rotationY] of [
    [0, -0.03, 0.77, 0.14, 0.055, 1.35, 0],
    [-0.72, -0.28, 1.02, 0.78, 0.055, 0.075, -0.36],
    [0.72, -0.28, 1.02, 0.78, 0.055, 0.075, 0.36],
  ] as const) {
    panelTransform.position.set(x, y, z);
    panelTransform.scale.set(sx, sy, sz);
    panelTransform.rotation.set(0, rotationY, 0);
    panelTransform.updateMatrix();
    cockpitParts.push(new THREE.BoxGeometry(1, 1, 1).applyMatrix4(panelTransform.matrix));
  }
  const mergedCockpitGeometry = mergeGeometries(cockpitParts, false);
  for (const part of cockpitParts) part.dispose();
  if (!mergedCockpitGeometry) throw new Error('Unable to construct ship panel geometry');
  const cockpitGeometry = own(mergedCockpitGeometry);
  const trailGeometry = own(new THREE.CylinderGeometry(0.1, 0.31, 3.5, 8, 1, true));
  trailGeometry.rotateX(Math.PI / 2);

  const panelMarker = new THREE.Group();
  panelMarker.name = 'ship-panel-lights';
  panelMarker.userData.panelCount = 3;
  root.add(panelMarker);

  add('fuselage', fuselageGeometry, shipMetal, [0, 0, -0.1]);
  add('wing-right', wingGeometry, shipMetal, [0.12, -0.08, 0]);
  const leftWing = add('wing-left', wingGeometry, shipMetal, [-0.12, -0.08, 0]);
  leftWing.scale.x = -1;

  const armorSpine = add('armor-spine', unitBox, shipMetal, [0, 0.23, 0.1]);
  armorSpine.scale.set(0.42, 0.34, 2.15);
  const armorLeft = add('armor-left', unitBox, shipMetal, [-0.58, 0.02, 0.35]);
  armorLeft.scale.set(0.45, 0.32, 1.55);
  armorLeft.rotation.y = -0.16;
  const armorRight = add('armor-right', unitBox, shipMetal, [0.58, 0.02, 0.35]);
  armorRight.scale.set(0.45, 0.32, 1.55);
  armorRight.rotation.y = 0.16;

  add('engine-left', engineGeometry, shipMetal, [-1.12, -0.12, 0.72]);
  add('engine-right', engineGeometry, shipMetal, [1.12, -0.12, 0.72]);
  const glowLeft = add('engine-glow-left', glowGeometry, materials.magenta, [-1.12, -0.12, 1.38]);
  const glowRight = add('engine-glow-right', glowGeometry, materials.magenta, [1.12, -0.12, 1.38]);
  add('cockpit-light', cockpitGeometry, materials.cyan, [0, 0.45, -0.72]);

  const edgeLeft = add('edge-light-left', unitBox, materials.magenta, [-1.75, 0.02, 0.52]);
  edgeLeft.scale.set(1.45, 0.075, 0.1);
  edgeLeft.rotation.y = -0.58;
  const edgeRight = add('edge-light-right', unitBox, materials.magenta, [1.75, 0.02, 0.52]);
  edgeRight.scale.set(1.45, 0.075, 0.1);
  edgeRight.rotation.y = 0.58;

  const trailLeft = add('trail-left', trailGeometry, materials.trailMagenta, [-1.12, -0.12, 3.15]);
  const trailRight = add('trail-right', trailGeometry, materials.trailMagenta, [1.12, -0.12, 3.15]);
  let disposed = false;

  return {
    root,
    setLaneX(targetX, deltaSeconds, reducedMotion) {
      if (disposed || !Number.isFinite(targetX)) return;
      if (reducedMotion) {
        root.position.x = targetX;
        root.rotation.z = 0;
        return;
      }
      const delta = Number.isFinite(deltaSeconds) ? Math.max(0, deltaSeconds) : 0;
      const blend = 1 - Math.exp(-10 * delta);
      const lateralDelta = targetX - root.position.x;
      root.position.x = THREE.MathUtils.lerp(root.position.x, targetX, blend);
      const bank = THREE.MathUtils.clamp(-lateralDelta * 0.11, -0.34, 0.34);
      root.rotation.z = THREE.MathUtils.lerp(root.rotation.z, bank, blend);
    },
    update(elapsedSeconds, speed, reducedMotion) {
      if (disposed) return;
      if (reducedMotion) {
        root.position.y = 0;
        root.rotation.x = 0;
        trailLeft.scale.set(1, 1, 1);
        trailRight.scale.set(1, 1, 1);
        glowLeft.scale.set(1, 1, 1);
        glowRight.scale.set(1, 1, 1);
        return;
      }
      const time = Number.isFinite(elapsedSeconds) ? elapsedSeconds : 0;
      const normalizedSpeed = THREE.MathUtils.clamp((speed - 26) / 26, 0, 1);
      const pulse = 1 + Math.sin(time * 15) * 0.08;
      root.position.y = Math.sin(time * 2.6) * 0.08;
      root.rotation.x = Math.sin(time * 1.7) * 0.018;
      trailLeft.scale.set(pulse, pulse, 0.9 + normalizedSpeed * 0.42);
      trailRight.scale.copy(trailLeft.scale);
      glowLeft.scale.setScalar(pulse);
      glowRight.scale.copy(glowLeft.scale);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      root.clear();
      for (const geometry of geometries) geometry.dispose();
      shipMetal.dispose();
    },
  };
}

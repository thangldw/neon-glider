import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { NeonMaterials } from './materials';

export interface NeonShip {
  readonly root: THREE.Group;
  setLaneX(targetX: number, deltaSeconds: number, reducedMotion: boolean): void;
  update(elapsedSeconds: number, speed: number, reducedMotion: boolean): void;
  setFeedbackPulse(strength: number): void;
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
  shipMetal.color.setHex(0x3f669c);
  shipMetal.emissive.setHex(0x102d61);
  shipMetal.emissiveIntensity = 1.15;
  shipMetal.metalness = 0.72;
  shipMetal.roughness = 0.2;
  shipMetal.flatShading = true;
  shipMetal.wireframe = false;
  shipMetal.map = null;
  shipMetal.emissiveMap = null;
  const armorMaterial = shipMetal.clone();
  armorMaterial.color.setHex(0x8bbdf5);
  armorMaterial.emissive.setHex(0x2d7ee8);
  armorMaterial.emissiveIntensity = 1.65;
  armorMaterial.roughness = 0.28;
  const cockpitMaterial = materials.cyan.clone();
  cockpitMaterial.color.setHex(0x041522);
  cockpitMaterial.emissiveIntensity = 0.92;
  cockpitMaterial.metalness = 0.7;
  cockpitMaterial.roughness = 0.16;
  const feedbackMaterials = [shipMetal, armorMaterial, cockpitMaterial] as const;
  const feedbackBaseEmissiveIntensities = feedbackMaterials.map((material) => material.emissiveIntensity);

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

  function addPartMarker(name: string): void {
    const marker = new THREE.Group();
    marker.name = name;
    root.add(marker);
  }

  function mergeParts(parts: readonly {
    geometry: THREE.BufferGeometry;
    position: readonly [number, number, number];
    scale?: readonly [number, number, number];
    rotationY?: number;
  }[]): THREE.BufferGeometry {
    const transform = new THREE.Object3D();
    const copies = parts.map(({ geometry, position, scale = [1, 1, 1], rotationY = 0 }) => {
      transform.position.set(...position);
      transform.scale.set(...scale);
      transform.rotation.set(0, rotationY, 0);
      transform.updateMatrix();
      const copy = geometry.clone().applyMatrix4(transform.matrix);
      copy.deleteAttribute('uv');
      return copy;
    });
    const merged = mergeGeometries(copies, false);
    for (const copy of copies) copy.dispose();
    if (!merged) throw new Error('Unable to merge ship geometry');
    return own(merged);
  }

  const unitBox = own(new THREE.BoxGeometry(1, 1, 1));
  const fuselageGeometry = own(new THREE.ConeGeometry(0.9, 3.9, 5));
  fuselageGeometry.rotateX(-Math.PI / 2);
  const wingGeometry = own(createWingGeometry());
  const engineGeometry = own(new THREE.CylinderGeometry(0.34, 0.4, 1.28, 8));
  engineGeometry.rotateX(Math.PI / 2);
  const glowGeometry = own(new THREE.CylinderGeometry(0.23, 0.23, 0.12, 8));
  glowGeometry.rotateX(Math.PI / 2);
  const engineRingGeometry = own(new THREE.TorusGeometry(0.37, 0.07, 6, 12));
  const exhaustCoreGeometry = own(new THREE.CylinderGeometry(0.16, 0.22, 0.36, 8));
  exhaustCoreGeometry.rotateX(Math.PI / 2);
  const canopyGeometry = own(new THREE.SphereGeometry(0.5, 8, 6));
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

  const airframeGeometry = mergeParts([
    { geometry: fuselageGeometry, position: [0, 0, -0.1] },
    { geometry: wingGeometry, position: [0.12, -0.08, 0] },
    { geometry: wingGeometry, position: [-0.12, -0.08, 0], scale: [-1, 1, 1] },
    { geometry: engineGeometry, position: [-1.12, -0.12, 0.72] },
    { geometry: engineGeometry, position: [1.12, -0.12, 0.72] },
    { geometry: engineRingGeometry, position: [-1.12, -0.12, 1.34] },
    { geometry: engineRingGeometry, position: [1.12, -0.12, 1.34] },
  ]);
  add('airframe', airframeGeometry, shipMetal, [0, 0, 0]);
  const armorGeometry = mergeParts([
    { geometry: unitBox, position: [0, 0.23, 0.1], scale: [0.42, 0.34, 2.15] },
    { geometry: unitBox, position: [-0.58, 0.02, 0.35], scale: [0.45, 0.32, 1.55], rotationY: -0.16 },
    { geometry: unitBox, position: [0.58, 0.02, 0.35], scale: [0.45, 0.32, 1.55], rotationY: 0.16 },
  ]);
  add('armor-panels', armorGeometry, armorMaterial, [0, 0, 0]);
  const cockpitAssemblyGeometry = mergeParts([
    { geometry: cockpitGeometry, position: [0, 0.45, -0.72] },
    { geometry: canopyGeometry, position: [0, 0.6, -0.74], scale: [0.78, 0.46, 1.32] },
  ]);
  add('cockpit-light', cockpitAssemblyGeometry, cockpitMaterial, [0, 0, 0]);
  const exhaustGeometry = mergeParts([
    { geometry: glowGeometry, position: [-1.12, -0.12, 1.38] },
    { geometry: glowGeometry, position: [1.12, -0.12, 1.38] },
    { geometry: exhaustCoreGeometry, position: [-1.12, -0.12, 1.58] },
    { geometry: exhaustCoreGeometry, position: [1.12, -0.12, 1.58] },
  ]);
  const exhaust = add('engine-exhaust', exhaustGeometry, materials.magenta, [0, 0, 0]);
  addPartMarker('canopy-shell');
  addPartMarker('engine-ring-left');
  addPartMarker('engine-ring-right');
  addPartMarker('exhaust-core-left');
  addPartMarker('exhaust-core-right');

  const edgeLeft = add('edge-light-left', unitBox, materials.magenta, [-1.75, 0.02, 0.52]);
  edgeLeft.scale.set(1.55, 0.11, 0.14);
  edgeLeft.rotation.y = -0.58;
  const edgeRight = add('edge-light-right', unitBox, materials.magenta, [1.75, 0.02, 0.52]);
  edgeRight.scale.set(1.55, 0.11, 0.14);
  edgeRight.rotation.y = 0.58;

  const trimLeft = add('trim-cyan-left', unitBox, materials.cyan, [-0.68, 0.2, -0.18]);
  trimLeft.scale.set(0.08, 0.08, 1.48);
  trimLeft.rotation.y = -0.18;
  const trimRight = add('trim-cyan-right', unitBox, materials.cyan, [0.68, 0.2, -0.18]);
  trimRight.scale.set(0.08, 0.08, 1.48);
  trimRight.rotation.y = 0.18;

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
        root.rotation.z = 0;
        trailLeft.scale.set(1, 1, 1);
        trailRight.scale.set(1, 1, 1);
        exhaust.scale.set(1, 1, 1);
        return;
      }
      const time = Number.isFinite(elapsedSeconds) ? elapsedSeconds : 0;
      const normalizedSpeed = THREE.MathUtils.clamp((speed - 26) / 26, 0, 1);
      const pulse = 1 + Math.sin(time * 15) * 0.06;
      root.position.y = Math.sin(time * 2.6) * 0.08;
      root.rotation.x = Math.sin(time * 1.7) * 0.018;
      trailLeft.scale.set(pulse, pulse, 1 + normalizedSpeed * 0.55);
      trailRight.scale.copy(trailLeft.scale);
      exhaust.scale.setScalar(pulse);
    },
    setFeedbackPulse(strength) {
      if (disposed) return;
      const normalized = Number.isFinite(strength) ? THREE.MathUtils.clamp(strength, 0, 1) : 0;
      for (let index = 0; index < feedbackMaterials.length; index += 1) {
        feedbackMaterials[index].emissiveIntensity = feedbackBaseEmissiveIntensities[index] * (1 + normalized * 0.65);
      }
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      root.clear();
      for (const geometry of geometries) geometry.dispose();
      shipMetal.dispose();
      armorMaterial.dispose();
      cockpitMaterial.dispose();
    },
  };
}

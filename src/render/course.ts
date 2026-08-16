import * as THREE from 'three';

export type Lane = 0 | 1 | 2;

const LANE_X: readonly [-3, 0, 3] = [-3, 0, 3];
const GATE_SPEED = 5;
const GATE_COLLISION_Z = 2;
const DEFAULT_GATE_TRAVEL_SECONDS = 4.8;

export function laneToX(lane: Lane): number {
  return LANE_X[lane];
}

export function lerpLaneX(currentX: number, targetX: number, amount: number): number {
  return currentX + (targetX - currentX) * Math.max(0, Math.min(1, amount));
}

export function advanceCourseZ(
  startZ: number,
  elapsedSeconds: number,
  speed: number,
  recycleAfterZ: number,
  recycleSpan: number,
): number {
  const advanced = startZ + Math.max(0, elapsedSeconds) * speed;
  if (advanced <= recycleAfterZ) return advanced;
  return advanced - Math.ceil((advanced - recycleAfterZ) / recycleSpan) * recycleSpan;
}

export interface Course {
  readonly root: THREE.Group;
  setGateTexture(index: Lane, texture: THREE.Texture | null): void;
  setGateTravelSeconds(seconds: number): void;
  update(elapsedSeconds: number): void;
  resetGatePhase(): void;
  dispose(): void;
}

export function createCourse(): Course {
  const root = new THREE.Group();
  const resources: Array<THREE.BufferGeometry | THREE.Material> = [];
  const gateMaterials: THREE.MeshBasicMaterial[] = [];
  const railGeometry = new THREE.BoxGeometry(0.09, 0.09, 42);
  const railMaterial = new THREE.MeshStandardMaterial({ color: 0x34d7ff, emissive: 0x14779a, emissiveIntensity: 1.7 });
  resources.push(railGeometry, railMaterial);

  let gateStartZ = GATE_COLLISION_Z - GATE_SPEED * DEFAULT_GATE_TRAVEL_SECONDS;
  for (const lane of [0, 1, 2] as const) {
    const rail = new THREE.Mesh(railGeometry, railMaterial);
    rail.position.set(laneToX(lane), -0.7, -16);
    root.add(rail);
  }

  const gateGeometry = new THREE.PlaneGeometry(2.55, 1.7);
  resources.push(gateGeometry);
  const gates: THREE.Mesh[] = [];
  for (const lane of [0, 1, 2] as const) {
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const gate = new THREE.Mesh(gateGeometry, material);
    gate.position.set(laneToX(lane), 1.1, gateStartZ);
    gate.name = `gate-${lane}`;
    gateMaterials.push(material);
    gates.push(gate);
    resources.push(material);
    root.add(gate);
  }

  const obstacleGeometry = new THREE.IcosahedronGeometry(0.42, 0);
  const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0xff6b90, wireframe: true });
  resources.push(obstacleGeometry, obstacleMaterial);
  const obstacles = Array.from({ length: 6 }, (_, index) => {
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    obstacle.position.set(laneToX((index % 3) as Lane), 0.2, -4 - index * 6);
    root.add(obstacle);
    return obstacle;
  });

  let disposed = false;
  let lastElapsedSeconds = 0;
  let gatePhaseStartSeconds = 0;
  return {
    root,
    setGateTexture(index, texture) {
      if (disposed) return;
      gateMaterials[index].map = texture;
      gateMaterials[index].needsUpdate = true;
    },
    setGateTravelSeconds(seconds) {
      if (disposed) return;
      if (!Number.isFinite(seconds) || seconds <= 0) throw new RangeError('gate travel seconds must be positive and finite');
      gateStartZ = GATE_COLLISION_Z - GATE_SPEED * seconds;
      gatePhaseStartSeconds = lastElapsedSeconds;
      for (const gate of gates) gate.position.z = gateStartZ;
    },
    update(elapsedSeconds) {
      if (disposed) return;
      lastElapsedSeconds = Math.max(0, elapsedSeconds);
      const gateElapsed = Math.max(0, lastElapsedSeconds - gatePhaseStartSeconds);
      for (const gate of gates) gate.position.z = advanceCourseZ(
        gateStartZ,
        gateElapsed,
        GATE_SPEED,
        6,
        6 - gateStartZ,
      );
      for (const [index, obstacle] of obstacles.entries()) {
        obstacle.position.z = advanceCourseZ(-4 - index * 6, lastElapsedSeconds, 7, 6, 42);
        obstacle.rotation.x = elapsedSeconds * 0.45 + index;
        obstacle.rotation.y = elapsedSeconds * 0.7 + index;
      }
    },
    resetGatePhase() {
      if (disposed) return;
      gatePhaseStartSeconds = lastElapsedSeconds;
      for (const gate of gates) gate.position.z = gateStartZ;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      root.removeFromParent();
      for (const resource of resources) resource.dispose();
    },
  };
}

import * as THREE from 'three';

export type Lane = 0 | 1 | 2;

const LANE_X: readonly [-3, 0, 3] = [-3, 0, 3];

export function laneToX(lane: Lane): number {
  return LANE_X[lane];
}

export function lerpLaneX(currentX: number, targetX: number, amount: number): number {
  return currentX + (targetX - currentX) * Math.max(0, Math.min(1, amount));
}

export interface Course {
  readonly root: THREE.Group;
  setGateTexture(index: Lane, texture: THREE.Texture | null): void;
  update(elapsedSeconds: number): void;
  dispose(): void;
}

export function createCourse(): Course {
  const root = new THREE.Group();
  const resources: Array<THREE.BufferGeometry | THREE.Material> = [];
  const gateMaterials: THREE.MeshBasicMaterial[] = [];
  const railGeometry = new THREE.BoxGeometry(0.09, 0.09, 42);
  const railMaterial = new THREE.MeshStandardMaterial({ color: 0x34d7ff, emissive: 0x14779a, emissiveIntensity: 1.7 });
  resources.push(railGeometry, railMaterial);

  for (const lane of [0, 1, 2] as const) {
    const rail = new THREE.Mesh(railGeometry, railMaterial);
    rail.position.set(laneToX(lane), -0.7, -16);
    root.add(rail);
  }

  const gateGeometry = new THREE.PlaneGeometry(2.55, 1.7);
  resources.push(gateGeometry);
  for (const lane of [0, 1, 2] as const) {
    const material = new THREE.MeshBasicMaterial({ color: 0x13233e, transparent: true, opacity: 0.96 });
    const gate = new THREE.Mesh(gateGeometry, material);
    gate.position.set(laneToX(lane), 1.1, -18);
    gate.name = `gate-${lane}`;
    gateMaterials.push(material);
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
  return {
    root,
    setGateTexture(index, texture) {
      if (disposed) return;
      gateMaterials[index].map = texture;
      gateMaterials[index].needsUpdate = true;
    },
    update(elapsedSeconds) {
      if (disposed) return;
      for (const [index, obstacle] of obstacles.entries()) {
        obstacle.rotation.x = elapsedSeconds * 0.45 + index;
        obstacle.rotation.y = elapsedSeconds * 0.7 + index;
      }
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      root.removeFromParent();
      for (const resource of resources) resource.dispose();
    },
  };
}

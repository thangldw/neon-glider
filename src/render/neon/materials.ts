import * as THREE from 'three';

export interface NeonMaterials {
  readonly cyan: THREE.MeshStandardMaterial;
  readonly magenta: THREE.MeshStandardMaterial;
  readonly metal: THREE.MeshStandardMaterial;
  readonly obstacle: THREE.MeshStandardMaterial;
  readonly obstacleEdge: THREE.MeshBasicMaterial;
  readonly crystal: THREE.MeshPhysicalMaterial;
  readonly floor: THREE.MeshStandardMaterial;
  readonly trailCyan: THREE.MeshBasicMaterial;
  readonly trailMagenta: THREE.MeshBasicMaterial;
  readonly ownsMaterials: true;
  dispose(): void;
}

export function createNeonMaterials(): NeonMaterials {
  const cyan = new THREE.MeshStandardMaterial({
    color: 0x062f3b,
    emissive: 0x00cfff,
    emissiveIntensity: 1.3,
    metalness: 0.42,
    roughness: 0.2,
  });
  const magenta = new THREE.MeshStandardMaterial({
    color: 0x43072f,
    emissive: 0xff20c8,
    emissiveIntensity: 1.2,
    metalness: 0.38,
    roughness: 0.22,
  });
  const metal = new THREE.MeshStandardMaterial({
    color: 0x5479ad,
    emissive: 0x153766,
    emissiveIntensity: 0.84,
    metalness: 0.68,
    roughness: 0.24,
    flatShading: true,
  });
  const obstacle = new THREE.MeshStandardMaterial({
    color: 0x35102b,
    emissive: 0x4b032d,
    emissiveIntensity: 0.85,
    metalness: 0.72,
    roughness: 0.26,
    flatShading: true,
  });
  const obstacleEdge = new THREE.MeshBasicMaterial({
    color: 0xff31cf,
    wireframe: true,
    toneMapped: false,
    transparent: true,
    opacity: 0.88,
    polygonOffset: true,
    polygonOffsetFactor: -1,
  });
  const crystal = new THREE.MeshPhysicalMaterial({
    color: 0x9cfaff,
    emissive: 0x16dff5,
    emissiveIntensity: 2,
    metalness: 0.12,
    roughness: 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    flatShading: true,
    transparent: true,
    opacity: 0.96,
  });
  const floor = new THREE.MeshStandardMaterial({
    color: 0x456f9f,
    emissive: 0x102f60,
    emissiveIntensity: 0.82,
    metalness: 0.78,
    roughness: 0.18,
    flatShading: true,
  });
  const trailCyan = new THREE.MeshBasicMaterial({
    color: 0x55efff,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const trailMagenta = new THREE.MeshBasicMaterial({
    color: 0xff20c8,
    transparent: true,
    opacity: 0.62,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const palette: { dispose(): void }[] = [
    cyan,
    magenta,
    metal,
    obstacle,
    obstacleEdge,
    crystal,
    floor,
    trailCyan,
    trailMagenta,
  ];
  let disposed = false;

  return {
    cyan,
    magenta,
    metal,
    obstacle,
    obstacleEdge,
    crystal,
    floor,
    trailCyan,
    trailMagenta,
    ownsMaterials: true,
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const material of palette) material.dispose();
    },
  };
}

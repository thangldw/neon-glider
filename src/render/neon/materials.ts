import * as THREE from 'three';

export interface NeonMaterials {
  readonly cyan: THREE.MeshStandardMaterial;
  readonly magenta: THREE.MeshStandardMaterial;
  readonly metal: THREE.MeshStandardMaterial;
  readonly obstacle: THREE.MeshStandardMaterial;
  readonly crystal: THREE.MeshPhysicalMaterial;
  readonly floor: THREE.MeshStandardMaterial;
  readonly trailCyan: THREE.MeshStandardMaterial;
  readonly trailMagenta: THREE.MeshStandardMaterial;
  readonly ownsMaterials: true;
  dispose(): void;
}

export function createNeonMaterials(): NeonMaterials {
  const cyan = new THREE.MeshStandardMaterial({
    color: 0x087c9d,
    emissive: 0x00cfff,
    emissiveIntensity: 3.2,
    metalness: 0.62,
    roughness: 0.22,
  });
  const magenta = new THREE.MeshStandardMaterial({
    color: 0x8d126f,
    emissive: 0xff20c8,
    emissiveIntensity: 2.8,
    metalness: 0.58,
    roughness: 0.25,
  });
  const metal = new THREE.MeshStandardMaterial({
    color: 0x080c20,
    emissive: 0x03051a,
    emissiveIntensity: 0.5,
    metalness: 0.94,
    roughness: 0.3,
  });
  const obstacle = new THREE.MeshStandardMaterial({
    color: 0x150c25,
    emissive: 0x690745,
    emissiveIntensity: 1.15,
    metalness: 0.88,
    roughness: 0.25,
  });
  const crystal = new THREE.MeshPhysicalMaterial({
    color: 0x9cf7ff,
    emissive: 0x00cfff,
    emissiveIntensity: 3.4,
    metalness: 0.15,
    roughness: 0.12,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    transmission: 0.16,
    thickness: 0.45,
    transparent: true,
    opacity: 0.88,
  });
  const floor = new THREE.MeshStandardMaterial({
    color: 0x050b18,
    emissive: 0x00182c,
    emissiveIntensity: 0.72,
    metalness: 0.92,
    roughness: 0.23,
  });
  const trailCyan = new THREE.MeshStandardMaterial({
    color: 0x55efff,
    emissive: 0x00cfff,
    emissiveIntensity: 4,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const trailMagenta = new THREE.MeshStandardMaterial({
    color: 0xff8ce8,
    emissive: 0xff20c8,
    emissiveIntensity: 4.2,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const palette: THREE.Material[] = [cyan, magenta, metal, obstacle, crystal, floor, trailCyan, trailMagenta];
  let disposed = false;

  return {
    cyan,
    magenta,
    metal,
    obstacle,
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

import * as THREE from 'three';

export interface NeonMaterials {
  readonly cyan: THREE.MeshBasicMaterial;
  readonly magenta: THREE.MeshBasicMaterial;
  readonly metal: THREE.MeshPhongMaterial;
  readonly obstacle: THREE.MeshPhongMaterial;
  readonly obstacleEdge: THREE.MeshBasicMaterial;
  readonly crystal: THREE.MeshPhongMaterial;
  readonly floor: THREE.MeshPhongMaterial;
  readonly trailCyan: THREE.MeshBasicMaterial;
  readonly trailMagenta: THREE.MeshBasicMaterial;
  readonly ownsMaterials: true;
  dispose(): void;
}

export function createNeonMaterials(): NeonMaterials {
  const cyan = new THREE.MeshBasicMaterial({
    color: 0x3cecff,
    toneMapped: false,
  });
  const magenta = new THREE.MeshBasicMaterial({
    color: 0xff31cf,
    toneMapped: false,
  });
  const metal = new THREE.MeshPhongMaterial({
    color: 0x365f92,
    emissive: 0x07142f,
    emissiveIntensity: 0.8,
    specular: 0x3b75a8,
    shininess: 42,
    flatShading: true,
  });
  const obstacle = new THREE.MeshPhongMaterial({
    color: 0x541440,
    emissive: 0x560330,
    emissiveIntensity: 0.9,
    specular: 0xff5cd8,
    shininess: 65,
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
  const crystal = new THREE.MeshPhongMaterial({
    color: 0xb9fbff,
    emissive: 0x25dff4,
    emissiveIntensity: 0.85,
    specular: 0xffffff,
    shininess: 110,
    flatShading: true,
    transparent: true,
    opacity: 0.96,
  });
  const floor = new THREE.MeshPhongMaterial({
    color: 0x22598b,
    emissive: 0x03152f,
    emissiveIntensity: 0.75,
    specular: 0x2ebde4,
    shininess: 35,
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
    color: 0xff8ce8,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const palette: THREE.Material[] = [
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

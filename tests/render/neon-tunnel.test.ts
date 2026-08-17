import * as THREE from 'three';
import { expect, it, vi } from 'vitest';
import { createNeonMaterials } from '../../src/render/neon/materials';
import { createNeonTunnel } from '../../src/render/neon/tunnel';

const mathConstructions = vi.hoisted(() => ({ matrix4: 0, vector3: 0, quaternion: 0 }));

vi.mock('three', async (importOriginal) => {
  const actual = await importOriginal<typeof import('three')>();
  class InstrumentedMatrix4 extends actual.Matrix4 {
    constructor() {
      super();
      mathConstructions.matrix4 += 1;
    }
  }
  class InstrumentedVector3 extends actual.Vector3 {
    constructor(x?: number, y?: number, z?: number) {
      super(x, y, z);
      mathConstructions.vector3 += 1;
    }
  }
  class InstrumentedQuaternion extends actual.Quaternion {
    constructor(x?: number, y?: number, z?: number, w?: number) {
      super(x, y, z, w);
      mathConstructions.quaternion += 1;
    }
  }
  return {
    ...actual,
    Matrix4: InstrumentedMatrix4,
    Vector3: InstrumentedVector3,
    Quaternion: InstrumentedQuaternion,
  };
});

function withCanvasContext<T>(run: () => T): T {
  const context = {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    font: '',
    textAlign: '',
    textBaseline: '',
    shadowBlur: 0,
    shadowColor: '',
    set fillStyle(_value: string) {},
  } as unknown as CanvasRenderingContext2D;
  const getContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
  try {
    return run();
  } finally {
    getContext.mockRestore();
  }
}

it('creates a bounded recycled tunnel with named gate and floor groups', () => withCanvasContext(() => {
  const materials = createNeonMaterials();
  const tunnel = createNeonTunnel({ quality: 'desktop', materials });
  const firstRib = tunnel.root.getObjectByName('cyan-ribs') as THREE.InstancedMesh;
  const firstRibMatrix = new THREE.Matrix4();
  const firstRibScale = new THREE.Vector3();
  firstRib.getMatrixAt(0, firstRibMatrix);
  firstRibMatrix.decompose(new THREE.Vector3(), new THREE.Quaternion(), firstRibScale);

  expect(tunnel.root.getObjectByName('tunnel-ribs')).toBeTruthy();
  expect(tunnel.root.getObjectByName('wall-panels')).toBeTruthy();
  expect(tunnel.root.getObjectByName('floor-panels')).toBeTruthy();
  const details = tunnel.root.getObjectByName('panel-detail-instances') as THREE.InstancedMesh;
  expect(details).toMatchObject({ count: 42 });
  expect(details.material).toMatchObject({ wireframe: true, transparent: true });
  expect((tunnel.root.getObjectByName('cyan-ribs') as THREE.InstancedMesh).userData.railInstanceCount).toBe(96);
  expect((tunnel.root.getObjectByName('magenta-ribs') as THREE.InstancedMesh).userData.railInstanceCount).toBe(96);
  expect(tunnel.root.getObjectByName('active-gate')).toBeTruthy();
  expect((tunnel.root.getObjectByName('active-gate-frame') as THREE.InstancedMesh).count).toBe(14);
  expect(tunnel.root.getObjectByName('active-gate-accent')).toBeTruthy();
  expect(tunnel.root.getObjectByName('gate-number')).toBeTruthy();
  expect(tunnel.segmentCount).toBe(24);
  expect(firstRibScale.y).toBeGreaterThanOrEqual(0.09);

  const children = tunnel.root.children.length;
  tunnel.update(1_000, 12);
  expect(tunnel.root.children).toHaveLength(children);
  expect(tunnel.root.children.length).toBeLessThan(80);
  tunnel.dispose();
  materials.dispose();
}));

it('builds bounded tunnel depth layers without increasing per-frame objects', () => withCanvasContext(() => {
  const materials = createNeonMaterials();
  const tunnel = createNeonTunnel({ quality: 'desktop', materials });

  expect(tunnel.root.getObjectByName('recess-panel-instances')).toBeInstanceOf(THREE.InstancedMesh);
  expect(tunnel.root.getObjectByName('floor-seam-instances')).toBeInstanceOf(THREE.InstancedMesh);
  expect(tunnel.root.getObjectByName('gate-inner-glow')).toBeTruthy();
  expect(tunnel.root.children.length).toBeLessThan(24);

  tunnel.dispose();
  materials.dispose();
}));

it('uses instancing and the reduced mobile segment budget', () => withCanvasContext(() => {
  const materials = createNeonMaterials();
  const tunnel = createNeonTunnel({ quality: 'mobile', materials });
  const instances: THREE.InstancedMesh[] = [];
  tunnel.root.traverse((object) => {
    if (object instanceof THREE.InstancedMesh) instances.push(object);
  });

  expect(tunnel.segmentCount).toBe(16);
  const depthLayers = ['recess-panel-instances', 'floor-seam-instances'].map(
    (name) => tunnel.root.getObjectByName(name) as THREE.InstancedMesh,
  );

  expect(instances).toHaveLength(9);
  expect(depthLayers.reduce((total, mesh) => total + mesh.count, 0)).toBeLessThan(220);
  expect(tunnel.root.getObjectByName('panel-detail-instances')).toMatchObject({ visible: false });
  tunnel.dispose();
  materials.dispose();
}));

it('updates the existing gate label texture instead of allocating scene objects', () => withCanvasContext(() => {
  const materials = createNeonMaterials();
  const tunnel = createNeonTunnel({ quality: 'desktop', materials });
  const label = tunnel.root.getObjectByName('gate-number') as THREE.Mesh;
  const texture = (label.material as THREE.MeshBasicMaterial).map;

  tunnel.update(250, 2);

  expect((label.material as THREE.MeshBasicMaterial).map).toBe(texture);
  expect(tunnel.root.getObjectByName('active-gate')!.position.z).toBe(-251);
  tunnel.dispose();
  materials.dispose();
}));

it('keeps a tunnel rib close enough to enclose the chase camera', () => withCanvasContext(() => {
  const materials = createNeonMaterials();
  const tunnel = createNeonTunnel({ quality: 'desktop', materials });
  tunnel.update(145, 1);
  const matrix = new THREE.Matrix4();
  let closestZ = Number.NEGATIVE_INFINITY;
  for (const name of ['cyan-ribs', 'magenta-ribs']) {
    const mesh = tunnel.root.getObjectByName(name) as THREE.InstancedMesh;
    for (let index = 0; index < mesh.count; index += 1) {
      mesh.getMatrixAt(index, matrix);
      closestZ = Math.max(closestZ, matrix.elements[14]);
    }
  }

  expect(closestZ).toBeGreaterThanOrEqual(-4);
  expect(closestZ).toBeLessThanOrEqual(0);
  tunnel.dispose();
  materials.dispose();
}));

it('reuses preallocated Three.js math objects across repeated segment updates', () => withCanvasContext(() => {
  const materials = createNeonMaterials();
  const tunnel = createNeonTunnel({ quality: 'desktop', materials });
  const updatedMeshes = ['cyan-ribs', 'recess-panel-instances', 'floor-seam-instances'].map(
    (name) => tunnel.root.getObjectByName(name) as THREE.InstancedMesh,
  );
  const depthInstanceCount = updatedMeshes.slice(1).reduce((total, mesh) => total + mesh.count, 0);
  const before = updatedMeshes.map((mesh) => {
    const matrix = new THREE.Matrix4();
    mesh.getMatrixAt(0, matrix);
    return matrix;
  });
  const after = updatedMeshes.map(() => new THREE.Matrix4());
  mathConstructions.matrix4 = 0;
  mathConstructions.vector3 = 0;
  mathConstructions.quaternion = 0;

  for (let frame = 1; frame <= 120; frame += 1) tunnel.update(frame / 2, 1);
  for (const [index, mesh] of updatedMeshes.entries()) {
    mesh.getMatrixAt(0, after[index]);
    expect(after[index].elements[14]).not.toBe(before[index].elements[14]);
    for (let element = 0; element < 16; element += 1) {
      if (element !== 14) expect(after[index].elements[element]).toBe(before[index].elements[element]);
    }
  }
  expect(depthInstanceCount).toBeLessThan(320);
  expect(mathConstructions).toEqual({ matrix4: 0, vector3: 0, quaternion: 0 });
  tunnel.dispose();
  materials.dispose();
}));

it('idempotently disposes tunnel resources but leaves shared materials to their owner', () => withCanvasContext(() => {
  const materials = createNeonMaterials();
  const materialDispose = vi.spyOn(materials.floor, 'dispose');
  const tunnel = createNeonTunnel({ quality: 'desktop', materials });
  const label = tunnel.root.getObjectByName('gate-number') as THREE.Mesh;
  const labelMaterial = label.material as THREE.MeshBasicMaterial;
  const textureDispose = vi.spyOn(labelMaterial.map!, 'dispose');
  const labelMaterialDispose = vi.spyOn(labelMaterial, 'dispose');

  tunnel.dispose();
  tunnel.dispose();

  expect(textureDispose).toHaveBeenCalledOnce();
  expect(labelMaterialDispose).toHaveBeenCalledOnce();
  expect(materialDispose).not.toHaveBeenCalled();
  materials.dispose();
}));

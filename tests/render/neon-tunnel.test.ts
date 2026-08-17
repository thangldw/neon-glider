import * as THREE from 'three';
import { expect, it, vi } from 'vitest';
import { createNeonMaterials } from '../../src/render/neon/materials';
import { createNeonTunnel } from '../../src/render/neon/tunnel';

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

  expect(tunnel.root.getObjectByName('tunnel-ribs')).toBeTruthy();
  expect(tunnel.root.getObjectByName('wall-panels')).toBeTruthy();
  expect(tunnel.root.getObjectByName('floor-panels')).toBeTruthy();
  expect(tunnel.root.getObjectByName('active-gate')).toBeTruthy();
  expect(tunnel.root.getObjectByName('gate-number')).toBeTruthy();
  expect(tunnel.segmentCount).toBe(24);

  const children = tunnel.root.children.length;
  tunnel.update(1_000, 12);
  expect(tunnel.root.children).toHaveLength(children);
  expect(tunnel.root.children.length).toBeLessThan(80);
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
  expect(instances.length).toBeGreaterThanOrEqual(4);
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
  expect(tunnel.root.getObjectByName('active-gate')!.position.z).toBe(-250);
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

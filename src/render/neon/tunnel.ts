import * as THREE from 'three';
import type { NeonMaterials } from './materials';

const DESKTOP_SEGMENTS = 24;
const MOBILE_SEGMENTS = 16;
const SEGMENT_SPACING = 8;
const GATE_DISTANCE = 250;
const TUNNEL_RADIUS_X = 6.4;
const TUNNEL_RADIUS_Y = 4.2;
const FLOOR_Y = -TUNNEL_RADIUS_Y * Math.sin(3 * Math.PI / 8);

export interface NeonTunnel {
  readonly root: THREE.Group;
  readonly segmentCount: number;
  update(distance: number, nextGate: number): void;
  dispose(): void;
}

export interface NeonTunnelOptions {
  quality: 'desktop' | 'mobile';
  materials: NeonMaterials;
}

interface Edge {
  x: number;
  y: number;
  length: number;
  angle: number;
}

function octagonEdges(): Edge[] {
  const vertices = Array.from({ length: 8 }, (_, index) => {
    const angle = Math.PI / 8 + index * Math.PI / 4;
    return new THREE.Vector2(Math.cos(angle) * TUNNEL_RADIUS_X, Math.sin(angle) * TUNNEL_RADIUS_Y);
  });
  return vertices.map((start, index) => {
    const end = vertices[(index + 1) % vertices.length];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    return {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2,
      length: Math.hypot(dx, dy),
      angle: Math.atan2(dy, dx),
    };
  });
}

function createGateTexture(gate: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  drawGateNumber(texture, gate);
  return texture;
}

function drawGateNumber(texture: THREE.CanvasTexture, gate: number): void {
  const canvas = texture.image as HTMLCanvasElement;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('2D canvas is unavailable for gate number');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#071129';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#d8fbff';
  context.font = '700 68px "Arial Narrow", "Helvetica Neue", sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.shadowColor = '#00cfff';
  context.shadowBlur = 18;
  context.fillText(`GATE ${gate}`, canvas.width / 2, canvas.height / 2 + 3);
  texture.needsUpdate = true;
}

export function createNeonTunnel({ quality, materials }: NeonTunnelOptions): NeonTunnel {
  const segmentCount = quality === 'desktop' ? DESKTOP_SEGMENTS : MOBILE_SEGMENTS;
  const root = new THREE.Group();
  root.name = 'neon-tunnel';
  const edges = octagonEdges();
  const unitBox = new THREE.BoxGeometry(1, 1, 1);
  const labelGeometry = new THREE.PlaneGeometry(3.4, 0.72);
  const scratchMatrix = new THREE.Matrix4();
  const scratchPosition = new THREE.Vector3();
  const scratchQuaternion = new THREE.Quaternion();
  const scratchScale = new THREE.Vector3();
  const zAxis = new THREE.Vector3(0, 0, 1);

  function setBoxMatrix(
    target: THREE.InstancedMesh,
    index: number,
    edge: Edge,
    z: number,
    thickness: number,
    depth: number,
  ): void {
    scratchPosition.set(edge.x, edge.y, z);
    scratchQuaternion.setFromAxisAngle(zAxis, edge.angle);
    scratchScale.set(edge.length, thickness, depth);
    scratchMatrix.compose(scratchPosition, scratchQuaternion, scratchScale);
    target.setMatrixAt(index, scratchMatrix);
  }

  const ribs = new THREE.Group();
  ribs.name = 'tunnel-ribs';
  const cyanRibs = new THREE.InstancedMesh(unitBox, materials.cyan, segmentCount * 8);
  cyanRibs.name = 'cyan-ribs';
  cyanRibs.userData.railInstanceCount = segmentCount * 4;
  const magentaRibs = new THREE.InstancedMesh(unitBox, materials.magenta, segmentCount * 8);
  magentaRibs.name = 'magenta-ribs';
  magentaRibs.userData.railInstanceCount = segmentCount * 4;
  ribs.add(cyanRibs, magentaRibs);

  const wallGroup = new THREE.Group();
  wallGroup.name = 'wall-panels';
  const wallPanels = new THREE.InstancedMesh(unitBox, materials.metal, segmentCount * 7);
  wallPanels.name = 'wall-panel-instances';
  wallGroup.add(wallPanels);

  const floorGroup = new THREE.Group();
  floorGroup.name = 'floor-panels';
  const floorPanels = new THREE.InstancedMesh(unitBox, materials.floor, segmentCount * 3);
  floorPanels.name = 'floor-panel-instances';
  floorGroup.add(floorPanels);

  for (const mesh of [cyanRibs, magentaRibs, wallPanels, floorPanels]) mesh.frustumCulled = false;

  const activeGate = new THREE.Group();
  activeGate.name = 'active-gate';
  const gateFrame = new THREE.InstancedMesh(unitBox, materials.cyan, 7);
  gateFrame.name = 'active-gate-frame';
  for (let index = 0, instance = 0; index < edges.length; index += 1) {
    if (index === 5) continue;
    setBoxMatrix(gateFrame, instance, edges[index], 0, 0.19, 0.22);
    instance += 1;
  }
  gateFrame.instanceMatrix.needsUpdate = true;
  gateFrame.frustumCulled = false;
  const gateTexture = createGateTexture(1);
  const gateLabelMaterial = new THREE.MeshBasicMaterial({
    map: gateTexture,
    transparent: true,
    toneMapped: false,
  });
  const gateLabel = new THREE.Mesh(labelGeometry, gateLabelMaterial);
  gateLabel.name = 'gate-number';
  gateLabel.position.set(0, FLOOR_Y + 7.2, 0.16);
  activeGate.add(gateFrame, gateLabel);
  root.add(ribs, wallGroup, floorGroup, activeGate);

  const loopLength = segmentCount * SEGMENT_SPACING;
  const cyanSegments = new Uint8Array(cyanRibs.count);
  const magentaSegments = new Uint8Array(magentaRibs.count);
  const cyanOffsets = new Float32Array(cyanRibs.count);
  const magentaOffsets = new Float32Array(magentaRibs.count);
  const wallSegments = new Uint8Array(wallPanels.count);
  const floorSegments = new Uint8Array(floorPanels.count);
  let shownGate = 1;
  let disposed = false;

  function segmentZ(segment: number, phase: number): number {
    let ahead = ((segment * SEGMENT_SPACING - phase) % loopLength + loopLength) % loopLength;
    if (ahead === 0) ahead = loopLength;
    return SEGMENT_SPACING / 2 - ahead;
  }

  function initializeSegments(): void {
    let cyanIndex = 0;
    let magentaIndex = 0;
    let wallIndex = 0;
    let floorIndex = 0;

    for (let segment = 0; segment < segmentCount; segment += 1) {
      const ribZ = segmentZ(segment, 0);
      for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex += 1) {
        const mesh = (segment + edgeIndex) % 2 === 0 ? cyanRibs : magentaRibs;
        const index = mesh === cyanRibs ? cyanIndex++ : magentaIndex++;
        setBoxMatrix(mesh, index, edges[edgeIndex], ribZ, 0.06, 0.12);
        (mesh === cyanRibs ? cyanSegments : magentaSegments)[index] = segment;
        if (edgeIndex !== 5) {
          setBoxMatrix(wallPanels, wallIndex, edges[edgeIndex], ribZ - SEGMENT_SPACING / 2, 0.16, SEGMENT_SPACING * 0.88);
          wallSegments[wallIndex] = segment;
          wallIndex += 1;
        }
      }
      for (const laneX of [-3, 0, 3]) {
        scratchPosition.set(laneX, FLOOR_Y - 0.06, ribZ - SEGMENT_SPACING / 2);
        scratchQuaternion.identity();
        scratchScale.set(2.82, 0.12, SEGMENT_SPACING * 0.9);
        scratchMatrix.compose(scratchPosition, scratchQuaternion, scratchScale);
        floorPanels.setMatrixAt(floorIndex, scratchMatrix);
        floorSegments[floorIndex] = segment;
        floorIndex += 1;
      }
      for (const [mesh, x, y, segments, offsets] of [
        [cyanRibs, -1.5, FLOOR_Y + 0.1, cyanSegments, cyanOffsets],
        [cyanRibs, 5.72, -0.9, cyanSegments, cyanOffsets],
        [cyanRibs, -2.6, 3.45, cyanSegments, cyanOffsets],
        [cyanRibs, -5.1, 1.4, cyanSegments, cyanOffsets],
        [magentaRibs, 1.5, FLOOR_Y + 0.1, magentaSegments, magentaOffsets],
        [magentaRibs, -5.72, -0.9, magentaSegments, magentaOffsets],
        [magentaRibs, 2.6, 3.45, magentaSegments, magentaOffsets],
        [magentaRibs, 5.1, 1.4, magentaSegments, magentaOffsets],
      ] as const) {
        scratchPosition.set(x, y, ribZ - SEGMENT_SPACING / 2);
        scratchQuaternion.identity();
        scratchScale.set(0.045, 0.045, SEGMENT_SPACING * 0.72);
        scratchMatrix.compose(scratchPosition, scratchQuaternion, scratchScale);
        const index = mesh === cyanRibs ? cyanIndex++ : magentaIndex++;
        mesh.setMatrixAt(index, scratchMatrix);
        segments[index] = segment;
        offsets[index] = -SEGMENT_SPACING / 2;
      }
    }
    cyanRibs.instanceMatrix.needsUpdate = true;
    magentaRibs.instanceMatrix.needsUpdate = true;
    wallPanels.instanceMatrix.needsUpdate = true;
    floorPanels.instanceMatrix.needsUpdate = true;
  }

  function updateInstanceZ(
    mesh: THREE.InstancedMesh,
    segments: Uint8Array,
    phase: number,
    zOffset: number | Float32Array,
  ): void {
    const matrices = mesh.instanceMatrix.array;
    for (let instance = 0; instance < segments.length; instance += 1) {
      matrices[instance * 16 + 14] = segmentZ(segments[instance], phase)
        + (typeof zOffset === 'number' ? zOffset : zOffset[instance]);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  function updateSegments(distance: number): void {
    const phase = ((distance % loopLength) + loopLength) % loopLength;
    updateInstanceZ(cyanRibs, cyanSegments, phase, cyanOffsets);
    updateInstanceZ(magentaRibs, magentaSegments, phase, magentaOffsets);
    updateInstanceZ(wallPanels, wallSegments, phase, -SEGMENT_SPACING / 2);
    updateInstanceZ(floorPanels, floorSegments, phase, -SEGMENT_SPACING / 2);
  }

  initializeSegments();
  activeGate.position.z = -GATE_DISTANCE;

  return {
    root,
    segmentCount,
    update(distance, nextGate) {
      if (disposed) return;
      const safeDistance = Number.isFinite(distance) ? distance : 0;
      const safeGate = Number.isSafeInteger(nextGate) && nextGate > 0 ? nextGate : 1;
      updateSegments(safeDistance);
      activeGate.position.z = -(safeGate * GATE_DISTANCE - safeDistance);
      if (safeGate !== shownGate) {
        shownGate = safeGate;
        drawGateNumber(gateTexture, safeGate);
      }
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      root.clear();
      unitBox.dispose();
      labelGeometry.dispose();
      gateTexture.dispose();
      gateLabelMaterial.dispose();
    },
  };
}

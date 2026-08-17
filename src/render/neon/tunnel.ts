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

function setBoxMatrix(
  target: THREE.InstancedMesh,
  index: number,
  edge: Edge,
  z: number,
  thickness: number,
  depth: number,
): void {
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3(edge.x, edge.y, z);
  const quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), edge.angle);
  matrix.compose(position, quaternion, new THREE.Vector3(edge.length, thickness, depth));
  target.setMatrixAt(index, matrix);
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

  const ribs = new THREE.Group();
  ribs.name = 'tunnel-ribs';
  const cyanRibs = new THREE.InstancedMesh(unitBox, materials.cyan, segmentCount * 4);
  cyanRibs.name = 'cyan-ribs';
  const magentaRibs = new THREE.InstancedMesh(unitBox, materials.magenta, segmentCount * 4);
  magentaRibs.name = 'magenta-ribs';
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
  let shownGate = 1;
  let disposed = false;

  function updateSegments(distance: number): void {
    const phase = ((distance % loopLength) + loopLength) % loopLength;
    let cyanIndex = 0;
    let magentaIndex = 0;
    let wallIndex = 0;
    let floorIndex = 0;
    const floorQuaternion = new THREE.Quaternion();
    const floorScale = new THREE.Vector3(2.82, 0.12, SEGMENT_SPACING * 0.9);
    const matrix = new THREE.Matrix4();

    for (let segment = 0; segment < segmentCount; segment += 1) {
      let ahead = ((segment * SEGMENT_SPACING - phase) % loopLength + loopLength) % loopLength;
      if (ahead === 0) ahead = loopLength;
      const ribZ = -ahead;
      for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex += 1) {
        const mesh = (segment + edgeIndex) % 2 === 0 ? cyanRibs : magentaRibs;
        const index = mesh === cyanRibs ? cyanIndex++ : magentaIndex++;
        setBoxMatrix(mesh, index, edges[edgeIndex], ribZ, 0.1, 0.14);
        if (edgeIndex !== 5) {
          setBoxMatrix(wallPanels, wallIndex, edges[edgeIndex], ribZ - SEGMENT_SPACING / 2, 0.16, SEGMENT_SPACING * 0.88);
          wallIndex += 1;
        }
      }
      for (const laneX of [-3, 0, 3]) {
        matrix.compose(
          new THREE.Vector3(laneX, FLOOR_Y - 0.06, ribZ - SEGMENT_SPACING / 2),
          floorQuaternion,
          floorScale,
        );
        floorPanels.setMatrixAt(floorIndex, matrix);
        floorIndex += 1;
      }
    }
    for (const mesh of [cyanRibs, magentaRibs, wallPanels, floorPanels]) mesh.instanceMatrix.needsUpdate = true;
  }

  updateSegments(0);
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

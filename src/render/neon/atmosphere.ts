import * as THREE from 'three';
import type { NeonMaterials } from './materials';

export interface NeonAtmosphere {
  readonly root: THREE.Group;
  readonly particleCount: number;
  update(distance: number, elapsedSeconds: number, speed: number, reducedMotion: boolean): void;
  dispose(): void;
}

const DEPTH_SPAN = 177;

export function createNeonAtmosphere(
  quality: 'desktop' | 'mobile',
  materials: NeonMaterials,
): NeonAtmosphere {
  const particleCount = quality === 'desktop' ? 72 : 36;
  const positions = new Float32Array(particleCount * 3);
  const baseZ = new Float32Array(particleCount);
  const colors = new Float32Array(particleCount * 3);
  const cyan = new THREE.Color(materials.cyan.color);
  const magenta = new THREE.Color(materials.magenta.color);

  for (let index = 0; index < particleCount; index += 1) {
    const offset = index * 3;
    const side = index % 2 === 0 ? -1 : 1;
    positions[offset] = side * (3.65 + ((index * 17) % 19) * 0.12);
    positions[offset + 1] = -2.9 + ((index * 11) % 23) * 0.25;
    baseZ[index] = 4 + ((index * 37) % 173);
    const color = index % 3 === 0 ? magenta : cyan;
    colors[offset] = color.r;
    colors[offset + 1] = color.g;
    colors[offset + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  const positionAttribute = new THREE.BufferAttribute(positions, 3);
  positionAttribute.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('position', positionAttribute);
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: quality === 'desktop' ? 0.075 : 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const points = new THREE.Points(geometry, material);
  points.name = 'speed-streaks';
  points.frustumCulled = false;

  const root = new THREE.Group();
  root.name = 'neon-atmosphere';
  root.add(points);
  let disposed = false;

  return {
    root,
    particleCount,
    update(distance, elapsedSeconds, speed, reducedMotion) {
      if (disposed) return;
      const safeDistance = Number.isFinite(distance) ? distance : 0;
      const safeTime = Number.isFinite(elapsedSeconds) ? elapsedSeconds : 0;
      const safeSpeed = Number.isFinite(speed) ? speed : 26;
      const speedPhase = reducedMotion ? 0 : safeTime * THREE.MathUtils.clamp(safeSpeed, 26, 52) * 0.35;
      for (let index = 0; index < particleCount; index += 1) {
        positions[index * 3 + 2] = -(((baseZ[index] + safeDistance + speedPhase) % DEPTH_SPAN) + 3);
      }
      positionAttribute.needsUpdate = true;
      material.opacity = reducedMotion ? 0.42 : 0.72;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      root.removeFromParent();
      root.clear();
      geometry.dispose();
      material.dispose();
    },
  };
}

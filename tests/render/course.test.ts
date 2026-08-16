import * as THREE from 'three';
import { expect, it } from 'vitest';
import { advanceCourseZ, createCourse, laneToX, lerpLaneX } from '../../src/render/course';

it('maps the three selectable lanes symmetrically across the course', () => {
  expect([laneToX(0), laneToX(1), laneToX(2)]).toEqual([-3, 0, 3]);
});

it('moves a visual lane position toward its target without changing simulation state', () => {
  expect(lerpLaneX(-3, 3, 0.25)).toBe(-1.5);
  expect(lerpLaneX(-3, 3, 4)).toBe(3);
});

it('keeps term maps untinted so their white glyph pixels remain readable', () => {
  const course = createCourse();
  const gates = course.root.children.filter((child) => child.name.startsWith('gate-')) as THREE.Mesh[];

  expect(gates).toHaveLength(3);
  for (const gate of gates) expect((gate.material as THREE.MeshBasicMaterial).color.getHex()).toBe(0xffffff);
  course.dispose();
});

it('advances forward positions and deterministically recycles them behind the player', () => {
  expect(advanceCourseZ(-22, 6, 5, 6, 28)).toBe(-20);
  expect(advanceCourseZ(2, 1, 5, 6, 28)).toBe(-21);
});

it('moves gates forward and resets their phase without touching simulation state', () => {
  const course = createCourse();
  const gate = course.root.getObjectByName('gate-1')!;
  const startingZ = gate.position.z;

  course.update(2);
  expect(gate.position.z).toBeGreaterThan(startingZ);
  course.resetGatePhase();
  course.update(2);
  expect(gate.position.z).toBe(startingZ);
  course.dispose();
});

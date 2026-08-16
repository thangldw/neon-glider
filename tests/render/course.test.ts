import { expect, it } from 'vitest';
import { laneToX, lerpLaneX } from '../../src/render/course';

it('maps the three selectable lanes symmetrically across the course', () => {
  expect([laneToX(0), laneToX(1), laneToX(2)]).toEqual([-3, 0, 3]);
});

it('moves a visual lane position toward its target without changing simulation state', () => {
  expect(lerpLaneX(-3, 3, 0.25)).toBe(-1.5);
  expect(lerpLaneX(-3, 3, 4)).toBe(3);
});

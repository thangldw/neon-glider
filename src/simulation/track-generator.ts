import { createRng } from './rng';
import type { Lane, TrackEntity, TrackEntityKind } from './runner-types';

const SEGMENT_LENGTH = 20;
const SPAWN_OFFSET = 80;
const MAX_SEGMENT = Math.floor((Number.MAX_SAFE_INTEGER - SPAWN_OFFSET) / SEGMENT_LENGTH);
const LANES: readonly Lane[] = [0, 1, 2];
const OBSTACLE_KINDS: readonly TrackEntityKind[] = ['cube', 'prism', 'wall'];

export interface GeneratedSegment {
  rngState: number;
  entities: TrackEntity[];
  reachableLanes: Lane[];
}

function assertNonNegativeInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0) throw new RangeError(`${name} must be a non-negative safe integer`);
}

function pickLane(available: Lane[], roll: number): Lane {
  return available.splice(Math.floor(roll * available.length), 1)[0];
}

function assertReachableLanes(value: readonly Lane[]): void {
  if (value.length === 0 || new Set(value).size !== value.length || value.some((lane) => !LANES.includes(lane))) {
    throw new RangeError('reachableLanes must be a non-empty unique lane set');
  }
}

export function generateSegment(
  rngState: number,
  segment: number,
  tier: number,
  reachableLanes: readonly Lane[] = LANES,
): GeneratedSegment {
  if (!Number.isFinite(rngState)) throw new RangeError('rngState must be finite');
  assertNonNegativeInteger(segment, 'segment');
  assertNonNegativeInteger(tier, 'tier');
  assertReachableLanes(reachableLanes);
  if (segment > MAX_SEGMENT) throw new RangeError('segment exceeds the serializable distance limit');

  const rng = createRng(rngState);
  const obstacleCountRoll = rng.next();
  const firstLaneRoll = rng.next();
  const secondLaneRoll = rng.next();
  const firstKindRoll = rng.next();
  const secondKindRoll = rng.next();
  const crystalRoll = rng.next();
  const crystalLaneRoll = rng.next();
  const obstacleCount = tier < 2 || obstacleCountRoll < 0.5 ? 1 : 2;
  const protectedLane = reachableLanes[Math.floor(firstLaneRoll * reachableLanes.length)];
  const obstacleCandidates = LANES.filter((lane) => lane !== protectedLane);
  const obstacleLanes = [pickLane(obstacleCandidates, secondLaneRoll)];
  if (obstacleCount === 2) obstacleLanes.push(pickLane(obstacleCandidates, firstKindRoll));
  const openLanes = LANES.filter((lane) => !obstacleLanes.includes(lane));

  const distance = SPAWN_OFFSET + segment * SEGMENT_LENGTH;
  const entities: TrackEntity[] = obstacleLanes.map((lane, index) => ({
    id: `segment-${segment}-obstacle-${index}`,
    kind: OBSTACLE_KINDS[Math.floor((index === 0 ? firstKindRoll : secondKindRoll) * OBSTACLE_KINDS.length)],
    lane,
    distance,
    segment,
  }));
  if (crystalRoll < 0.5) {
    const lane = openLanes[Math.floor(crystalLaneRoll * openLanes.length)];
    entities.push({ id: `segment-${segment}-crystal`, kind: 'crystal', lane, distance, segment });
  }

  return { rngState: rng.state(), entities, reachableLanes: openLanes };
}

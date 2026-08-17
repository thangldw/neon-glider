import { generateRunnerSegment, runnerRngStateAt } from './track-generator';
import type { Lane, RunnerState, TrackEntity } from './runner-types';

export const GAME_VERSION = 'neon-glider-2026-08-17' as const;
export const START_SPEED = 26;
export const MAX_SPEED = 52;
export const START_ENERGY = 100;
export const GATE_DISTANCE = 250;
export const SEGMENT_LENGTH = 20;
export const LOOKAHEAD_DISTANCE = 600;

const CRYSTAL_ENERGY = 15;
const GATE_ENERGY = 5;
const GATE_SPEED = 1.5;
const GATE_MULTIPLIER = 0.25;
const MAX_MULTIPLIER = 8;
const SCORE_PER_METER = 10;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function assertFinite(value: number, name: string): void {
  if (!Number.isFinite(value)) throw new RangeError(`${name} must be finite`);
}

function segmentTier(segment: number): number {
  return Math.floor(Math.max(0, 80 + segment * SEGMENT_LENGTH - LOOKAHEAD_DISTANCE) / GATE_DISTANCE);
}

function fillLookahead(run: RunnerState): Pick<RunnerState, 'rngState' | 'segmentCursor' | 'entities' | 'reachableLanes'> {
  let segmentCursor = run.segmentCursor;
  let reachableLanes = run.reachableLanes;
  const entities = [...run.entities];
  while (80 + segmentCursor * SEGMENT_LENGTH <= run.distance + LOOKAHEAD_DISTANCE) {
    const generated = generateRunnerSegment(run.seed, segmentCursor, segmentTier(segmentCursor));
    segmentCursor += 1;
    entities.push(...generated.entities);
    reachableLanes = generated.reachableLanes;
  }
  return { rngState: runnerRngStateAt(run.seed, segmentCursor), segmentCursor, entities, reachableLanes };
}

export function createRunner(seed: number, reducedMotion = false): RunnerState {
  assertFinite(seed, 'seed');
  if (typeof reducedMotion !== 'boolean') throw new RangeError('reducedMotion must be a boolean');
  const initial: RunnerState = {
    schemaVersion: 2,
    gameVersion: GAME_VERSION,
    seed: seed >>> 0,
    rngState: seed >>> 0,
    status: 'playing',
    endReason: null,
    reducedMotion,
    lane: 1,
    distance: 0,
    speed: START_SPEED,
    energy: START_ENERGY,
    score: 0,
    multiplier: 1,
    gates: 0,
    crystals: 0,
    segmentCursor: 0,
    reachableLanes: [0, 1, 2],
    entities: [],
  };
  return { ...initial, ...fillLookahead(initial) };
}

export function moveRunnerLane(run: RunnerState, direction: number): RunnerState {
  if (run.status !== 'playing') return run;
  assertFinite(direction, 'direction');
  const lane = clamp(run.lane + Math.sign(direction), 0, 2) as Lane;
  return lane === run.lane ? run : { ...run, lane };
}

function isObstacle(entity: TrackEntity): boolean {
  return entity.kind !== 'crystal';
}

export function advanceRunner(run: RunnerState, deltaSeconds: number): RunnerState {
  if (run.status !== 'playing') return run;
  assertFinite(deltaSeconds, 'deltaSeconds');
  if (deltaSeconds < 0 || deltaSeconds > 0.25) throw new RangeError('deltaSeconds must be in [0, 0.25]');

  const oldDistance = run.distance;
  const intendedDistance = oldDistance + run.speed * deltaSeconds;
  const impactDistance = run.entities
    .filter((entity) => isObstacle(entity) && entity.lane === run.lane && entity.distance > oldDistance && entity.distance <= intendedDistance)
    .reduce<number | null>((nearest, entity) => nearest === null || entity.distance < nearest ? entity.distance : nearest, null);
  const collision = impactDistance !== null;
  const distance = impactDistance ?? intendedDistance;
  const gatesCrossed = Math.max(0, Math.floor(distance / GATE_DISTANCE) - Math.floor(oldDistance / GATE_DISTANCE));
  const gates = run.gates + gatesCrossed;
  const speed = clamp(run.speed + gatesCrossed * GATE_SPEED, START_SPEED, MAX_SPEED);
  const multiplier = clamp(run.multiplier + gatesCrossed * GATE_MULTIPLIER, 1, MAX_MULTIPLIER);
  const crossed = run.entities
    .filter((entity) => entity.distance > oldDistance && entity.distance <= distance)
    .sort((left, right) => left.distance - right.distance || Number(isObstacle(right)) - Number(isObstacle(left)) || left.id.localeCompare(right.id));
  const collectedCrystals = crossed.filter((entity) => entity.kind === 'crystal' && entity.lane === run.lane).length;
  const entities = run.entities.filter((entity) => entity.distance > distance);
  const energy = clamp(
    run.energy - (2.5 + Math.min(run.gates, 10) * 0.2) * ((distance - oldDistance) / run.speed) + gatesCrossed * GATE_ENERGY + collectedCrystals * CRYSTAL_ENERGY,
    0,
    START_ENERGY,
  );
  const next: RunnerState = {
    ...run,
    distance,
    speed,
    energy,
    score: run.score + (distance - oldDistance) * SCORE_PER_METER * multiplier + collectedCrystals * 50 * multiplier,
    multiplier,
    gates,
    crystals: run.crystals + collectedCrystals,
    entities,
    status: collision || energy === 0 ? 'complete' : 'playing',
    endReason: collision ? 'collision' : energy === 0 ? 'depleted' : null,
  };
  return next.status === 'complete' ? next : { ...next, ...fillLookahead(next) };
}

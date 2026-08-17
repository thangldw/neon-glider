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

interface FrameResolution {
  distance: number;
  energy: number;
  gatesCrossed: number;
  collectedCrystals: number;
  endReason: 'collision' | 'depleted' | null;
}

function energyDrainRate(gates: number): number {
  return 2.5 + Math.min(gates, 10) * 0.2;
}

function resolveFrame(run: RunnerState, intendedDistance: number): FrameResolution {
  const eventDistances = new Set<number>([intendedDistance]);
  for (
    let gateDistance = (Math.floor(run.distance / GATE_DISTANCE) + 1) * GATE_DISTANCE;
    gateDistance <= intendedDistance;
    gateDistance += GATE_DISTANCE
  ) {
    eventDistances.add(gateDistance);
  }
  for (const entity of run.entities) {
    if (entity.lane === run.lane && entity.distance > run.distance && entity.distance <= intendedDistance) {
      eventDistances.add(entity.distance);
    }
  }

  let distance = run.distance;
  let energy = run.energy;
  let gates = run.gates;
  let collectedCrystals = 0;
  for (const eventDistance of [...eventDistances].sort((left, right) => left - right)) {
    const drainRate = energyDrainRate(gates);
    const travelSeconds = (eventDistance - distance) / run.speed;
    const drained = drainRate * travelSeconds;
    if (drained > energy) {
      const depletionSeconds = energy / drainRate;
      return {
        distance: distance + depletionSeconds * run.speed,
        energy: 0,
        gatesCrossed: gates - run.gates,
        collectedCrystals,
        endReason: 'depleted',
      };
    }
    energy -= drained;
    distance = eventDistance;

    if (eventDistance > 0 && eventDistance % GATE_DISTANCE === 0) {
      gates += 1;
      energy = clamp(energy + GATE_ENERGY, 0, START_ENERGY);
    }
    const collides = run.entities.some((entity) => (
      entity.distance === eventDistance && entity.lane === run.lane && isObstacle(entity)
    ));
    if (collides) {
      return {
        distance,
        energy,
        gatesCrossed: gates - run.gates,
        collectedCrystals,
        endReason: 'collision',
      };
    }
    const crystalsAtEvent = run.entities.filter((entity) => (
      entity.distance === eventDistance && entity.lane === run.lane && entity.kind === 'crystal'
    )).length;
    if (crystalsAtEvent > 0) {
      collectedCrystals += crystalsAtEvent;
      energy = clamp(energy + crystalsAtEvent * CRYSTAL_ENERGY, 0, START_ENERGY);
    }
    if (energy === 0) {
      return {
        distance,
        energy: 0,
        gatesCrossed: gates - run.gates,
        collectedCrystals,
        endReason: 'depleted',
      };
    }
  }

  return {
    distance: intendedDistance,
    energy,
    gatesCrossed: gates - run.gates,
    collectedCrystals,
    endReason: null,
  };
}

export function advanceRunner(run: RunnerState, deltaSeconds: number): RunnerState {
  if (run.status !== 'playing') return run;
  assertFinite(deltaSeconds, 'deltaSeconds');
  if (deltaSeconds < 0 || deltaSeconds > 0.25) throw new RangeError('deltaSeconds must be in [0, 0.25]');

  const oldDistance = run.distance;
  const intendedDistance = oldDistance + run.speed * deltaSeconds;
  const resolution = resolveFrame(run, intendedDistance);
  const { distance, gatesCrossed, collectedCrystals } = resolution;
  const gates = run.gates + gatesCrossed;
  const speed = clamp(run.speed + gatesCrossed * GATE_SPEED, START_SPEED, MAX_SPEED);
  const multiplier = clamp(run.multiplier + gatesCrossed * GATE_MULTIPLIER, 1, MAX_MULTIPLIER);
  const entities = run.entities.filter((entity) => entity.distance > distance);
  const next: RunnerState = {
    ...run,
    distance,
    speed,
    energy: resolution.energy,
    score: run.score + (distance - oldDistance) * SCORE_PER_METER * multiplier + collectedCrystals * 50 * multiplier,
    multiplier,
    gates,
    crystals: run.crystals + collectedCrystals,
    entities,
    status: resolution.endReason ? 'complete' : 'playing',
    endReason: resolution.endReason,
  };
  return next.status === 'complete' ? next : { ...next, ...fillLookahead(next) };
}

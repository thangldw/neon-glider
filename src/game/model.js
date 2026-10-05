export const LANES = [-1, 0, 1];
export const PHASES = ["start", "countdown", "playing", "paused", "gameover"];
export const INITIAL_ENERGY = 100;

const BASE_SPEED = 30;
const MAX_SPEED = 54;
const HIT_Z = 2.4;
const SPAWN_Z = 118;

function seeded(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function nextPattern(state) {
  const random = seeded(state.seed + state.nextId);
  const shuffled = [...LANES];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const blockerCount = state.gate >= 3 && random() > 0.48 ? 2 : 1;
  const blockerLanes = shuffled.slice(0, blockerCount);
  const openLanes = LANES.filter((lane) => !blockerLanes.includes(lane));
  const pickupLane = openLanes[Math.floor(random() * openLanes.length)];
  let nextId = state.nextId;
  const objects = [];

  for (const lane of blockerLanes) {
    const blockerId = nextId++;
    objects.push({ id: blockerId, kind: "blocker", lane, z: SPAWN_Z, resolved: false });
    objects.push({ id: nextId++, kind: "warning", lane, z: SPAWN_Z - 12, resolved: false });
  }
  objects.push({ id: nextId++, kind: "pickup", lane: pickupLane, z: SPAWN_Z - 5, resolved: false });

  return { objects, nextId };
}

export function createGameState(seed = 1) {
  return {
    phase: "start",
    seed,
    lane: 0,
    lastLaneChange: -100,
    score: 0,
    distance: 0,
    gate: 1,
    energy: INITIAL_ENERGY,
    multiplier: 1,
    boost: 100,
    boosting: false,
    combo: 0,
    bestCombo: 0,
    pickups: 0,
    nearMisses: 0,
    hits: 0,
    speed: BASE_SPEED,
    spawnClock: 0,
    nextId: 1,
    objects: [],
  };
}

export function startRun(state) {
  return { ...createGameState(state.seed), phase: "playing" };
}

export function moveLane(state, delta) {
  if (state.phase !== "playing") return state;
  const lane = Math.max(-1, Math.min(1, state.lane + delta));
  return lane === state.lane ? state : { ...state, lane, lastLaneChange: state.distance };
}

export function togglePause(state) {
  if (state.phase === "playing") return { ...state, phase: "paused" };
  if (state.phase === "paused") return { ...state, phase: "playing" };
  return state;
}

export function setBoost(state, active) {
  if (state.phase !== "playing") return state;
  return { ...state, boosting: Boolean(active) && state.boost > 0 };
}

export function stepGame(state, dtMs) {
  if (state.phase !== "playing") return { state, events: [] };

  const dtSeconds = Math.min(50, Math.max(0, dtMs)) / 1000;
  const boosting = state.boosting && state.boost > 0;
  const speed = Math.min(MAX_SPEED, BASE_SPEED + state.distance / 120) * (boosting ? 1.45 : 1);
  const distance = state.distance + speed * dtSeconds * 0.32;
  const gate = Math.floor(distance / 250) + 1;
  const events = gate > state.gate ? ["gate"] : [];
  let energy = Math.max(0, state.energy - dtSeconds * (1.7 + speed * 0.018));
  let multiplier = state.multiplier;
  let { combo, bestCombo, pickups, nearMisses, hits } = state;
  let objects = state.objects.map((object) => ({ ...object, z: object.z - speed * dtSeconds }));

  objects = objects.map((object) => {
    if (object.resolved || object.kind === "warning" || object.z > HIT_Z) return object;
    if (object.z < -8) return { ...object, resolved: true };
    if (object.lane !== state.lane) {
      if (object.kind === "blocker" && Math.abs(object.lane - state.lane) === 1 && state.distance - state.lastLaneChange < 3) {
        nearMisses += 1;
        combo += 1;
        multiplier = Math.min(4, Number((multiplier + 0.1).toFixed(1)));
        events.push("near-miss");
      }
      return { ...object, resolved: true };
    }

    if (object.kind === "pickup") {
      energy = Math.min(INITIAL_ENERGY, energy + 14);
      multiplier = Math.min(4, Number((multiplier + 0.2).toFixed(1)));
      pickups += 1;
      combo += 1;
      events.push("collect");
    } else if (object.kind === "blocker") {
      energy = Math.max(0, energy - 26);
      multiplier = 1;
      combo = 0;
      hits += 1;
      events.push("hit");
    }
    return { ...object, resolved: true };
  });

  objects = objects.filter((object) => object.z >= -8);
  const spawnInterval = Math.max(0.72, 1.25 - speed * 0.009);
  let spawnClock = state.spawnClock + dtSeconds;
  let nextId = state.nextId;
  if (spawnClock >= spawnInterval) {
    spawnClock -= spawnInterval;
    const pattern = nextPattern({ ...state, gate, nextId });
    objects.push(...pattern.objects);
    nextId = pattern.nextId;
  }

  let phase = state.phase;
  if (energy <= 0) {
    phase = "gameover";
    if (!events.includes("gameover")) events.push("gameover");
  }

  return {
    state: {
      ...state,
      phase,
      speed,
      boosting: boosting && state.boost - dtSeconds * 32 > 0,
      boost: Math.max(0, Math.min(100, state.boost + dtSeconds * (boosting ? -32 : 13))),
      combo,
      bestCombo: Math.max(bestCombo, combo),
      pickups,
      nearMisses,
      hits,
      distance,
      gate,
      energy,
      multiplier,
      score: state.score + speed * dtSeconds * 2.2 * multiplier,
      spawnClock,
      nextId,
      objects,
    },
    events,
  };
}

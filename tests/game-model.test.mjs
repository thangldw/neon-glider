import assert from "node:assert/strict";
import test from "node:test";
import {
  INITIAL_ENERGY,
  createGameState,
  moveLane,
  startRun,
  stepGame,
  togglePause,
} from "../src/game/model.js";

test("lane movement clamps to the three legal lanes", () => {
  let state = startRun(createGameState(7));
  state = moveLane(state, -1);
  state = moveLane(state, -1);
  assert.equal(state.lane, -1);
  state = moveLane(state, 1);
  state = moveLane(state, 1);
  state = moveLane(state, 1);
  assert.equal(state.lane, 1);
});

test("pause freezes distance, score, energy, and objects", () => {
  const playing = startRun(createGameState(11));
  const paused = togglePause(playing);
  const result = stepGame(paused, 1000);
  assert.deepEqual(result.state, paused);
  assert.deepEqual(result.events, []);
});

test("every blocker pattern preserves at least one open lane", () => {
  let state = startRun(createGameState(19));
  for (let i = 0; i < 200; i += 1) state = stepGame(state, 100).state;
  const buckets = Map.groupBy(
    state.objects.filter((object) => object.kind === "blocker"),
    (object) => Math.round(object.z / 8),
  );
  for (const blockers of buckets.values()) {
    assert.ok(new Set(blockers.map((object) => object.lane)).size <= 2);
  }
});

test("pickup rewards energy and multiplier while blocker hits reset multiplier", () => {
  const base = startRun(createGameState(23));
  const pickupState = {
    ...base,
    energy: 60,
    objects: [{ id: 1, kind: "pickup", lane: 0, z: 1, resolved: false }],
  };
  const collected = stepGame(pickupState, 16);
  assert.ok(collected.state.energy > 60);
  assert.ok(collected.state.multiplier > 1);
  assert.deepEqual(collected.events, ["collect"]);

  const hitState = {
    ...collected.state,
    objects: [{ id: 2, kind: "blocker", lane: 0, z: 1, resolved: false }],
  };
  const hit = stepGame(hitState, 16);
  assert.equal(hit.state.multiplier, 1);
  assert.ok(hit.state.energy < INITIAL_ENERGY);
  assert.deepEqual(hit.events, ["hit"]);
});

test("speed increases with distance but never exceeds the cap", () => {
  let state = startRun(createGameState(29));
  for (let i = 0; i < 600; i += 1) state = stepGame(state, 100).state;
  assert.ok(state.speed > 28);
  assert.ok(state.speed <= 54);
});

import assert from "node:assert/strict";
import test from "node:test";
import { readStore, writeStore } from "../src/storage.js";
import { shouldIgnoreKey } from "../src/input.js";
import { shouldPublish } from "../src/game/publish.js";
import { createGameState, startRun, stepGame } from "../src/game/model.js";

const target = (matches) => ({ closest: (selector) => (selector.split(",").map((x) => x.trim()).some((x) => matches.includes(x)) ? {} : null) });

test("storage helpers survive a throwing localStorage", () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    get() { throw new DOMException("denied", "SecurityError"); },
  });
  try {
    assert.equal(readStore("k", "fallback"), "fallback");
    assert.doesNotThrow(() => writeStore("k", 1));
  } finally {
    if (original) Object.defineProperty(globalThis, "localStorage", original);
    else delete globalThis.localStorage;
  }
});

test("storage helpers read and write through localStorage when available", () => {
  const data = new Map();
  globalThis.localStorage = { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => data.set(k, v) };
  try {
    assert.equal(readStore("a", "x"), "x");
    writeStore("a", 5);
    assert.equal(readStore("a", "x"), "5");
  } finally { delete globalThis.localStorage; }
});

test("a focused button still lets lane keys through but keeps Enter and Space", () => {
  const button = target(["button"]);
  assert.equal(shouldIgnoreKey({ target: button, key: "ArrowLeft", code: "ArrowLeft" }), false);
  assert.equal(shouldIgnoreKey({ target: button, key: "a", code: "KeyA" }), false);
  assert.equal(shouldIgnoreKey({ target: button, key: "Enter", code: "Enter" }), true);
  assert.equal(shouldIgnoreKey({ target: button, key: " ", code: "Space" }), true);
  assert.equal(shouldIgnoreKey({ target: target(["input"]), key: "a", code: "KeyA" }), true);
  assert.equal(shouldIgnoreKey({ target: target([]), key: "Enter", code: "Enter" }), false);
});

test("different seeds produce different obstacle layouts", () => {
  const layout = (seed) => {
    let state = startRun(createGameState(seed));
    for (let i = 0; i < 400; i++) state = stepGame({ ...state, energy: 100 }, 16).state;
    return state.objects.map((o) => `${o.kind}${o.lane}`).join();
  };
  assert.equal(layout(5), layout(5));
  const layouts = new Set([1, 2, 3, 4, 5, 6, 7, 8].map((seed) => layout(seed * 7919)));
  assert.ok(layouts.size > 1);
});

test("multiplier decays toward 1 but never below", () => {
  let state = { ...startRun(createGameState(3)), multiplier: 2 };
  for (let i = 0; i < 60; i++) state = stepGame({ ...state, energy: 100, objects: [] }, 16).state;
  assert.ok(state.multiplier < 2 && state.multiplier >= 1);
  for (let i = 0; i < 4000; i++) state = stepGame({ ...state, energy: 100, objects: [] }, 16).state;
  assert.equal(state.multiplier, 1);
});

test("boost drains energy faster than cruising", () => {
  const run = (boosting) => stepGame({ ...startRun(createGameState(9)), boosting, objects: [] }, 50).state.energy;
  assert.ok(run(true) < run(false));
});

test("HUD publishing is throttled but structural changes publish at once", () => {
  const base = { ...startRun(createGameState(1)), countdown: undefined };
  assert.equal(shouldPublish(base, { ...base, score: 5 }, [], 10, 0), false);
  assert.equal(shouldPublish(base, { ...base, score: 5 }, [], 100, 0), true);
  assert.equal(shouldPublish(base, { ...base, lane: 1 }, [], 10, 0), true);
  assert.equal(shouldPublish(base, { ...base, boosting: true }, [], 10, 0), true);
  assert.equal(shouldPublish(base, { ...base, phase: "gameover" }, [], 10, 0), true);
  assert.equal(shouldPublish(base, base, ["collect"], 10, 0), true);
});

test("energy drain grows with gate so a clean run cannot last forever", () => {
  const drain = (gate) => {
    const base = { ...startRun(createGameState(2)), gate, distance: (gate - 1) * 250, objects: [] };
    return base.energy - stepGame(base, 50).state.energy;
  };
  assert.ok(drain(12) > drain(1) * 2);
});

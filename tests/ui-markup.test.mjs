import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const hud = await readFile(new URL("../src/ui/GameHud.jsx", import.meta.url), "utf8");
const overlays = await readFile(new URL("../src/ui/GameOverlays.jsx", import.meta.url), "utf8");

test("HUD exposes score, distance, multiplier, gate, energy, and pause semantics", () => {
  assert.match(hud, /aria-label="Score"/);
  assert.match(hud, /aria-label="Distance and gate"/);
  assert.match(hud, /role="progressbar"/);
  assert.match(hud, /aria-valuenow=\{Math\.round\(state\.energy\)\}/);
  assert.match(hud, /aria-label="Pause"/);
});

test("start overlay includes goal, controls, start, and reduced motion", () => {
  assert.match(overlays, /NEON GLIDER/);
  assert.match(overlays, /SURVIVE\. DODGE OBSTACLES\. KEEP YOUR ENERGY UP\./);
  assert.match(overlays, /A \/ D/);
  assert.match(overlays, /Reduced motion/);
  assert.match(overlays, />Start</);
});

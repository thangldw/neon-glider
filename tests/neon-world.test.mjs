import assert from "node:assert/strict";
import test from "node:test";
import * as neonWorld from "../src/game/neonWorld.js";

const { blockerScale, buildNeonScene, responsiveHorizontalScale } = neonWorld;

test("scene contains named tunnel, lane, glider, obstacle, pickup, and effect layers", () => {
  const { scene } = buildNeonScene();
  for (const name of ["tunnel", "lanes", "speed-lines", "flow", "glider", "objects", "effects"]) {
    assert.ok(scene.getObjectByName(name), `missing ${name}`);
  }
});

test("tunnel uses repeated polygon ribs and exactly three lane guides", () => {
  const { scene } = buildNeonScene();
  const tunnel = scene.getObjectByName("tunnel");
  assert.equal(tunnel.children.length, 28);
  assert.equal(scene.getObjectByName("lanes").children.length, 3);
  assert.ok(tunnel.children[0].position.z >= -2.1);
  assert.ok(tunnel.children[0].children.length >= 2);
});

test("glider remains a compact single object group", () => {
  const { scene } = buildNeonScene();
  const glider = scene.getObjectByName("glider");
  assert.equal(glider.type, "Group");
  assert.ok(glider.children.length >= 5);
  assert.ok(glider.children.length <= 12);
  assert.ok(glider.scale.x <= 0.75);
  assert.ok(glider.position.z <= 2.1);
  assert.equal(glider.children[1].material.side, 2);
  assert.equal(glider.children[2].material.side, 2);
});

test("a near blocker stays within a single lane", () => {
  const blockerWidth = 2.55 * blockerScale(1);
  assert.ok(blockerWidth <= 2.75, `blocker width ${blockerWidth} exceeds one lane`);
});

test("portrait view compresses lane positions and vehicle width", () => {
  assert.equal(responsiveHorizontalScale(16 / 9), 1);
  assert.ok(responsiveHorizontalScale(390 / 844) <= 0.32);
});

test("blocker face uses a four-segment broken X", () => {
  assert.equal(typeof neonWorld.blockerMarkSegments, "function");
  const segments = neonWorld.blockerMarkSegments();
  assert.equal(segments.length, 4);
  assert.ok(segments.every((segment) => segment.length === 4));
  assert.deepEqual(segments.map(([x1, y1, x2, y2]) => Math.sign((x2 - x1) * (y2 - y1))), [1, 1, -1, -1]);
});

test("portrait blockers remain wide enough for the hazard mark", () => {
  assert.equal(typeof neonWorld.blockerWidthScale, "function");
  assert.equal(neonWorld.blockerWidthScale(1), 1);
  assert.ok(neonWorld.blockerWidthScale(responsiveHorizontalScale(390 / 844)) >= 0.65);
});

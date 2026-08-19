import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const app = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

test("app uses one Neon canvas and no Tempest raster assets", () => {
  assert.match(app, /<canvas ref=\{canvasRef\} className="neon-canvas"/);
  assert.doesNotMatch(app, /tempest-|familiar|Bond|Sync/);
  assert.doesNotMatch(styles, /tempest-|familiar|garden/);
});

test("app exposes keyboard, touch, and reduced-motion controls", () => {
  assert.match(app, /ArrowLeft/);
  assert.match(app, /ArrowRight/);
  assert.match(app, /pointerStartRef/);
  assert.match(app, /reducedMotion/);
});

test("styles preserve the selected neon palette across responsive and reduced-motion modes", () => {
  assert.match(styles, /--cyan:\s*#54e7ff/);
  assert.match(styles, /--magenta:\s*#ff18b8/);
  assert.match(styles, /@media \(max-width:\s*600px\)/);
  assert.match(styles, /\.reduced-motion/);
  assert.match(styles, /prefers-reduced-motion/);
});

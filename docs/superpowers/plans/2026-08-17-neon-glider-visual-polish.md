# Neon Glider Visual Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Neon Glider from a technical-looking procedural prototype to a polished cinematic neon runner while preserving every gameplay, persistence, accessibility, and static-hosting contract.

**Architecture:** Keep simulation state independent from Three.js and preserve `RunnerState` as the render adapter input. Refine the DOM HUD, shared PBR material palette, instanced tunnel, procedural ship, and a new bounded atmosphere adapter; keep post-processing optional with direct-render fallback and validate the final result against the pinned reference at identical desktop and mobile states.

**Tech Stack:** TypeScript 7, Vite 8, Three.js 0.185, Vitest 4, Playwright 1.62, DOM/CSS HUD, GitHub Pages static output.

## Global Constraints

- The visual source is `docs/superpowers/specs/assets/neon-glider-reference.png`, SHA-256 `f997cc6f181984faa513d6756ea097f7470a7412089a9de8be7fa8381f3bcfc9`.
- The approved design is `docs/superpowers/specs/2026-08-17-neon-glider-visual-polish-design.md`.
- Preserve schema version `2`, deterministic generation, collision, scoring, energy, persistence, input, pause, reload, reduced-motion, and context-loss behavior.
- Do not add GLB files, downloaded textures, runtime network requests, routes, gameplay mechanics, Hanzi content, backend code, accounts, leaderboards, or deployment changes.
- All added scene geometry is pooled or instanced; render updates allocate no new Three.js objects per frame.
- Keep desktop and mobile below `60` draw calls and `45` geometries; longest slow-frame streak stays at or below `3` under the existing real-RAF measurement.
- Keep `dist` below `5 MiB` and preserve relative production asset URLs for `/neon-glider/`.
- `design-qa.md` must contain exactly `final result: passed` with no actionable P0, P1, or P2 findings before handoff.

## File Structure

- `src/ui/screens.ts`: semantic HUD/menu/result structure and unchanged callbacks.
- `src/styles.css`: neon UI tokens, hierarchy, responsive layout, reduced-motion behavior.
- `src/render/neon/materials.ts`: shared PBR/emissive palette and ownership.
- `src/render/neon/tunnel.ts`: pooled/instanced tunnel shell, floor, rails, active gate, disposal.
- `src/render/neon/ship.ts`: procedural ship silhouette, lane banking, exhaust motion, disposal.
- `src/render/neon/atmosphere.ts`: new bounded speed streak and dust-field adapter.
- `src/render/runner-view.ts`: scene integration, light rig, quality selection, lifecycle replay.
- `src/render/neon/post-fx.ts`: optional bloom tuning and direct-render fallback.
- `tests/ui/screens-layout.test.ts`: semantic structure and preserved accessibility.
- `tests/render/neon-materials.test.ts`: palette class/value/ownership contracts.
- `tests/render/neon-tunnel.test.ts`: instance budgets, depth layers, no-allocation update, disposal.
- `tests/render/neon-ship.test.ts`: named silhouette parts, banking/exhaust/reduced motion, disposal.
- `tests/render/neon-atmosphere.test.ts`: quality budgets, allocation-free update, reduced motion, disposal.
- `tests/render/runner-view.test.ts`: integration, lifecycle freeze/rebuild, diagnostics budgets.
- `tests/render/post-fx.test.ts`: quality-specific bloom and permanent fallback.
- `e2e/game.spec.ts`: responsive HUD/playfield acceptance, captures, performance evidence.
- `design-qa.md`: same-state source comparison and final visual verdict.

---

### Task 1: Refine the HUD and Screen Hierarchy

**Files:**
- Modify: `src/ui/screens.ts`
- Modify: `src/styles.css`
- Test: `tests/ui/screens-layout.test.ts`

**Interfaces:**
- Consumes: `createGameScreen(onPause: () => void): GameScreen`, `GameScreen.update(run: RunnerState): void`, and the existing `data-*` hooks used by the controller and E2E suite.
- Produces: the same public functions and callbacks, plus presentation-only classes `hud-readout`, `hud-number`, `hud-unit`, `energy-track`, and `menu-kicker`.

- [ ] **Step 1: Write failing semantic hierarchy tests**

Add assertions without removing existing accessibility checks:

```ts
it('separates numeric HUD values from their units without changing update hooks', () => {
  const screen = createGameScreen(vi.fn());
  screen.update({ ...createRunner(1), score: 127_450, distance: 2_734, gates: 11, energy: 73 });

  expect(screen.element.querySelector('[data-score]')?.classList).toContain('hud-number');
  expect(screen.element.querySelector('[data-distance]')?.textContent).toBe('2,734');
  expect(screen.element.querySelector('[data-distance-unit]')?.textContent).toBe('m');
  expect(screen.element.querySelector('[data-gate]')?.textContent).toBe('GATE 12');
  expect(screen.element.querySelector('[data-energy-bar]')?.classList).toContain('energy-track');
});

it('keeps the menu concise and exposes one primary action', () => {
  const menu = createMenuScreen({
    profile: { schemaVersion: 1, highScore: 0, longestDistance: 0, runCount: 0, reducedMotion: false },
    onStart: vi.fn(),
    onReducedMotion: vi.fn(),
  });

  expect(menu.querySelectorAll('.primary-button')).toHaveLength(1);
  expect(menu.querySelector('.menu-kicker')?.textContent).toBe('ENDLESS NEON RUNNER');
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `npx vitest run tests/ui/screens-layout.test.ts`

Expected: FAIL because the new classes, separated distance unit, and menu kicker do not exist.

- [ ] **Step 3: Implement the semantic markup refinement**

Keep all current data hooks. Change distance rendering to a value plus a separate unit and add the kicker:

```ts
const distance = metric('DISTANCE', 'distance', 'distance-metric');
distance.value.classList.add('hud-number');
const distanceUnit = element('span', 'hud-unit');
distanceUnit.dataset.distanceUnit = '';
distanceUnit.textContent = 'm';
distance.root.append(distanceUnit);

const kicker = element('p', 'menu-kicker');
kicker.textContent = 'ENDLESS NEON RUNNER';
screen.prepend(kicker);
```

In `GameScreen.update`, set `distance.value.textContent = formatInteger(run.distance)` and leave score, multiplier, gate, energy, ARIA, and callbacks unchanged.

- [ ] **Step 4: Implement the CSS visual system**

Use the existing variables and add only these tokens:

```css
:root {
  --hud-glass: rgb(3 7 22 / 52%);
  --hud-edge: rgb(124 224 255 / 34%);
  --cyan-soft: #8eeeff;
  --magenta-hot: #ff4fd8;
}

.hud-cluster {
  padding: 0.75rem 0.85rem;
  border-inline-start: 1px solid var(--hud-edge);
  background: var(--hud-glass);
  backdrop-filter: blur(6px);
}

.hud-number {
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.025em;
}

.hud-unit {
  align-self: end;
  margin-inline-start: 0.2em;
  color: var(--muted);
  font-size: 0.42em;
}

.energy-track {
  clip-path: polygon(1.5% 0, 100% 0, 98.5% 100%, 0 100%);
}
```

Keep the center and lower-middle playfield clear, desktop HUD coverage below 20%, 44px controls, current focus rings, and safe-area offsets. In the existing reduced-motion block, set UI transition durations to `0s`.

- [ ] **Step 5: Run focused and full unit tests**

Run: `npx vitest run tests/ui/screens-layout.test.ts tests/ui/app-controller.test.ts`

Expected: PASS with no controller-hook changes.

- [ ] **Step 6: Commit Task 1**

```bash
git add src/ui/screens.ts src/styles.css tests/ui/screens-layout.test.ts
git commit -m "feat: refine Neon Glider HUD hierarchy"
```

---

### Task 2: Deepen the PBR Tunnel and Gate

**Files:**
- Modify: `src/render/neon/materials.ts`
- Modify: `src/render/neon/tunnel.ts`
- Test: `tests/render/neon-materials.test.ts`
- Test: `tests/render/neon-tunnel.test.ts`

**Interfaces:**
- Consumes: `createNeonMaterials(): NeonMaterials` and `createNeonTunnel({ quality, materials }): NeonTunnel`.
- Produces: the same interfaces with new owned materials `panelRecess: THREE.MeshStandardMaterial` and `gateGlass: THREE.MeshPhysicalMaterial`; tunnel object names `recess-panel-instances`, `floor-seam-instances`, and `gate-inner-glow`.

- [ ] **Step 1: Write failing palette and tunnel-layer tests**

```ts
it('adds owned recess and gate-glass PBR materials', () => {
  const materials = createNeonMaterials();
  expect(materials.panelRecess).toBeInstanceOf(THREE.MeshStandardMaterial);
  expect(materials.panelRecess.roughness).toBeGreaterThanOrEqual(0.45);
  expect(materials.gateGlass).toBeInstanceOf(THREE.MeshPhysicalMaterial);
  expect(materials.gateGlass.transmission).toBeGreaterThan(0);
  materials.dispose();
});

it('builds bounded tunnel depth layers without increasing per-frame objects', () => withCanvasContext(() => {
  const materials = createNeonMaterials();
  const tunnel = createNeonTunnel({ quality: 'desktop', materials });
  expect(tunnel.root.getObjectByName('recess-panel-instances')).toBeInstanceOf(THREE.InstancedMesh);
  expect(tunnel.root.getObjectByName('floor-seam-instances')).toBeInstanceOf(THREE.InstancedMesh);
  expect(tunnel.root.getObjectByName('gate-inner-glow')).toBeTruthy();
  expect(tunnel.root.children.length).toBeLessThan(24);
  tunnel.dispose();
  materials.dispose();
}));
```

- [ ] **Step 2: Run focused tests and confirm RED**

Run: `npx vitest run tests/render/neon-materials.test.ts tests/render/neon-tunnel.test.ts`

Expected: FAIL because the materials and named instanced layers are missing.

- [ ] **Step 3: Extend the owned material palette**

Add concrete materials and include both in the existing disposal palette:

```ts
const panelRecess = new THREE.MeshStandardMaterial({
  color: 0x050817,
  emissive: 0x080b22,
  emissiveIntensity: 0.35,
  metalness: 0.58,
  roughness: 0.52,
});
const gateGlass = new THREE.MeshPhysicalMaterial({
  color: 0x65ecff,
  emissive: 0x00bce8,
  emissiveIntensity: 1.4,
  metalness: 0.08,
  roughness: 0.12,
  transmission: 0.22,
  thickness: 0.3,
  transparent: true,
  opacity: 0.88,
});
```

Do not add texture maps or runtime asset loads.

- [ ] **Step 4: Add pooled tunnel depth geometry**

Use the existing `unitBox`, scratch matrix/quaternion/vector objects, segment arrays, and `updateInstanceZ`. Add desktop/mobile counts derived from `segmentCount`, with recess panels behind alternating walls, narrow floor seams between lanes, and a single gate inner-glow plane using `gateGlass`.

Concrete budgets:

```ts
const recessPanels = new THREE.InstancedMesh(unitBox, materials.panelRecess, segmentCount * 4);
const floorSeams = new THREE.InstancedMesh(unitBox, materials.cyan, segmentCount * 2);
recessPanels.name = 'recess-panel-instances';
floorSeams.name = 'floor-seam-instances';
recessPanels.frustumCulled = false;
floorSeams.frustumCulled = false;
```

Update only matrix Z elements during travel. Dispose only tunnel-owned geometry/material/texture resources; shared materials remain owned by `NeonMaterials`.

- [ ] **Step 5: Prove allocation-free update and bounded instance budgets**

Extend the existing 120-frame construction counter test to include the new meshes and assert the new depth-layer pools remain bounded at `144` desktop / `96` mobile instances. Unchanged baseline tunnel counts are outside Task 2.

Run: `npx vitest run tests/render/neon-materials.test.ts tests/render/neon-tunnel.test.ts`

Expected: PASS; construction counters remain `{ matrix4: 0, vector3: 0, quaternion: 0 }` during updates.

- [ ] **Step 6: Commit Task 2**

```bash
git add src/render/neon/materials.ts src/render/neon/tunnel.ts tests/render/neon-materials.test.ts tests/render/neon-tunnel.test.ts
git commit -m "feat: deepen Neon Glider tunnel lighting"
```

---

### Task 3: Strengthen the Procedural Ship Silhouette

**Files:**
- Modify: `src/render/neon/ship.ts`
- Test: `tests/render/neon-ship.test.ts`
- Test: `tests/render/runner-view.test.ts`

**Interfaces:**
- Consumes: `createNeonShip(materials: NeonMaterials): NeonShip`, `setLaneX(targetX, deltaSeconds, reducedMotion)`, and `update(elapsedSeconds, speed, reducedMotion)`.
- Produces: the same interface with named parts `canopy-shell`, `engine-ring-left`, `engine-ring-right`, `exhaust-core-left`, and `exhaust-core-right`.

- [ ] **Step 1: Write failing silhouette and exhaust tests**

```ts
it('adds a canopy, engine rings, and emissive exhaust cores', () => {
  const materials = createNeonMaterials();
  const ship = createNeonShip(materials);
  for (const name of [
    'canopy-shell',
    'engine-ring-left',
    'engine-ring-right',
    'exhaust-core-left',
    'exhaust-core-right',
  ]) expect(ship.root.getObjectByName(name)).toBeTruthy();
  ship.dispose();
  materials.dispose();
});

it('lengthens exhaust at maximum speed and neutralizes it for reduced motion', () => {
  const materials = createNeonMaterials();
  const ship = createNeonShip(materials);
  const trail = ship.root.getObjectByName('trail-left')!;
  ship.update(2, 52, false);
  expect(trail.scale.z).toBeGreaterThan(1.25);
  ship.update(2, 52, true);
  expect(trail.scale.z).toBe(1);
  ship.dispose();
  materials.dispose();
});
```

- [ ] **Step 2: Run focused tests and confirm RED**

Run: `npx vitest run tests/render/neon-ship.test.ts tests/render/runner-view.test.ts`

Expected: FAIL on the five missing named parts.

- [ ] **Step 3: Build the new parts from merged procedural geometry**

Reuse `mergeParts`, the owned geometry set, and cloned owned ship materials. Add one canopy shell, two ring cylinders, and two exhaust cores; merge symmetric static parts where they share a material so the ship adds no more than two draw calls.

```ts
const engineRingGeometry = own(new THREE.TorusGeometry(0.37, 0.07, 6, 12));
const exhaustCoreGeometry = own(new THREE.CylinderGeometry(0.16, 0.22, 0.36, 8));
exhaustCoreGeometry.rotateX(Math.PI / 2);
```

Keep collision data and `RunnerState` unchanged.

- [ ] **Step 4: Tune motion without changing input behavior**

Keep the existing exponential lane interpolation and clamp banking to `[-0.34, 0.34]`. Change trail length to `1 + normalizedSpeed * 0.55` and pulse amplitude to `0.06`. Reduced motion must immediately set bank, bob, pulse, and trail scale to neutral values.

- [ ] **Step 5: Verify disposal, framing, and integration**

Extend the disposal test to spy on every newly owned geometry/material once. Extend runner-view framing assertions to keep `gliderBounds.minX >= -1` and `gliderBounds.maxX <= 1` in all lanes for both quality profiles.

Run: `npx vitest run tests/render/neon-ship.test.ts tests/render/runner-view.test.ts`

Expected: PASS with no simulation changes.

- [ ] **Step 6: Commit Task 3**

```bash
git add src/render/neon/ship.ts tests/render/neon-ship.test.ts tests/render/runner-view.test.ts
git commit -m "feat: polish Neon Glider ship silhouette"
```

---

### Task 4: Add a Bounded Atmosphere Layer and Tune Bloom

**Files:**
- Create: `src/render/neon/atmosphere.ts`
- Modify: `src/render/runner-view.ts`
- Modify: `src/render/neon/post-fx.ts`
- Create: `tests/render/neon-atmosphere.test.ts`
- Modify: `tests/render/post-fx.test.ts`
- Modify: `tests/render/runner-view.test.ts`

**Interfaces:**
- Consumes: `quality: 'desktop' | 'mobile'`, shared `NeonMaterials`, current distance/time/speed/reduced-motion values, and the existing `PostFx` adapter.
- Produces:

```ts
export interface NeonAtmosphere {
  readonly root: THREE.Group;
  readonly particleCount: number;
  update(distance: number, elapsedSeconds: number, speed: number, reducedMotion: boolean): void;
  dispose(): void;
}

export function createNeonAtmosphere(
  quality: 'desktop' | 'mobile',
  materials: NeonMaterials,
): NeonAtmosphere;
```

- [ ] **Step 1: Write failing atmosphere contract tests**

```ts
it('uses bounded desktop and mobile particle budgets', () => {
  const materials = createNeonMaterials();
  const desktop = createNeonAtmosphere('desktop', materials);
  const mobile = createNeonAtmosphere('mobile', materials);
  expect(desktop.particleCount).toBe(72);
  expect(mobile.particleCount).toBe(36);
  expect(desktop.root.getObjectByName('speed-streaks')).toBeInstanceOf(THREE.Points);
  desktop.dispose();
  mobile.dispose();
  materials.dispose();
});

it('reuses one position buffer and reduces motion without hiding depth cues', () => {
  const materials = createNeonMaterials();
  const atmosphere = createNeonAtmosphere('desktop', materials);
  const points = atmosphere.root.getObjectByName('speed-streaks') as THREE.Points<THREE.BufferGeometry>;
  const position = points.geometry.getAttribute('position');
  atmosphere.update(10, 1, 52, false);
  atmosphere.update(20, 2, 52, true);
  expect(points.geometry.getAttribute('position')).toBe(position);
  expect((points.material as THREE.PointsMaterial).opacity).toBeLessThanOrEqual(0.42);
  atmosphere.dispose();
  materials.dispose();
});
```

- [ ] **Step 2: Run focused tests and confirm RED**

Run: `npx vitest run tests/render/neon-atmosphere.test.ts tests/render/post-fx.test.ts tests/render/runner-view.test.ts`

Expected: FAIL because `atmosphere.ts` does not exist.

- [ ] **Step 3: Move the current speed-streak implementation behind the new adapter**

Move the existing preallocated position/color buffer logic from `runner-view.ts` into `atmosphere.ts`. Use one `THREE.Points` draw call, deterministic initial positions, `DynamicDrawUsage`, additive blending, no depth write, and no per-frame Three.js allocations. Desktop uses `72` particles; mobile uses `36`.

- [ ] **Step 4: Integrate atmosphere and improve the light rig**

Replace `SceneGraph.streaks` with `SceneGraph.atmosphere`. Add only this bounded light rig:

```ts
scene.add(new THREE.HemisphereLight(0x74d9ff, 0x210019, 0.9));
const key = new THREE.DirectionalLight(0xb889ff, 1.7);
key.position.set(2.5, 7, 5);
const cyanFill = new THREE.PointLight(0x00cfff, quality === 'desktop' ? 4.2 : 3.2, 34, 2);
cyanFill.position.set(-4, -0.5, 4);
const magentaRim = new THREE.PointLight(0xff20c8, quality === 'desktop' ? 2.8 : 2.2, 28, 2);
magentaRim.position.set(4, 1.4, -6);
scene.add(key, cyanFill, magentaRim);
```

Keep all light objects stable until scene disposal.

- [ ] **Step 5: Tune quality-specific bloom without weakening fallback**

Preserve `RenderPass`, `UnrealBloomPass`, `OutputPass`, the hybrid bloom layer, renderer-info accounting, and permanent direct fallback. Set desktop bloom to strength `0.44`, radius `0.34`, threshold `0.58`; set mobile to strength `0.32`, radius `0.28`, threshold `0.62`. Keep composer scales unchanged unless the real-RAF gate fails.

Update exact-value assertions in `tests/render/post-fx.test.ts` and retain all failure/disposal tests.

- [ ] **Step 6: Verify focused integration and lifecycle tests**

Run: `npx vitest run tests/render/neon-atmosphere.test.ts tests/render/post-fx.test.ts tests/render/runner-view.test.ts`

Expected: PASS, including context-loss freeze/rebuild, resize, disposal, direct fallback, and framing tests.

- [ ] **Step 7: Commit Task 4**

```bash
git add src/render/neon/atmosphere.ts src/render/runner-view.ts src/render/neon/post-fx.ts tests/render/neon-atmosphere.test.ts tests/render/post-fx.test.ts tests/render/runner-view.test.ts
git commit -m "feat: add cinematic Neon Glider atmosphere"
```

---

### Task 5: Browser Acceptance, Visual QA, and Release Gate

**Files:**
- Modify: `e2e/game.spec.ts`
- Modify: `README.md`
- Modify: `design-qa.md`
- Generate ignored evidence: `.superpowers/sdd/2026-08-17-neon-glider-visual-polish/artifacts/`

**Interfaces:**
- Consumes: existing query-gated `window.__NEON_GLIDER_E2E__`, Playwright projects `desktop-chromium` and `mobile-chromium`, the pinned reference, and all prior task outputs.
- Produces: exact visual/performance acceptance evidence with no production-only global and no deployment.

- [ ] **Step 1: Add failing browser acceptance assertions**

Inside the existing framing/capture tests, assert the refined UI and scene contracts without reading implementation internals:

```ts
await expect(page.locator('.menu-kicker')).toHaveText('ENDLESS NEON RUNNER');
await expect(page.locator('.energy-track')).toBeVisible();
await expect(page.locator('[data-distance-unit]')).toHaveText('m');
await expect(page.locator('canvas')).toBeVisible();
expect(await page.evaluate(() => document.documentElement.scrollWidth))
  .toBeLessThanOrEqual(await page.evaluate(() => document.documentElement.clientWidth));
```

Keep the current exact reload, production-global isolation, keyboard/pointer/touch, collision, depletion, pause, context, responsive framing, reduced-motion, static-base, and perf assertions.

- [ ] **Step 2: Run the focused E2E cases and confirm RED**

Run: `npx playwright test e2e/game.spec.ts --grep "captures|full ship|reduced motion"`

Expected: FAIL until the new approved screenshot baseline and DOM contracts exist.

- [ ] **Step 3: Run the complete mechanical release gate**

Run exactly:

```bash
npm ci
npm test
npm run build
npm run test:e2e
test "$(rg -c '^final result: passed$' design-qa.md)" = 1
test "$(du -sk dist | cut -f1)" -le 5120
git diff --check
```

Expected: `0` vulnerabilities, all unit tests pass, all desktop/mobile E2E tests pass serially, exactly one pass marker, `dist <= 5120 KiB`, and no whitespace errors.

- [ ] **Step 4: Capture the required states at matched viewports**

Save exactly these ten states for both desktop and Pixel 7 under the task artifact directory:

```text
menu.png
gameplay-center.png
gameplay-left.png
gameplay-right.png
gate.png
paused.png
collision-result.png
depleted-result.png
reduced-motion.png
restored-run.png
```

Do not use a screenshot as proof by itself.

- [ ] **Step 5: Run the blocking design comparison**

Create one normalized combined image containing the pinned reference and `gameplay-center.png` at the same `1536x1024` viewport. Inspect that combined image plus desktop/mobile contact sheets. Fix and recapture any actionable P0/P1/P2 mismatch in ship silhouette, tunnel depth, gate dominance, entity readability, HUD hierarchy, clipping, overflow, or mobile framing.

Write `design-qa.md` with the source SHA, capture paths, viewports, interactions tested, console result, performance result, remaining P3 notes, and exactly:

```text
final result: passed
```

Use `blocked` instead if the source, capture, browser, or comparison cannot be inspected.

- [ ] **Step 6: Verify the local static preview**

Run:

```bash
npm run preview -- --host 127.0.0.1 --port 4173 --base /neon-glider/
```

Open `http://127.0.0.1:4173/neon-glider/?e2e=1`, start a run, steer left/right, pause/resume, inspect console warnings/errors, and leave the verified gameplay tab open. Do not deploy.

- [ ] **Step 7: Update release evidence and commit Task 5**

Update `README.md` only with the new verified counts, bundle size, local preview command, and explicit no-deployment state.

```bash
git add e2e/game.spec.ts README.md design-qa.md
git commit -m "test: verify Neon Glider visual polish"
```

---

## Final Review

- Review the full range from commit `235d894` to the Task 5 head against the approved visual-polish spec.
- Reject any schema/gameplay/persistence change, runtime asset fetch, unbounded object growth, weakened acceptance threshold, hidden production test hook, or false visual pass marker.
- Ready requires zero Critical/Important findings and no actionable visual P0/P1/P2 issue.

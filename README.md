# Neon Glider

Neon Glider is a deterministic, browser-based endless runner. Stay alive, dodge obstacles, collect crystals, and pass gates to increase speed, multiplier, and score.

Controls: `A` / `D`, left/right arrow keys, pointer edges, or touch edges change lanes. `Esc` / `P` pauses. The menu exposes a reduced-motion preference.

## Architecture and state

The static Vite application uses TypeScript, Three.js, deterministic runner reducers, and generated track segments. A run checkpoint is stored in session storage; the player profile (high score and reduced-motion preference) is stored locally. Compatible active runs restore only in the same browser session and resume through a fresh three-second countdown. Session storage is browser-scoped and can be cleared by the browser, privacy settings, or a new session.

At startup, the app silently removes the retired browser keys from the superseded game. That cleanup is independent from the current runner/profile storage and cannot show a storage warning or prevent startup.

## Local verification

Prerequisites: Node.js, npm, Git, and Playwright Chromium (`npx playwright install chromium`).

```bash
npm ci
npm test
npm run build
npm run test:e2e
```

The verified local release has 118/118 unit tests and 28/28 browser tests: 14 desktop Chromium cases and the same 14 cases under Pixel 7 emulation. The production bundle is 4,684 KiB. `dist/index.html` references JavaScript and CSS through relative `./assets/...` URLs, so the configured `/neon-glider/` static base works on GitHub Pages.

## GitHub Pages

After pushing the `gh-pages` branch, configure the repository in GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → `gh-pages` / `(root)`**. This repository does not assert that Pages is already configured or that deployment has completed.

Deployment was not run for this release because no remote or GitHub Pages deployment was authorized. When authorization and the repository Pages configuration are confirmed, run `npm run deploy`; its predeploy hook repeats the unit, production-build, and browser gates before publishing `dist`.

## Performance evidence

Performance measurements are local single-host evidence only: they describe the browser, GPU, device profile, and run used for measurement. They do not establish a deployment-wide performance guarantee.

The 2026-08-17 acceptance run used Chromium 151.0.7922.34 on an Apple M3 Pro with 18 GiB RAM (`darwin arm64`). Desktop and mobile projects run serially with one worker so each sample measures one isolated GPU workload on the host. Desktop (`1536 × 1024`, not emulated) sampled 76 frames: 25.0 ms median, 87.6 ms worst, one slow frame, longest slow-frame streak 1, 26 maximum draw calls, 14 geometries, and 2 textures. Pixel 7 emulation (`412 × 839` CSS pixels) sampled 115 frames: 16.7 ms median, 66.7 ms worst, one slow frame, longest streak 1, 28 maximum draw calls, 15 geometries, and 4 textures.

The pinned reference and final desktop gameplay render pass the blocking comparison in `design-qa.md`. Remaining P3 polish is limited to the intentionally low-poly procedural treatment having less volumetric and micro-surface detail than the cinematic reference, plus slight edge stepping from the half-resolution desktop canvas and reduced-resolution mobile glow.

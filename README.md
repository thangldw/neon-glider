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
npm run test:e2e
npm run deploy
```

`npm run deploy` runs the local test, build, and Chromium E2E gates before publishing `dist` with `gh-pages`.

## GitHub Pages

After pushing the `gh-pages` branch, configure the repository in GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → `gh-pages` / `(root)`**. This repository does not assert that Pages is already configured or that deployment has completed.

## Performance evidence

Performance measurements are local single-host evidence only: they describe the browser, GPU, device profile, and run used for measurement. They do not establish a deployment-wide performance guarantee.

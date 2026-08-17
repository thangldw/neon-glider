# Neon Glider

Neon Glider is a deterministic browser endless runner. Dodge obstacles, collect crystals, and pass gates to increase speed, multiplier, and score.

Controls: `A` / `D`, left/right arrows, pointer edges, or touch edges change lanes. `Esc` / `P` pauses. The menu exposes reduced motion.

## Architecture and state

The static Vite application uses TypeScript, Three.js, deterministic runner reducers, and random-access track generation. A schema-version-2 run checkpoint is stored in session storage; high score and reduced-motion preference are stored locally. Compatible active runs restore only in the same browser session and resume through a fresh three-second countdown.

The renderer uses Standard/Physical PBR source materials, instanced tunnel/entities, and a production `EffectComposer` chain with `RenderPass`, `UnrealBloomPass`, and `OutputPass`. Desktop uses split-resolution composition: bounded PBR background reconstruction, full-resolution lightweight detail silhouettes, and cached selective bloom. Composer failure restores every scene layer through direct rendering. Mobile keeps its independent quality budget while retaining the same simulation.

## Local verification

Prerequisites: Node.js, npm, Git, and Playwright Chromium (`npx playwright install chromium`).

```bash
npm ci
npm test
npm run build
npm run test:e2e
npm run preview -- --host 127.0.0.1 --port 4173 --base /neon-glider/
```

Verified on 2026-08-18: 142/142 unit tests and 30/30 serial browser tests (15 desktop Chromium, 15 Pixel 7 emulation). `dist` is 4,704 KiB, below the 5 MiB release cap. Vite emits only its advisory warning for the 608.32 kB JavaScript chunk. `dist/index.html` retains relative `./assets/...` URLs for the configured `/neon-glider/` static base.

## Performance evidence

Performance measurements are local single-host evidence, not a deployment-wide guarantee. The final run used Chromium `151.0.7922.34` on an Apple M3 Pro with 18 GiB RAM (`darwin arm64`); projects ran serially with one worker and unchanged acceptance thresholds/sampling.

| Profile/state | Samples | Median | Worst | Slow frames | Longest streak | Draw calls | Geometries | Textures | Input latency |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop normal | 69 | 41.8 ms | 93.2 ms | 6 | 1 | 49 | 13 | 15 | 0.8 ms |
| Desktop near gate, 247 m | 62 | 50.0 ms | 75.0 ms | 20 | 2 | 51 | 15 | 16 | 0.6 ms |
| Pixel 7 normal | 102 | 33.3 ms | 250.0 ms | 1 | 1 | 43 | 13 | 14 | 0.7 ms |
| Pixel 7 near gate, 247 m | 88 | 33.4 ms | 41.8 ms | 0 | 0 | 44 | 14 | 15 | 0.6 ms |

The pinned-reference comparison and all 20 final desktop/mobile state captures are dispositioned in `design-qa.md`.

## GitHub Pages

After pushing the `gh-pages` branch, configure **Settings → Pages → Build and deployment → Deploy from a branch → `gh-pages` / `(root)`**. Deployment was not run because no remote or Pages deployment was authorized. When authorized, `npm run deploy` repeats unit, build, and browser gates through `predeploy` before publishing `dist`.

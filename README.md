# Neon Glider

Neon Glider is a deterministic browser endless runner. Dodge obstacles, collect crystals, and pass gates to increase speed, multiplier, and score.

Controls: `A` / `D`, left/right arrows, pointer edges, or touch edges change lanes. `Esc` / `P` pauses. The menu exposes reduced motion.

## Architecture and state

The static Vite application uses TypeScript, Three.js, deterministic runner reducers, and random-access track generation. A schema-version-2 run checkpoint is stored in session storage; high score and reduced-motion preference are stored locally. Compatible active runs restore only in the same browser session and resume through a fresh three-second countdown.

The renderer uses Standard/Physical PBR source materials, instanced tunnel/entities, and a production `EffectComposer` chain with `RenderPass`, `UnrealBloomPass`, and `OutputPass`. Desktop uses split-resolution composition: bounded single-sample PBR background reconstruction with alpha-aware cached selective bloom folded into the same pass, followed by full-resolution lightweight detail silhouettes. Unchanged runner snapshots do not re-upload tunnel/entity instance buffers. Composer failure restores every scene layer through direct rendering. Mobile keeps its independent quality budget while retaining the same simulation.

Collecting a crystal produces a localized cyan particle/ship/HUD pulse for `250 ms`. A collision produces red-orange particles, shockwave, viewport flash, and light camera shake; the result screen is held for the complete `320 ms` impact. Reduced motion uses a `120 ms` pulse/impact with no camera shake and the same gameplay timing.

## Local verification

Prerequisites: Node.js, npm, Git, and Playwright Chromium (`npx playwright install chromium`).

```bash
npm ci
npm test
npm run build
npm run test:e2e
npm run preview -- --host 127.0.0.1 --port 4173 --base /neon-glider/
```

Verified on 2026-08-18: 175/175 unit tests and 34/34 serial browser tests (17 desktop Chromium, 17 Pixel 7 emulation). `dist` is 4,708 KiB, below the 5 MiB release cap. Vite emits only its advisory warning for the 614.12 kB JavaScript chunk. `dist/index.html` retains relative `./assets/...` URLs for the configured `/neon-glider/` static base; source inspection and the browser static-base gate found no runtime network dependency.

## Performance evidence

Performance measurements are local single-host evidence, not a deployment-wide guarantee. The final run used Chromium `151.0.7922.34` on an Apple M3 Pro with 18 GiB RAM (`darwin arm64`); projects ran serially with one worker and unchanged acceptance thresholds/sampling.

| Profile/state | Samples | Median | Worst | Slow frames | Longest streak | Draw calls | Geometries | Textures | Input latency |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop normal | 65 | 41.7 ms | 233.3 ms | 7 | 1 | 48 | 13 | 15 | 0.9 ms |
| Desktop near gate, 247 m | 69 | 41.9 ms | 58.3 ms | 7 | 1 | 50 | 16 | 16 | 0.7 ms |
| Desktop collection pulse | 10 | 50.0 ms | 50.4 ms | 2 | 1 | 50 | 16 | 16 | 139.9 ms |
| Desktop collision impact | 1 | 41.6 ms | 41.6 ms | 0 | 0 | 50 | 17 | 16 | 43.1 ms |
| Pixel 7 normal | 86 | 33.3 ms | 250.0 ms | 1 | 1 | 43 | 13 | 14 | 1.1 ms |
| Pixel 7 near gate, 247 m | 72 | 41.7 ms | 124.6 ms | 7 | 2 | 44 | 15 | 15 | 0.9 ms |
| Pixel 7 collection pulse | 10 | 41.65 ms | 49.9 ms | 0 | 0 | 44 | 15 | 15 | 125.5 ms |
| Pixel 7 collision impact | 1 | 25.0 ms | 25.0 ms | 0 | 0 | 45 | 16 | 15 | 32.9 ms |

The pinned-reference comparisons and all 26 final desktop/mobile state captures are dispositioned in `design-qa.md`.

## GitHub Pages

After pushing the `gh-pages` branch, configure **Settings → Pages → Build and deployment → Deploy from a branch → `gh-pages` / `(root)`**. Deployment was not run because no remote or Pages deployment was authorized. When authorized, `npm run deploy` repeats unit, build, and browser gates through `predeploy` before publishing `dist`.

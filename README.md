# Neon Glider

Neon Glider is a deterministic browser endless runner. Dodge obstacles, collect crystals, and pass gates to increase speed, multiplier, and score.

Controls: `A` / `D`, left/right arrows, pointer edges, or touch edges change lanes. `Esc` / `P` pauses. The menu exposes reduced motion.

## Architecture and state

The static Vite application uses TypeScript, Three.js, deterministic runner reducers, and random-access track generation. A schema-version-2 run checkpoint is stored in session storage; high score and reduced-motion preference are stored locally. Compatible active runs restore only in the same browser session and resume through a fresh three-second countdown.

The renderer uses Standard/Physical PBR materials, instanced tunnel/entities, and a production `EffectComposer` chain with `RenderPass`, `UnrealBloomPass`, and `OutputPass`. Composer failure falls back to direct emissive rendering. Desktop and mobile use separate internal quality budgets while retaining the same simulation.

## Local verification

Prerequisites: Node.js, npm, Git, and Playwright Chromium (`npx playwright install chromium`).

```bash
npm ci
npm test
npm run build
npm run test:e2e
npm run preview -- --host 127.0.0.1 --port 4173 --base /neon-glider/
```

Verified on 2026-08-17: 139/139 unit tests and 30/30 serial browser tests (15 desktop Chromium, 15 Pixel 7 emulation). `dist` is 4,700 KiB, below the 5 MiB release cap. Vite emits only its advisory warning for the 603.75 kB JavaScript chunk. `dist/index.html` retains relative `./assets/...` URLs for the configured `/neon-glider/` static base.

## Performance evidence

Performance measurements are local single-host evidence, not a deployment-wide guarantee. The final run used Chromium `151.0.7922.34` on an Apple M3 Pro with 18 GiB RAM (`darwin arm64`); projects ran serially with one worker and unchanged acceptance thresholds/sampling.

| Profile | Samples | Median | Worst | Slow frames | Longest streak | Draw calls | Geometries | Textures | Input latency |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop `1536 × 1024` | 40 | 50.0 ms | 258.2 ms | 9 | 3 | 50 | 14 | 16 | 1.5 ms |
| Pixel 7 emulation | 59 | 33.4 ms | 100.0 ms | 1 | 1 | 44 | 14 | 15 | 1.2 ms |

The pinned-reference comparison and all 20 final desktop/mobile state captures are dispositioned in `design-qa.md`.

## GitHub Pages

After pushing the `gh-pages` branch, configure **Settings → Pages → Build and deployment → Deploy from a branch → `gh-pages` / `(root)`**. Deployment was not run because no remote or Pages deployment was authorized. When authorized, `npm run deploy` repeats unit, build, and browser gates through `predeploy` before publishing `dist`.

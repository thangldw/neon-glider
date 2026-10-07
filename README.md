# Neon Glider

Neon Glider is a three-lane browser endless runner built with React, Three.js, and Vite. Dodge neon blockers, collect energy, and pass gates as the tunnel accelerates.

Controls: `A` / `D`, left/right arrows, pointer swipes, or touch swipes change lanes. `Esc` / `P` pauses. Reduced motion is available from the start screen.

## Requirements

Use Node.js 22.12+ or Node.js 24 with the committed npm lockfile for Vite 8. The game is static: no account system, backend, cloud saves or leaderboard is claimed.

## Local development

```bash
npm ci
npm test
npm run dev
```

## Release

```bash
npm run build
npm run deploy
```

`npm run deploy` runs the `predeploy` test/build gate and publishes `dist/client` to the `gh-pages` branch. Keep this deployment branch; it is not a stale feature branch. Verify the Pages build and the live game after publication. A dependency-only change can produce an identical artifact and therefore no new gh-pages commit.

Live: <https://thangldw.github.io/neon-glider/>

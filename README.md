# Neon Glider

Neon Glider is a three-lane browser endless runner built with React, Three.js, and Vite. Dodge neon blockers, collect energy, and pass gates as the tunnel accelerates.

Controls: `A` / `D`, left/right arrows, pointer swipes, or touch swipes change lanes. `Esc` / `P` pauses. Reduced motion is available from the start screen.

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

`npm run deploy` publishes `dist/client` to the `gh-pages` branch.

Live: <https://thangldw.github.io/neon-glider/>

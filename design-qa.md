# Design QA — Neon Glider UX redesign

## Evidence

- Source visual truth: `/Users/thang/.codex/generated_images/01a01580-a5d5-7a71-9eb5-2b1d7ddf4d8c/exec-fccfc956-8920-4ac9-bbe5-2691ea3a8d29.png`
- Desktop implementation: `/Users/thang/Documents/Codex/2026-08-19/https-thangldw-github-io-neon-glider/outputs/moonlit-spirit-garden/qa-artifacts/desktop-gameplay-final.png`
- Full-view comparison: `/Users/thang/Documents/Codex/2026-08-19/https-thangldw-github-io-neon-glider/outputs/moonlit-spirit-garden/qa-artifacts/comparison-final.png`
- Focused glider/track comparison: `/Users/thang/Documents/Codex/2026-08-19/https-thangldw-github-io-neon-glider/outputs/moonlit-spirit-garden/qa-artifacts/comparison-focused-glider-track.png`
- Mobile start: `/Users/thang/Documents/Codex/2026-08-19/https-thangldw-github-io-neon-glider/outputs/moonlit-spirit-garden/qa-artifacts/mobile-start.png`
- Mobile gameplay: `/Users/thang/Documents/Codex/2026-08-19/https-thangldw-github-io-neon-glider/outputs/moonlit-spirit-garden/qa-artifacts/mobile-gameplay-final.png`
- Updated blocker, desktop: `/Users/thang/Documents/Codex/2026-08-19/https-thangldw-github-io-neon-glider/outputs/moonlit-spirit-garden/qa-artifacts/desktop-blocker-x.png`
- Updated blocker, mobile: `/Users/thang/Documents/Codex/2026-08-19/https-thangldw-github-io-neon-glider/outputs/moonlit-spirit-garden/qa-artifacts/mobile-blocker-x-final.png`
- Desktop viewport: 1672 x 941 CSS pixels, device scale factor 1.
- Mobile viewport: 390 x 844 CSS pixels, device scale factor 1.
- Source pixels: 1672 x 941. Desktop implementation pixels: 1672 x 941. No density normalization required.
- State: active gameplay; mobile start, center lane, and right-lane states were also captured.

## Findings

No actionable P0, P1, or P2 findings remain.

## Required fidelity surfaces

- Fonts and typography: Barlow Condensed reproduces the narrow arcade HUD hierarchy; score, multiplier, distance, gate, and energy labels remain readable at both viewports.
- Spacing and layout rhythm: HUD anchors, bottom energy bar, pause control, three-lane track, and centered vanishing point follow the source composition. Mobile uses compact top masks to preserve contrast without adding bulky panels.
- Colors and visual tokens: the source void, cyan, magenta, white, and dark-blue hull palette is mapped directly into CSS and Three.js materials.
- Image quality and asset fidelity: the runtime uses antialiased WebGL geometry, polygon tunnel ribs, neon flow lines, pickups, broken-X hazard blockers, and a symmetric low-poly glider. The focused comparison confirms the same silhouette and track hierarchy; the source has stronger bloom and richer wall-panel detail, retained as P3 polish rather than a usability mismatch.
- Copy and content: Neon Glider naming, HUD labels, mission, controls, pause, restart, high score, and reduced-motion copy are consistent and functional.

## Interaction and browser verification

- Start/countdown/gameplay transition passed.
- Keyboard left/right movement passed.
- Mobile edge-tap lane movement passed; all three lane positions remain within the portrait viewport.
- Pause freezes score exactly across an 850 ms sample; Continue resumes score progression.
- Reduced-motion class persists from start into gameplay and was restored to off after the check.
- Desktop and mobile HUDs remain visible over the WebGL scene.
- Browser console warnings/errors checked: none.

## Comparison history

### Iteration 1

- P1: the tunnel occupied too little of the viewport, neon contrast was weak, and the glider was oversized.
- Fix: moved the near tunnel rib toward the camera, replaced one-pixel ribs with core/glow ribbons, brightened the scene, reduced and repositioned the glider, and constrained blocker width to one lane.
- Post-fix evidence: `desktop-gameplay-iteration-2.png`.

### Iteration 2

- P1: the left glider wing was backface-culled and the scene still lacked forward-motion density.
- Fix: made the hull double-sided, added radial speed lines, animated floor chevrons, thicker lane guides, and luminous blocker marks.
- Post-fix evidence: `comparison-final.png` and `comparison-focused-glider-track.png`.

### Iteration 3

- P1: the right lane and glider left the 390 px portrait viewport.
- P2: a passing tunnel rib reduced mobile HUD contrast.
- Fix: introduced aspect-aware horizontal world compression for lane positions, blockers, guides, flow, and the glider; added compact mobile HUD contrast masks.
- Post-fix evidence: `mobile-gameplay-final.png`; touch testing confirms the right lane remains fully playable.

### Iteration 4

- P2: the V-shaped blocker mark had no gameplay meaning and read like an unexplained letter.
- Fix: replaced it with a four-segment broken X using a cyan glow underlay and magenta core, then widened portrait blockers independently from lane spacing so the mark remains legible.
- Post-fix evidence: `desktop-blocker-x.png` and `mobile-blocker-x-final.png`.

## Follow-up polish

- P3: post-processing bloom and richer wall panels would move the runtime closer to the illustration, at additional GPU and bundle cost.
- P3: the procedural WebGL glider has a flatter low-poly treatment than the concept render.

## Implementation checklist

- [x] Source and implementation compared at matching desktop dimensions
- [x] Focused glider/track comparison reviewed
- [x] Desktop and mobile gameplay captured
- [x] Keyboard, touch, pause/resume, and reduced motion verified
- [x] Console checked
- [x] 21 automated tests passed
- [x] Production build passed

final result: passed

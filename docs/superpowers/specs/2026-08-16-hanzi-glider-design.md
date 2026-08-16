# Hanzi Glider Design

## Summary

Hanzi Glider is a lightweight Three.js browser game for practicing simplified Chinese characters and words from HSK 3.0 levels 1–3 using the 2026 trial syllabus. Each 3–5 minute run combines a three-lane arcade flight loop with multiple-choice recognition. The game runs entirely as static files on GitHub Pages and requires no backend.

## Goals

- Make short HSK review sessions enjoyable without obscuring the learning task.
- Support simplified terms from HSK 3.0 levels 1, 2, and 3 in the 2026 trial syllabus.
- Resume an active run after a page reload.
- Start a new run when a new browser page session begins.
- Preserve learning progress across browser sessions.
- Remain practical on mid-range desktop and mobile browsers.

## Non-goals

- Accounts, cloud synchronization, global leaderboards, or multiplayer.
- Handwriting recognition, speech recognition, or audio exercises in the MVP.
- Free-flight physics, a general-purpose level editor, or complex 3D assets.
- Claiming equivalence to an official HSK examination.

## Learning Content

The initial dataset uses levels 1–3 from the official HSK 3.0 examination syllabus published for the 2026 global trial. As of 2026-08-16, HSK 3.0 is still identified by Chinese Testing International as a trial; the UI and dataset metadata must say `HSK 3.0 · 2026 Trial` rather than imply this is the settled regular-exam list.

The source snapshot is the 406-page official syllabus PDF retrieved on 2026-08-16. Its SHA-256 is `ec74ce0439e837bbb15154be13e747ae798903b2fd3a331629df6c3b45504941`. Only entries explicitly assigned to levels 1–3 are imported. Items may contain one or more simplified Chinese characters; the game does not invent an HSK level for individual characters extracted from a multi-character word.

Each immutable dataset entry contains:

```ts
interface HanziEntry {
  id: string;
  term: string;
  pinyin: string;
  meaningsVi: string[];
  level: 1 | 2 | 3;
  sourceOrder: number;
}
```

The dataset manifest records `datasetVersion: "hsk3-trial-2026-08-16"`, source URL, retrieval date, source hash, importer version, and entry counts by level. Vietnamese meanings require human review before release. Generated or inferred vocabulary must not be silently presented as authoritative HSK content.

References:

- [Official HSK 3.0 2026 examination syllabus](https://hsk.cn-bj.ufileos.com/3.0/%E6%96%B0%E7%89%88HSK%E8%80%83%E8%AF%95%E5%A4%A7%E7%BA%B21219.pdf).
- [Official announcement for the second global HSK 3.0 trial on 2026-09-20](https://www.chinesetest.cn/notice).
- [Official standards query for characters and vocabulary](https://admin.chinesetest.cn/standardsAction.do?means=standardInfo).

## Core Gameplay

1. The player selects HSK 1, 2, or 3.
2. The glider moves forward automatically on one of three lanes.
3. Each question displays either a Vietnamese meaning or pinyin.
4. Three distant gates display three candidate simplified terms.
5. The player changes lanes using keyboard, touch, or pointer input.
6. Passing through the correct gate increases combo and energy.
7. Passing through a wrong gate resets combo and records the mistake; it does not end the run.
8. A run ends after 20 questions and presents a focused review of incorrect answers.

The camera is fixed behind the glider. Questions and gates appear early enough to prioritize recognition over reflex speed. Difficulty changes distractor similarity and available reading time, not raw vehicle physics.

## Question Selection

Each run uses a deterministic seeded generator. The scheduler prefers weak terms while retaining new and mastered items:

- 50% weak or recently incorrect terms.
- 30% due review terms.
- 20% new or low-exposure terms.

If a bucket lacks enough eligible terms, the remainder is redistributed to the other buckets. Distractors must come from the selected HSK level or below and must not duplicate the answer.

Mastery is stored per term using attempts, correct answers, current streak, last-seen time, and next-review time. The MVP uses a small deterministic interval table rather than a complex adaptive model.

## State Model

### Active run

`sessionStorage` stores only serializable run state:

- Schema version and dataset version.
- Run seed and generator position.
- Selected HSK level and question sequence.
- Current question index, lane, score, combo, and energy.
- Answer history and active obstacle identifiers.

State is checkpointed after each answer, every 500 ms during movement, and on `visibilitychange`. Reloading restores the run in a paused state and shows a three-second countdown.

If no compatible run state exists, the game creates a new run. Browser session restoration may preserve `sessionStorage`; a static frontend cannot guarantee detection of a physically closed and restored browser session.

### Persistent progress

`localStorage` stores:

- Mastery records by term ID.
- High score per HSK level.
- Last selected level, volume, reduced-motion preference, and input settings.

Invalid, corrupt, or incompatible state is discarded without blocking startup. No personal information is stored.

## Architecture

The implementation uses TypeScript, Vite, and Three.js without React or a physics engine.

```text
src/
  content/       HSK dataset, validation, and manifest
  simulation/    run state, scoring, scheduler, RNG, mastery
  render/        Three.js scene, camera, gates, glider, effects
  input/         action mapping for keyboard, touch, and pointer
  storage/       session and persistent state adapters
  ui/            DOM HUD, menus, countdown, and review screen
  diagnostics/   debug and performance toggles
```

Simulation state is the source of truth. Three.js objects never own scoring, progression, question selection, or saveable state. The renderer maps simulation snapshots to primitive geometry and lightweight animation.

## Visual Design

The selected baseline is a minimal dark 3D course with luminous rails, wireframe obstacles, and high-contrast term gates. This direction keeps glyphs readable and requires no heavy model assets.

The DOM HUD contains only score, combo, speed, run progress, and pause. Menus, instructions, and the end-of-run review appear outside the WebGL canvas. Reduced-motion mode disables camera shake and strong speed effects.

## Error Handling

- Dataset validation failure blocks the affected level and shows a concise content error.
- WebGL initialization failure shows an unsupported-browser message rather than a blank canvas.
- Lost WebGL context pauses the simulation and attempts renderer recovery.
- Storage quota or access failure keeps the current in-memory run playable and warns that progress cannot be saved.
- Invalid restored state is cleared and replaced with a new run.

## Testing

Unit tests cover:

- Seeded question order and deterministic restoration.
- Scheduler bucket allocation and fallback behavior.
- Correct-answer scoring, wrong-answer handling, and mastery updates.
- Dataset uniqueness, required fields, valid HSK levels, and distractor generation.
- Storage serialization, schema migration rejection, and corrupt-state recovery.

Browser smoke tests cover:

- Keyboard, pointer, and touch lane changes.
- Reload restoration and three-second resume countdown.
- New run with an empty page session.
- HSK 1–3 selection and 20-question completion.
- WebGL rendering, responsive layout, and reduced-motion behavior.

Performance validation uses a production build on desktop and one representative mobile browser. The MVP avoids a fixed frame-rate claim; it records frame time, draw calls, and memory during a complete run and treats sustained input or rendering stutter as a release blocker.

## Manual Deployment

GitHub Pages is configured to serve the root of the `gh-pages` branch. Vite uses the repository path as its production `base`.

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

The operator runs:

```bash
npm test
npm run deploy
```

The machine must have Node.js, Git, repository push access, and installed locked dependencies. Deployment does not use GitHub Actions.

## Acceptance Criteria

- The production build loads from a GitHub Pages repository subpath without missing assets.
- A player can select HSK 3.0 level 1, 2, or 3 and complete a 20-question run.
- Every question offers exactly one correct simplified HSK term and two valid distractors.
- The UI labels the content `HSK 3.0 · 2026 Trial`, and the built dataset manifest matches the pinned source hash and per-level entry counts.
- Reloading during a run resumes the same deterministic state after a countdown.
- Opening with no compatible page-session state starts a new run.
- Learning progress remains available across new browser sessions when storage is permitted.
- Corrupt storage and WebGL failure produce usable fallback messages.
- Automated tests and the documented production browser smoke tests pass before manual deployment.

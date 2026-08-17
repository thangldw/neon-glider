export type Lane = 0 | 1 | 2;
export type RunStatus = 'playing' | 'paused' | 'complete';
export type EndReason = 'collision' | 'depleted' | null;
export type TrackEntityKind = 'cube' | 'prism' | 'wall' | 'crystal';

export interface TrackEntity {
  id: string;
  kind: TrackEntityKind;
  lane: Lane;
  distance: number;
  segment: number;
}

export interface RunnerState {
  schemaVersion: 2;
  gameVersion: 'neon-glider-2026-08-17';
  seed: number;
  rngState: number;
  status: RunStatus;
  endReason: EndReason;
  reducedMotion: boolean;
  lane: Lane;
  distance: number;
  speed: number;
  energy: number;
  score: number;
  multiplier: number;
  gates: number;
  crystals: number;
  segmentCursor: number;
  reachableLanes: Lane[];
  entities: TrackEntity[];
}

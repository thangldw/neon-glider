import type { HskLevel } from '../content/types';

export interface MasteryRecord {
  attempts: number;
  correct: number;
  streak: number;
  lastSeenAt: number;
  nextReviewAt: number;
}

export interface ProgressState {
  schemaVersion: 1;
  datasetVersion: 'hsk3-2026-08-16';
  mastery: Record<string, MasteryRecord>;
  highScores: Record<HskLevel, number>;
  selectedLevel: HskLevel;
  reducedMotion: boolean;
  volume: number;
}

export interface AnswerRecord {
  questionId: string;
  selectedId: string;
  correct: boolean;
}

export interface RunState {
  schemaVersion: 1;
  datasetVersion: 'hsk3-2026-08-16';
  seed: number;
  rngState: number;
  level: HskLevel;
  questionIds: string[];
  questionIndex: number;
  lane: 0 | 1 | 2;
  score: number;
  combo: number;
  energy: number;
  answers: AnswerRecord[];
  status: 'playing' | 'paused' | 'complete';
}

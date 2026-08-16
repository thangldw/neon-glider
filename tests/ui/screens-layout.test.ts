import { readFileSync } from 'node:fs';
import { expect, it, vi } from 'vitest';
import type { HanziEntry } from '../../src/content/types';
import type { RunState } from '../../src/simulation/types';
import { createReviewScreen } from '../../src/ui/screens';

it('keeps all-wrong mobile review actions inside a viewport-constrained scroll surface', () => {
  const entries = new Map<string, HanziEntry>();
  const answers = Array.from({ length: 20 }, (_, index) => {
    entries.set(`q${index}`, {
      id: `q${index}`, term: `词${index}`, pinyin: `ci ${index}`, meaningsVi: [`nghĩa ${index}`], level: 1, sourceOrder: index,
    });
    entries.set(`d${index}`, {
      id: `d${index}`, term: `字${index}`, pinyin: `zi ${index}`, meaningsVi: [`chữ ${index}`], level: 1, sourceOrder: index + 20,
    });
    return { questionId: `q${index}`, selectedId: `d${index}`, correct: false };
  });
  const run: RunState = {
    schemaVersion: 1, datasetVersion: 'hsk3-2026-08-16', seed: 1, rngState: 2, level: 1,
    questionIds: answers.map(({ questionId }) => questionId), questionIndex: 20, lane: 1,
    score: 0, combo: 0, energy: 0, answers, status: 'complete',
  };
  const screen = createReviewScreen({ run, entriesById: entries, onRestart: vi.fn(), onMenu: vi.fn() });

  expect(screen.querySelectorAll('.review-item')).toHaveLength(20);
  expect(screen.querySelectorAll('[data-action="restart"], [data-action="menu"]')).toHaveLength(2);
  const css = readFileSync('src/styles.css', 'utf8');
  expect(css).toMatch(/\.review-screen\s*\{[^}]*height:\s*100dvh;[^}]*overflow-y:\s*auto;/s);
});

import { expect, it, vi } from 'vitest';
import { createRunner } from '../../src/simulation/runner';
import {
  createCountdownOverlay,
  createGameScreen,
  createMenuScreen,
  createPauseOverlay,
  createResultScreen,
  createStorageWarning,
  createWebGLFatalScreen,
} from '../../src/ui/screens';

it('renders the approved sparse arcade HUD', () => {
  const screen = createGameScreen(vi.fn());
  screen.update({ ...createRunner(1), score: 127_450, multiplier: 4.2, distance: 2_734, gates: 11, energy: 73 });

  expect(screen.element.textContent).toContain('127,450');
  expect(screen.element.textContent).toContain('×4.2');
  expect(screen.element.textContent).toContain('2,734m');
  expect(screen.element.textContent).toContain('GATE 12');
  expect(screen.element.querySelector('[data-energy-bar]')?.getAttribute('aria-valuenow')).toBe('73');
  expect(screen.element.querySelector('[data-hsk], [data-content-notice]')).toBeNull();
});

it('uses the maintained pause icon inside an accessible playfield-external control', () => {
  const screen = createGameScreen(vi.fn());
  const pause = screen.element.querySelector<HTMLButtonElement>('[data-action="pause"]');

  expect(pause?.getAttribute('aria-label')).toBe('Tạm dừng');
  expect(pause?.querySelector('i.ph.ph-pause')?.getAttribute('aria-hidden')).toBe('true');
  expect(screen.viewport.contains(pause)).toBe(false);
});

it('renders collision and depletion results without learning content', () => {
  const options = { highScore: 100, onRestart: vi.fn(), onMenu: vi.fn() };
  const collision = createResultScreen({
    ...options,
    run: { ...createRunner(1), status: 'complete', endReason: 'collision' },
  });
  const depletion = createResultScreen({
    ...options,
    run: { ...createRunner(2), status: 'complete', endReason: 'depleted' },
  });

  expect(collision.textContent).toContain('VA CHẠM');
  expect(depletion.textContent).toContain('CẠN NĂNG LƯỢNG');
  expect(`${collision.textContent} ${depletion.textContent}`).not.toMatch(/HSK|chữ Hán|pinyin|từ cần xem lại/i);
});

it('provides semantic menu, countdown, pause, storage, and WebGL failure screens', () => {
  const menu = createMenuScreen({
    profile: { schemaVersion: 1, highScore: 9_999, longestDistance: 250, runCount: 2, reducedMotion: false },
    onStart: vi.fn(),
    onReducedMotion: vi.fn(),
  });
  const countdown = createCountdownOverlay(3);
  const paused = createPauseOverlay('Lượt chơi đang tạm dừng.', vi.fn(), vi.fn());
  const warning = createStorageWarning();
  const fatal = createWebGLFatalScreen();

  expect(menu.textContent).toContain('NEON GLIDER');
  expect(menu.textContent).toContain('SỐNG SÓT. NÉ CHƯỚNG NGẠI. GIỮ NĂNG LƯỢNG.');
  expect(menu.querySelector('[data-action="start"]')).toBeInstanceOf(HTMLButtonElement);
  expect(countdown.dataset.screen).toBe('countdown');
  expect(paused.getAttribute('role')).toBe('dialog');
  expect(warning.getAttribute('role')).toBe('status');
  expect(fatal.getAttribute('role')).toBe('alert');
  expect(`${menu.textContent} ${fatal.textContent}`).not.toMatch(/HSK|Hanzi|chữ Hán/i);
});

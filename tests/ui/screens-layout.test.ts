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

it('separates numeric HUD values from their units without changing update hooks', () => {
  const screen = createGameScreen(vi.fn());
  screen.update({ ...createRunner(1), score: 127_450, distance: 2_734, gates: 11, energy: 73 });

  expect(screen.element.querySelector('[data-score]')?.classList).toContain('hud-number');
  expect(screen.element.querySelector('[data-distance]')?.textContent).toBe('2,734');
  expect(screen.element.querySelector('[data-distance-unit]')?.textContent).toBe('m');
  expect(screen.element.querySelector('[data-distance]')?.parentElement?.classList).toContain('distance-metric');
  expect(screen.element.querySelector('[data-gate]')?.textContent).toBe('GATE 12');
  expect(screen.element.querySelector('[data-energy-bar]')?.classList).toContain('energy-track');
});

it('reuses one feedback layer and restarts energy and collision classes', () => {
  const screen = createGameScreen(vi.fn());
  document.body.append(screen.element);
  const feedback = screen.element.querySelector('[data-game-feedback]');

  expect(feedback).toBeTruthy();
  screen.playFeedback('collect');
  expect(screen.element.querySelector('[data-energy-bar]')?.classList).toContain('is-energy-pulse');
  screen.playFeedback('collision');
  expect(feedback?.classList).toContain('is-collision-flash');
  expect(screen.element.querySelectorAll('[data-game-feedback]')).toHaveLength(1);
});

it('keeps the menu concise and exposes one primary action', () => {
  const menu = createMenuScreen({
    profile: { schemaVersion: 1, highScore: 0, longestDistance: 0, runCount: 0, reducedMotion: false },
    onStart: vi.fn(),
    onReducedMotion: vi.fn(),
  });

  expect(menu.querySelectorAll('.primary-button')).toHaveLength(1);
  expect(menu.querySelector('.menu-kicker')?.textContent).toBe('ENDLESS NEON RUNNER');
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
  expect(collision.getAttribute('role')).toBe('dialog');
  expect(collision.getAttribute('aria-modal')).toBe('true');
  expect(`${collision.textContent} ${depletion.textContent}`).not.toContain('20 câu');
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
  expect(`${menu.textContent} ${fatal.textContent}`).not.toContain('ba cổng chữ');
});

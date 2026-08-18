import type { RunnerProfile } from '../storage/profile-storage';
import type { RunnerState } from '../simulation/runner-types';

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function button(label: string, action: string, className = 'ui-button'): HTMLButtonElement {
  const node = element('button', className);
  node.type = 'button';
  node.textContent = label;
  node.dataset.action = action;
  return node;
}

function metric(label: string, dataName: string, className = ''): { root: HTMLElement; value: HTMLElement } {
  const root = element('div', `hud-metric ${className}`.trim());
  const caption = element('span', 'hud-label');
  caption.textContent = label;
  const value = element('strong', 'hud-value hud-readout');
  value.dataset[dataName] = '';
  root.append(caption, value);
  return { root, value };
}

function formatInteger(value: number): string {
  return Math.floor(value).toLocaleString('en-US');
}

export function createMenuScreen(options: {
  profile: RunnerProfile;
  onStart(): void;
  onReducedMotion(enabled: boolean): void;
}): HTMLElement {
  const screen = element('section', 'menu-screen');
  screen.dataset.screen = 'menu';
  screen.tabIndex = -1;
  screen.setAttribute('aria-labelledby', 'game-title');

  const kicker = element('p', 'menu-kicker');
  kicker.textContent = 'ENDLESS NEON RUNNER';
  const title = element('h1');
  title.id = 'game-title';
  title.textContent = 'NEON GLIDER';
  const description = element('p', 'menu-copy');
  description.textContent = 'SURVIVE. DODGE OBSTACLES. KEEP YOUR ENERGY UP.';
  const record = element('p', 'menu-record');
  record.textContent = `HIGH SCORE ${formatInteger(options.profile.highScore)}`;
  const controls = element('p', 'menu-controls');
  controls.textContent = 'A / D — CHANGE LANE   ESC / P — PAUSE';
  const start = button('Start', 'start', 'ui-button primary-button');
  start.addEventListener('click', options.onStart);

  const motionLabel = element('label', 'motion-toggle');
  const motion = element('input');
  motion.type = 'checkbox';
  motion.checked = options.profile.reducedMotion;
  motion.dataset.reducedMotion = '';
  motion.addEventListener('change', () => options.onReducedMotion(motion.checked));
  motionLabel.append(motion, document.createTextNode(' Reduced motion'));

  screen.append(kicker, title, description, record, controls, start, motionLabel);
  return screen;
}

export interface GameScreen {
  element: HTMLElement;
  viewport: HTMLElement;
  overlay: HTMLElement;
  setModal(active: boolean): void;
  update(run: RunnerState): void;
  announceLane(lane: 0 | 1 | 2): void;
  playFeedback(kind: 'collect' | 'collision'): void;
}

export function createGameScreen(onPause: () => void): GameScreen {
  const screen = element('section', 'game-screen');
  screen.dataset.screen = 'game';
  screen.setAttribute('aria-label', 'Neon Glider flight path');

  const viewport = element('div', 'game-viewport');
  viewport.dataset.gameViewport = '';
  viewport.tabIndex = 0;
  viewport.setAttribute('aria-label', 'Swipe, tap an edge, or use arrow keys to change lanes');
  const feedback = element('div', 'game-feedback-layer');
  feedback.dataset.gameFeedback = '';

  const score = metric('SCORE', 'score');
  score.value.classList.add('hud-number');
  const multiplier = metric('MULTIPLIER', 'multiplier', 'multiplier-metric');
  const leftHud = element('section', 'hud-cluster hud-left');
  leftHud.setAttribute('aria-label', 'Score');
  leftHud.append(score.root, multiplier.root);

  const distance = metric('DISTANCE', 'distance', 'distance-metric');
  distance.value.classList.add('hud-number');
  const distanceUnit = element('span', 'hud-unit');
  distanceUnit.dataset.distanceUnit = '';
  distanceUnit.textContent = 'm';
  distance.root.append(distanceUnit);
  const gate = metric('', 'gate', 'gate-metric');
  const rightHud = element('section', 'hud-cluster hud-right');
  rightHud.setAttribute('aria-label', 'Distance and gates');
  rightHud.append(distance.root, gate.root);

  const energyHud = element('section', 'energy-hud');
  energyHud.setAttribute('aria-label', 'Energy');
  const energyLabel = element('span', 'hud-label');
  energyLabel.textContent = 'ENERGY';
  const energyBar = element('div', 'energy-bar energy-track');
  energyBar.dataset.energyBar = '';
  energyBar.setAttribute('role', 'progressbar');
  energyBar.setAttribute('aria-label', 'Energy');
  energyBar.setAttribute('aria-valuemin', '0');
  energyBar.setAttribute('aria-valuemax', '100');
  const energyFill = element('span', 'energy-fill');
  energyBar.append(energyFill);
  energyHud.append(energyLabel, energyBar);

  const pause = element('button', 'pause-button');
  pause.type = 'button';
  pause.dataset.action = 'pause';
  pause.setAttribute('aria-label', 'Pause');
  const pauseIcon = element('i', 'ph ph-pause');
  pauseIcon.setAttribute('aria-hidden', 'true');
  pause.append(pauseIcon);
  pause.addEventListener('click', onPause);

  const laneStatus = element('p', 'sr-only');
  laneStatus.dataset.laneStatus = '';
  laneStatus.setAttribute('aria-live', 'polite');
  const overlay = element('div', 'overlay-slot');
  viewport.append(feedback);
  screen.append(viewport, leftHud, rightHud, energyHud, pause, laneStatus, overlay);

  const restartClass = (node: HTMLElement, className: string) => {
    node.classList.remove(className);
    void node.offsetWidth;
    node.classList.add(className);
  };

  return {
    element: screen,
    viewport,
    overlay,
    setModal(active) {
      overlay.removeAttribute('aria-hidden');
      for (const child of Array.from(screen.children)) {
        if (child === overlay || !(child instanceof HTMLElement)) continue;
        child.inert = active;
        if (active) child.setAttribute('aria-hidden', 'true');
        else child.removeAttribute('aria-hidden');
      }
    },
    update(run) {
      score.value.textContent = formatInteger(run.score);
      multiplier.value.textContent = `×${run.multiplier.toFixed(1)}`;
      distance.value.textContent = formatInteger(run.distance);
      gate.value.textContent = `GATE ${run.gates + 1}`;
      const boundedEnergy = Math.max(0, Math.min(100, run.energy));
      energyBar.setAttribute('aria-valuenow', String(Math.round(boundedEnergy)));
      energyFill.style.width = `${boundedEnergy}%`;
    },
    announceLane(lane) {
      laneStatus.textContent = `Moved to the ${['left', 'center', 'right'][lane]} lane`;
    },
    playFeedback(kind) {
      if (kind === 'collect') restartClass(energyBar, 'is-energy-pulse');
      else restartClass(feedback, 'is-collision-flash');
    },
  };
}

export function createCountdownOverlay(value: number): HTMLElement {
  const overlay = element('section', 'countdown-overlay');
  overlay.dataset.screen = 'countdown';
  overlay.setAttribute('role', 'status');
  overlay.setAttribute('aria-live', 'assertive');
  const label = element('span', 'sr-only');
  label.textContent = 'Starting in';
  const count = element('strong', 'countdown-value');
  count.dataset.countdown = '';
  count.textContent = String(value);
  overlay.append(label, count);
  return overlay;
}

export function createPauseOverlay(message: string, onResume: () => void, onMenu: () => void): HTMLElement {
  const overlay = element('section', 'modal-overlay pause-overlay');
  overlay.dataset.screen = 'paused';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'pause-title');
  const title = element('h2');
  title.id = 'pause-title';
  title.textContent = 'PAUSED';
  const copy = element('p');
  copy.textContent = message;
  const actions = element('div', 'modal-actions');
  const resume = button('Resume', 'resume');
  resume.addEventListener('click', onResume);
  const menu = button('Main menu', 'menu');
  menu.addEventListener('click', onMenu);
  actions.append(resume, menu);
  overlay.append(title, copy, actions);
  queueMicrotask(() => resume.focus({ preventScroll: true }));
  return overlay;
}

export function createResultScreen(options: {
  run: RunnerState;
  highScore: number;
  onRestart(): void;
  onMenu(): void;
}): HTMLElement {
  const screen = element('section', 'result-screen');
  screen.dataset.screen = 'result';
  screen.tabIndex = -1;
  screen.setAttribute('role', 'dialog');
  screen.setAttribute('aria-modal', 'true');
  screen.setAttribute('aria-labelledby', 'result-title');
  const title = element('h1');
  title.id = 'result-title';
  title.textContent = options.run.endReason === 'depleted' ? 'OUT OF ENERGY' : 'COLLISION';
  const stats = element('dl', 'result-stats');
  for (const [label, value] of [
    ['SCORE', formatInteger(options.run.score)],
    ['DISTANCE', `${formatInteger(options.run.distance)}m`],
    ['GATES', formatInteger(options.run.gates)],
    ['CRYSTALS', formatInteger(options.run.crystals)],
    ['HIGH SCORE', formatInteger(options.highScore)],
  ]) {
    const term = element('dt');
    term.textContent = label;
    const detail = element('dd');
    detail.textContent = value;
    stats.append(term, detail);
  }
  const actions = element('div', 'modal-actions');
  const restart = button('Play again', 'restart', 'ui-button primary-button');
  restart.addEventListener('click', options.onRestart);
  const menu = button('Main menu', 'menu');
  menu.addEventListener('click', options.onMenu);
  actions.append(restart, menu);
  screen.append(title, stats, actions);
  return screen;
}

export function createStorageWarning(): HTMLElement {
  const warning = element('p', 'storage-warning');
  warning.dataset.storageWarning = '';
  warning.setAttribute('role', 'status');
  warning.textContent = 'Progress cannot be saved in this browser.';
  return warning;
}

export function createWebGLFatalScreen(): HTMLElement {
  const screen = element('section', 'fatal-screen');
  screen.dataset.screen = 'fatal';
  screen.tabIndex = -1;
  screen.setAttribute('role', 'alert');
  const title = element('h1');
  title.textContent = 'WEBGL COULD NOT START';
  const copy = element('p');
  copy.textContent = 'Enable hardware acceleration or use a newer browser.';
  screen.append(title, copy);
  return screen;
}

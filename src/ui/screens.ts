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
  const value = element('strong', 'hud-value');
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

  const title = element('h1');
  title.id = 'game-title';
  title.textContent = 'NEON GLIDER';
  const description = element('p', 'menu-copy');
  description.textContent = 'SỐNG SÓT. NÉ CHƯỚNG NGẠI. GIỮ NĂNG LƯỢNG.';
  const record = element('p', 'menu-record');
  record.textContent = `KỶ LỤC ${formatInteger(options.profile.highScore)}`;
  const controls = element('p', 'menu-controls');
  controls.textContent = 'A / D — ĐỔI LÀN   ESC / P — TẠM DỪNG';
  const start = button('Bắt đầu', 'start', 'ui-button primary-button');
  start.addEventListener('click', options.onStart);

  const motionLabel = element('label', 'motion-toggle');
  const motion = element('input');
  motion.type = 'checkbox';
  motion.checked = options.profile.reducedMotion;
  motion.dataset.reducedMotion = '';
  motion.addEventListener('change', () => options.onReducedMotion(motion.checked));
  motionLabel.append(motion, document.createTextNode(' Giảm chuyển động'));

  screen.append(title, description, record, controls, start, motionLabel);
  return screen;
}

export interface GameScreen {
  element: HTMLElement;
  viewport: HTMLElement;
  overlay: HTMLElement;
  setModal(active: boolean): void;
  update(run: RunnerState): void;
  announceLane(lane: 0 | 1 | 2): void;
}

export function createGameScreen(onPause: () => void): GameScreen {
  const screen = element('section', 'game-screen');
  screen.dataset.screen = 'game';
  screen.setAttribute('aria-label', 'Đường bay Neon Glider');

  const viewport = element('div', 'game-viewport');
  viewport.dataset.gameViewport = '';
  viewport.tabIndex = 0;
  viewport.setAttribute('aria-label', 'Vuốt, chạm mép hoặc dùng phím mũi tên để đổi làn');

  const score = metric('SCORE', 'score');
  const multiplier = metric('MULTIPLIER', 'multiplier', 'multiplier-metric');
  const leftHud = element('section', 'hud-cluster hud-left');
  leftHud.setAttribute('aria-label', 'Điểm');
  leftHud.append(score.root, multiplier.root);

  const distance = metric('DISTANCE', 'distance');
  const gate = metric('', 'gate', 'gate-metric');
  const rightHud = element('section', 'hud-cluster hud-right');
  rightHud.setAttribute('aria-label', 'Khoảng cách và cổng');
  rightHud.append(distance.root, gate.root);

  const energyHud = element('section', 'energy-hud');
  energyHud.setAttribute('aria-label', 'Năng lượng');
  const energyLabel = element('span', 'hud-label');
  energyLabel.textContent = 'ENERGY';
  const energyBar = element('div', 'energy-bar');
  energyBar.dataset.energyBar = '';
  energyBar.setAttribute('role', 'progressbar');
  energyBar.setAttribute('aria-label', 'Năng lượng');
  energyBar.setAttribute('aria-valuemin', '0');
  energyBar.setAttribute('aria-valuemax', '100');
  const energyFill = element('span', 'energy-fill');
  energyBar.append(energyFill);
  energyHud.append(energyLabel, energyBar);

  const pause = element('button', 'pause-button');
  pause.type = 'button';
  pause.dataset.action = 'pause';
  pause.setAttribute('aria-label', 'Tạm dừng');
  const pauseIcon = element('i', 'ph ph-pause');
  pauseIcon.setAttribute('aria-hidden', 'true');
  pause.append(pauseIcon);
  pause.addEventListener('click', onPause);

  const laneStatus = element('p', 'sr-only');
  laneStatus.dataset.laneStatus = '';
  laneStatus.setAttribute('aria-live', 'polite');
  const overlay = element('div', 'overlay-slot');
  screen.append(viewport, leftHud, rightHud, energyHud, pause, laneStatus, overlay);

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
      distance.value.textContent = `${formatInteger(run.distance)}m`;
      gate.value.textContent = `GATE ${run.gates + 1}`;
      const boundedEnergy = Math.max(0, Math.min(100, run.energy));
      energyBar.setAttribute('aria-valuenow', String(Math.round(boundedEnergy)));
      energyFill.style.width = `${boundedEnergy}%`;
    },
    announceLane(lane) {
      laneStatus.textContent = `Đã chuyển sang làn ${['trái', 'giữa', 'phải'][lane]}`;
    },
  };
}

export function createCountdownOverlay(value: number): HTMLElement {
  const overlay = element('section', 'countdown-overlay');
  overlay.dataset.screen = 'countdown';
  overlay.setAttribute('role', 'status');
  overlay.setAttribute('aria-live', 'assertive');
  const label = element('span', 'sr-only');
  label.textContent = 'Bắt đầu sau';
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
  title.textContent = 'TẠM DỪNG';
  const copy = element('p');
  copy.textContent = message;
  const actions = element('div', 'modal-actions');
  const resume = button('Tiếp tục', 'resume');
  resume.addEventListener('click', onResume);
  const menu = button('Về menu', 'menu');
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
  title.textContent = options.run.endReason === 'depleted' ? 'CẠN NĂNG LƯỢNG' : 'VA CHẠM';
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
  const restart = button('Chơi lại', 'restart', 'ui-button primary-button');
  restart.addEventListener('click', options.onRestart);
  const menu = button('Về menu', 'menu');
  menu.addEventListener('click', options.onMenu);
  actions.append(restart, menu);
  screen.append(title, stats, actions);
  return screen;
}

export function createStorageWarning(): HTMLElement {
  const warning = element('p', 'storage-warning');
  warning.dataset.storageWarning = '';
  warning.setAttribute('role', 'status');
  warning.textContent = 'Không thể lưu tiến trình trên trình duyệt này.';
  return warning;
}

export function createWebGLFatalScreen(): HTMLElement {
  const screen = element('section', 'fatal-screen');
  screen.dataset.screen = 'fatal';
  screen.tabIndex = -1;
  screen.setAttribute('role', 'alert');
  const title = element('h1');
  title.textContent = 'KHÔNG THỂ KHỞI TẠO WEBGL';
  const copy = element('p');
  copy.textContent = 'Hãy bật tăng tốc phần cứng hoặc dùng trình duyệt mới hơn.';
  screen.append(title, copy);
  return screen;
}

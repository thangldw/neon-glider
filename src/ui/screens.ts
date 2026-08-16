import type { HanziEntry, HskLevel } from '../content/types';
import type { RunState } from '../simulation/types';

export interface GateChoice {
  id: string;
  term: string;
}

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function button(label: string, action: string): HTMLButtonElement {
  const node = element('button', 'ui-button');
  node.type = 'button';
  node.textContent = label;
  node.dataset.action = action;
  return node;
}

export function createMenuScreen(options: {
  selectedLevel: HskLevel;
  reducedMotion: boolean;
  onStart(level: HskLevel): void;
  onReducedMotion(enabled: boolean): void;
}): HTMLElement {
  const screen = element('section', 'menu-screen');
  screen.dataset.screen = 'menu';
  screen.setAttribute('aria-labelledby', 'game-title');

  const eyebrow = element('p', 'eyebrow');
  eyebrow.textContent = 'HSK 3.0 · 2026';
  const title = element('h1');
  title.id = 'game-title';
  title.textContent = 'Hanzi Glider';
  const description = element('p', 'menu-copy');
  description.textContent = 'Chọn làn bay qua chữ Hán đúng. Mỗi lượt gồm 20 câu.';
  const draftNotice = element('p', 'content-notice');
  draftNotice.textContent = 'Nghĩa tiếng Việt đang chờ duyệt nội dung.';

  const levels = element('div', 'level-actions');
  levels.setAttribute('aria-label', 'Chọn cấp độ HSK');
  for (const level of [1, 2, 3] as const) {
    const levelButton = button(`HSK ${level}`, `start-${level}`);
    levelButton.dataset.level = String(level);
    if (level === options.selectedLevel) levelButton.classList.add('is-selected');
    levelButton.addEventListener('click', () => options.onStart(level));
    levels.append(levelButton);
  }

  const motionLabel = element('label', 'motion-toggle');
  const motion = element('input');
  motion.type = 'checkbox';
  motion.checked = options.reducedMotion;
  motion.dataset.reducedMotion = '';
  motion.addEventListener('change', () => options.onReducedMotion(motion.checked));
  motionLabel.append(motion, document.createTextNode(' Giảm chuyển động'));

  screen.append(eyebrow, title, description, draftNotice, levels, motionLabel);
  return screen;
}

export interface GameScreen {
  element: HTMLElement;
  viewport: HTMLElement;
  overlay: HTMLElement;
  update(run: RunState, prompt: string, choices: readonly [GateChoice, GateChoice, GateChoice]): void;
  announceLane(lane: 0 | 1 | 2): void;
}

export function createGameScreen(onPause: () => void): GameScreen {
  const screen = element('section', 'game-screen');
  screen.dataset.screen = 'game';
  screen.tabIndex = 0;
  screen.setAttribute('aria-label', 'Đường bay luyện chữ Hán');

  const viewport = element('div', 'game-viewport');
  viewport.dataset.gameViewport = '';

  const hud = element('div', 'game-hud');
  const objective = element('section', 'objective-chip');
  objective.setAttribute('aria-labelledby', 'question-label');
  const objectiveLabel = element('span', 'hud-label');
  objectiveLabel.id = 'question-label';
  objectiveLabel.textContent = 'Tìm chữ';
  const prompt = element('strong', 'question-prompt');
  prompt.dataset.prompt = '';
  objective.append(objectiveLabel, prompt);

  const status = element('section', 'status-strip');
  status.setAttribute('aria-label', 'Trạng thái lượt chơi');
  const score = element('span');
  score.dataset.score = '';
  const combo = element('span');
  combo.dataset.combo = '';
  const energy = element('span');
  energy.dataset.energy = '';
  const speed = element('span');
  speed.dataset.speed = '';
  speed.textContent = 'Tốc độ 1×';
  const progress = element('span');
  progress.dataset.progress = '';
  const pause = button('Tạm dừng', 'pause');
  pause.classList.add('pause-button');
  pause.addEventListener('click', onPause);
  status.append(score, combo, energy, speed, progress, pause);
  hud.append(objective, status);

  const accessibleGates = element('ol', 'sr-only');
  accessibleGates.setAttribute('aria-label', 'Ba lựa chọn theo làn trái, giữa, phải');
  const laneStatus = element('p', 'sr-only');
  laneStatus.setAttribute('aria-live', 'polite');
  laneStatus.dataset.laneStatus = '';
  const overlay = element('div', 'overlay-slot');
  screen.append(viewport, hud, accessibleGates, laneStatus, overlay);

  return {
    element: screen,
    viewport,
    overlay,
    update(run, nextPrompt, choices) {
      prompt.textContent = nextPrompt;
      score.textContent = `Điểm ${run.score}`;
      combo.textContent = `Combo ×${run.combo}`;
      energy.textContent = `Năng lượng ${run.energy}`;
      progress.textContent = `${Math.min(run.questionIndex + 1, 20)} / 20`;
      accessibleGates.replaceChildren(...choices.map((choice, lane) => {
        const item = element('li');
        item.dataset.gateTerm = '';
        item.textContent = `${['Trái', 'Giữa', 'Phải'][lane]}: ${choice.term}`;
        return item;
      }));
    },
    announceLane(lane) {
      laneStatus.textContent = `Đã chuyển sang làn ${['trái', 'giữa', 'phải'][lane]}`;
    },
  };
}

export function createCountdownOverlay(value: number): HTMLElement {
  const overlay = element('section', 'modal-overlay countdown-overlay');
  overlay.dataset.screen = 'countdown';
  overlay.setAttribute('role', 'status');
  overlay.setAttribute('aria-live', 'assertive');
  const label = element('p');
  label.textContent = 'Tiếp tục sau';
  const count = element('strong', 'countdown-value');
  count.dataset.countdown = '';
  count.textContent = String(value);
  overlay.append(label, count);
  return overlay;
}

export function createPauseOverlay(message: string, onResume: () => void, onMenu: () => void): HTMLElement {
  const overlay = element('section', 'modal-overlay');
  overlay.dataset.screen = 'paused';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'pause-title');
  const title = element('h2');
  title.id = 'pause-title';
  title.textContent = 'Đã tạm dừng';
  const copy = element('p');
  copy.textContent = message;
  const actions = element('div', 'modal-actions');
  const resume = button('Tiếp tục', 'resume');
  resume.addEventListener('click', onResume);
  const menu = button('Về menu', 'menu');
  menu.addEventListener('click', onMenu);
  actions.append(resume, menu);
  overlay.append(title, copy, actions);
  queueMicrotask(() => resume.focus());
  return overlay;
}

export function createReviewScreen(options: {
  run: RunState;
  entriesById: ReadonlyMap<string, HanziEntry>;
  onRestart(): void;
  onMenu(): void;
}): HTMLElement {
  const screen = element('section', 'review-screen');
  screen.dataset.screen = 'review';
  const eyebrow = element('p', 'eyebrow');
  eyebrow.textContent = `HSK ${options.run.level} · ${options.run.score} điểm`;
  const title = element('h1');
  title.textContent = 'Ôn lại lượt bay';
  const mistakes = options.run.answers.filter((answer) => !answer.correct);
  const summary = element('p', 'review-summary');
  summary.textContent = mistakes.length === 0
    ? 'Bạn đã trả lời đúng cả 20 câu.'
    : `${mistakes.length} từ cần xem lại.`;
  const list = element('ol', 'review-list');
  for (const answer of mistakes) {
    const correct = options.entriesById.get(answer.questionId);
    const selected = options.entriesById.get(answer.selectedId);
    const item = element('li', 'review-item');
    const term = element('strong', 'review-term');
    term.textContent = correct?.term ?? answer.questionId;
    const detail = element('p');
    detail.textContent = `${correct?.pinyin ?? '—'} · ${correct?.meaningsVi.join('; ') ?? '—'}`;
    const chosen = element('p', 'review-selected');
    chosen.textContent = `Bạn chọn: ${selected?.term ?? answer.selectedId}`;
    item.append(term, detail, chosen);
    list.append(item);
  }
  const actions = element('div', 'modal-actions');
  const restart = button('Bay lại', 'restart');
  restart.addEventListener('click', options.onRestart);
  const menu = button('Về menu', 'menu');
  menu.addEventListener('click', options.onMenu);
  actions.append(restart, menu);
  screen.append(eyebrow, title, summary, list, actions);
  return screen;
}

export function createFatalScreen(kind: 'content' | 'webgl' | 'unknown'): HTMLElement {
  const screen = element('section', 'fatal-screen');
  screen.dataset.screen = 'fatal';
  screen.setAttribute('role', 'alert');
  const title = element('h1');
  title.textContent = kind === 'content' ? 'Không thể tải nội dung'
    : kind === 'webgl' ? 'Trình duyệt không hỗ trợ WebGL'
      : 'Không thể khởi động trò chơi';
  const copy = element('p');
  copy.textContent = kind === 'content'
    ? 'Dữ liệu HSK không hợp lệ hoặc không khả dụng.'
    : kind === 'webgl'
      ? 'Hãy bật tăng tốc phần cứng hoặc dùng trình duyệt mới hơn.'
      : 'Hãy tải lại trang để thử lại.';
  screen.append(title, copy);
  return screen;
}

export function createStorageWarning(): HTMLElement {
  const warning = element('p', 'storage-warning');
  warning.dataset.storageWarning = '';
  warning.setAttribute('role', 'status');
  warning.textContent = 'Tiến trình không được lưu trên trình duyệt này.';
  return warning;
}

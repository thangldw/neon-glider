import { expect, it, vi } from 'vitest';
import { bindActions } from '../../src/input/actions';

function actionHandlers() {
  return { left: vi.fn(), right: vi.fn(), pause: vi.fn() };
}

it('maps supported keyboard actions once and prevents their browser default', () => {
  const handlers = actionHandlers();
  const dispose = bindActions(window, handlers);
  const left = new KeyboardEvent('keydown', { key: 'ArrowLeft', cancelable: true });
  const right = new KeyboardEvent('keydown', { key: 'd', cancelable: true });
  const pause = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });

  window.dispatchEvent(left);
  window.dispatchEvent(right);
  window.dispatchEvent(pause);

  expect(handlers.left).toHaveBeenCalledOnce();
  expect(handlers.right).toHaveBeenCalledOnce();
  expect(handlers.pause).toHaveBeenCalledOnce();
  expect(left.defaultPrevented).toBe(true);
  expect(right.defaultPrevented).toBe(true);
  expect(pause.defaultPrevented).toBe(true);
  dispose();
});

it('ignores key repeats and unrelated keys', () => {
  const handlers = actionHandlers();
  const dispose = bindActions(window, handlers);
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', repeat: true, cancelable: true }));
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'x', cancelable: true }));
  expect(handlers.left).not.toHaveBeenCalled();
  expect(handlers.right).not.toHaveBeenCalled();
  expect(handlers.pause).not.toHaveBeenCalled();
  dispose();
});

it('dispatches exactly one directional action for a swipe beyond 32 CSS pixels', () => {
  const element = document.createElement('div');
  Object.defineProperty(element, 'getBoundingClientRect', {
    value: () => new DOMRect(0, 0, 300, 200),
  });
  const handlers = actionHandlers();
  const dispose = bindActions(element, handlers);

  element.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 1, clientX: 150, clientY: 100, button: 0 }));
  element.dispatchEvent(new PointerEvent('pointermove', { pointerId: 1, clientX: 102, clientY: 100, cancelable: true }));
  element.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1, clientX: 80, clientY: 100 }));

  expect(handlers.left).toHaveBeenCalledOnce();
  expect(handlers.right).not.toHaveBeenCalled();
  dispose();
});

it('does not treat an exactly 32 pixel drag as a lane swipe', () => {
  const element = document.createElement('div');
  Object.defineProperty(element, 'getBoundingClientRect', { value: () => new DOMRect(0, 0, 300, 100) });
  const handlers = actionHandlers();
  const dispose = bindActions(element, handlers);
  element.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 3, clientX: 150, clientY: 50, button: 0 }));
  element.dispatchEvent(new PointerEvent('pointerup', { pointerId: 3, clientX: 182, clientY: 50 }));
  expect(handlers.left).not.toHaveBeenCalled();
  expect(handlers.right).not.toHaveBeenCalled();
  dispose();
});

it('maps edge taps but leaves the middle of the playfield inert', () => {
  const element = document.createElement('div');
  Object.defineProperty(element, 'getBoundingClientRect', {
    value: () => new DOMRect(10, 0, 200, 100),
  });
  const handlers = actionHandlers();
  const dispose = bindActions(element, handlers);

  const tap = (x: number) => {
    element.dispatchEvent(new PointerEvent('pointerdown', { pointerId: x, clientX: x, clientY: 50, button: 0 }));
    element.dispatchEvent(new PointerEvent('pointerup', { pointerId: x, clientX: x, clientY: 50 }));
  };
  tap(20);
  tap(110);
  tap(200);

  expect(handlers.left).toHaveBeenCalledOnce();
  expect(handlers.right).toHaveBeenCalledOnce();
  dispose();
});

it('falls back to touch swipes when Pointer Events are unavailable', () => {
  const original = Object.getOwnPropertyDescriptor(window, 'PointerEvent');
  Object.defineProperty(window, 'PointerEvent', { configurable: true, value: undefined });
  try {
    const element = document.createElement('div');
    const handlers = actionHandlers();
    const dispose = bindActions(element, handlers);
    const touch = (x: number) => ({ identifier: 7, clientX: x, clientY: 40 });
    const start = new Event('touchstart', { cancelable: true });
    Object.defineProperty(start, 'touches', { value: [touch(160)] });
    const end = new Event('touchend', { cancelable: true });
    Object.defineProperty(end, 'changedTouches', { value: [touch(90)] });

    element.dispatchEvent(start);
    element.dispatchEvent(end);
    expect(handlers.left).toHaveBeenCalledOnce();
    dispose();
  } finally {
    if (original) Object.defineProperty(window, 'PointerEvent', original);
    else delete (window as Window & { PointerEvent?: unknown }).PointerEvent;
  }
});

it('owns touch-action for reliable lane swipes and restores it after pointer cancellation', () => {
  const element = document.createElement('div');
  element.style.touchAction = 'pan-y';
  const handlers = actionHandlers();
  const dispose = bindActions(element, handlers);
  expect(element.style.touchAction).toBe('none');

  element.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 4, clientX: 180, clientY: 50, button: 0 }));
  element.dispatchEvent(new PointerEvent('pointercancel', { pointerId: 4 }));
  element.dispatchEvent(new PointerEvent('pointerup', { pointerId: 4, clientX: 80, clientY: 50 }));
  expect(handlers.left).not.toHaveBeenCalled();

  dispose();
  expect(element.style.touchAction).toBe('pan-y');
});

it('releases active pointer capture exactly once when disposed', () => {
  const element = document.createElement('div');
  const release = vi.fn();
  Object.assign(element, {
    setPointerCapture: vi.fn(),
    hasPointerCapture: vi.fn(() => true),
    releasePointerCapture: release,
  });
  const dispose = bindActions(element, actionHandlers());
  element.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 8, clientX: 10, clientY: 20, button: 0 }));
  dispose();
  dispose();
  expect(release).toHaveBeenCalledTimes(1);
  expect(release).toHaveBeenCalledWith(8);
});

it('clears a lost pointer capture so a later pointer-up cannot dispatch a stale swipe', () => {
  const element = document.createElement('div');
  const handlers = actionHandlers();
  const dispose = bindActions(element, handlers);
  element.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 9, clientX: 160, clientY: 30, button: 0 }));
  element.dispatchEvent(new PointerEvent('lostpointercapture', { pointerId: 9 }));
  element.dispatchEvent(new PointerEvent('pointerup', { pointerId: 9, clientX: 80, clientY: 30 }));
  expect(handlers.left).not.toHaveBeenCalled();
  dispose();
});

it('removes input listeners when disposed', () => {
  const handlers = actionHandlers();
  const dispose = bindActions(window, handlers);
  dispose();
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
  expect(handlers.right).not.toHaveBeenCalled();
});

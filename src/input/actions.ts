export interface ActionHandlers {
  left(): void;
  right(): void;
  pause(): void;
}

type ActionTarget = Window | HTMLElement;
type ActiveGesture = { id: number; startX: number; startY: number; dispatched: boolean };

const SWIPE_DISTANCE = 32;
const EDGE_FRACTION = 0.35;

function dispatchDirection(distance: number, handlers: ActionHandlers): void {
  if (distance < 0) handlers.left();
  else handlers.right();
}

function isElement(target: ActionTarget): target is HTMLElement {
  return target instanceof HTMLElement;
}

export function bindActions(target: ActionTarget, handlers: ActionHandlers): () => void {
  let activeGesture: ActiveGesture | null = null;
  let activePointerId: number | null = null;
  let disposed = false;
  const priorTouchAction = isElement(target) ? target.style.touchAction : undefined;
  if (isElement(target)) target.style.touchAction = 'none';

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.repeat) return;
    const key = event.key.toLowerCase();
    if (key === 'arrowleft' || key === 'a') handlers.left();
    else if (key === 'arrowright' || key === 'd') handlers.right();
    else if (key === 'escape' || key === 'p') handlers.pause();
    else return;
    event.preventDefault();
  };

  const releaseGesture = () => {
    activeGesture = null;
  };

  const releasePointerCapture = (eventPointerId?: number) => {
    if (eventPointerId !== undefined && activePointerId !== eventPointerId) return;
    const pointerId = activePointerId;
    activePointerId = null;
    if (pointerId !== null && isElement(target) && target.hasPointerCapture?.(pointerId)) {
      target.releasePointerCapture(pointerId);
    }
    releaseGesture();
  };

  const beginGesture = (id: number, clientX: number, clientY: number) => {
    activeGesture = { id, startX: clientX, startY: clientY, dispatched: false };
  };

  const continueGesture = (id: number, clientX: number, event: Event) => {
    const active = activeGesture;
    if (!active || active.id !== id || active.dispatched) return;
    const distance = clientX - active.startX;
    if (Math.abs(distance) <= SWIPE_DISTANCE) return;
    active.dispatched = true;
    dispatchDirection(distance, handlers);
    event.preventDefault();
  };

  const finishGesture = (id: number, clientX: number, clientY: number) => {
    const active = activeGesture;
    if (!active || active.id !== id) return;
    const distance = clientX - active.startX;
    if (!active.dispatched && Math.abs(distance) > SWIPE_DISTANCE) {
      dispatchDirection(distance, handlers);
    } else if (!active.dispatched && Math.abs(clientY - active.startY) <= SWIPE_DISTANCE && isElement(target)) {
      const bounds = target.getBoundingClientRect();
      const relativeX = bounds.width > 0 ? (clientX - bounds.left) / bounds.width : 0.5;
      if (relativeX <= EDGE_FRACTION) handlers.left();
      else if (relativeX >= 1 - EDGE_FRACTION) handlers.right();
    }
    releaseGesture();
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || activePointerId !== null) return;
    beginGesture(event.pointerId, event.clientX, event.clientY);
    activePointerId = event.pointerId;
    if (isElement(target) && target.setPointerCapture) target.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent) => {
    continueGesture(event.pointerId, event.clientX, event);
  };

  const onPointerUp = (event: PointerEvent) => {
    if (activePointerId !== event.pointerId) return;
    finishGesture(event.pointerId, event.clientX, event.clientY);
    releasePointerCapture(event.pointerId);
  };
  const onPointerCancel = (event: PointerEvent) => releasePointerCapture(event.pointerId);
  const onLostPointerCapture = (event: PointerEvent) => releasePointerCapture(event.pointerId);

  const onTouchStart = (event: TouchEvent) => {
    if (activeGesture) return;
    const touch = event.touches[0];
    if (touch) beginGesture(touch.identifier, touch.clientX, touch.clientY);
  };
  const onTouchMove = (event: TouchEvent) => {
    const active = activeGesture;
    if (!active) return;
    const touch = Array.from(event.touches).find(({ identifier }) => identifier === active.id);
    if (touch) continueGesture(touch.identifier, touch.clientX, event);
  };
  const onTouchEnd = (event: TouchEvent) => {
    const active = activeGesture;
    if (!active) return;
    const touch = Array.from(event.changedTouches).find(({ identifier }) => identifier === active.id);
    if (touch) finishGesture(touch.identifier, touch.clientX, touch.clientY);
  };
  const onTouchCancel = (event: TouchEvent) => {
    const active = activeGesture;
    if (!active) return;
    if (Array.from(event.changedTouches).some(({ identifier }) => identifier === active.id)) releaseGesture();
  };
  const supportsPointerEvents = typeof window.PointerEvent === 'function';

  target.addEventListener('keydown', onKeyDown as EventListener);
  if (isElement(target)) {
    if (supportsPointerEvents) {
      target.addEventListener('pointerdown', onPointerDown);
      target.addEventListener('pointermove', onPointerMove, { passive: false });
      target.addEventListener('pointerup', onPointerUp);
      target.addEventListener('pointercancel', onPointerCancel);
      target.addEventListener('lostpointercapture', onLostPointerCapture);
    } else {
      target.addEventListener('touchstart', onTouchStart, { passive: true });
      target.addEventListener('touchmove', onTouchMove, { passive: false });
      target.addEventListener('touchend', onTouchEnd);
      target.addEventListener('touchcancel', onTouchCancel);
    }
  }

  return () => {
    if (disposed) return;
    disposed = true;
    releasePointerCapture();
    target.removeEventListener('keydown', onKeyDown as EventListener);
    if (isElement(target)) {
      if (supportsPointerEvents) {
        target.removeEventListener('pointerdown', onPointerDown);
        target.removeEventListener('pointermove', onPointerMove);
        target.removeEventListener('pointerup', onPointerUp);
        target.removeEventListener('pointercancel', onPointerCancel);
        target.removeEventListener('lostpointercapture', onLostPointerCapture);
      } else {
        target.removeEventListener('touchstart', onTouchStart);
        target.removeEventListener('touchmove', onTouchMove);
        target.removeEventListener('touchend', onTouchEnd);
        target.removeEventListener('touchcancel', onTouchCancel);
      }
      target.style.touchAction = priorTouchAction ?? '';
    }
  };
}

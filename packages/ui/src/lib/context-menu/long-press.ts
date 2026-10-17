import type { PopoverAnchorPoint } from '../popover/popover-positioning';

// The hold the platforms' own long-press menus wait for
export const LONG_PRESS_DELAY_MS = 500;

// A touch that travels further than this is a scroll or a drag, not a press
const LONG_PRESS_TOLERANCE_PX = 10;

/** Whether a long press was taken up, so the gesture's own follow-ups are suppressed. */
export type LongPressHandler = (
  point: PopoverAnchorPoint,
  target: EventTarget | null,
) => boolean;

/**
 * Calls `onLongPress` when a touch on `element` is held still for
 * `LONG_PRESS_DELAY_MS`, with the point it started at and the element it
 * started on. iOS Safari never turns a long press into a `contextmenu` event,
 * so a menu waiting for one cannot open there; this gives both touch platforms
 * the same path.
 *
 * When the handler returns `true`, the rest of the gesture belongs to it: the
 * `click` that lifting the finger would land on the element is cancelled, no
 * text selection starts, and a `contextmenu` event Android still fires for the
 * same press is cancelled before any other listener sees it (an open context
 * menu would otherwise read it as a request elsewhere and close). Android's
 * request arriving before the hold completes takes over instead, so a host's
 * own `contextmenu` handling keeps working there unchanged.
 *
 * Returns a function that stops watching.
 */
export function watchLongPress(
  element: HTMLElement,
  onLongPress: LongPressHandler,
): () => void {
  let pointerId: number | null = null;
  let start: PopoverAnchorPoint | null = null;
  let startTarget: EventTarget | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let claimed = false;

  const stopTimer = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };
  const endPress = (): void => {
    stopTimer();
    pointerId = null;
    start = null;
    startTarget = null;
  };

  // The click a held press ends with arrives after the finger lifts, and some
  // platforms send none, so the next press or key disarms this instead
  const swallowClick = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();
    disarmClick();
  };
  const disarmClick = (): void => {
    window.removeEventListener('click', swallowClick, true);
    window.removeEventListener('pointerdown', disarmClick, true);
    window.removeEventListener('keydown', disarmClick, true);
  };
  const armClick = (): void => {
    disarmClick();
    window.addEventListener('click', swallowClick, true);
    window.addEventListener('pointerdown', disarmClick, true);
    window.addEventListener('keydown', disarmClick, true);
  };

  const onPointerDown = (event: PointerEvent): void => {
    if (event.pointerType !== 'touch' || !event.isPrimary) {
      return;
    }
    endPress();
    claimed = false;
    pointerId = event.pointerId;
    start = { x: event.clientX, y: event.clientY };
    startTarget = event.target;
    timer = setTimeout(() => {
      timer = null;
      if (start && onLongPress(start, startTarget)) {
        claimed = true;
        armClick();
        // iOS may already have begun selecting the text under the finger
        window.getSelection()?.removeAllRanges();
      }
    }, LONG_PRESS_DELAY_MS);
  };
  const onPointerMove = (event: PointerEvent): void => {
    if (event.pointerId !== pointerId || !start) {
      return;
    }
    if (
      Math.hypot(event.clientX - start.x, event.clientY - start.y) >
      LONG_PRESS_TOLERANCE_PX
    ) {
      stopTimer();
    }
  };
  const onPointerEnd = (event: PointerEvent): void => {
    if (event.pointerId === pointerId) {
      endPress();
    }
  };
  // Window capture, so it runs ahead of the document-level listeners that close a
  // context menu on any request outside it
  const onContextMenu = (event: Event): void => {
    if (pointerId === null || !(event.target instanceof Node)) {
      return;
    }
    if (!element.contains(event.target)) {
      return;
    }
    // Android's own request for the same press. Ahead of the hold it takes over and
    // the press stands down; after a claimed hold it is a duplicate
    if (claimed) {
      event.preventDefault();
      event.stopImmediatePropagation();
    } else {
      stopTimer();
    }
  };
  const onSelectStart = (event: Event): void => {
    if (claimed && pointerId !== null) {
      event.preventDefault();
    }
  };

  element.addEventListener('pointerdown', onPointerDown);
  element.addEventListener('pointermove', onPointerMove);
  element.addEventListener('pointerup', onPointerEnd);
  element.addEventListener('pointercancel', onPointerEnd);
  element.addEventListener('selectstart', onSelectStart);
  window.addEventListener('contextmenu', onContextMenu, true);

  return () => {
    endPress();
    disarmClick();
    element.removeEventListener('pointerdown', onPointerDown);
    element.removeEventListener('pointermove', onPointerMove);
    element.removeEventListener('pointerup', onPointerEnd);
    element.removeEventListener('pointercancel', onPointerEnd);
    element.removeEventListener('selectstart', onSelectStart);
    window.removeEventListener('contextmenu', onContextMenu, true);
  };
}

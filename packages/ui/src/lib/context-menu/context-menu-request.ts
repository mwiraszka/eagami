import { isRtl } from '../direction';
import type { PopoverAnchorPoint } from '../popover/popover-positioning';

// Shift+F10 is the shortcut the APG names for opening a context menu. The
// context-menu key needs no handling: browsers turn it into a `contextmenu` event
export function isContextMenuShortcut(event: KeyboardEvent): boolean {
  return (
    event.key === 'F10' &&
    event.shiftKey &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.metaKey
  );
}

// A request from the keyboard carries no usable pointer position, so it opens
// below the focused element, at its start edge
export function contextMenuPoint(
  event: MouseEvent | KeyboardEvent,
  fallback: Element,
): PopoverAnchorPoint {
  if (event instanceof MouseEvent && !fromKeyboard(event)) {
    return { x: event.clientX, y: event.clientY };
  }
  const focused = event.target instanceof Element ? event.target : fallback;
  const rect = focused.getBoundingClientRect();
  return { x: isRtl(focused) ? rect.right : rect.left, y: rect.bottom };
}

// The context-menu key fires `contextmenu` with no button held, which Pointer
// Events marks with an empty pointer type
function fromKeyboard(event: MouseEvent): boolean {
  if (typeof PointerEvent !== 'undefined' && event instanceof PointerEvent) {
    return event.pointerType === '';
  }
  return event.button === 0 && event.buttons === 0;
}

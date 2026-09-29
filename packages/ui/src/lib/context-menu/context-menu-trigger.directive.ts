import { Directive, ElementRef, inject, input } from '@angular/core';

import { MenuComponent } from '../menu/menu.component';
import type { PopoverComponent } from '../popover/popover.component';
import { contextMenuPoint, isContextMenuShortcut } from './context-menu-request';

/**
 * Where `[eaContextMenuTrigger]` opens its target: at the pointer (below the
 * focused element for a keyboard request), or at the target's own placement
 * against the host.
 */
export type ContextMenuPosition = 'pointer' | 'anchor';

/** An overlay `[eaContextMenuTrigger]` can open as a context menu. */
export type ContextMenuTarget = MenuComponent | PopoverComponent;

/**
 * Opens an `<ea-menu>` or `<ea-popover>` as the context menu of its host: on a
 * right-click or long press, or from the keyboard with Shift+F10 or the
 * context-menu key while focus is on the host or inside it. The browser's own
 * menu is suppressed only when the target opens, so a `null` target, a disabled
 * menu, or a request something inside the host has already handled leaves it be.
 *
 * A menu opens straight away. A popover's parent drives its `[open]` state, so it
 * emits `openRequested` with the point to bind to `[anchorPoint]` instead; give it
 * `[contextMenu]="true"` so it takes focus and dismisses like a context menu.
 *
 * @example
 * ```html
 * <article [eaContextMenuTrigger]="actions">Right-click me</article>
 * <ea-menu #actions>
 *   <ea-menu-item>Rename</ea-menu-item>
 * </ea-menu>
 * ```
 */
@Directive({
  selector: '[eaContextMenuTrigger]',
  host: {
    '(contextmenu)': 'onContextMenu($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ContextMenuTriggerDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  /** The menu or popover to open; `null` or `undefined` leaves the browser's own menu. */
  readonly target = input<ContextMenuTarget | null | undefined>(undefined, {
    alias: 'eaContextMenuTrigger',
  });

  /**
   * Opens at the pointer, or below the focused element for a keyboard request;
   * `anchor` opens at the target's placement against the host instead.
   */
  readonly contextMenuPosition = input<ContextMenuPosition>('pointer');

  onContextMenu(event: MouseEvent): void {
    this.request(event);
  }

  onKeydown(event: KeyboardEvent): void {
    if (isContextMenuShortcut(event)) {
      this.request(event);
    }
  }

  private request(event: MouseEvent | KeyboardEvent): void {
    const target = this.target();
    if (!target || event.defaultPrevented) {
      return;
    }
    if (target instanceof MenuComponent && target.disabled()) {
      return;
    }
    event.preventDefault();
    const host = this.el.nativeElement;
    const point =
      this.contextMenuPosition() === 'pointer' ? contextMenuPoint(event, host) : null;
    if (target instanceof MenuComponent) {
      target.openAsContextMenu(host, point);
    } else {
      target.requestOpen(point);
    }
  }
}

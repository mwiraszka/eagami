import { DestroyRef, Directive, ElementRef, effect, inject, input } from '@angular/core';

import { MenuComponent } from '../menu/menu.component';
import type { PopoverAnchorPoint } from '../popover/popover-positioning';
import type { PopoverComponent } from '../popover/popover.component';
import { contextMenuPoint, isContextMenuShortcut } from './context-menu-request';
import { watchLongPress } from './long-press';

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
 * right-click or a touch long press, or from the keyboard with Shift+F10 or the
 * context-menu key while focus is on the host or inside it. The browser's own
 * menu is suppressed only when the target opens, so a `null` target, a disabled
 * menu, or a request something inside the host has already handled leaves it be.
 *
 * The long press is recognised here rather than left to the browser, since iOS
 * Safari never turns one into a `contextmenu` event. While a target is set, the
 * host also drops the iOS link and image preview a long press would raise.
 *
 * A menu opens straight away. A popover's parent drives its `[open]` state, so it
 * emits `openRequested` with the point to bind to `[anchorPoint]` instead; give it
 * `[contextMenu]="true"` so it takes focus and dismisses like a context menu.
 *
 * One menu can serve many hosts: give each its own `contextMenuData`, and the
 * menu's `triggerData()` holds the data of whichever host opened it.
 *
 * @example
 * ```html
 * @for (file of files; track file.id) {
 *   <article [eaContextMenuTrigger]="actions" [contextMenuData]="file">
 *     {{ file.name }}
 *   </article>
 * }
 * <ea-menu #actions>
 *   <ea-menu-item (clicked)="rename(actions.triggerData())">Rename</ea-menu-item>
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

  /** Handed to an `<ea-menu>` target as it opens, where its `triggerData()` reads it back. */
  readonly contextMenuData = input<unknown>(undefined);

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }
    const host = this.el.nativeElement;
    inject(DestroyRef).onDestroy(watchLongPress(host, point => this.open(point)));
    effect(() => {
      if (this.target()) {
        host.style.setProperty('-webkit-touch-callout', 'none');
      } else {
        host.style.removeProperty('-webkit-touch-callout');
      }
    });
  }

  onContextMenu(event: MouseEvent): void {
    this.request(event);
  }

  onKeydown(event: KeyboardEvent): void {
    if (isContextMenuShortcut(event)) {
      this.request(event);
    }
  }

  private request(event: MouseEvent | KeyboardEvent): void {
    if (event.defaultPrevented || !this.canOpen()) {
      return;
    }
    event.preventDefault();
    this.open(contextMenuPoint(event, this.el.nativeElement));
  }

  private canOpen(): boolean {
    const target = this.target();
    return !!target && !(target instanceof MenuComponent && target.disabled());
  }

  // Whether the target opened, so a long press nothing takes up keeps its click
  private open(point: PopoverAnchorPoint): boolean {
    const target = this.target();
    if (!target || !this.canOpen()) {
      return false;
    }
    const host = this.el.nativeElement;
    const at = this.contextMenuPosition() === 'pointer' ? point : null;
    if (target instanceof MenuComponent) {
      target.openAsContextMenu(host, at, this.contextMenuData());
    } else {
      target.requestOpen(at);
    }
    return true;
  }
}

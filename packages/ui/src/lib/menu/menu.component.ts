import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Injector,
  afterNextRender,
  computed,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { PopoverComponent } from '../popover/popover.component';

/** Placement of the menu list relative to its trigger. */
export type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

/**
 * Popup action menu attached to any focusable element via the
 * `[eaMenuTrigger]` directive. Supports keyboard navigation
 * (arrow keys, Home/End), closes on outside click or Escape, and restores
 * focus to the trigger on close. Positioning, dismissal, and SSR-safe scroll
 * handling are provided by `<ea-popover>`.
 */
@Component({
  selector: 'ea-menu',
  imports: [PopoverComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private readonly injector = inject(Injector);
  private readonly i18n = inject(EagamiI18nService);
  private readonly listEl = viewChild<ElementRef<HTMLElement>>('listEl');

  readonly placement = input<MenuPlacement>('bottom-start');
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: 'aria-label',
  });
  readonly id = input<string>(`ea-menu-${Math.random().toString(36).slice(2, 9)}`);

  /** Accessible label for the menu, falling back to the active locale. */
  readonly resolvedAriaLabel = computed(
    () => this.ariaLabel() ?? this.i18n.messages().menu.label,
  );

  readonly open = model<boolean>(false);
  /** Fires when the menu opens. */
  readonly opened = output<void>();
  /** Fires when the menu closes. */
  readonly closed = output<void>();

  /** Trigger element currently anchoring the menu. Signal-typed so `<ea-popover>` reacts when it changes. */
  protected readonly triggerEl = signal<HTMLElement | undefined>(undefined);

  /** Toggles the menu open state, anchoring it to the given trigger element. */
  toggleAt(triggerEl: HTMLElement): void {
    if (this.disabled()) return;
    if (this.open()) {
      this.close();
    } else {
      this.openAt(triggerEl);
    }
  }

  /** Opens the menu anchored to the given trigger element and focuses the first item. */
  openAt(triggerEl: HTMLElement): void {
    if (this.disabled()) return;
    this.triggerEl.set(triggerEl);
    this.open.set(true);
    this.opened.emit();
    afterNextRender(() => this.focusFirstItem(), { injector: this.injector });
  }

  /**
   * Closes the menu if it is open. Pass `restoreFocus: true` to return focus
   * to the trigger element (used when closing via Escape or item activation;
   * not used on outside click, where the user has chosen a new focus target).
   */
  close(restoreFocus = false): void {
    if (!this.open()) return;
    this.open.set(false);
    this.closed.emit();
    if (restoreFocus) this.triggerEl()?.focus({ preventScroll: true });
  }

  /** Called by `<ea-popover>` when the user clicks outside the menu. */
  onPopoverCloseRequested(): void {
    this.close();
  }

  private getEnabledItems(): HTMLButtonElement[] {
    const list = this.listEl()?.nativeElement;
    if (!list) return [];
    return Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not([disabled])'),
    );
  }

  /**
   * `preventScroll: true` is critical here. The menu list is `position: fixed`
   * but its DOM ancestor is whatever element hosts the menu (often a sticky
   * header). When `.focus()` is called without `preventScroll`, Chromium uses
   * the focused element's DOM-tree position (inside the sticky ancestor) rather
   * than its rendered fixed position to decide whether to scroll — which on a
   * scrolled page nudges the document up by a few pixels per open, until the
   * trigger reaches the top edge. The same guard applies to keyboard navigation
   * and restoring focus on close.
   */
  private focusFirstItem(): void {
    this.getEnabledItems()[0]?.focus({ preventScroll: true });
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.open()) return;
    const list = this.listEl()?.nativeElement;
    const active = document.activeElement as HTMLElement | null;
    if (!list || !active || !list.contains(active)) return;
    const items = this.getEnabledItems();
    if (items.length === 0) return;

    const current = items.indexOf(active as HTMLButtonElement);
    let next = -1;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        next = current < items.length - 1 ? current + 1 : 0;
        break;
      case 'ArrowUp':
        event.preventDefault();
        next = current > 0 ? current - 1 : items.length - 1;
        break;
      case 'Home':
        event.preventDefault();
        next = 0;
        break;
      case 'End':
        event.preventDefault();
        next = items.length - 1;
        break;
    }

    if (next >= 0) items[next].focus({ preventScroll: true });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.open()) return;
    this.close(true);
  }
}

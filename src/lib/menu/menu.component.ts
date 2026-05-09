import { NgClass } from '@angular/common';
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

/** Placement of the menu list relative to its trigger. */
export type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

/**
 * Popup action menu attached to any focusable element via the
 * `[eaMenuTrigger]` directive. Supports keyboard navigation
 * (arrow keys, Home/End), closes on outside click or Escape, and restores
 * focus to the trigger on close.
 */
@Component({
  selector: 'ea-menu',
  imports: [NgClass],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private readonly injector = inject(Injector);
  private readonly listEl = viewChild<ElementRef<HTMLElement>>('listEl');

  readonly placement = input<MenuPlacement>('bottom-start');
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string>('Menu', { alias: 'aria-label' });
  readonly id = input<string>(`ea-menu-${Math.random().toString(36).slice(2, 9)}`);

  readonly open = model<boolean>(false);
  /** Fires when the menu opens. */
  readonly opened = output<void>();
  /** Fires when the menu closes. */
  readonly closed = output<void>();

  private triggerEl: HTMLElement | null = null;
  private readonly triggerRect = signal<DOMRect | null>(null);

  readonly listClasses = computed(() => ({
    [`ea-menu__list--${this.placement()}`]: true,
  }));

  readonly listStyle = computed<Record<string, string>>(() => {
    const rect = this.triggerRect();
    if (!rect) return {};
    const placement = this.placement();
    const gap = 4;
    const style: Record<string, string> = {};

    if (placement === 'bottom-start' || placement === 'bottom-end') {
      style['top'] = `${rect.bottom + gap}px`;
    } else {
      style['bottom'] = `${window.innerHeight - rect.top + gap}px`;
    }

    if (placement === 'bottom-start' || placement === 'top-start') {
      style['left'] = `${rect.left}px`;
    } else {
      style['right'] = `${window.innerWidth - rect.right}px`;
    }

    return style;
  });

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
    this.triggerEl = triggerEl;
    this.triggerRect.set(triggerEl.getBoundingClientRect());
    this.open.set(true);
    this.opened.emit();
    afterNextRender(() => this.focusFirstItem(), { injector: this.injector });
  }

  /** Closes the menu if it is open. */
  close(): void {
    if (!this.open()) return;
    this.open.set(false);
    this.closed.emit();
  }

  private getEnabledItems(): HTMLButtonElement[] {
    const list = this.listEl()?.nativeElement;
    if (!list) return [];
    return Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not([disabled])'),
    );
  }

  private focusFirstItem(): void {
    this.getEnabledItems()[0]?.focus();
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

    if (next >= 0) items[next].focus();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.open()) return;
    const target = event.target as Node;
    if (this.triggerEl?.contains(target)) return;
    if (this.listEl()?.nativeElement.contains(target)) return;
    this.close();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.open()) return;
    this.close();
    this.triggerEl?.focus();
  }

  @HostListener('window:resize')
  @HostListener('window:scroll')
  onViewportChange(): void {
    if (!this.open() || !this.triggerEl) return;
    this.triggerRect.set(this.triggerEl.getBoundingClientRect());
  }
}

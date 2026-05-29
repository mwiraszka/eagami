import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { XIconComponent } from '../icons/x.component';

/** Edge of the viewport from which the drawer slides in. */
export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
/** Size of the drawer panel along its primary axis. */
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

/**
 * Side panel backed by the native `<dialog>` element for browser-managed
 * focus trapping. Slides in from a configurable edge, supports backdrop and
 * Escape dismissal, and exposes `header`, default, and `footer` content
 * slots. The `open` state is a two-way `model()` binding.
 */
@Component({
  selector: 'ea-drawer',
  imports: [NgClass, XIconComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DrawerComponent {
  private readonly drawerEl = viewChild<ElementRef<HTMLDialogElement>>('drawerEl');
  private previouslyFocused: HTMLElement | null = null;
  protected readonly i18n = inject(EagamiI18nService);

  readonly position = input<DrawerPosition>('right');
  readonly size = input<DrawerSize>('md');
  readonly closeOnBackdrop = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  readonly showClose = input<boolean>(true);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly id = input<string>(`ea-drawer-${Math.random().toString(36).slice(2, 9)}`);

  readonly open = model<boolean>(false);

  /** Fires once the drawer has been shown via `showModal()`. */
  readonly opened = output<void>();
  /** Fires when the drawer closes (via close button, backdrop, or Escape). */
  readonly closed = output<void>();

  readonly panelClasses = computed(() => ({
    [`ea-drawer__panel--${this.position()}`]: true,
    [`ea-drawer__panel--${this.size()}`]: true,
  }));

  constructor() {
    effect(() => {
      const drawerRef = this.drawerEl()?.nativeElement;
      if (!drawerRef) {
        return;
      }

      if (this.open()) {
        if (!drawerRef.open) {
          this.previouslyFocused = document.activeElement as HTMLElement | null;
          drawerRef.showModal();
          this.opened.emit();
        }
      } else {
        if (drawerRef.open) {
          drawerRef.close();
          this.previouslyFocused?.focus?.();
          this.previouslyFocused = null;
        }
      }
    });
  }

  handleClose(): void {
    this.open.set(false);
    this.closed.emit();
  }

  handleBackdropClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop()) {
      return;
    }
    const drawerRef = this.drawerEl()?.nativeElement;
    if (event.target === drawerRef) {
      this.handleClose();
    }
  }

  handleCancel(event: Event): void {
    if (!this.closeOnEscape()) {
      event.preventDefault();
      return;
    }
    this.handleClose();
  }
}

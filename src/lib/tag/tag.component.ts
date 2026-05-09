import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';

import { XIconComponent } from '../icons/x.component';

/** Semantic colour scheme of a tag. */
export type TagVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
/** Visual size of a tag. */
export type TagSize = 'sm' | 'md' | 'lg';

/**
 * Inline label commonly used to represent filters, categories, or selected
 * items. When `removable`, renders a close button that emits `removed`; the
 * accessible name of that button is configurable via `removeLabel`.
 */
@Component({
  selector: 'ea-tag',
  imports: [NgClass, XIconComponent],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TagComponent {
  readonly variant = input<TagVariant>('default');
  readonly size = input<TagSize>('md');
  readonly removable = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly removeLabel = input<string>('Remove');

  /** Fires when the user activates the remove button on a `removable` tag. */
  readonly removed = output<void>();

  readonly hostClasses = computed(() => ({
    [`ea-tag--${this.variant()}`]: true,
    [`ea-tag--${this.size()}`]: true,
    'ea-tag--disabled': this.disabled(),
  }));

  onRemove(event: MouseEvent): void {
    event.stopPropagation();
    this.removed.emit();
  }
}

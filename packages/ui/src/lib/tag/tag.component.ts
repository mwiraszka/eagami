import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { XIconComponent } from '../icons/x.component';
import { type EaSize } from '../sizes';

/** Semantic colour scheme of a tag. */
export type TagVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
/** Visual size of a tag. */
export type TagSize = EaSize;

/**
 * Inline label commonly used to represent filters, categories, or selected
 * items. When `removable`, renders a close button that emits `removed`; the
 * accessible name of that button is configurable via `removeLabel` and
 * otherwise falls back to the active locale's translation.
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
  private readonly i18n = inject(EagamiI18nService);

  readonly variant = input<TagVariant>('default');
  readonly size = input<TagSize>('md');
  readonly removable = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly removeLabel = input<string | undefined>(undefined);

  /** Fires when the user activates the remove button on a `removable` tag. */
  readonly removed = output<void>();

  /** Accessible label for the remove button, falling back to the active locale. */
  readonly resolvedRemoveLabel = computed(
    () => this.removeLabel() ?? this.i18n.messages().tag.remove,
  );

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

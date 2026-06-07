import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type Type,
  computed,
  input,
} from '@angular/core';

import { type EaSize } from '../sizes';

/** Visual size of the empty-state block. */
export type EmptyStateSize = EaSize;
/** Heading level used for the title so it fits the surrounding document outline. */
export type EmptyStateHeadingLevel = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Pattern for "no results" or "nothing here yet" screens. Combines an
 * optional icon, title, and description with `[slot=media]` (custom
 * illustration) and `[slot=actions]` (follow-up buttons) content slots.
 */
@Component({
  selector: 'ea-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgComponentOutlet],
})
export class EmptyStateComponent {
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly size = input<EmptyStateSize>('md');
  readonly headingLevel = input<EmptyStateHeadingLevel>('h2');
  /** Optional icon component rendered in the media area above the title. */
  readonly icon = input<Type<unknown> | undefined>(undefined);
  /** Renders a dashed frame around the block. */
  readonly bordered = input<boolean>(false);

  readonly hostClasses = computed(() => ({
    [`ea-empty-state--${this.size()}`]: true,
    'ea-empty-state--bordered': this.bordered(),
  }));
}

import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { type EaSize } from '../sizes';

/** Semantic colour scheme of a badge. */
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
/** Visual size of a badge. */
/**
 * The badge ladder sits one step below the shared scale (its `xs` is already
 * `--font-size-2xs`), so it bottoms out where the others gain a `2xs`.
 */
export type BadgeSize = Exclude<EaSize, '2xs'>;
/**
 * Outer shape of a badge.
 * - `pill` (default): content-shaped pill, ideal for inline status labels
 * - `pin`: fixed-min square that renders as a perfect circle for single
 *   characters (counts) and expands into a pill for longer content
 */
export type BadgeShape = 'pill' | 'pin';

/**
 * Compact indicator used to communicate status, counts, or labels inline with
 * surrounding content.
 */
@Component({
  selector: 'ea-badge',
  imports: [NgClass],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BadgeComponent {
  readonly variant = input<BadgeVariant>('default');
  readonly size = input<BadgeSize>('md');
  readonly shape = input<BadgeShape>('pill');

  readonly hostClasses = computed(() => ({
    [`ea-badge--${this.variant()}`]: true,
    [`ea-badge--${this.size()}`]: true,
    [`ea-badge--${this.shape()}`]: true,
  }));
}

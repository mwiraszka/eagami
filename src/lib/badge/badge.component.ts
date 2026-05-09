import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

/** Semantic colour scheme of a badge. */
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
/** Visual size of a badge. */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Compact pill-shaped indicator used to communicate status, counts, or labels
 * inline with surrounding content.
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

  readonly hostClasses = computed(() => ({
    [`ea-badge--${this.variant()}`]: true,
    [`ea-badge--${this.size()}`]: true,
  }));
}

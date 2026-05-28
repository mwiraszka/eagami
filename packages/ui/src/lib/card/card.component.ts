import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { DividerComponent } from '../divider/divider.component';

/** Visual style of a card surface. */
export type CardVariant = 'elevated' | 'outlined' | 'filled';
/** Padding preset applied to the card's content area. */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
/** Horizontal alignment of card header content. */
export type CardHeaderAlign = 'start' | 'center' | 'end';

/**
 * Surface for grouping related content. Provides optional `header` and
 * `footer` content slots and supports elevated, outlined, and filled
 * variants. The card shadow can be customised per instance via the
 * `--ea-card-shadow` CSS custom property.
 */
@Component({
  selector: 'ea-card',
  imports: [DividerComponent, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  readonly variant = input<CardVariant>('elevated');
  readonly padding = input<CardPadding>('md');
  readonly fullWidth = input<boolean>(false);
  readonly headerAlign = input<CardHeaderAlign>('center');
  readonly headerDivider = input<boolean>(false);

  readonly hostClasses = computed(() => ({
    [`ea-card--${this.variant()}`]: true,
    [`ea-card--padding-${this.padding()}`]: true,
    'ea-card--full-width': this.fullWidth(),
  }));
}

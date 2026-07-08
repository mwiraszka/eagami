import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { type EaSize } from '../sizes';

/** Semantic colour scheme of the progress bar. */
export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
/** Visual height of the progress bar. */
export type ProgressBarSize = EaSize;

/**
 * Linear progress indicator supporting both determinate (driven by `value`
 * and `max`) and indeterminate modes. Optionally renders an inline label
 * and/or the current percentage.
 */
@Component({
  selector: 'ea-progress-bar',
  imports: [NgClass],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProgressBarComponent {
  protected readonly i18n = inject(EagamiI18nService);

  readonly value = input<number>(0);
  readonly max = input<number>(100);
  readonly variant = input<ProgressBarVariant>('default');
  readonly size = input<ProgressBarSize>('md');
  readonly label = input<string | undefined>(undefined);
  /** Shows the rounded percentage alongside the label. */
  readonly showPercentage = input<boolean>(false);
  readonly indeterminate = input<boolean>(false);
  /**
   * Optional buffered position ahead of `value` (same scale as `value`),
   * rendered as a secondary-colour segment behind the fill. Use for
   * download/upload-then-process style progress.
   */
  readonly buffer = input<number | undefined>(undefined);

  /** Whether to render the percentage. */
  readonly showsPercentage = computed(() => this.showPercentage());

  readonly percentage = computed(() => {
    const max = this.max();
    if (max <= 0) {
      return 0;
    }
    return Math.min(100, Math.max(0, (this.value() / max) * 100));
  });

  readonly percentageRounded = computed(() => Math.round(this.percentage()));

  readonly bufferPercentage = computed<number | null>(() => {
    const buffer = this.buffer();
    const max = this.max();
    if (buffer == null || max <= 0) {
      return null;
    }
    return Math.min(100, Math.max(0, (buffer / max) * 100));
  });

  readonly hostClasses = computed(() => ({
    [`ea-progress-bar--${this.variant()}`]: true,
    [`ea-progress-bar--${this.size()}`]: true,
    'ea-progress-bar--indeterminate': this.indeterminate(),
  }));
}

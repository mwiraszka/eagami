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

/** Visual size of the spinner. */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * SVG loading indicator with an accessible `role="status"`. The `label` input
 * overrides the accessible name announced to assistive technology; when unset
 * it falls back to the active locale's translation.
 */
@Component({
  selector: 'ea-spinner',
  imports: [NgClass],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerComponent {
  private readonly i18n = inject(EagamiI18nService);

  readonly size = input<SpinnerSize>('md');
  readonly label = input<string | undefined>(undefined);

  /** Accessible label, falling back to the active locale's translation. */
  readonly resolvedLabel = computed(
    () => this.label() ?? this.i18n.messages().spinner.label,
  );

  readonly hostClasses = computed(() => ({
    [`ea-spinner--${this.size()}`]: true,
  }));
}

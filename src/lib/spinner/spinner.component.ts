import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

/** Visual size of the spinner. */
export type SpinnerSize = 'sm' | 'md' | 'lg';

/**
 * SVG loading indicator with an accessible `role="status"`. Uses the `label`
 * input as the accessible name announced to assistive technology.
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
  readonly size = input<SpinnerSize>('md');
  readonly label = input<string>('Loading');

  readonly hostClasses = computed(() => ({
    [`ea-spinner--${this.size()}`]: true,
  }));
}

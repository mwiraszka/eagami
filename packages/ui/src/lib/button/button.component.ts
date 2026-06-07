import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type Type,
  computed,
  input,
  output,
} from '@angular/core';

import { type EaSize } from '../sizes';

/** Visual style of a button; drives colour and emphasis. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
/** Visual size of a button. */
export type ButtonSize = EaSize;
/** HTML `type` attribute applied to the underlying `<button>` element. */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Standard action button supporting primary, secondary, ghost, and danger
 * variants. Includes a loading state that swaps the label for a spinner while
 * preserving the rendered width.
 */
@Component({
  selector: 'ea-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  imports: [NgClass, NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ea-button--full-width]': 'fullWidth()',
  },
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly type = input<ButtonType>('button');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);
  /** Optional icon component rendered to the left of the label. */
  readonly icon = input<Type<unknown> | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly ariaCurrent = input<string | undefined>(undefined, { alias: 'aria-current' });

  /** Fires when the button is activated; suppressed while disabled or loading. */
  readonly clicked = output<MouseEvent>();

  readonly isDisabled = computed(() => this.disabled() || this.loading());

  readonly hostClasses = computed(() => ({
    [`ea-button--${this.variant()}`]: true,
    [`ea-button--${this.size()}`]: true,
    'ea-button--full-width': this.fullWidth(),
    'ea-button--loading': this.loading(),
    'ea-button--disabled': this.isDisabled(),
  }));

  handleClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }
    this.clicked.emit(event);
  }
}

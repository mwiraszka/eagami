import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AlertCircleIconComponent } from '../icons/alert-circle.component';

/** Visual size of a checkbox. */
export type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * Boolean form control with support for an indeterminate visual state. Pairs
 * a visually hidden native input with a custom checkmark and integrates with
 * Angular forms via `ControlValueAccessor`.
 */
@Component({
  selector: 'ea-checkbox',
  imports: [AlertCircleIconComponent, NgClass],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  // Inputs
  readonly label = input<string | undefined>(undefined);
  /**
   * Optional supplementary value shown immediately after the label, dimmed
   * to the tertiary text token. Renders inside the same `<span>` as the
   * label so it shares the label's exact baseline and font metrics — keeps
   * "Inbox 42" / "Brand (30)" patterns aligned without a sibling element
   * fighting flex / inline-flow centring at the consumer's call site.
   */
  readonly count = input<string | number | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  readonly size = input<CheckboxSize>('md');
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly indeterminate = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly id = input<string>(`ea-checkbox-${Math.random().toString(36).slice(2, 9)}`);

  // Two-way checked binding
  readonly checked = model<boolean>(false);

  // Outputs
  /** Fires with the new checked state whenever the user toggles the checkbox. */
  readonly changed = output<boolean>();

  // Internal state
  private readonly _formDisabled = signal(false);

  // Computed
  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());
  readonly hasError = computed(() => !!this.errorMsg());
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  readonly hostClasses = computed(() => ({
    [`ea-checkbox--${this.size()}`]: true,
    'ea-checkbox--disabled': this.isDisabled(),
    'ea-checkbox--checked': this.checked(),
    'ea-checkbox--indeterminate': this.indeterminate(),
    'ea-checkbox--error': this.hasError(),
  }));

  // ControlValueAccessor callbacks
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  // ControlValueAccessor
  writeValue(val: boolean): void {
    this.checked.set(!!val);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  // Handlers
  handleChange(): void {
    if (this.isDisabled()) return;
    const newValue = !this.checked();
    this.checked.set(newValue);
    this.onChange(newValue);
    this.onTouched();
    this.changed.emit(newValue);
  }
}

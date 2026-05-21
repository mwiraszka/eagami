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

/** Visual size of the switch. */
export type SwitchSize = 'sm' | 'md' | 'lg';

/**
 * On/off toggle styled as a sliding switch. Backed by a visually hidden
 * native checkbox and integrates with Angular forms via
 * `ControlValueAccessor`.
 */
@Component({
  selector: 'ea-switch',
  imports: [AlertCircleIconComponent, NgClass],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
})
export class SwitchComponent implements ControlValueAccessor {
  readonly label = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  readonly size = input<SwitchSize>('md');
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly id = input<string>(`ea-switch-${Math.random().toString(36).slice(2, 9)}`);

  readonly checked = model<boolean>(false);
  /** Fires with the new checked state whenever the user toggles the switch. */
  readonly changed = output<boolean>();

  private readonly _formDisabled = signal(false);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());
  readonly hasError = computed(() => !!this.errorMsg());
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  readonly hostClasses = computed(() => ({
    [`ea-switch--${this.size()}`]: true,
    'ea-switch--checked': this.checked(),
    'ea-switch--disabled': this.isDisabled(),
    'ea-switch--error': this.hasError(),
  }));

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

  handleChange(): void {
    if (this.isDisabled()) return;
    const newValue = !this.checked();
    this.checked.set(newValue);
    this.onChange(newValue);
    this.onTouched();
    this.changed.emit(newValue);
  }
}

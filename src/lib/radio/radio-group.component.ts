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

/** Visual size shared by all radios in the group. */
export type RadioSize = 'sm' | 'md' | 'lg';
/** Layout direction for radios within the group. */
export type RadioOrientation = 'vertical' | 'horizontal';

/**
 * Composite single-select control made up of `ea-radio` children. Manages
 * shared state (name, size, disabled) for its options and integrates with
 * Angular forms via `ControlValueAccessor`.
 */
@Component({
  selector: 'ea-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
})
export class RadioGroupComponent implements ControlValueAccessor {
  // Inputs
  readonly id = input<string>(`ea-radio-group-${Math.random().toString(36).slice(2, 9)}`);
  readonly name = input<string>(`ea-radio-${Math.random().toString(36).slice(2, 9)}`);
  readonly size = input<RadioSize>('md');
  readonly orientation = input<RadioOrientation>('vertical');
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly label = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  // Two-way value binding
  readonly value = model<string>('');

  // Output
  /** Fires with the new value when an option is selected. */
  readonly changed = output<string>();

  // Internal state
  private readonly _formDisabled = signal(false);

  // Computed
  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());
  readonly hasError = computed(() => !!this.errorMsg());
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  // ControlValueAccessor callbacks
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // ControlValueAccessor
  writeValue(val: string): void {
    this.value.set(val ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  /** Programmatically selects the option with the given value. */
  select(val: string): void {
    if (this.isDisabled()) return;
    this.value.set(val);
    this.onChange(val);
    this.onTouched();
    this.changed.emit(val);
  }
}

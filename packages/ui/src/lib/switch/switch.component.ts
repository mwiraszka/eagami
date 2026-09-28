import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type Type,
  computed,
  forwardRef,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FieldMessagesComponent } from '../field/field-messages.component';
import {
  type EaErrorMessages,
  injectControlErrorState,
} from '../forms/control-error-state';
import { type EaSize } from '../sizes';
import { uniqueId } from '../unique-id';

/** Visual size of the switch. */
export type SwitchSize = EaSize;
/** Status tone applied to the switch track in both states. */
export type SwitchVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

/**
 * On/off toggle styled as a sliding switch. Backed by a visually hidden
 * native checkbox and integrates with Angular forms via
 * `ControlValueAccessor`.
 */
@Component({
  selector: 'ea-switch',
  imports: [FieldMessagesComponent, NgClass, NgComponentOutlet],
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
  /** Per-validator-key message overrides for a bound form control (e.g. `{ required: '...' }`). */
  readonly errorMessages = input<EaErrorMessages | undefined>(undefined);
  readonly size = input<SwitchSize>('md');
  /**
   * Status tone for the track: a tinted wash with a toned border while off and
   * the solid tone while on. `default` keeps the neutral off track and brand on track.
   */
  readonly variant = input<SwitchVariant>('default');
  /** Optional icon component drawn in the thumb while the switch is on. */
  readonly onIcon = input<Type<unknown> | undefined>(undefined);
  /** Optional icon component drawn in the thumb while the switch is off. */
  readonly offIcon = input<Type<unknown> | undefined>(undefined);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly id = input<string>(uniqueId('ea-switch'));

  readonly checked = model<boolean>(false);
  /** Fires with the new checked state whenever the user toggles the switch. */
  readonly changed = output<boolean>();

  private readonly _formDisabled = signal(false);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());
  private readonly errorState = injectControlErrorState({
    errorMsg: this.errorMsg,
    errorMessages: this.errorMessages,
  });
  readonly errorText = this.errorState.error;
  readonly hasError = this.errorState.hasError;
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  readonly hostClasses = computed(() => ({
    [`ea-switch--${this.size()}`]: true,
    // Prefixed so the `error` tone never collides with the validation-error class
    [`ea-switch--tone-${this.variant()}`]: this.variant() !== 'default',
    'ea-switch--checked': this.checked(),
    'ea-switch--disabled': this.isDisabled(),
    'ea-switch--error': this.hasError(),
  }));

  protected readonly thumbIcon = computed(() =>
    this.checked() ? this.onIcon() : this.offIcon(),
  );

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
    if (this.isDisabled()) {
      return;
    }
    const newValue = !this.checked();
    this.checked.set(newValue);
    this.onChange(newValue);
    this.onTouched();
    this.changed.emit(newValue);
  }
}

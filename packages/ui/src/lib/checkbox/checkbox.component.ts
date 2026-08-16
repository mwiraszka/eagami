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
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FieldMessagesComponent } from '../field/field-messages.component';
import {
  type EaErrorMessages,
  injectControlErrorState,
} from '../forms/control-error-state';
import { type EaSize } from '../sizes';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import { uniqueId } from '../unique-id';

/** Visual size of a checkbox. */
export type CheckboxSize = EaSize;

/**
 * Boolean form control with support for an indeterminate visual state. Pairs
 * a visually hidden native input with a custom checkmark and integrates with
 * Angular forms via `ControlValueAccessor`.
 */
@Component({
  selector: 'ea-checkbox',
  imports: [FieldMessagesComponent, NgClass, TooltipDirective],
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
  readonly label = input<string | undefined>(undefined);
  /**
   * Optional supplementary value shown immediately after the label, dimmed
   * to the tertiary text token. Renders inside the same `<span>` as the
   * label so it shares the label's exact baseline and font metrics, keeping
   * "Inbox 42" / "Brand (30)" patterns aligned without a sibling element
   * fighting flex / inline-flow centring at the consumer's call site.
   */
  readonly count = input<string | number | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  /** Per-validator-key message overrides for a bound form control (e.g. `{ required: '...' }`). */
  readonly errorMessages = input<EaErrorMessages | undefined>(undefined);
  readonly size = input<CheckboxSize>('md');
  /**
   * Ellipsize a label too long for the space the checkbox is given, revealing
   * the full text in a tooltip while it is clipped. Off by default, since a
   * checkbox otherwise widens its column rather than hiding any of its label.
   */
  readonly truncate = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly indeterminate = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly id = input<string>(uniqueId('ea-checkbox'));

  readonly checked = model<boolean>(false);

  /** Fires with the new checked state whenever the user toggles the checkbox. */
  readonly changed = output<boolean>();

  private readonly _formDisabled = signal(false);

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
    [`ea-checkbox--${this.size()}`]: true,
    'ea-checkbox--truncate': this.truncate(),
    'ea-checkbox--disabled': this.isDisabled(),
    'ea-checkbox--checked': this.checked(),
    'ea-checkbox--indeterminate': this.indeterminate(),
    'ea-checkbox--error': this.hasError(),
  }));

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

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

  // A native checkbox answers to Space alone, and Enter submits the form
  // around it instead, which is not what a person tabbing through a filter
  // column expects
  handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter') {
      return;
    }
    event.preventDefault();
    this.handleChange();
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

import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FieldLabelComponent } from '../field/field-label.component';
import { FieldMessagesComponent } from '../field/field-messages.component';
import {
  type EaErrorMessages,
  injectControlErrorState,
} from '../forms/control-error-state';
import { EagamiI18nService } from '../i18n/i18n.service';
import { type EaSize } from '../sizes';
import { uniqueId } from '../unique-id';

/** Visual size of the number input. */
export type NumberInputSize = EaSize;

/**
 * Numeric field with min/max/step bounds, native arrow-key stepping, and
 * the standard label, hint, and error chrome. The native input carries the
 * `spinbutton` role, so arrow keys step it; the steppers are pointer
 * affordances. Integrates with Angular forms via `ControlValueAccessor`.
 */
@Component({
  selector: 'ea-number-input',
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FieldLabelComponent, FieldMessagesComponent, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true,
    },
  ],
})
export class NumberInputComponent implements ControlValueAccessor {
  readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');
  protected readonly i18n = inject(EagamiI18nService);

  /** Text label rendered above the field. */
  readonly label = input<string | undefined>(undefined);
  /** Placeholder shown while the field is empty. */
  readonly placeholder = input<string>('');
  /** Visual size of the field. */
  readonly size = input<NumberInputSize>('md');
  /** Helper text shown below the field; hidden while an error is showing. */
  readonly hint = input<string | undefined>(undefined);
  /** Error message shown below the field; replaces the hint and flags the field invalid. */
  readonly errorMsg = input<string | undefined>(undefined);
  /** Per-validator-key message overrides for a bound form control (e.g. `{ required: '...' }`). */
  readonly errorMessages = input<EaErrorMessages | undefined>(undefined);
  /** Disables the field. */
  readonly disabled = input<boolean>(false);
  /** Renders the field read-only. */
  readonly readonly = input<boolean>(false);
  /** Marks the field as required. */
  readonly required = input<boolean>(false);
  /** Minimum value; typed values are clamped to it on blur and the steppers respect it. */
  readonly min = input<number | undefined>(undefined);
  /** Maximum value; typed values are clamped to it on blur. */
  readonly max = input<number | undefined>(undefined);
  /** Amount each arrow-key step adds or subtracts. */
  readonly step = input<number>(1);
  /**
   * Caps how many characters the field accepts, counting the digits, the minus
   * sign, and the decimal point. Also sets how wide the field renders; without
   * it the field is six characters wide.
   */
  readonly maxDigits = input<number | undefined>(undefined);
  /** Whether negative values are allowed; when `false` the value floors at 0. */
  readonly allowNegative = input<boolean>(true);
  /** Accessible name for the field when no visible `label` is set. */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  /** `id` applied to the native input and label `for`; auto-generated when omitted. */
  readonly id = input<string>(uniqueId('ea-number-input'));

  /** Current field value; `null` when empty. Two-way bindable via `[(value)]`. */
  readonly value = model<number | null>(null);

  /** Fires with the new value whenever it changes. */
  readonly changed = output<number | null>();
  /** Fires when the input receives focus. */
  readonly focused = output<FocusEvent>();
  /** Fires when the input loses focus. */
  readonly blurred = output<FocusEvent>();

  readonly isFocused = signal(false);
  private readonly _formDisabled = signal(false);

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());
  readonly isInteractive = computed(() => !this.isDisabled() && !this.readonly());

  // The lower bound actually enforced: `min` normally, but floored at 0 when
  // negatives are disallowed (even if `min` was set lower).
  readonly effectiveMin = computed<number | undefined>(() => {
    const min = this.min();
    if (this.allowNegative()) {
      return min;
    }
    return min == null ? 0 : Math.max(min, 0);
  });

  private readonly errorState = injectControlErrorState({
    errorMsg: this.errorMsg,
    errorMessages: this.errorMessages,
  });
  readonly errorText = this.errorState.error;
  readonly hasError = this.errorState.hasError;
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  readonly wrapperClasses = computed(() => ({
    [`ea-number-input-wrapper--${this.size()}`]: true,
    'ea-number-input-wrapper--error': this.hasError(),
    'ea-number-input-wrapper--focused': this.isFocused(),
    'ea-number-input-wrapper--disabled': this.isDisabled(),
    'ea-number-input-wrapper--readonly': this.readonly(),
  }));

  constructor() {
    // Reflect the model onto the native element, but only when they differ
    // NUMERICALLY: comparing text would clobber an in-progress decimal (typing
    // "42." parses to 42, and rewriting "42" would drop the trailing dot).
    effect(() => {
      const el = this.inputEl()?.nativeElement;
      if (!el) {
        return;
      }
      const model = this.value();
      const elValue =
        el.value === '' || Number.isNaN(el.valueAsNumber) ? null : el.valueAsNumber;
      if (elValue !== model) {
        el.value = model == null ? '' : String(model);
      }
    });
  }

  writeValue(val: number | null): void {
    // Do not clamp here: a CVA writeValue cannot call onChange, so clamping now
    // would diverge the form model (unclamped) from the view. Bounds apply on
    // interaction (blur after typing, or stepping) instead.
    this.value.set(val == null || Number.isNaN(Number(val)) ? null : Number(val));
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  protected handleInput(): void {
    this.enforceMaxDigits();
    this.commitFromElement(false);
  }

  // `type="number"` ignores `maxlength`, so the cap is applied to the element's
  // own value. Trimming from the end mirrors what the browser would have done
  // had it stopped accepting the keystroke, and covers paste and drop too. The
  // caret is left alone: a number input supports no selection API, and reading
  // `selectionStart` on one throws.
  private enforceMaxDigits(): void {
    const max = this.maxDigits();
    const el = this.inputEl()?.nativeElement;
    if (max == null || !el || el.value.length <= max) {
      return;
    }
    el.value = el.value.slice(0, max);
  }

  protected handleFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.focused.emit(event);
  }

  protected handleBlur(event: FocusEvent): void {
    this.commitFromElement(true);
    this.isFocused.set(false);
    this.onTouched();
    this.blurred.emit(event);
  }

  // A focused number input changes value on scroll by default, easy to trigger
  // by accident while scrolling the page.
  protected handleWheel(event: WheelEvent): void {
    if (this.isFocused()) {
      event.preventDefault();
    }
  }

  protected handleKeydown(event: KeyboardEvent): void {
    // Exponent notation breaks the numeric bounds; block it. Also block the
    // minus sign when negatives are disallowed.
    if (
      event.key === 'e' ||
      event.key === 'E' ||
      (!this.allowNegative() && event.key === '-')
    ) {
      event.preventDefault();
    }
  }

  /** Moves keyboard focus to the underlying native input element. */
  focus(): void {
    this.inputEl()?.nativeElement.focus();
  }

  // Reads the element, optionally clamps into the effective bounds, and emits
  // only when the value actually changed (so a no-op blur does not dirty a form
  // control or fire a spurious `changed`).
  private commitFromElement(clamp: boolean): void {
    const el = this.inputEl()?.nativeElement;
    if (!el) {
      return;
    }
    let next =
      el.value === '' || Number.isNaN(el.valueAsNumber) ? null : el.valueAsNumber;
    if (clamp && next != null) {
      const clamped = this.clampToBounds(next);
      if (clamped !== next) {
        next = clamped;
        el.value = String(next);
      }
    }
    if (next === this.value()) {
      return;
    }
    this.value.set(next);
    this.onChange(next);
    this.changed.emit(next);
  }

  private clampToBounds(num: number): number {
    const min = this.effectiveMin();
    const max = this.max();
    if (min != null && num < min) {
      return min;
    }
    if (max != null && num > max) {
      return max;
    }
    return num;
  }
}

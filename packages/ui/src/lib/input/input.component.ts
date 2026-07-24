import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  Injector,
  type Type,
  afterNextRender,
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
import { EyeOffIconComponent } from '../icons/eye-off.component';
import { EyeIconComponent } from '../icons/eye.component';
import { XIconComponent } from '../icons/x.component';
import { type EaSize } from '../sizes';
import { uniqueId } from '../unique-id';

/** Visual size of the input. */
export type InputSize = EaSize;
/** HTML `type` attribute applied to the underlying `<input>`. */
export type InputType =
  'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

/**
 * Single-line text field with label, hint, and error message support.
 * Includes a built-in show/hide toggle for `password` inputs and integrates
 * with Angular forms via `ControlValueAccessor`. Prefix and suffix content
 * can be projected via the `prefix` and `suffix` slots.
 */
@Component({
  selector: 'ea-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    EyeIconComponent,
    EyeOffIconComponent,
    FieldLabelComponent,
    FieldMessagesComponent,
    NgClass,
    NgComponentOutlet,
    XIconComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');
  private readonly injector = inject(Injector);
  protected readonly i18n = inject(EagamiI18nService);

  /** Text label rendered above the field. */
  readonly label = input<string | undefined>(undefined);
  /** Native input type; `password` adds a built-in show/hide toggle. */
  readonly type = input<InputType>('text');
  /** Placeholder shown while the field is empty. */
  readonly placeholder = input<string>('');
  /** Leading icon component rendered before the text, e.g. a search or filter glyph. */
  readonly icon = input<Type<unknown> | undefined>(undefined);
  /** Visual size of the field. */
  readonly size = input<InputSize>('md');
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
  /** Value for the native `autocomplete` attribute. */
  readonly autocomplete = input<string | undefined>(undefined);
  /** `id` of a `<datalist>` to associate for native suggestions. */
  readonly list = input<string | undefined>(undefined);
  /** Minimum value for `type="number"`; the value is clamped to it on blur. */
  readonly min = input<number | undefined>(undefined);
  /** Maximum value for `type="number"`; the value is clamped to it on blur. */
  readonly max = input<number | undefined>(undefined);
  /** Step increment for `type="number"`. */
  readonly step = input<number | undefined>(undefined);
  /** Maximum number of characters; enforced for `type="number"`, where native `maxlength` is ignored. */
  readonly maxLength = input<number | undefined>(undefined);
  /** Minimum number of characters (native `minlength`). */
  readonly minLength = input<number | undefined>(undefined);
  /** Focuses the field once, after it first renders. */
  readonly autofocus = input<boolean>(false);
  /** Shows the reveal toggle for `password` inputs. */
  readonly showPasswordToggle = input<boolean>(true);
  /** Shows a clear button while the field has a value. */
  readonly clearable = input<boolean>(false);
  /** `id` applied to the native input and label `for`; auto-generated when omitted. */
  readonly id = input<string>(uniqueId('ea-input'));

  /** Current field value; two-way bindable via `[(value)]`. */
  readonly value = model<string>('');

  readonly isFocused = signal(false);
  readonly passwordVisible = signal(false);
  private readonly _formDisabled = signal(false);

  /** Fires when the input receives focus. */
  readonly focused = output<FocusEvent>();
  /** Fires when the input loses focus. */
  readonly blurred = output<FocusEvent>();

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());

  readonly effectiveType = computed<InputType>(() =>
    this.type() === 'password' && this.passwordVisible() ? 'text' : this.type(),
  );

  private readonly errorState = injectControlErrorState({
    errorMsg: this.errorMsg,
    errorMessages: this.errorMessages,
  });
  readonly errorText = this.errorState.error;
  readonly hasError = this.errorState.hasError;
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  readonly showClear = computed(
    () => this.clearable() && !!this.value() && !this.isDisabled() && !this.readonly(),
  );

  readonly wrapperClasses = computed(() => ({
    [`ea-input-wrapper--${this.size()}`]: true,
    'ea-input-wrapper--error': this.hasError(),
    'ea-input-wrapper--focused': this.isFocused(),
    'ea-input-wrapper--disabled': this.isDisabled(),
    'ea-input-wrapper--readonly': this.readonly(),
  }));

  /** Characters a bounded number field can hold, from `maxLength` or its bounds' digits. */
  private readonly numberCharCapacity = computed<number | null>(() => {
    if (this.type() !== 'number') {
      return null;
    }
    const maxLen = this.maxLength();
    if (maxLen != null) {
      return maxLen;
    }
    const bounds = [this.min(), this.max()].filter((v): v is number => v != null);
    return bounds.length ? Math.max(...bounds.map(v => String(v).length)) : null;
  });

  /** Caps a bounded number field to the widest value it can hold. */
  readonly numberWidth = computed<string | null>(() => {
    const capacity = this.numberCharCapacity();
    return capacity == null ? null : `calc(${capacity}ch + 2em)`;
  });

  constructor() {
    // `afterNextRender` runs once the input has actually been inserted into
    // the DOM and avoids SSR, so the element is guaranteed focusable.
    afterNextRender(
      () => {
        if (this.autofocus()) {
          this.inputEl()?.nativeElement.focus();
        }
      },
      { injector: this.injector },
    );

    // A `[value]` binding that reverts to the value Angular last wrote (e.g. a
    // parent re-applying its default after the field is cleared) leaves the DOM
    // showing the stale user edit, since the bound expression looks unchanged.
    // Reconcile the element to the model so a controlled value always reflects.
    effect(() => {
      const el = this.inputEl()?.nativeElement;
      const next = this.value();
      if (el && el.value !== next) {
        el.value = next;
      }
    });
  }

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

  handleInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    let value = el.value;
    const maxLen = this.maxLength();
    // Native maxlength is ignored on number inputs, so enforce it here
    if (this.type() === 'number' && maxLen != null && value.length > maxLen) {
      value = value.slice(0, maxLen);
      el.value = value;
    }
    this.value.set(value);
    this.onChange(value);
  }

  handleKeydown(event: KeyboardEvent): void {
    // Scientific notation has no place in these fields and breaks the width and
    // length bounds, so block the exponent key on number inputs.
    if (this.type() === 'number' && (event.key === 'e' || event.key === 'E')) {
      event.preventDefault();
    }
  }

  handleWheel(event: WheelEvent): void {
    // A focused number input changes value on scroll by default, easy to trigger
    // by accident while scrolling the page.
    if (this.type() === 'number' && this.isFocused()) {
      event.preventDefault();
    }
  }

  handleFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.focused.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    if (this.type() === 'number') {
      this.clampToBounds();
    }
    this.isFocused.set(false);
    this.onTouched();
    this.blurred.emit(event);
  }

  /** Clamps a number value into `[min, max]` once editing finishes. */
  private clampToBounds(): void {
    const el = this.inputEl()?.nativeElement;
    if (!el || el.value === '') {
      return;
    }
    const num = Number(el.value);
    if (Number.isNaN(num)) {
      return;
    }
    const min = this.min();
    const max = this.max();
    let clamped = num;
    if (min != null && clamped < min) {
      clamped = min;
    }
    if (max != null && clamped > max) {
      clamped = max;
    }
    if (clamped !== num) {
      const next = String(clamped);
      el.value = next;
      this.value.set(next);
      this.onChange(next);
    }
  }

  /** Toggles the password reveal state for `type="password"` inputs. */
  togglePasswordVisibility(): void {
    this.passwordVisible.update(value => !value);
  }

  // Keeps focus in the input while the mouse presses the clear button
  protected onClearMousedown(event: MouseEvent): void {
    event.preventDefault();
  }

  /** Clear the current value and restore focus to the input. */
  clear(): void {
    this.value.set('');
    this.onChange('');
    this.inputEl()?.nativeElement.focus();
  }

  /** Moves keyboard focus to the underlying native input element. */
  focus(): void {
    this.inputEl()?.nativeElement.focus();
  }
}

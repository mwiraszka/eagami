import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  Injector,
  type Type,
  afterNextRender,
  computed,
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
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'search'
  | 'tel'
  | 'url';

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

  readonly hasError = computed(() => !!this.errorMsg());
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
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
  }

  handleFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.focused.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.onTouched();
    this.blurred.emit(event);
  }

  /** Toggles the password reveal state for `type="password"` inputs. */
  togglePasswordVisibility(): void {
    this.passwordVisible.update(value => !value);
  }

  /** Clear the current value and restore focus to the input. */
  clear(event: MouseEvent): void {
    event.preventDefault();
    this.value.set('');
    this.onChange('');
    this.inputEl()?.nativeElement.focus();
  }

  /** Moves keyboard focus to the underlying native input element. */
  focus(): void {
    this.inputEl()?.nativeElement.focus();
  }
}

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

import { LabelledFieldControlBase } from '../field/field-base.directive';
import { FieldLabelComponent } from '../field/field-label.component';
import { FieldMessagesComponent } from '../field/field-messages.component';
import { injectTypedPlaceholder } from '../field/typed-placeholder';
import { TypedPlaceholderComponent } from '../field/typed-placeholder.component';
import { injectControlErrorState } from '../forms/control-error-state';
import { EagamiI18nService } from '../i18n/i18n.service';
import { EyeOffIconComponent } from '../icons/eye-off.component';
import { EyeIconComponent } from '../icons/eye.component';
import { XIconComponent } from '../icons/x.component';
import { type EaSize } from '../sizes';
import { uniqueId } from '../unique-id';

/** Visual size of the input. */
export type InputSize = EaSize;
/** HTML `type` attribute applied to the underlying `<input>`. */
export type InputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';

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
  host: {
    '[attr.aria-labelledby]': 'null',
  },
  imports: [
    EyeIconComponent,
    EyeOffIconComponent,
    FieldLabelComponent,
    FieldMessagesComponent,
    NgClass,
    NgComponentOutlet,
    TypedPlaceholderComponent,
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
export class InputComponent
  extends LabelledFieldControlBase
  implements ControlValueAccessor
{
  readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');
  private readonly injector = inject(Injector);
  protected readonly i18n = inject(EagamiI18nService);

  /** Accessible name for the control when no visible `label` is set. */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  /** Space-separated ids of the elements whose text names the field, such as a label outside the component. */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: 'aria-labelledby',
  });
  /** ARIA role applied to the native input, e.g. `combobox` for a typeahead host. */
  readonly role = input<string | undefined>(undefined);
  /** Expanded state of a controlled popup, forwarded as `aria-expanded`. */
  readonly ariaExpanded = input<boolean | undefined>(undefined, {
    alias: 'aria-expanded',
  });
  /** `id` of the popup element the input controls, forwarded as `aria-controls`. */
  readonly ariaControls = input<string | undefined>(undefined, {
    alias: 'aria-controls',
  });
  /** `id` of the active option in a controlled popup, forwarded as `aria-activedescendant`. */
  readonly ariaActivedescendant = input<string | undefined>(undefined, {
    alias: 'aria-activedescendant',
  });
  /** Autocomplete behavior hint, forwarded as `aria-autocomplete`. */
  readonly ariaAutocomplete = input<'none' | 'inline' | 'list' | 'both' | undefined>(
    undefined,
    { alias: 'aria-autocomplete' },
  );
  /** Native input type; `password` adds a built-in show/hide toggle. */
  readonly type = input<InputType>('text');
  /** Placeholder shown while the field is empty. */
  readonly placeholder = input<string>('');
  /**
   * Hints typed into the empty field one character at a time, trailed by a
   * blinking cursor, each held and then replaced by the next, in a loop. The
   * native placeholder carries the whole current hint for assistive
   * technology, and under `prefers-reduced-motion` the hints swap whole without
   * a cursor. Takes the place of `placeholder` while it holds any hints.
   */
  readonly typedPlaceholder = input<readonly string[]>([]);
  /** Leading icon component rendered before the text, e.g. a search or filter glyph. */
  readonly icon = input<Type<unknown> | undefined>(undefined);
  /** Keeps the leading icon while the field has a value; when false it shows only alongside the placeholder. */
  readonly keepIcon = input<boolean>(true);
  /** Visual size of the field. */
  readonly size = input<InputSize>('md');
  /** Disables the field. */
  readonly disabled = input<boolean>(false);
  /** Renders the field read-only. */
  readonly readonly = input<boolean>(false);
  /** Value for the native `autocomplete` attribute. */
  readonly autocomplete = input<string | undefined>(undefined);
  /** Value for the native `spellcheck` attribute; left to the browser default when unset. */
  readonly spellcheck = input<boolean | undefined>(undefined);
  /** `id` of a `<datalist>` to associate for native suggestions. */
  readonly list = input<string | undefined>(undefined);
  /** Maximum number of characters (native `maxlength`). */
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
  /** Fires with the new value whenever the user edits the field. */
  readonly changed = output<string>();

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

  protected readonly typed = injectTypedPlaceholder(this.typedPlaceholder);
  protected readonly typedPlaceholderShown = computed(
    () => this.typed.animating() && !this.value(),
  );
  protected readonly nativePlaceholder = computed(() =>
    this.typedPlaceholder().length > 0 ? this.typed.hint() : this.placeholder(),
  );

  readonly effectiveType = computed<InputType>(() =>
    this.type() === 'password' && this.passwordVisible() ? 'text' : this.type(),
  );

  private readonly errorState = injectControlErrorState({
    errorMsg: this.errorMsg,
    errorMessages: this.errorMessages,
    showErrorsOn: this.showErrorsOn,
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
    'ea-input-wrapper--focused': this.isFocused() && !this.readonly(),
    'ea-input-wrapper--disabled': this.isDisabled(),
    'ea-input-wrapper--readonly': this.readonly(),
  }));

  constructor() {
    super();
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
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
    this.changed.emit(value);
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

  // Keeps focus in the input while the mouse presses the clear button
  protected onClearMousedown(event: MouseEvent): void {
    event.preventDefault();
  }

  /** Clear the current value and restore focus to the input. */
  clear(): void {
    this.value.set('');
    this.onChange('');
    this.changed.emit('');
    this.inputEl()?.nativeElement.focus();
  }

  /** Moves keyboard focus to the underlying native input element. */
  focus(): void {
    this.inputEl()?.nativeElement.focus();
  }
}

import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  computed,
  forwardRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FieldLabelComponent } from '../field/field-label.component';
import { FieldMessagesComponent } from '../field/field-messages.component';
import { uniqueId } from '../unique-id';

/** Visual size of the textarea. */
export type TextareaSize = 'sm' | 'md' | 'lg';
/** Axis along which the user is allowed to resize the textarea. */
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/**
 * Multiline text field that mirrors the `ea-input` API. Supports configurable
 * `rows`, `resize` direction, and `maxlength`, and integrates with Angular
 * forms via `ControlValueAccessor`.
 */
@Component({
  selector: 'ea-textarea',
  imports: [FieldLabelComponent, FieldMessagesComponent, NgClass],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor {
  readonly textareaEl = viewChild<ElementRef<HTMLTextAreaElement>>('textareaEl');

  readonly label = input<string | undefined>(undefined);
  readonly placeholder = input<string>('');
  readonly size = input<TextareaSize>('md');
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly rows = input<number>(3);
  readonly resize = input<TextareaResize>('vertical');
  readonly maxlength = input<number | undefined>(undefined);
  /** Optional pixel ceiling for the textarea's height. Beyond it, the inner
   * field scrolls vertically instead of growing. */
  readonly maxHeight = input<number | undefined>(undefined);
  readonly id = input<string>(uniqueId('ea-textarea'));

  readonly value = model<string>('');

  readonly isFocused = signal(false);
  private readonly _formDisabled = signal(false);

  /** Fires when the textarea receives focus. */
  readonly focused = output<FocusEvent>();
  /** Fires when the textarea loses focus. */
  readonly blurred = output<FocusEvent>();

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());
  readonly hasError = computed(() => !!this.errorMsg());
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  readonly wrapperClasses = computed(() => ({
    [`ea-textarea-wrapper--${this.size()}`]: true,
    'ea-textarea-wrapper--error': this.hasError(),
    'ea-textarea-wrapper--focused': this.isFocused(),
    'ea-textarea-wrapper--disabled': this.isDisabled(),
    'ea-textarea-wrapper--readonly': this.readonly(),
  }));

  // Drive the visible height from `rows` directly: as a flex item the native
  // `rows` attribute gets collapsed, so an explicit em-based min-height (rows of
  // line-height plus the vertical padding) is what actually makes `rows` take
  // effect and keeps it proportional to the size.
  readonly minHeight = computed(
    () => `calc(${this.rows()} * var(--line-height-normal) * 1em + 0.75em * 2)`,
  );

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
    const value = (event.target as HTMLTextAreaElement).value;
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

  /** Moves keyboard focus to the underlying native textarea element. */
  focus(): void {
    this.textareaEl()?.nativeElement.focus();
  }
}

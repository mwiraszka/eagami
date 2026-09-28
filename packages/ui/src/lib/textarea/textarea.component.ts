import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  type TemplateRef,
  type Type,
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
import {
  type EaErrorMessages,
  injectControlErrorState,
} from '../forms/control-error-state';
import { type EaSize } from '../sizes';
import { uniqueId } from '../unique-id';

const DEFAULT_ROWS = 3;

/** Visual size of the textarea. */
export type TextareaSize = EaSize;
/** Axis along which the user is allowed to resize the textarea. */
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/** Selected character range in the textarea; `start` equals `end` for a bare caret. */
export interface TextareaSelection {
  readonly start: number;
  readonly end: number;
}

/**
 * Multiline text field that mirrors the `ea-input` API. Supports configurable
 * `resize` direction and `maxlength`, exposes the caret through
 * `getSelection()` and `insertText()`, and integrates with Angular
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
  /** Optional icon component rendered before the label text. */
  readonly labelIcon = input<Type<unknown> | undefined>(undefined);
  /** Help revealed by an info button beside the label, as plain text or a template. */
  readonly labelHelp = input<string | TemplateRef<unknown> | undefined>(undefined);
  /** Accessible name for the control when no visible `label` is set. */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly placeholder = input<string>('');
  readonly size = input<TextareaSize>('md');
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  /** Per-validator-key message overrides for a bound form control (e.g. `{ required: '...' }`). */
  readonly errorMessages = input<EaErrorMessages | undefined>(undefined);
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly resize = input<TextareaResize>('vertical');
  readonly maxlength = input<number | undefined>(undefined);
  /** Optional pixel ceiling for the textarea's height. Beyond it, the inner
   * field scrolls vertically instead of growing. */
  readonly maxHeight = input<number | undefined>(undefined);
  /** Optional pixel floor for the textarea's height. Clamped so it never drops
   * below the default height. */
  readonly minHeight = input<number | undefined>(undefined);
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
  private readonly errorState = injectControlErrorState({
    errorMsg: this.errorMsg,
    errorMessages: this.errorMessages,
  });
  readonly errorText = this.errorState.error;
  readonly hasError = this.errorState.hasError;
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  readonly wrapperClasses = computed(() => ({
    [`ea-textarea-wrapper--${this.size()}`]: true,
    'ea-textarea-wrapper--error': this.hasError(),
    'ea-textarea-wrapper--focused': this.isFocused() && !this.readonly(),
    'ea-textarea-wrapper--disabled': this.isDisabled(),
    'ea-textarea-wrapper--readonly': this.readonly(),
  }));

  // Default em-based min-height of 3 lines plus padding keeps it proportional to
  // the size; a consumer `minHeight` (px) raises the floor but can never shrink it
  // below that calculated value.
  readonly minHeightStyle = computed(() => {
    const rowsHeight = `calc(${DEFAULT_ROWS} * var(--line-height-normal) * 1em + 0.75em * 2)`;
    const px = this.minHeight();
    return px && px > 0 ? `max(${rowsHeight}, ${px}px)` : rowsHeight;
  });

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

  /**
   * Returns the selected range as character offsets into the value. The browser
   * keeps it after the field loses focus, so it still reflects where the caret
   * was left once the user has moved on to a button or a dialog.
   */
  getSelection(): TextareaSelection {
    const el = this.textareaEl()?.nativeElement;
    const end = this.value().length;
    return { start: el?.selectionStart ?? end, end: el?.selectionEnd ?? end };
  }

  /**
   * Replaces the current selection with `text` and places the caret after it,
   * notifying the value model, a bound form control and native `input`
   * listeners exactly as typing does. Does nothing while disabled or read-only,
   * and leaves focus where it is.
   */
  insertText(text: string): void {
    const el = this.textareaEl()?.nativeElement;
    if (!el || this.isDisabled() || this.readonly()) {
      return;
    }
    el.setRangeText(text, el.selectionStart, el.selectionEnd, 'end');
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

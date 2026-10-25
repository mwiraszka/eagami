import { NgClass, NgTemplateOutlet } from '@angular/common';
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

import { LabelledFieldControlBase } from '../field/field-base.directive';
import { FieldLabelComponent } from '../field/field-label.component';
import { FieldMessagesComponent } from '../field/field-messages.component';
import { injectTypedPlaceholder } from '../field/typed-placeholder';
import { TypedPlaceholderComponent } from '../field/typed-placeholder.component';
import { injectControlErrorState } from '../forms/control-error-state';
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
 * `resize` direction, `maxLength` and a character count, exposes the caret
 * through `getSelection()` and `insertText()`, and integrates with Angular
 * forms via `ControlValueAccessor`.
 */
@Component({
  selector: 'ea-textarea',
  imports: [
    FieldLabelComponent,
    FieldMessagesComponent,
    NgClass,
    NgTemplateOutlet,
    TypedPlaceholderComponent,
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-labelledby]': 'null',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent
  extends LabelledFieldControlBase
  implements ControlValueAccessor
{
  readonly textareaEl = viewChild<ElementRef<HTMLTextAreaElement>>('textareaEl');

  /** Accessible name for the control when no visible `label` is set. */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  /** Space-separated ids of the elements whose text names the field, such as a label outside the component. */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: 'aria-labelledby',
  });
  readonly placeholder = input<string>('');
  /**
   * Hints typed into the empty field one character at a time, trailed by a
   * blinking cursor, each held and then replaced by the next, in a loop. The
   * native placeholder carries the whole current hint for assistive
   * technology, and under `prefers-reduced-motion` the hints swap whole without
   * a cursor. Takes the place of `placeholder` while it holds any hints.
   */
  readonly typedPlaceholder = input<readonly string[]>([]);
  readonly size = input<TextareaSize>('md');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly resize = input<TextareaResize>('vertical');
  readonly maxLength = input<number | undefined>(undefined);
  /** Shows the number of characters typed below the field, against `maxLength` when one is set. */
  readonly showCount = input<boolean>(false);
  /** Optional ceiling for the textarea's height, as a CSS length. Beyond it,
   * the inner field scrolls vertically instead of growing. */
  readonly maxHeight = input<string | undefined>(undefined);
  /** Optional floor for the textarea's height, as a CSS length. Clamped so it
   * never drops below the default height. */
  readonly minHeight = input<string | undefined>(undefined);
  readonly id = input<string>(uniqueId('ea-textarea'));

  readonly value = model<string>('');
  /** Fires with the new value whenever the user edits the textarea. */
  readonly changed = output<string>();

  readonly isFocused = signal(false);
  private readonly _formDisabled = signal(false);

  /** Fires when the textarea receives focus. */
  readonly focused = output<FocusEvent>();
  /** Fires when the textarea loses focus. */
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

  private readonly errorState = injectControlErrorState({
    errorMsg: this.errorMsg,
    errorMessages: this.errorMessages,
    showErrorsOn: this.showErrorsOn,
  });
  readonly errorText = this.errorState.error;
  readonly hasError = this.errorState.hasError;
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  protected readonly countText = computed(() => {
    const length = this.value().length;
    const max = this.maxLength();
    return max ? `${length} / ${max}` : `${length}`;
  });

  protected readonly describedBy = computed(() => {
    const ids: string[] = [];
    if (this.showError()) {
      ids.push(`${this.id()}-error`);
    } else if (this.showHint()) {
      ids.push(`${this.id()}-hint`);
    }
    if (this.showCount()) {
      ids.push(`${this.id()}-count`);
    }
    return ids.length > 0 ? ids.join(' ') : null;
  });

  readonly wrapperClasses = computed(() => ({
    [`ea-textarea-wrapper--${this.size()}`]: true,
    'ea-textarea-wrapper--error': this.hasError(),
    'ea-textarea-wrapper--focused': this.isFocused() && !this.readonly(),
    'ea-textarea-wrapper--disabled': this.isDisabled(),
    'ea-textarea-wrapper--readonly': this.readonly(),
  }));

  // Default em-based min-height of 3 lines plus padding keeps it proportional to
  // the size; a consumer `minHeight` raises the floor but can never shrink it
  // below that calculated value.
  readonly minHeightStyle = computed(() => {
    const rowsHeight = `calc(${DEFAULT_ROWS} * var(--line-height-normal) * 1em + 0.75em * 2)`;
    const floor = this.minHeight();
    return floor ? `max(${rowsHeight}, ${floor})` : rowsHeight;
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

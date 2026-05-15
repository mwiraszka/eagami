import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { EagamiI18nService } from '../i18n/i18n.service';

/** Visual size of each digit cell. */
export type CodeInputSize = 'sm' | 'md' | 'lg';

/**
 * Verification code entry made up of one input per digit. Auto-advances on
 * input, supports paste of the full code at once, and integrates with Angular
 * forms via `ControlValueAccessor`.
 */
@Component({
  selector: 'ea-code-input',
  templateUrl: './code-input.component.html',
  styleUrl: './code-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeInputComponent),
      multi: true,
    },
  ],
})
export class CodeInputComponent implements ControlValueAccessor {
  readonly digitEls = viewChildren<ElementRef<HTMLInputElement>>('digitEl');
  protected readonly i18n = inject(EagamiI18nService);

  // Inputs
  readonly label = input<string | undefined>(undefined);
  readonly placeholder = input<string>('');
  readonly length = input<number>(6);
  readonly size = input<CodeInputSize>('md');
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly id = input<string>(`ea-code-input-${Math.random().toString(36).slice(2, 9)}`);

  // Two-way value binding
  readonly value = model<string>('');

  // Internal state
  readonly focusedIndex = signal<number>(-1);
  private readonly _formDisabled = signal(false);

  // Outputs
  /** Fires with the full code once every digit has been entered. */
  readonly completed = output<string>();

  // ControlValueAccessor callbacks
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // Computed
  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());

  readonly hasError = computed(() => !!this.errorMsg());
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  readonly digits = computed(() => {
    const val = this.value();
    const len = this.length();
    return Array.from({ length: len }, (_, i) => val[i] ?? '');
  });

  readonly indices = computed(() => Array.from({ length: this.length() }, (_, i) => i));

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

  handleInput(event: Event, index: number): void {
    if (this.readonly()) return;
    const input = event.target as HTMLInputElement;
    const char = input.value.replace(/[^0-9]/g, '').slice(-1);
    input.value = char;

    const current = this.value();
    const chars = current.padEnd(this.length(), ' ').split('');
    chars[index] = char;
    const newValue = chars.join('').replace(/ +$/, '');

    this.value.set(newValue);
    this.onChange(newValue);

    if (char && index < this.length() - 1) {
      this.focusDigit(index + 1);
    }

    if (newValue.length === this.length()) {
      this.completed.emit(newValue);
    }
  }

  handleKeydown(event: KeyboardEvent, index: number): void {
    const inputs = this.digitEls();

    if (event.key === 'Backspace') {
      if (this.readonly()) return;
      event.preventDefault();
      const current = this.value();
      const chars = current.padEnd(this.length(), ' ').split('');

      if (chars[index] && chars[index] !== ' ') {
        chars[index] = ' ';
      } else if (index > 0) {
        chars[index - 1] = ' ';
        this.focusDigit(index - 1);
      }

      const newValue = chars.join('').replace(/ +$/, '');
      this.value.set(newValue);
      this.onChange(newValue);
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusDigit(index - 1);
    } else if (event.key === 'ArrowRight' && index < inputs.length - 1) {
      event.preventDefault();
      this.focusDigit(index + 1);
    }
  }

  handlePaste(event: ClipboardEvent): void {
    event.preventDefault();
    if (this.readonly()) return;
    const pasted = (event.clipboardData?.getData('text') ?? '').replace(/[^0-9]/g, '');
    if (!pasted) return;

    const clipped = pasted.slice(0, this.length());
    this.value.set(clipped);
    this.onChange(clipped);

    const nextIndex = Math.min(clipped.length, this.length() - 1);
    this.focusDigit(nextIndex);

    if (clipped.length === this.length()) {
      this.completed.emit(clipped);
    }
  }

  handleFocus(index: number): void {
    this.focusedIndex.set(index);
    const input = this.digitEls()[index]?.nativeElement;
    input?.select();
  }

  handleBlur(): void {
    this.focusedIndex.set(-1);
    this.onTouched();
  }

  /** Moves keyboard focus to the next empty digit (or the last one when full). */
  focus(): void {
    const val = this.value();
    const index = Math.min(val.length, this.length() - 1);
    this.focusDigit(index);
  }

  private focusDigit(index: number): void {
    this.digitEls()[index]?.nativeElement.focus();
  }
}

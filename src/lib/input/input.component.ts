import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  forwardRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AlertCircleIconComponent } from '../icons/alert-circle.component';
import { EyeOffIconComponent } from '../icons/eye-off.component';
import { EyeIconComponent } from '../icons/eye.component';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'search'
  | 'tel'
  | 'url';

@Component({
  selector: 'ea-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, EyeIconComponent, EyeOffIconComponent, AlertCircleIconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, AfterViewInit {
  readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');

  // Inputs
  readonly label = input<string | undefined>(undefined);
  readonly type = input<InputType>('text');
  readonly placeholder = input<string>('');
  readonly size = input<InputSize>('md');
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly autocomplete = input<string | undefined>(undefined);
  readonly autofocus = input<boolean>(false);
  readonly showPasswordToggle = input<boolean>(true);
  readonly id = input<string>(`ea-input-${Math.random().toString(36).slice(2, 9)}`);

  // Two-way value binding
  readonly value = model<string>('');

  // Internal state
  readonly isFocused = signal(false);
  readonly passwordVisible = signal(false);
  private readonly _formDisabled = signal(false);

  // Outputs
  readonly focused = output<FocusEvent>();
  readonly blurred = output<FocusEvent>();

  // ControlValueAccessor callbacks
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // Computed
  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());

  readonly effectiveType = computed<InputType>(() =>
    this.type() === 'password' && this.passwordVisible() ? 'text' : this.type(),
  );

  readonly hasError = computed(() => !!this.errorMsg());
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  readonly wrapperClasses = computed(() => ({
    [`ea-input-wrapper--${this.size()}`]: true,
    'ea-input-wrapper--error': this.hasError(),
    'ea-input-wrapper--focused': this.isFocused(),
    'ea-input-wrapper--disabled': this.isDisabled(),
    'ea-input-wrapper--readonly': this.readonly(),
  }));

  ngAfterViewInit(): void {
    if (this.autofocus()) {
      setTimeout(() => this.inputEl()?.nativeElement.focus());
    }
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

  // Handlers
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

  togglePasswordVisibility(): void {
    this.passwordVisible.update(value => !value);
  }

  focus(): void {
    this.inputEl()?.nativeElement.focus();
  }
}

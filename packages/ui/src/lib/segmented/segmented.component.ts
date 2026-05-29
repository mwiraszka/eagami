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
  viewChildren,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FieldLabelComponent } from '../field/field-label.component';
import { FieldMessagesComponent } from '../field/field-messages.component';
import type { SelectOption } from '../select-option';

/** Visual size of the segmented control. */
export type SegmentedSize = 'sm' | 'md' | 'lg';

/**
 * Compact toggle button group for picking one of a small set of options
 * (e.g. List/Grid/Kanban or Light/Dark). Implements `radiogroup` semantics
 * and `ControlValueAccessor`, with full keyboard support
 * (arrow keys, Home/End, Enter/Space).
 */
@Component({
  selector: 'ea-segmented',
  templateUrl: './segmented.component.html',
  styleUrl: './segmented.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FieldLabelComponent, FieldMessagesComponent, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SegmentedComponent),
      multi: true,
    },
  ],
})
export class SegmentedComponent implements ControlValueAccessor {
  readonly buttonEls = viewChildren<ElementRef<HTMLButtonElement>>('optionEl');

  readonly options = input.required<SelectOption[]>();
  readonly label = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  readonly size = input<SegmentedSize>('md');
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly id = input<string>(`ea-segmented-${Math.random().toString(36).slice(2, 9)}`);

  readonly value = model<string>('');
  /** Fires with the new value when the user selects a different option. */
  readonly changed = output<string>();

  private readonly _formDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());
  readonly hasError = computed(() => !!this.errorMsg());
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  readonly enabledOptions = computed(() => this.options().filter(opt => !opt.disabled));

  readonly hostClasses = computed(() => ({
    [`ea-segmented--${this.size()}`]: true,
    'ea-segmented--full-width': this.fullWidth(),
    'ea-segmented--disabled': this.isDisabled(),
    'ea-segmented--error': this.hasError(),
  }));

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

  isSelected(option: SelectOption): boolean {
    return this.value() === option.value;
  }

  isOptionDisabled(option: SelectOption): boolean {
    return this.isDisabled() || !!option.disabled;
  }

  /** Programmatically selects the given option. */
  select(option: SelectOption): void {
    if (this.isOptionDisabled(option)) {
      return;
    }
    if (this.value() === option.value) {
      this.onTouched();
      return;
    }
    this.value.set(option.value);
    this.onChange(option.value);
    this.onTouched();
    this.changed.emit(option.value);
  }

  handleKeydown(event: KeyboardEvent, index: number): void {
    if (this.isDisabled()) {
      return;
    }

    const enabled = this.enabledOptions();
    if (enabled.length === 0) {
      return;
    }

    let targetValue: string | null = null;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown': {
        const current = enabled.findIndex(o => o.value === this.value());
        const nextIndex = (current + 1 + enabled.length) % enabled.length;
        targetValue = enabled[nextIndex].value;
        break;
      }
      case 'ArrowLeft':
      case 'ArrowUp': {
        const current = enabled.findIndex(o => o.value === this.value());
        const prevIndex = (current - 1 + enabled.length) % enabled.length;
        targetValue = enabled[prevIndex].value;
        break;
      }
      case 'Home':
        targetValue = enabled[0].value;
        break;
      case 'End':
        targetValue = enabled[enabled.length - 1].value;
        break;
      case ' ':
      case 'Enter': {
        const opt = this.options()[index];
        if (opt) {
          this.select(opt);
        }
        event.preventDefault();
        return;
      }
      default:
        return;
    }

    if (targetValue !== null) {
      event.preventDefault();
      const opt = this.options().find(o => o.value === targetValue);
      if (opt) {
        this.select(opt);
        const targetIndex = this.options().findIndex(o => o.value === targetValue);
        queueMicrotask(() => this.buttonEls()[targetIndex]?.nativeElement.focus());
      }
    }
  }
}

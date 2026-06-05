import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  HostListener,
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
import type { SelectOption } from '../select-option';
import { uniqueId } from '../unique-id';

/** Visual size of the autocomplete input. */
export type AutocompleteSize = 'sm' | 'md' | 'lg';

/**
 * Text input paired with a filtered suggestion list. Filters options by
 * case-insensitive substring match, supports arrow-key navigation, and
 * implements `ControlValueAccessor` for use with reactive and template-driven
 * forms.
 */
@Component({
  selector: 'ea-autocomplete',
  imports: [FieldLabelComponent, FieldMessagesComponent, NgClass],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent implements ControlValueAccessor {
  private readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');
  private readonly hostEl = viewChild<ElementRef<HTMLElement>>('hostEl');
  private readonly i18n = inject(EagamiI18nService);

  readonly label = input<string | undefined>(undefined);
  readonly placeholder = input<string>('');
  readonly options = input<SelectOption[]>([]);
  readonly size = input<AutocompleteSize>('md');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  readonly minLength = input<number>(0);
  readonly maxResults = input<number>(10);
  readonly emptyMessage = input<string | undefined>(undefined);
  readonly id = input<string>(uniqueId('ea-autocomplete'));

  readonly value = model<string>('');

  /** Fires when the user picks an option from the suggestion list. */
  readonly selected = output<SelectOption>();
  /** Fires whenever the input text changes, including on free-text edits. */
  readonly changed = output<string>();
  /** Fires when the input receives focus. */
  readonly focused = output<FocusEvent>();
  /** Fires when the input loses focus. */
  readonly blurred = output<FocusEvent>();

  readonly isOpen = signal(false);
  readonly isFocused = signal(false);
  readonly focusedIndex = signal(-1);
  private readonly _formDisabled = signal(false);
  private justSelected = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());

  readonly hasError = computed(() => !!this.errorMsg());
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  readonly filteredOptions = computed<SelectOption[]>(() => {
    const query = this.value().trim().toLowerCase();
    const allOptions = this.options();
    const max = this.maxResults();

    if (query.length < this.minLength()) {
      return [];
    }

    const matched = query
      ? allOptions.filter(o => o.label.toLowerCase().includes(query))
      : allOptions;

    return matched.slice(0, max);
  });

  readonly showList = computed(
    () => this.isOpen() && this.value().length >= this.minLength(),
  );

  readonly showEmpty = computed(
    () => this.showList() && this.filteredOptions().length === 0,
  );

  /** Empty-list message, falling back to the active locale's translation. */
  readonly resolvedEmptyMessage = computed(
    () => this.emptyMessage() ?? this.i18n.messages().autocomplete.empty,
  );

  readonly wrapperClasses = computed(() => ({
    [`ea-autocomplete__wrapper--${this.size()}`]: true,
    'ea-autocomplete__wrapper--error': this.hasError(),
    'ea-autocomplete__wrapper--focused': this.isFocused(),
    'ea-autocomplete__wrapper--disabled': this.isDisabled(),
  }));

  readonly listboxClasses = computed(() => ({
    [`ea-autocomplete__listbox--${this.size()}`]: true,
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

  handleInput(event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.value.set(next);
    this.onChange(next);
    this.changed.emit(next);
    this.isOpen.set(true);
    this.focusedIndex.set(-1);
  }

  handleFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.focused.emit(event);
    if (this.justSelected) {
      this.justSelected = false;
      return;
    }
    if (this.value().length >= this.minLength()) {
      this.isOpen.set(true);
    }
  }

  handleBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.onTouched();
    this.blurred.emit(event);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.isOpen.set(true);
        } else {
          this.moveFocus(1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) {
          this.moveFocus(-1);
        }
        break;
      case 'Enter': {
        const opts = this.filteredOptions();
        const idx = this.focusedIndex();
        if (this.isOpen() && idx >= 0 && idx < opts.length && !opts[idx].disabled) {
          event.preventDefault();
          this.selectOption(opts[idx]);
        }
        break;
      }
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;
    }
  }

  /** Programmatically selects the given option, updating the value and closing the list. */
  selectOption(option: SelectOption): void {
    if (option.disabled || this.isDisabled()) {
      return;
    }
    this.value.set(option.label);
    this.onChange(option.label);
    this.changed.emit(option.label);
    this.selected.emit(option);
    this.justSelected = true;
    this.close();
    this.inputEl()?.nativeElement.focus();
  }

  /** Closes the suggestion list without changing the current value. */
  close(): void {
    this.isOpen.set(false);
    this.focusedIndex.set(-1);
  }

  /** Moves keyboard focus to the underlying text input. */
  focus(): void {
    this.inputEl()?.nativeElement.focus();
  }

  private moveFocus(delta: number): void {
    const opts = this.filteredOptions();
    if (opts.length === 0) {
      return;
    }
    let idx = this.focusedIndex() + delta;
    while (idx >= 0 && idx < opts.length && opts[idx].disabled) {
      idx += delta;
    }
    if (idx < 0 || idx >= opts.length) {
      return;
    }
    this.focusedIndex.set(idx);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isOpen()) {
      return;
    }
    const host = this.hostEl()?.nativeElement;
    if (host && !host.contains(event.target as Node)) {
      this.close();
    }
  }
}

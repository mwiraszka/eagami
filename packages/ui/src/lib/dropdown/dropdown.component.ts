import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
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

import { EagamiI18nService } from '../i18n/i18n.service';
import { AlertCircleIconComponent } from '../icons/alert-circle.component';
import { ChevronDownIconComponent } from '../icons/chevron-down.component';
import { PopoverComponent } from '../popover/popover.component';
import type { SelectOption } from '../select-option';

/** Visual size of the dropdown trigger. */
export type DropdownSize = 'sm' | 'md' | 'lg';

/**
 * Single-select dropdown with a custom popup list. Supports keyboard
 * navigation (arrow keys, Enter/Space to select, Escape to close), closes
 * on outside click or viewport scroll/resize, and integrates with Angular
 * forms via `ControlValueAccessor`. Positioning, dismissal, and SSR-safe
 * scroll handling are provided by `<ea-popover>`.
 */
@Component({
  selector: 'ea-dropdown',
  imports: [
    AlertCircleIconComponent,
    ChevronDownIconComponent,
    NgClass,
    PopoverComponent,
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  private readonly elRef = viewChild<ElementRef<HTMLElement>>('triggerEl');
  private readonly i18n = inject(EagamiI18nService);

  readonly label = input<string | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly options = input<SelectOption[]>([]);
  readonly size = input<DropdownSize>('md');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  readonly id = input<string>(`ea-dropdown-${Math.random().toString(36).slice(2, 9)}`);

  readonly value = model<string>('');

  /** Fires with the new value when the user selects an option. */
  readonly changed = output<string>();

  readonly isOpen = signal(false);
  readonly focusedIndex = signal(-1);
  private readonly _formDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());

  readonly hasError = computed(() => !!this.errorMsg());
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  readonly selectedLabel = computed(() => {
    const opt = this.options().find(o => o.value === this.value());
    return opt?.label ?? '';
  });

  /** Placeholder text, falling back to the active locale's translation. */
  readonly resolvedPlaceholder = computed(
    () => this.placeholder() ?? this.i18n.messages().dropdown.placeholder,
  );

  readonly triggerClasses = computed(() => ({
    [`ea-dropdown__trigger--${this.size()}`]: true,
    'ea-dropdown__trigger--error': this.hasError(),
    'ea-dropdown__trigger--open': this.isOpen(),
    'ea-dropdown__trigger--disabled': this.isDisabled(),
  }));

  readonly menuClasses = computed(() => ({
    [`ea-dropdown__menu--${this.size()}`]: true,
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

  /** Toggles the dropdown list between open and closed. */
  toggle(): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }
    this.isOpen.set(!this.isOpen());
    if (this.isOpen()) {
      const idx = this.options().findIndex(o => o.value === this.value());
      this.focusedIndex.set(idx >= 0 ? idx : 0);
    }
  }

  /** Programmatically selects the given option, closing the list. */
  select(option: SelectOption): void {
    if (option.disabled || this.isDisabled() || this.readonly()) {
      return;
    }
    this.value.set(option.value);
    this.onChange(option.value);
    this.onTouched();
    this.changed.emit(option.value);
    this.close();
  }

  /** Closes the dropdown list without changing the current value. */
  close(): void {
    this.isOpen.set(false);
    this.focusedIndex.set(-1);
  }

  /** Moves keyboard focus to the dropdown trigger. */
  focus(): void {
    this.elRef()?.nativeElement.focus();
  }

  /** Called by `<ea-popover>` when the user clicks outside the dropdown. */
  onPopoverCloseRequested(): void {
    this.close();
    this.onTouched();
  }

  handleKeydown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.isOpen()) {
          const opts = this.options();
          const idx = this.focusedIndex();
          if (idx >= 0 && idx < opts.length && !opts[idx].disabled) {
            this.select(opts[idx]);
          }
        } else {
          this.toggle();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.toggle();
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
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
          this.elRef()?.nativeElement.focus();
        }
        break;
    }
  }

  private moveFocus(delta: number): void {
    const opts = this.options();
    let idx = this.focusedIndex() + delta;
    while (idx >= 0 && idx < opts.length && opts[idx].disabled) {
      idx += delta;
    }
    if (idx >= 0 && idx < opts.length) {
      this.focusedIndex.set(idx);
    }
  }
}

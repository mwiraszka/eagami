import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  type ElementRef,
  type Type,
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
import {
  type EaErrorMessages,
  injectControlErrorState,
} from '../forms/control-error-state';
import { EagamiI18nService } from '../i18n/i18n.service';
import { ChevronDownIconComponent } from '../icons/chevron-down.component';
import { PopoverComponent } from '../popover/popover.component';
import type { SelectOption, SelectOptions } from '../select-option';
import {
  flattenGroups,
  foldForSearch,
  isGrouped,
  toGroups,
  toRenderedGroups,
} from '../select-option-list';
import { type EaSize } from '../sizes';
import { uniqueId } from '../unique-id';

/** Visual size of the dropdown trigger. */
export type DropdownSize = EaSize;

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
    ChevronDownIconComponent,
    FieldLabelComponent,
    FieldMessagesComponent,
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

  /** Optional icon component rendered before the label text. */

  readonly labelIcon = input<Type<unknown> | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  /** Selectable options, either flat or split into groups. */
  readonly options = input<SelectOptions>([]);
  readonly size = input<DropdownSize>('md');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  /** Per-validator-key message overrides for a bound form control (e.g. `{ required: '...' }`). */
  readonly errorMessages = input<EaErrorMessages | undefined>(undefined);
  readonly id = input<string>(uniqueId('ea-dropdown'));

  readonly value = model<string>('');

  /** Fires with the new value when the user selects an option. */
  readonly changed = output<string>();

  readonly isOpen = signal(false);
  readonly focusedIndex = signal(-1);
  private readonly _formDisabled = signal(false);

  private typeaheadQuery = '';
  private typeaheadTimer: ReturnType<typeof setTimeout> | undefined;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.typeaheadTimer));
  }

  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());

  private readonly errorState = injectControlErrorState({
    errorMsg: this.errorMsg,
    errorMessages: this.errorMessages,
  });
  readonly errorText = this.errorState.error;
  readonly hasError = this.errorState.hasError;
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  private readonly optionGroups = computed(() => toGroups(this.options()));

  /** Whether the consumer supplied groups, which the list exposes as ARIA groups. */
  protected readonly grouped = computed(() => isGrouped(this.options()));

  /** Every option in the order given, flattened across groups; drives all index maths. */
  private readonly flatOptions = computed(() => flattenGroups(this.optionGroups()));

  /** Groups to render, each option carrying its index into the flattened list. */
  protected readonly renderedGroups = computed(() =>
    toRenderedGroups(this.optionGroups()),
  );

  // A value repeated across groups renders twice, but a single-select listbox
  // may only mark one option selected
  protected readonly selectedIndex = computed(() =>
    this.flatOptions().findIndex(o => o.value === this.value()),
  );

  readonly selectedLabel = computed(() => {
    const opt = this.flatOptions().find(o => o.value === this.value());
    return opt?.label ?? '';
  });

  /** Placeholder text, falling back to the active locale's translation. */
  readonly resolvedPlaceholder = computed(
    () => this.placeholder() ?? this.i18n.messages().dropdown.placeholder,
  );

  readonly triggerLabelledBy = computed(() =>
    this.label() ? `${this.id()}-label ${this.id()}` : null,
  );

  readonly triggerClasses = computed(() => ({
    [`ea-dropdown__trigger--${this.size()}`]: true,
    'ea-dropdown__trigger--error': this.hasError(),
    'ea-dropdown__trigger--open': this.isOpen(),
    'ea-dropdown__trigger--disabled': this.isDisabled(),
    'ea-dropdown__trigger--readonly': this.readonly() && !this.isDisabled(),
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
      const selected = this.flatOptions().findIndex(o => o.value === this.value());
      if (selected >= 0) {
        this.focusedIndex.set(selected);
      } else {
        // Falling back to index 0 would point the active descendant at a
        // disabled first option, so walk to the first selectable one instead
        this.focusEdge(1);
      }
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
    this.typeaheadQuery = '';
    clearTimeout(this.typeaheadTimer);
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
      case ' ':
        // Space extends an in-progress typeahead query instead of selecting
        if (this.typeaheadQuery) {
          this.handleTypeahead(event);
        } else {
          this.selectFocusedOrOpen(event);
        }
        break;
      case 'Enter':
        this.selectFocusedOrOpen(event);
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
      case 'Home':
        event.preventDefault();
        if (!this.isOpen()) {
          this.toggle();
        }
        this.focusEdge(1);
        break;
      case 'End':
        event.preventDefault();
        if (!this.isOpen()) {
          this.toggle();
        }
        this.focusEdge(-1);
        break;
      default:
        this.handleTypeahead(event);
        break;
    }
  }

  private selectFocusedOrOpen(event: KeyboardEvent): void {
    event.preventDefault();
    if (this.isOpen()) {
      const opts = this.flatOptions();
      const idx = this.focusedIndex();
      if (idx >= 0 && idx < opts.length && !opts[idx].disabled) {
        this.select(opts[idx]);
      }
    } else {
      this.toggle();
    }
  }

  private focusEdge(direction: 1 | -1): void {
    const opts = this.flatOptions();
    let idx = direction === 1 ? 0 : opts.length - 1;
    while (idx >= 0 && idx < opts.length && opts[idx].disabled) {
      idx += direction;
    }
    if (idx >= 0 && idx < opts.length) {
      this.setFocusedIndex(idx);
    }
  }

  /** Keeps the keyboard-focused option visible inside the scrolling listbox. */
  private setFocusedIndex(idx: number): void {
    this.focusedIndex.set(idx);
    document
      .getElementById(`${this.id()}-option-${idx}`)
      ?.scrollIntoView({ block: 'nearest' });
  }

  private handleTypeahead(event: KeyboardEvent): void {
    if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }
    event.preventDefault();
    if (this.typeaheadTimer !== undefined) {
      clearTimeout(this.typeaheadTimer);
    }
    this.typeaheadTimer = setTimeout(() => (this.typeaheadQuery = ''), 500);
    this.typeaheadQuery += foldForSearch(event.key);
    const wasOpen = this.isOpen();
    if (!wasOpen) {
      this.toggle();
    }
    const opts = this.flatOptions();
    if (opts.length === 0) {
      return;
    }
    const start = Math.max(this.focusedIndex(), 0);
    // A repeated first character cycles matches while open; a growing query or a
    // just-opened list starts the scan at the current focus
    const firstOffset = this.typeaheadQuery.length > 1 || !wasOpen ? 0 : 1;
    for (let offset = firstOffset; offset <= opts.length; offset++) {
      const idx = (start + offset) % opts.length;
      const opt = opts[idx];
      if (!opt.disabled && foldForSearch(opt.label).startsWith(this.typeaheadQuery)) {
        this.setFocusedIndex(idx);
        return;
      }
    }
  }

  private moveFocus(delta: number): void {
    const opts = this.flatOptions();
    let idx = this.focusedIndex() + delta;
    while (idx >= 0 && idx < opts.length && opts[idx].disabled) {
      idx += delta;
    }
    if (idx >= 0 && idx < opts.length) {
      this.setFocusedIndex(idx);
    }
  }
}

import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  Injector,
  afterNextRender,
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

import { CheckboxComponent } from '../checkbox/checkbox.component';
import { EagamiI18nService } from '../i18n/i18n.service';
import { AlertCircleIconComponent } from '../icons/alert-circle.component';
import { ChevronDownIconComponent } from '../icons/chevron-down.component';
import { SearchIconComponent } from '../icons/search.component';
import { XIconComponent } from '../icons/x.component';
import { PopoverComponent } from '../popover/popover.component';
import type { SelectOption } from '../select-option';
import { TagComponent } from '../tag/tag.component';

/** Visual size of the multi-select trigger. */
export type MultiSelectSize = 'sm' | 'md' | 'lg';

/**
 * Multi-select dropdown. Renders selections as removable `<ea-tag>` chips
 * inside the trigger, opens a popover containing an optional search input,
 * a tri-state "Select all" toggle, and a list of `<ea-checkbox>` options.
 * The wire value is a `readonly string[]` of selected option values, ordered
 * to match the input `options` array. Closes on outside click / scroll, and
 * integrates with Angular forms via `ControlValueAccessor`.
 */
@Component({
  selector: 'ea-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AlertCircleIconComponent,
    CheckboxComponent,
    ChevronDownIconComponent,
    NgClass,
    PopoverComponent,
    SearchIconComponent,
    TagComponent,
    XIconComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent implements ControlValueAccessor {
  protected readonly triggerEl = viewChild<ElementRef<HTMLElement>>('triggerEl');
  protected readonly searchEl = viewChild<ElementRef<HTMLInputElement>>('searchEl');
  protected readonly i18n = inject(EagamiI18nService);
  private readonly injector = inject(Injector);

  readonly label = input<string | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly searchPlaceholder = input<string | undefined>(undefined);
  readonly options = input<readonly SelectOption[]>([]);
  readonly size = input<MultiSelectSize>('md');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  /** Toggle the search input at the top of the popover. */
  readonly searchable = input<boolean>(true);
  /** Toggle the "Select all" row at the top of the option list. */
  readonly selectAll = input<boolean>(true);
  /** Max number of chips shown inside the trigger; the rest collapse into a "+N more" pill. `0` removes the cap. */
  readonly maxVisibleChips = input<number>(3);
  readonly id = input<string>(
    `ea-multi-select-${Math.random().toString(36).slice(2, 9)}`,
  );

  /** Selected option values, in the original options order. */
  readonly value = model<readonly string[]>([]);
  /** Fires with the new value whenever the selection changes. */
  readonly changed = output<readonly string[]>();

  readonly isOpen = signal(false);
  readonly searchTerm = signal('');
  /** Index into `filteredOptions()` for keyboard navigation. `-1` when none focused. */
  readonly focusedIndex = signal(-1);
  private readonly _formDisabled = signal(false);
  private onChange: (value: readonly string[]) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());
  readonly hasError = computed(() => !!this.errorMsg());
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  /** Set-backed lookup for `selectedSet().has(value)`. */
  readonly selectedSet = computed(() => new Set(this.value()));

  /** Options matching the current search term (case-insensitive substring on label). */
  readonly filteredOptions = computed<readonly SelectOption[]>(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const opts = this.options();
    if (!term) {
      return opts;
    }
    return opts.filter(o => o.label.toLowerCase().includes(term));
  });

  /** Currently selected options, ordered to match the input `options`. */
  readonly selectedOptions = computed<readonly SelectOption[]>(() => {
    const set = this.selectedSet();
    return this.options().filter(o => set.has(o.value));
  });

  readonly hasValue = computed(() => this.value().length > 0);

  /** Chips visible inside the trigger, capped by `maxVisibleChips`. */
  readonly visibleChips = computed<readonly SelectOption[]>(() => {
    const sel = this.selectedOptions();
    const cap = this.maxVisibleChips();
    return cap <= 0 || sel.length <= cap ? sel : sel.slice(0, cap);
  });

  /** Count behind the "+N more" pill, or `0` when all chips fit. */
  readonly hiddenChipCount = computed(() => {
    const sel = this.selectedOptions();
    const cap = this.maxVisibleChips();
    return cap <= 0 || sel.length <= cap ? 0 : sel.length - cap;
  });

  /** Tri-state of the Select-all checkbox over the **currently filtered** list. */
  readonly selectAllState = computed<'none' | 'some' | 'all'>(() => {
    const filtered = this.filteredOptions().filter(o => !o.disabled);
    if (filtered.length === 0) {
      return 'none';
    }
    const set = this.selectedSet();
    let count = 0;
    for (const o of filtered) {
      if (set.has(o.value)) {
        count++;
      }
    }
    if (count === 0) {
      return 'none';
    }
    if (count === filtered.length) {
      return 'all';
    }
    return 'some';
  });

  readonly resolvedPlaceholder = computed(
    () => this.placeholder() ?? this.i18n.messages().multiSelect.placeholder,
  );

  readonly resolvedSearchPlaceholder = computed(
    () => this.searchPlaceholder() ?? this.i18n.messages().multiSelect.searchPlaceholder,
  );

  readonly triggerClasses = computed(() => ({
    [`ea-multi-select__trigger--${this.size()}`]: true,
    'ea-multi-select__trigger--error': this.hasError(),
    'ea-multi-select__trigger--open': this.isOpen(),
    'ea-multi-select__trigger--disabled': this.isDisabled(),
    'ea-multi-select__trigger--placeholder': !this.hasValue(),
  }));

  readonly menuClasses = computed(() => ({
    [`ea-multi-select__popover--${this.size()}`]: true,
  }));

  readonly wrapperClasses = computed(() => ({
    [`ea-multi-select__trigger-wrapper--${this.size()}`]: true,
  }));

  writeValue(val: readonly string[] | null | undefined): void {
    this.value.set(val ?? []);
  }

  registerOnChange(fn: (value: readonly string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  toggle(): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }
    const opening = !this.isOpen();
    this.isOpen.set(opening);
    if (opening) {
      this.focusSearchWhenReady();
    } else {
      this.resetEditState();
    }
  }

  close(): void {
    this.isOpen.set(false);
    this.resetEditState();
  }

  /** Called by `<ea-popover>` when the user clicks outside or scrolls. */
  onPopoverCloseRequested(): void {
    this.close();
    this.onTouched();
  }

  /** Toggle one option's membership in the selection. */
  toggleOption(opt: SelectOption): void {
    if (this.isDisabled() || this.readonly() || opt.disabled) {
      return;
    }
    const set = new Set(this.value());
    if (set.has(opt.value)) {
      set.delete(opt.value);
    } else {
      set.add(opt.value);
    }
    this.commit(this.orderedValues(set));
  }

  /**
   * Remove a single chip from the trigger. `<ea-tag>` already stops the
   * click from bubbling to the trigger's `(click)`, so no event handling
   * is needed here.
   */
  removeChip(opt: SelectOption): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }
    this.commit(this.value().filter(v => v !== opt.value));
  }

  /** Clear every selection via the trigger × button. */
  clear(event: Event): void {
    event.stopPropagation();
    if (this.isDisabled() || this.readonly()) {
      return;
    }
    this.commit([]);
  }

  /**
   * Toggle the Select-all checkbox. If any filtered option is unselected, the
   * action selects all filtered. Otherwise, the action removes every filtered
   * value from the selection. Disabled options are skipped either way.
   */
  toggleSelectAll(): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }
    const filteredValues = this.filteredOptions()
      .filter(o => !o.disabled)
      .map(o => o.value);
    const set = new Set(this.value());
    if (this.selectAllState() === 'all') {
      for (const v of filteredValues) {
        set.delete(v);
      }
    } else {
      for (const v of filteredValues) {
        set.add(v);
      }
    }
    this.commit(this.orderedValues(set));
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
    this.focusedIndex.set(-1);
  }

  handleTriggerKeydown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (!this.isOpen()) {
        this.isOpen.set(true);
        this.focusSearchWhenReady();
      }
    } else if (event.key === 'Escape' && this.isOpen()) {
      event.preventDefault();
      this.close();
      this.triggerEl()?.nativeElement.focus();
    } else if (event.key === 'Backspace' && this.hasValue() && !this.isOpen()) {
      // Quick-remove the last chip when the trigger is focused and no popover.
      event.preventDefault();
      this.commit(this.value().slice(0, -1));
    }
  }

  /**
   * Keyboard navigation inside the popover. Bound to both the search input
   * and each option row; Space passes through to the search input naturally
   * so users can type spaces in their query.
   */
  handlePopoverKeydown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }
    const opts = this.filteredOptions();
    const onSearchInput = event.target === this.searchEl()?.nativeElement;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = Math.min(opts.length - 1, this.focusedIndex() + 1);
      this.focusedIndex.set(next);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const next = Math.max(0, this.focusedIndex() - 1);
      this.focusedIndex.set(next);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.focusedIndex.set(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.focusedIndex.set(opts.length - 1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const idx = this.focusedIndex();
      if (idx >= 0 && idx < opts.length) {
        this.toggleOption(opts[idx]);
      }
    } else if (event.key === ' ' && !onSearchInput) {
      // Toggle on Space only when an option row has focus; the search input
      // needs Space for typing.
      event.preventDefault();
      const idx = this.focusedIndex();
      if (idx >= 0 && idx < opts.length) {
        this.toggleOption(opts[idx]);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      this.triggerEl()?.nativeElement.focus();
    }
  }

  private focusSearchWhenReady(): void {
    afterNextRender(() => this.searchEl()?.nativeElement.focus(), {
      injector: this.injector,
    });
  }

  /** Reorder a value-set against the input `options` array. */
  private orderedValues(set: Set<string>): readonly string[] {
    return this.options()
      .filter(o => set.has(o.value))
      .map(o => o.value);
  }

  private resetEditState(): void {
    this.searchTerm.set('');
    this.focusedIndex.set(-1);
  }

  private commit(next: readonly string[]): void {
    this.value.set(next);
    this.onChange(next);
    this.onTouched();
    this.changed.emit(next);
  }
}

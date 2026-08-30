import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  type ElementRef,
  Injector,
  type Type,
  afterNextRender,
  afterRenderEffect,
  computed,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
  viewChild,
  viewChildren,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CheckboxComponent } from '../checkbox/checkbox.component';
import { FieldLabelComponent } from '../field/field-label.component';
import { FieldMessagesComponent } from '../field/field-messages.component';
import {
  type EaErrorMessages,
  injectControlErrorState,
} from '../forms/control-error-state';
import { EagamiI18nService } from '../i18n/i18n.service';
import { ChevronDownIconComponent } from '../icons/chevron-down.component';
import { PlusIconComponent } from '../icons/plus.component';
import { SearchIconComponent } from '../icons/search.component';
import { XIconComponent } from '../icons/x.component';
import { PopoverComponent, type PopoverMaxWidth } from '../popover/popover.component';
import type { SelectOption, SelectOptionGroup, SelectOptions } from '../select-option';
import {
  filterGroups,
  flattenGroups,
  foldForSearch,
  isGrouped,
  toGroups,
  toRenderedGroups,
} from '../select-option-list';
import { type EaSize } from '../sizes';
import { TagComponent } from '../tag/tag.component';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import { isTruncated } from '../truncation';
import { uniqueId } from '../unique-id';

/** Visual size of the multi-select trigger. */
export type MultiSelectSize = EaSize;

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
    CheckboxComponent,
    ChevronDownIconComponent,
    FieldLabelComponent,
    FieldMessagesComponent,
    NgClass,
    PlusIconComponent,
    PopoverComponent,
    SearchIconComponent,
    TagComponent,
    TooltipDirective,
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
  protected readonly wrapperEl = viewChild<ElementRef<HTMLElement>>('wrapperEl');
  private readonly popover = viewChild(PopoverComponent);
  protected readonly triggerEl = viewChild<ElementRef<HTMLElement>>('triggerEl');
  protected readonly searchEl = viewChild<ElementRef<HTMLInputElement>>('searchEl');
  private readonly listEl = viewChild<ElementRef<HTMLElement>>('listEl');
  private readonly optionLabelEls =
    viewChildren<ElementRef<HTMLElement>>('optionLabelEl');
  protected readonly i18n = inject(EagamiI18nService);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);

  readonly label = input<string | undefined>(undefined);

  /** Optional icon component rendered before the label text. */

  readonly labelIcon = input<Type<unknown> | undefined>(undefined);
  /** Accessible name for the combobox when no visible `label` is set. */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly placeholder = input<string | undefined>(undefined);
  readonly searchPlaceholder = input<string | undefined>(undefined);
  /** Selectable options, either flat or split into groups. */
  readonly options = input<SelectOptions>([]);
  readonly size = input<MultiSelectSize>('md');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  /** Per-validator-key message overrides for a bound form control (e.g. `{ required: '...' }`). */
  readonly errorMessages = input<EaErrorMessages | undefined>(undefined);
  /** Toggle the search input at the top of the popover. */
  readonly searchable = input<boolean>(true);
  /** Toggle the "Select all" row at the top of the option list. */
  readonly selectAll = input<boolean>(true);
  /**
   * Offer a "Create" row when the search text matches no option, for a value
   * the list cannot know about yet (a new tag, a new person). The component
   * only reports the text through `created`; the consumer creates the record
   * and pushes its value into `value`.
   */
  readonly allowCreate = input<boolean>(false);
  /** Max number of chips shown inside the trigger; the rest collapse into a "+N more" pill. `0` removes the cap so every chip shows and the row scrolls horizontally. */
  readonly maxVisibleChips = input<number>(0);
  /**
   * Widest a selected-value chip may grow, in px; a longer label ellipsizes
   * and reveals its full text in a tooltip.
   */
  readonly maxChipWidth = input<number | undefined>(200);
  /**
   * Tallest the option popover may grow, in px, before the option list
   * scrolls; left unset, the popover keeps its built-in 20rem cap.
   */
  readonly popoverMaxHeight = input<number | undefined>(undefined);
  /**
   * Widest the option popover may grow: a px value, or `anchor` to hold it to
   * the field's own width so a long option truncates instead of widening it.
   */
  readonly popoverMaxWidth = input<PopoverMaxWidth>('anchor');
  readonly id = input<string>(uniqueId('ea-multi-select'));

  /** Selected option values, in the original options order. */
  readonly value = model<readonly string[]>([]);
  /** Fires with the new value whenever the selection changes. */
  readonly changed = output<readonly string[]>();
  /** Fires with the typed text when the user takes the `allowCreate` row. */
  readonly created = output<string>();

  readonly isOpen = signal(false);
  readonly searchTerm = signal('');
  /** Index into `filteredOptions()` for keyboard navigation. `-1` when none focused. */
  readonly focusedIndex = signal(-1);
  private readonly _formDisabled = signal(false);
  private onChange: (value: readonly string[]) => void = () => {};
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

  /** Set-backed lookup for `selectedSet().has(value)`. */
  readonly selectedSet = computed(() => new Set(this.value()));

  private readonly optionGroups = computed(() => toGroups(this.options()));

  /** Whether the consumer supplied groups, which the list exposes as ARIA groups. */
  protected readonly grouped = computed(() => isGrouped(this.options()));

  /** Every option in the order given, flattened across groups. */
  private readonly flatOptions = computed(() => flattenGroups(this.optionGroups()));

  private readonly filteredGroups = computed<readonly SelectOptionGroup[]>(() => {
    const term = foldForSearch(this.searchTerm().trim());
    const groups = this.optionGroups();
    if (!term) {
      return groups;
    }
    return filterGroups(groups, o => foldForSearch(o.label).includes(term));
  });

  /** Options matching the current search term (case- and accent-insensitive substring on label). */
  readonly filteredOptions = computed<readonly SelectOption[]>(() =>
    flattenGroups(this.filteredGroups()),
  );

  /** Groups to render, each option carrying its index into `filteredOptions`. */
  protected readonly renderedGroups = computed(() =>
    toRenderedGroups(this.filteredGroups()),
  );

  /** Currently selected options, ordered to match the input `options`. */
  readonly selectedOptions = computed<readonly SelectOption[]>(() =>
    this.optionsFor(this.selectedSet()),
  );

  readonly hasValue = computed(() => this.value().length > 0);

  readonly listboxId = computed(() => `${this.id()}-listbox`);

  /** Whether the Select-all row renders as the first option in the listbox. */
  protected readonly selectAllVisible = computed(
    () => this.selectAll() && this.filteredOptions().length > 0,
  );

  /** Row-index offset the Select-all row adds ahead of the filtered options. */
  protected readonly selectAllOffset = computed(() => (this.selectAllVisible() ? 1 : 0));

  /** The text a Create row would carry, or `''` when no such row is offered. */
  protected readonly creatableText = computed(() => {
    const term = this.searchTerm().trim();
    if (!this.allowCreate() || !term) {
      return '';
    }
    const taken = foldForSearch(term);
    // Measured against every option, not the filtered ones: an option hidden by
    // a group filter is still an option that exists
    return this.flatOptions().some(o => foldForSearch(o.label.trim()) === taken)
      ? ''
      : term;
  });

  /** Row index of the Create row, which sits after the options, or `-1`. */
  protected readonly createRow = computed(() =>
    this.creatableText() ? this.filteredOptions().length + this.selectAllOffset() : -1,
  );

  private readonly rowCount = computed(
    () =>
      this.filteredOptions().length +
      this.selectAllOffset() +
      (this.creatableText() ? 1 : 0),
  );

  protected readonly selectAllAriaChecked = computed(() => {
    const state = this.selectAllState();
    return state === 'some' ? 'mixed' : state === 'all' ? 'true' : 'false';
  });

  /** Id of the keyboard-focused option, for `aria-activedescendant`. */
  readonly activeOptionId = computed(() => {
    const idx = this.focusedIndex();
    return idx >= 0 && idx < this.rowCount() ? `${this.id()}-opt-${idx}` : null;
  });

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
    'ea-multi-select__trigger--readonly': this.readonly() && !this.isDisabled(),
    'ea-multi-select__trigger--placeholder': !this.hasValue(),
  }));

  readonly menuClasses = computed(() => ({
    [`ea-multi-select__popover--${this.size()}`]: true,
  }));

  readonly wrapperClasses = computed(() => ({
    [`ea-multi-select__trigger-wrapper--${this.size()}`]: true,
  }));

  /** Values whose rendered option label is currently clipped by the panel. */
  protected readonly clippedOptions = signal<ReadonlySet<string>>(new Set());

  constructor() {
    // The panel is portaled, so a consumer has no element to hang a tooltip on
    // and no event path back here; the component resolves its own truncation.
    afterRenderEffect(() => {
      this.optionLabelEls();
      this.measureClippedOptions();
    });

    // The panel stays invisible until the popover has measured itself, and an
    // invisible input cannot take focus. Waiting on that signal from the
    // after-render phase puts the focus call after the frame that reveals it.
    afterRenderEffect(() => {
      if (this.searchable() && this.popover()?.isPositioned()) {
        untracked(() => this.searchEl()?.nativeElement.focus());
      }
    });
    afterNextRender(() => this.watchListWidth(), { injector: this.injector });
  }

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
    if (!opening) {
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
    this.clearSearchForNextValue();
  }

  /**
   * Clicks on the bordered box (trigger, padding, chevron) all toggle; the
   * clear button and chip remove buttons stop propagation before reaching
   * here. The combobox element only takes focus natively when clicked
   * directly, so focus is restored explicitly for the activedescendant model.
   */
  protected onTriggerAreaClick(): void {
    this.toggle();
    if (!this.isOpen() || !this.searchable()) {
      this.triggerEl()?.nativeElement.focus();
    }
  }

  // Options never take DOM focus, so a click must return focus to the
  // element carrying aria-activedescendant
  protected onOptionClick(opt: SelectOption, index: number): void {
    if (!opt.disabled) {
      this.focusedIndex.set(index + this.selectAllOffset());
    }
    this.toggleOption(opt);
    this.restoreTypingFocus();
  }

  protected onSelectAllClick(): void {
    this.focusedIndex.set(0);
    this.toggleSelectAll();
    this.restoreTypingFocus();
  }

  private restoreTypingFocus(): void {
    if (this.searchable()) {
      this.searchEl()?.nativeElement.focus();
    } else {
      this.triggerEl()?.nativeElement.focus();
    }
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
    this.focusedIndex.set(this.soleOptionRow());
  }

  // Narrowing the list to a single selectable option makes Enter unambiguous,
  // so that row takes focus and the value can be taken without arrowing to it.
  // A query matching nothing at all leaves the Create row in that position.
  private soleOptionRow(): number {
    const options = this.filteredOptions();
    if (options.length === 1 && !options[0].disabled) {
      return this.selectAllOffset();
    }
    return options.length === 0 ? this.createRow() : -1;
  }

  // A query that has served its purpose otherwise has to be cleared by hand
  // before the next value can be searched for
  private clearSearchForNextValue(): void {
    if (!this.searchTerm()) {
      return;
    }
    this.searchTerm.set('');
    this.focusedIndex.set(-1);
    this.restoreTypingFocus();
  }

  handleTriggerKeydown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }
    // Without a search input the trigger keeps focus while open, so it must
    // drive the option navigation that the search input handles otherwise
    if (this.isOpen() && !this.searchable()) {
      this.handlePopoverKeydown(event);
      return;
    }
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (!this.isOpen()) {
        this.isOpen.set(true);
      }
    } else if (event.key === 'Escape' && this.isOpen()) {
      event.preventDefault();
      this.close();
      this.triggerEl()?.nativeElement.focus();
    } else if (event.key === 'Backspace' && this.hasValue() && !this.isOpen()) {
      // Quick-remove the last chip when the trigger is focused and no popover
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
    const onSearchInput = event.target === this.searchEl()?.nativeElement;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.moveFocusedRow(Math.min(this.rowCount() - 1, this.focusedIndex() + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.moveFocusedRow(Math.max(0, this.focusedIndex() - 1));
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.moveFocusedRow(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.moveFocusedRow(this.rowCount() - 1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.activateRow(this.focusedIndex());
    } else if (event.key === ' ' && !onSearchInput) {
      // Toggle on Space only when an option row has focus; the search input
      // needs Space for typing.
      event.preventDefault();
      this.activateRow(this.focusedIndex());
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      this.triggerEl()?.nativeElement.focus();
    } else if (event.key === 'Tab') {
      // Combobox popups dismiss on Tab; focus moves on to the next element
      this.close();
    }
  }

  private moveFocusedRow(row: number): void {
    this.focusedIndex.set(row);
    const activeId = this.activeOptionId();
    if (activeId) {
      document.getElementById(activeId)?.scrollIntoView({ block: 'nearest' });
    }
  }

  /** Enter/Space on the focused row: row 0 is Select-all when visible. */
  private activateRow(row: number): void {
    const offset = this.selectAllOffset();
    if (row < 0) {
      return;
    }
    if (offset === 1 && row === 0) {
      this.toggleSelectAll();
      return;
    }
    if (row === this.createRow()) {
      this.createOption();
      return;
    }
    const opt = this.filteredOptions()[row - offset];
    if (opt) {
      this.toggleOption(opt);
    }
  }

  /** Report the typed text, then clear it so the new value can be followed by another. */
  protected createOption(): void {
    const text = this.creatableText();
    if (this.isDisabled() || this.readonly() || !text) {
      return;
    }
    this.created.emit(text);
    this.searchTerm.set('');
    this.focusedIndex.set(-1);
    this.restoreTypingFocus();
  }

  /** Reorder a value-set against the input `options` array. */
  private orderedValues(set: Set<string>): readonly string[] {
    return this.optionsFor(set).map(o => o.value);
  }

  // A value listed in more than one group (a "recently used" section repeating an
  // option below it) still stands for one selection, so it resolves to one chip
  // and one entry in the value
  private optionsFor(values: ReadonlySet<string>): SelectOption[] {
    const seen = new Set<string>();
    const picked: SelectOption[] = [];
    for (const option of this.flatOptions()) {
      if (values.has(option.value) && !seen.has(option.value)) {
        seen.add(option.value);
        picked.push(option);
      }
    }
    return picked;
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

  /**
   * Re-reads which option labels are clipped. The result is written back only
   * when the set actually differs, since an unconditional write would render,
   * re-measure, and write again forever.
   */
  private measureClippedOptions(): void {
    const clipped = new Set<string>();
    for (const ref of this.optionLabelEls()) {
      const el = ref.nativeElement;
      const value = el.dataset['value'];
      if (value !== undefined && isTruncated(el)) {
        clipped.add(value);
      }
    }
    const current = this.clippedOptions();
    const same =
      current.size === clipped.size && [...clipped].every(value => current.has(value));
    if (!same) {
      this.clippedOptions.set(clipped);
    }
  }

  // The panel settles on its final width a frame after opening, which changes
  // what fits without changing the option set the render effect watches
  private watchListWidth(): void {
    const el = this.listEl()?.nativeElement;
    if (!el || typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver(() => this.measureClippedOptions());
    observer.observe(el);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}

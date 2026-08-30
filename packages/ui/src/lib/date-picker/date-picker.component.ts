import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  Injector,
  type Type,
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

import { isRtl } from '../direction';
import { FieldLabelComponent } from '../field/field-label.component';
import { FieldMessagesComponent } from '../field/field-messages.component';
import {
  type EaErrorMessages,
  injectControlErrorState,
} from '../forms/control-error-state';
import { EagamiI18nService } from '../i18n/i18n.service';
import { CalendarIconComponent } from '../icons/calendar.component';
import { ChevronLeftIconComponent } from '../icons/chevron-left.component';
import { ChevronRightIconComponent } from '../icons/chevron-right.component';
import { XIconComponent } from '../icons/x.component';
import { PopoverComponent } from '../popover/popover.component';
import { type EaSize } from '../sizes';
import { uniqueId } from '../unique-id';
import { parseDateInput } from './parse-date';

/** Visual size of the date picker field. */
export type DatePickerSize = EaSize;
/** Locale-aware date format used for the displayed value. */
export type DatePickerFormat = 'short' | 'medium' | 'long';
/** First day of the week in the calendar grid (0 = Sunday, 1 = Monday). */
export type DatePickerWeekStart = 0 | 1;
/** Value accepted via `writeValue`: a `Date`, ISO/parseable string, or `null`. */
export type DatePickerValue = Date | string | null;

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isFocused: boolean;
}

/**
 * Date field with a calendar popover. The date can be typed straight into the
 * field in any reasonable shape (ISO, all-numeric in the locale's field order,
 * or with a month name) and is rewritten in the configured `format` on commit.
 * Supports `min`/`max` bounds, configurable week start, locale-aware formatting
 * via `Intl.DateTimeFormat`, and full keyboard navigation (arrows,
 * PageUp/PageDown, Home/End, Enter, Escape). Integrates with Angular forms via
 * `ControlValueAccessor`.
 */
@Component({
  selector: 'ea-date-picker',
  imports: [
    CalendarIconComponent,
    ChevronLeftIconComponent,
    ChevronRightIconComponent,
    FieldLabelComponent,
    FieldMessagesComponent,
    NgClass,
    PopoverComponent,
    XIconComponent,
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  protected readonly fieldEl = viewChild<ElementRef<HTMLElement>>('fieldEl');
  protected readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');
  private readonly injector = inject(Injector);
  protected readonly i18n = inject(EagamiI18nService);

  readonly label = input<string | undefined>(undefined);

  /** Optional icon component rendered before the label text. */

  readonly labelIcon = input<Type<unknown> | undefined>(undefined);
  /** Placeholder shown in the field when no date is selected. */
  readonly placeholder = input<string | undefined>(undefined);
  readonly size = input<DatePickerSize>('md');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  /** Per-validator-key message overrides for a bound form control (e.g. `{ required: '...' }`). */
  readonly errorMessages = input<EaErrorMessages | undefined>(undefined);
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);
  readonly format = input<DatePickerFormat>('medium');
  readonly weekStartsOn = input<DatePickerWeekStart>(1);
  readonly locale = input<string | undefined>(undefined);
  readonly id = input<string>(uniqueId('ea-date-picker'));

  readonly value = model<Date | null>(null);

  /** Fires when the selected date changes, including when cleared. */
  readonly changed = output<Date | null>();

  readonly isOpen = signal(false);
  readonly viewYear = signal(new Date().getFullYear());
  readonly viewMonth = signal(new Date().getMonth());
  readonly focusedDate = signal<Date | null>(null);
  private readonly _formDisabled = signal(false);
  private readonly isFocused = signal(false);
  /** Entry in progress, held verbatim until it is committed or abandoned. */
  private readonly draft = signal<string | null>(null);

  private onChange: (value: Date | null) => void = () => {};
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

  /** Locale used for date formatting: explicit `locale` input, else the global locale. */
  readonly effectiveLocale = computed(() => this.locale() ?? this.i18n.locale());

  /** True when the active date locale is a registered locale we ship a bundle
   *  for (no distinct per-instance `locale` override), so the bundled calendar
   *  names apply and the calendar stays localized regardless of the runtime's
   *  `Intl` locale coverage. */
  private readonly bundleCalendarApplies = computed(
    () => this.effectiveLocale() === this.i18n.locale(),
  );

  /** Whether the runtime's `Intl` actually has date data for the active locale.
   *  Some browsers ship a reduced ICU that silently falls back to English for
   *  less common locales, so a matching request is not a given. */
  private readonly intlLocalizesEffectiveLocale = computed(() => {
    const requested = this.effectiveLocale();
    try {
      const resolved = new Intl.DateTimeFormat(requested).resolvedOptions().locale;
      return resolved.split('-')[0] === requested.split('-')[0];
    } catch {
      return false;
    }
  });

  /** Placeholder text, empty unless a `placeholder` is given. */
  readonly resolvedPlaceholder = computed(() => this.placeholder() ?? '');

  /** Accessible name when no `label` is given. */
  protected readonly fallbackLabel = computed(
    () => this.placeholder() ?? this.i18n.messages().datePicker.placeholder,
  );

  readonly dialogId = computed(() => `${this.id()}-dialog`);

  readonly fieldClasses = computed(() => ({
    'ea-date-picker__field--focused':
      (this.isFocused() || this.isOpen()) && !this.readonly(),
    'ea-date-picker__field--error': this.hasError(),
    'ea-date-picker__field--disabled': this.isDisabled(),
    'ea-date-picker__field--readonly': this.readonly() && !this.isDisabled(),
  }));

  // The calendar popover is portaled to the document body, so it cannot inherit
  // the trigger's font-size; this size class carries the scale over to it.
  readonly popoverClasses = computed(() => ({
    [`ea-date-picker__popover--${this.size()}`]: true,
  }));

  readonly displayValue = computed(() => {
    const val = this.value();
    if (!val) {
      return '';
    }
    if (this.bundleCalendarApplies() && !this.intlLocalizesEffectiveLocale()) {
      const months = this.i18n.messages().datePicker.months;
      return `${val.getDate()} ${months[val.getMonth()]} ${val.getFullYear()}`;
    }
    return new Intl.DateTimeFormat(this.effectiveLocale(), this.formatOptions()).format(
      val,
    );
  });

  /** Field text: the entry in progress while typing, else the formatted value. */
  readonly inputText = computed(() => this.draft() ?? this.displayValue());

  readonly monthYearLabel = computed(() => {
    const year = this.viewYear();
    const month = this.viewMonth();
    // Defer to the bundle only when Intl can't localize this locale: the
    // month/year heading carries locale-specific patterns (element order, era
    // markers, connective words) that Intl composes and a plain join cannot.
    if (this.bundleCalendarApplies() && !this.intlLocalizesEffectiveLocale()) {
      return `${this.i18n.messages().datePicker.months[month]} ${year}`;
    }
    return new Intl.DateTimeFormat(this.effectiveLocale(), {
      month: 'long',
      year: 'numeric',
    }).format(new Date(year, month, 1));
  });

  readonly weekdayLabels = computed(() => {
    const start = this.weekStartsOn();
    // Weekday indices in display order; bundle names are Sunday-first (index 0)
    const order = Array.from({ length: 7 }, (_, i) => (i + start) % 7);
    if (this.bundleCalendarApplies()) {
      const short = this.i18n.messages().datePicker.weekdaysShort;
      return order.map(index => short[index]);
    }
    // A known Sunday (2024-01-07) anchors the offset into locale weekday names
    const base = new Date(2024, 0, 7);
    const formatter = new Intl.DateTimeFormat(this.effectiveLocale(), {
      weekday: 'short',
    });
    return order.map(index => {
      const date = new Date(base);
      date.setDate(base.getDate() + index);
      return formatter.format(date);
    });
  });

  readonly weeks = computed<CalendarDay[][]>(() => {
    const year = this.viewYear();
    const month = this.viewMonth();
    const start = this.weekStartsOn();

    const firstOfMonth = new Date(year, month, 1);
    const dayOfWeek = firstOfMonth.getDay();
    // Offset so grid starts on weekStartsOn (0=Sun, 1=Mon)
    const leading = (dayOfWeek - start + 7) % 7;

    const gridStart = new Date(year, month, 1 - leading);
    const today = this.startOfDay(new Date());
    const selected = this.value();
    const focused = this.focusedDate();
    const min = this.minDate() ? this.startOfDay(this.minDate()!) : null;
    const max = this.maxDate() ? this.startOfDay(this.maxDate()!) : null;

    const rows: CalendarDay[][] = [];
    for (let row = 0; row < 6; row++) {
      const cells: CalendarDay[] = [];
      for (let col = 0; col < 7; col++) {
        const cellDate = new Date(gridStart);
        cellDate.setDate(gridStart.getDate() + row * 7 + col);
        cells.push({
          date: cellDate,
          day: cellDate.getDate(),
          isCurrentMonth: cellDate.getMonth() === month,
          isToday: this.isSameDay(cellDate, today),
          isSelected: selected ? this.isSameDay(cellDate, selected) : false,
          isDisabled: (min ? cellDate < min : false) || (max ? cellDate > max : false),
          isFocused: focused ? this.isSameDay(cellDate, focused) : false,
        });
      }
      rows.push(cells);
    }
    return rows;
  });

  writeValue(val: DatePickerValue): void {
    const date = this.toDate(val);
    this.draft.set(null);
    this.value.set(date);
    if (date) {
      this.viewYear.set(date.getFullYear());
      this.viewMonth.set(date.getMonth());
    }
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  /** Toggles the calendar popover between open and closed. */
  toggle(): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /** Opens the calendar popover and moves focus to the focused day cell. */
  open(): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }
    const current = this.value() ?? new Date();
    this.viewYear.set(current.getFullYear());
    this.viewMonth.set(current.getMonth());
    this.focusedDate.set(this.startOfDay(current));
    this.isOpen.set(true);
    afterNextRender(() => this.focusFocusedDayCell(), { injector: this.injector });
  }

  /** Closes the calendar popover. */
  close(): void {
    this.isOpen.set(false);
    this.focusedDate.set(null);
  }

  private focusFocusedDayCell(): void {
    // The calendar lives inside the popover surface, which `<ea-popover>`
    // teleports to `document.body`, so the lookup starts from the surface's own
    // id rather than the document. Two pickers open at once would otherwise
    // both match and steal each other's focus.
    if (typeof document === 'undefined') {
      return;
    }
    const surface = document.getElementById(this.dialogId());
    const focusedCell = surface?.querySelector<HTMLButtonElement>(
      '.ea-date-picker__day--focused',
    );
    focusedCell?.focus();
  }

  /** Moves keyboard focus to the date field. */
  focus(): void {
    this.inputEl()?.nativeElement.focus();
  }

  selectDay(day: CalendarDay): void {
    if (day.isDisabled) {
      // aria-disabled days still take DOM focus on click, so the roving state
      // must follow or keyboard navigation resumes from the wrong cell
      this.focusedDate.set(this.startOfDay(day.date));
      return;
    }
    this.applyValue(this.startOfDay(day.date));
    this.close();
    this.focus();
  }

  /** Clears the selected date and emits `changed` with `null`. */
  clear(event: Event): void {
    event.stopPropagation();
    if (this.isDisabled() || this.readonly()) {
      return;
    }
    this.applyValue(null);
  }

  goToPrevMonth(): void {
    const month = this.viewMonth();
    if (month === 0) {
      this.viewMonth.set(11);
      this.viewYear.update(y => y - 1);
    } else {
      this.viewMonth.set(month - 1);
    }
    this.pullFocusIntoView();
  }

  goToNextMonth(): void {
    const month = this.viewMonth();
    if (month === 11) {
      this.viewMonth.set(0);
      this.viewYear.update(y => y + 1);
    } else {
      this.viewMonth.set(month + 1);
    }
    this.pullFocusIntoView();
  }

  goToPrevYear(): void {
    this.viewYear.update(y => y - 1);
    this.pullFocusIntoView();
  }

  goToNextYear(): void {
    this.viewYear.update(y => y + 1);
    this.pullFocusIntoView();
  }

  /**
   * Moves the roving date into the month now on screen, keeping the day where
   * the month is long enough. Without this the only tabbable day cell stays in
   * the month the user navigated away from, so inside the focus-trapped dialog
   * no day is reachable and the next arrow key snaps the view back.
   */
  private pullFocusIntoView(): void {
    const year = this.viewYear();
    const month = this.viewMonth();
    const day = this.focusedDate()?.getDate() ?? 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    this.focusedDate.set(new Date(year, month, Math.min(day, daysInMonth)));
  }

  goToToday(): void {
    const today = this.startOfDay(new Date());
    this.viewYear.set(today.getFullYear());
    this.viewMonth.set(today.getMonth());
    this.focusedDate.set(today);
  }

  // Tracks the entry verbatim so the rendered text and the DOM stay in step
  protected onInput(event: Event): void {
    this.draft.set((event.target as HTMLInputElement).value);
  }

  protected onInputFocus(): void {
    this.isFocused.set(true);
  }

  protected onInputBlur(): void {
    this.isFocused.set(false);
    this.commitDraft();
    this.onTouched();
  }

  protected handleInputKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.commitDraft();
        this.open();
        break;
      case 'Enter':
        event.preventDefault();
        this.commitDraft();
        break;
      case 'Escape':
        if (this.draft() !== null) {
          event.preventDefault();
          this.draft.set(null);
        }
        break;
    }
  }

  // Reads the entry into a date and adopts it, or drops it and restores the
  // current value's text when it names no date the field can hold
  private commitDraft(): void {
    const draft = this.draft();
    if (draft === null) {
      return;
    }
    this.draft.set(null);

    const entry = draft.trim();
    if (!entry) {
      if (this.value()) {
        this.applyValue(null);
      }
      return;
    }

    const parsed = parseDateInput(entry, {
      locale: this.effectiveLocale(),
      monthNames: this.i18n.messages().datePicker.months,
    });
    if (!parsed || this.isOutOfRange(parsed)) {
      return;
    }
    const current = this.value();
    if (!current || !this.isSameDay(parsed, current)) {
      this.applyValue(this.startOfDay(parsed));
    }
  }

  private applyValue(date: Date | null): void {
    this.draft.set(null);
    this.value.set(date);
    if (date) {
      this.viewYear.set(date.getFullYear());
      this.viewMonth.set(date.getMonth());
    }
    this.onChange(date);
    this.onTouched();
    this.changed.emit(date);
  }

  private isOutOfRange(date: Date): boolean {
    const min = this.minDate();
    const max = this.maxDate();
    return (
      (!!min && date < this.startOfDay(min)) || (!!max && date > this.startOfDay(max))
    );
  }

  handleGridKeydown(event: KeyboardEvent): void {
    if (!this.isOpen()) {
      return;
    }
    const focused = this.focusedDate() ?? this.startOfDay(new Date());
    const rtl = isRtl(event.currentTarget as Element);
    let next: Date | null;

    switch (event.key) {
      case 'ArrowLeft':
        next = this.addDays(focused, rtl ? 1 : -1);
        break;
      case 'ArrowRight':
        next = this.addDays(focused, rtl ? -1 : 1);
        break;
      case 'ArrowUp':
        next = this.addDays(focused, -7);
        break;
      case 'ArrowDown':
        next = this.addDays(focused, 7);
        break;
      case 'PageUp':
        next = this.addMonths(focused, event.shiftKey ? -12 : -1);
        break;
      case 'PageDown':
        next = this.addMonths(focused, event.shiftKey ? 12 : 1);
        break;
      case 'Home':
        next = this.addDays(focused, -focused.getDay() + this.weekStartsOn());
        if (next > focused) {
          next = this.addDays(next, -7);
        }
        break;
      case 'End': {
        const weekStart = this.weekStartsOn();
        const offset = (focused.getDay() - weekStart + 7) % 7;
        next = this.addDays(focused, 6 - offset);
        break;
      }
      case 'Enter':
      case ' ': {
        event.preventDefault();
        const current = this.focusedDate();
        if (!current || this.isOutOfRange(current)) {
          return;
        }
        this.selectDay({
          date: current,
          day: current.getDate(),
          isCurrentMonth: current.getMonth() === this.viewMonth(),
          isToday: false,
          isSelected: false,
          isDisabled: false,
          isFocused: false,
        });
        return;
      }
      case 'Escape':
        event.preventDefault();
        this.close();
        this.focus();
        return;
      default:
        return;
    }

    if (next) {
      event.preventDefault();
      this.focusedDate.set(next);
      this.viewYear.set(next.getFullYear());
      this.viewMonth.set(next.getMonth());
      afterNextRender(() => this.focusFocusedDayCell(), { injector: this.injector });
    }
  }

  /** Called by `<ea-popover>` when the user clicks outside the picker. */
  onPopoverCloseRequested(): void {
    this.close();
    this.onTouched();
  }

  // Internal helpers
  private formatOptions(): Intl.DateTimeFormatOptions {
    switch (this.format()) {
      case 'short':
        return { dateStyle: 'short' };
      case 'long':
        return { dateStyle: 'long' };
      case 'medium':
      default:
        return { dateStyle: 'medium' };
    }
  }

  private toDate(val: DatePickerValue): Date | null {
    if (!val) {
      return null;
    }
    if (val instanceof Date) {
      return isNaN(val.getTime()) ? null : this.startOfDay(val);
    }
    const parsed = new Date(val);
    return isNaN(parsed.getTime()) ? null : this.startOfDay(parsed);
  }

  private startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private isSameDay(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }

  private addMonths(date: Date, months: number): Date {
    // Clamping to the target month's length keeps the step at exactly one
    // month; a bare setMonth overflows short months into the one after
    const daysInTarget = new Date(
      date.getFullYear(),
      date.getMonth() + months + 1,
      0,
    ).getDate();
    return new Date(
      date.getFullYear(),
      date.getMonth() + months,
      Math.min(date.getDate(), daysInTarget),
    );
  }
}

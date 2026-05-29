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

import { EagamiI18nService } from '../i18n/i18n.service';
import { AlertCircleIconComponent } from '../icons/alert-circle.component';
import { CalendarIconComponent } from '../icons/calendar.component';
import { ChevronLeftIconComponent } from '../icons/chevron-left.component';
import { ChevronRightIconComponent } from '../icons/chevron-right.component';
import { XIconComponent } from '../icons/x.component';
import { PopoverComponent } from '../popover/popover.component';

/** Visual size of the date picker trigger. */
export type DatePickerSize = 'sm' | 'md' | 'lg';
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
 * Calendar popover for selecting a single date. Supports `min`/`max` bounds,
 * configurable week start, locale-aware formatting via `Intl.DateTimeFormat`,
 * and full keyboard navigation (arrows, PageUp/PageDown, Home/End, Enter,
 * Escape). Integrates with Angular forms via `ControlValueAccessor`.
 */
@Component({
  selector: 'ea-date-picker',
  imports: [
    AlertCircleIconComponent,
    CalendarIconComponent,
    ChevronLeftIconComponent,
    ChevronRightIconComponent,
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
  protected readonly triggerEl = viewChild<ElementRef<HTMLButtonElement>>('triggerEl');
  private readonly injector = inject(Injector);
  protected readonly i18n = inject(EagamiI18nService);

  readonly label = input<string | undefined>(undefined);
  /** Placeholder shown when no date is selected. Defaults to the active locale's text. */
  readonly placeholder = input<string | undefined>(undefined);
  readonly size = input<DatePickerSize>('md');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);
  readonly format = input<DatePickerFormat>('medium');
  readonly weekStartsOn = input<DatePickerWeekStart>(1);
  readonly locale = input<string | undefined>(undefined);
  readonly id = input<string>(`ea-date-picker-${Math.random().toString(36).slice(2, 9)}`);

  readonly value = model<Date | null>(null);

  /** Fires when the selected date changes, including when cleared. */
  readonly changed = output<Date | null>();

  readonly isOpen = signal(false);
  readonly viewYear = signal(new Date().getFullYear());
  readonly viewMonth = signal(new Date().getMonth());
  readonly focusedDate = signal<Date | null>(null);
  private readonly _formDisabled = signal(false);

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());

  readonly hasError = computed(() => !!this.errorMsg());
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  /** Locale used for date formatting: explicit `locale` input, else the global locale. */
  readonly effectiveLocale = computed(() => this.locale() ?? this.i18n.locale());

  /** Placeholder text: explicit `placeholder` input, else the active locale's default. */
  readonly resolvedPlaceholder = computed(
    () => this.placeholder() ?? this.i18n.messages().datePicker.placeholder,
  );

  readonly triggerClasses = computed(() => ({
    [`ea-date-picker__trigger--${this.size()}`]: true,
    'ea-date-picker__trigger--error': this.hasError(),
    'ea-date-picker__trigger--open': this.isOpen(),
    'ea-date-picker__trigger--disabled': this.isDisabled(),
  }));

  readonly wrapperClasses = computed(() => ({
    [`ea-date-picker__trigger-wrapper--${this.size()}`]: true,
  }));

  readonly displayValue = computed(() => {
    const val = this.value();
    if (!val) {
      return '';
    }
    return new Intl.DateTimeFormat(this.effectiveLocale(), this.formatOptions()).format(
      val,
    );
  });

  readonly monthYearLabel = computed(() => {
    const date = new Date(this.viewYear(), this.viewMonth(), 1);
    return new Intl.DateTimeFormat(this.effectiveLocale(), {
      month: 'long',
      year: 'numeric',
    }).format(date);
  });

  readonly weekdayLabels = computed(() => {
    const start = this.weekStartsOn();
    const formatter = new Intl.DateTimeFormat(this.effectiveLocale(), {
      weekday: 'short',
    });
    const labels: string[] = [];
    // Use a known Sunday (2024-01-07) as anchor so we can offset for locale
    const base = new Date(2024, 0, 7);
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + ((i + start) % 7));
      labels.push(formatter.format(d));
    }
    return labels;
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
    // teleports to `document.body`. Query the document directly so the lookup
    // works regardless of where the surface is mounted.
    if (typeof document === 'undefined') {
      return;
    }
    const focusedCell = document.querySelector<HTMLButtonElement>(
      '.ea-date-picker__day--focused',
    );
    focusedCell?.focus();
  }

  /** Moves keyboard focus to the trigger button. */
  focus(): void {
    this.triggerEl()?.nativeElement.focus();
  }

  selectDay(day: CalendarDay): void {
    if (day.isDisabled) {
      return;
    }
    const date = this.startOfDay(day.date);
    this.value.set(date);
    this.onChange(date);
    this.onTouched();
    this.changed.emit(date);
    this.close();
    this.triggerEl()?.nativeElement.focus();
  }

  /** Clears the selected date and emits `changed` with `null`. */
  clear(event: Event): void {
    event.stopPropagation();
    if (this.isDisabled() || this.readonly()) {
      return;
    }
    this.value.set(null);
    this.onChange(null);
    this.onTouched();
    this.changed.emit(null);
  }

  goToPrevMonth(): void {
    const month = this.viewMonth();
    if (month === 0) {
      this.viewMonth.set(11);
      this.viewYear.update(y => y - 1);
    } else {
      this.viewMonth.set(month - 1);
    }
  }

  goToNextMonth(): void {
    const month = this.viewMonth();
    if (month === 11) {
      this.viewMonth.set(0);
      this.viewYear.update(y => y + 1);
    } else {
      this.viewMonth.set(month + 1);
    }
  }

  goToPrevYear(): void {
    this.viewYear.update(y => y - 1);
  }

  goToNextYear(): void {
    this.viewYear.update(y => y + 1);
  }

  goToToday(): void {
    const today = this.startOfDay(new Date());
    this.viewYear.set(today.getFullYear());
    this.viewMonth.set(today.getMonth());
    this.focusedDate.set(today);
  }

  handleTriggerKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        event.preventDefault();
        this.open();
        break;
    }
  }

  handleGridKeydown(event: KeyboardEvent): void {
    if (!this.isOpen()) {
      return;
    }
    const focused = this.focusedDate() ?? this.startOfDay(new Date());
    let next: Date | null;

    switch (event.key) {
      case 'ArrowLeft':
        next = this.addDays(focused, -1);
        break;
      case 'ArrowRight':
        next = this.addDays(focused, 1);
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
        if (!current) {
          return;
        }
        const min = this.minDate();
        const max = this.maxDate();
        if (min && current < this.startOfDay(min)) {
          return;
        }
        if (max && current > this.startOfDay(max)) {
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
        this.triggerEl()?.nativeElement.focus();
        return;
      default:
        return;
    }

    if (next) {
      event.preventDefault();
      this.focusedDate.set(next);
      this.viewYear.set(next.getFullYear());
      this.viewMonth.set(next.getMonth());
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
    const result = new Date(date);
    result.setMonth(date.getMonth() + months);
    return result;
  }
}

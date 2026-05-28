import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { EagamiI18nService } from '../i18n/i18n.service';
import { AlertCircleIconComponent } from '../icons/alert-circle.component';
import { ChevronDownIconComponent } from '../icons/chevron-down.component';
import { ChevronUpIconComponent } from '../icons/chevron-up.component';
import { ClockIconComponent } from '../icons/clock.component';
import { XIconComponent } from '../icons/x.component';
import { PopoverComponent } from '../popover/popover.component';

/** Visual size of the time picker trigger. */
export type TimePickerSize = 'sm' | 'md' | 'lg';

/** Display format for the trigger label. The wire value is always 24h. */
export type TimePickerFormat = '12h' | '24h';

/** Internal identifier for the three unit columns. */
type Unit = 'hours' | 'minutes' | 'seconds';

interface ParsedTime {
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
}

/**
 * Pops a stepper UI for selecting an `HH:MM[:SS]` time. The wire value is
 * always a 24-hour string (`"14:30"` or `"14:30:00"`); the `format` input
 * toggles the trigger's display between 12-hour and 24-hour styles. Supports
 * configurable steps for minutes and seconds, optional seconds column, and
 * integrates with Angular forms via `ControlValueAccessor`.
 *
 * Keyboard: Tab moves between the hour, minute, (seconds), and AM/PM columns.
 * Each spinner accepts ArrowUp/ArrowDown to step by 1 (or by the configured
 * step), PageUp/PageDown for a coarser bump, and digit keys to type a value
 * directly. After typing two digits (or one digit that already maxes the
 * unit), focus auto-advances to the next column. Backspace clears the typed
 * buffer; Escape closes the popover.
 */
@Component({
  selector: 'ea-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AlertCircleIconComponent,
    ChevronDownIconComponent,
    ChevronUpIconComponent,
    ClockIconComponent,
    NgClass,
    PopoverComponent,
    XIconComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
})
export class TimePickerComponent implements ControlValueAccessor {
  protected readonly triggerEl = viewChild<ElementRef<HTMLButtonElement>>('triggerEl');
  protected readonly hoursEl = viewChild<ElementRef<HTMLInputElement>>('hoursEl');
  protected readonly minutesEl = viewChild<ElementRef<HTMLInputElement>>('minutesEl');
  protected readonly secondsEl = viewChild<ElementRef<HTMLInputElement>>('secondsEl');
  protected readonly i18n = inject(EagamiI18nService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

  readonly label = input<string | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly size = input<TimePickerSize>('md');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  /** Display format for the trigger label. Wire value is always 24h. */
  readonly format = input<TimePickerFormat>('24h');
  readonly includeSeconds = input<boolean>(false);
  readonly minuteStep = input<number>(1);
  readonly secondStep = input<number>(1);
  readonly id = input<string>(`ea-time-picker-${Math.random().toString(36).slice(2, 9)}`);

  /** `"HH:MM"` or `"HH:MM:SS"` in 24-hour notation, or `null` when unset. */
  readonly value = model<string | null>(null);
  /** Fires with the new value whenever the user changes the time. */
  readonly changed = output<string | null>();

  readonly isOpen = signal(false);
  /** Typed-digit buffer for the currently focused column, or `null` when idle. */
  readonly editBuffer = signal<{ unit: Unit; digits: string } | null>(null);
  private readonly _formDisabled = signal(false);
  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  /** Long-press timers for the chevron buttons. Cleared on release/destroy. */
  private holdDelayTimer: ReturnType<typeof setTimeout> | null = null;
  private holdIntervalTimer: ReturnType<typeof setInterval> | null = null;
  private holdStartedAt = 0;

  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());
  readonly hasError = computed(() => !!this.errorMsg());
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  /** Parsed `[hh, mm, ss]` from the current value, defaulting to midnight. */
  readonly parsed = computed<ParsedTime>(() => {
    const parsed = parseTime(this.value());
    return parsed ?? { hours: 0, minutes: 0, seconds: 0 };
  });

  /** True when the picker has a non-null value. Drives the clear button + placeholder fallback. */
  readonly hasValue = computed(() => this.value() !== null);

  /** Hours digit displayed in the popover stepper. Honors the `format` input. */
  readonly displayHours = computed(() => {
    const h = this.parsed().hours;
    if (this.format() === '24h') return h;
    // 12h: 0 maps to 12 (midnight as 12 AM), 13–23 map to 1–11
    return h % 12 === 0 ? 12 : h % 12;
  });

  /**
   * Text shown in a column's value cell. Reflects the typed-digit buffer when
   * the user is mid-edit on that column; otherwise renders the committed
   * value. Hours pad to two digits in 24h mode only (so 9 AM still reads as
   * "9", but 09:00 in 24h reads as "09").
   */
  hoursText = computed(() => {
    const buf = this.editBuffer();
    if (buf && buf.unit === 'hours') return buf.digits;
    const h = this.displayHours();
    return this.format() === '24h' ? pad2(h) : String(h);
  });

  minutesText = computed(() => {
    const buf = this.editBuffer();
    if (buf && buf.unit === 'minutes') return buf.digits;
    return pad2(this.parsed().minutes);
  });

  secondsText = computed(() => {
    const buf = this.editBuffer();
    if (buf && buf.unit === 'seconds') return buf.digits;
    return pad2(this.parsed().seconds);
  });

  /** `'AM' | 'PM'` for 12h mode; `null` in 24h. */
  readonly period = computed<'AM' | 'PM' | null>(() => {
    if (this.format() === '24h') return null;
    return this.parsed().hours < 12 ? 'AM' : 'PM';
  });

  /** Localized text shown on the trigger. Falls back to placeholder when no value. */
  readonly displayValue = computed(() => {
    if (!this.hasValue()) return null;
    const { hours, minutes, seconds } = this.parsed();
    const m = pad2(minutes);
    const s = this.includeSeconds() ? `:${pad2(seconds)}` : '';
    if (this.format() === '24h') {
      return `${pad2(hours)}:${m}${s}`;
    }
    const display = hours % 12 === 0 ? 12 : hours % 12;
    const period =
      hours < 12
        ? this.i18n.messages().timePicker.amLabel
        : this.i18n.messages().timePicker.pmLabel;
    return `${display}:${m}${s} ${period}`;
  });

  readonly resolvedPlaceholder = computed(
    () => this.placeholder() ?? this.i18n.messages().timePicker.placeholder,
  );

  readonly triggerClasses = computed(() => ({
    [`ea-time-picker__trigger--${this.size()}`]: true,
    'ea-time-picker__trigger--error': this.hasError(),
    'ea-time-picker__trigger--open': this.isOpen(),
    'ea-time-picker__trigger--disabled': this.isDisabled(),
    'ea-time-picker__trigger--placeholder': !this.hasValue(),
  }));

  readonly wrapperClasses = computed(() => ({
    [`ea-time-picker__trigger-wrapper--${this.size()}`]: true,
  }));

  writeValue(val: string | null | undefined): void {
    this.value.set(val ?? null);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  constructor() {
    this.destroyRef.onDestroy(() => this.stopHold());
  }

  toggle(): void {
    if (this.isDisabled() || this.readonly()) return;
    const opening = !this.isOpen();
    this.isOpen.set(opening);
    if (opening) this.focusHoursWhenReady();
  }

  /**
   * Push focus into the hours input once the popover surface has been
   * rendered. `afterNextRender` guarantees the DOM has been updated (and the
   * surface is no longer `display: none`) before we call `.focus()`.
   */
  private focusHoursWhenReady(): void {
    afterNextRender(
      () => {
        const el = this.hoursEl()?.nativeElement;
        el?.focus();
        el?.select();
      },
      { injector: this.injector },
    );
  }

  close(): void {
    this.isOpen.set(false);
  }

  /** Called by `<ea-popover>` when the user clicks outside or scrolls. */
  onPopoverCloseRequested(): void {
    this.close();
    this.onTouched();
  }

  clear(event: Event): void {
    event.stopPropagation();
    if (this.isDisabled() || this.readonly()) return;
    this.value.set(null);
    this.onChange(null);
    this.onTouched();
    this.changed.emit(null);
  }

  handleTriggerKeydown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.readonly()) return;
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (!this.isOpen()) {
        this.isOpen.set(true);
        this.focusHoursWhenReady();
      }
    } else if (event.key === 'Escape' && this.isOpen()) {
      event.preventDefault();
      this.close();
      this.triggerEl()?.nativeElement.focus();
    }
  }

  /** Stepper button or keyboard arrow nudges one column up or down. */
  step(unit: Unit, direction: 1 | -1): void {
    if (this.isDisabled() || this.readonly()) return;
    const { hours, minutes, seconds } = this.parsed();
    const next = nextTime(
      { hours, minutes, seconds },
      unit,
      direction,
      this.minuteStep(),
      this.secondStep(),
    );
    this.commit(next);
  }

  /**
   * Begin a long-press repeat on a chevron button. Fires once immediately,
   * then after a `HOLD_INITIAL_DELAY` pause repeats at `HOLD_INTERVAL_MS`,
   * accelerating to `HOLD_FAST_INTERVAL_MS` after `HOLD_ACCELERATE_AFTER_MS`
   * of continuous holding. Pointer up / leave / cancel stops the repeat.
   */
  startHold(unit: Unit, direction: 1 | -1, event: Event): void {
    if (this.isDisabled() || this.readonly()) return;
    event.preventDefault();
    this.stopHold();
    this.step(unit, direction);
    this.holdStartedAt = performance.now();
    this.holdDelayTimer = setTimeout(() => {
      this.holdIntervalTimer = setInterval(() => {
        this.step(unit, direction);
        const elapsed = performance.now() - this.holdStartedAt;
        if (elapsed > HOLD_ACCELERATE_AFTER_MS && this.holdIntervalTimer !== null) {
          clearInterval(this.holdIntervalTimer);
          this.holdIntervalTimer = setInterval(
            () => this.step(unit, direction),
            HOLD_FAST_INTERVAL_MS,
          );
        }
      }, HOLD_INTERVAL_MS);
    }, HOLD_INITIAL_DELAY);
  }

  /** End any in-flight long-press repeat. Idempotent. */
  stopHold(): void {
    if (this.holdDelayTimer !== null) {
      clearTimeout(this.holdDelayTimer);
      this.holdDelayTimer = null;
    }
    if (this.holdIntervalTimer !== null) {
      clearInterval(this.holdIntervalTimer);
      this.holdIntervalTimer = null;
    }
  }

  /** Switches the AM/PM period in 12h mode by toggling the 12-hour offset. */
  togglePeriod(): void {
    if (this.isDisabled() || this.readonly() || this.format() === '24h') return;
    const { hours, minutes, seconds } = this.parsed();
    const flipped = (hours + 12) % 24;
    this.commit({ hours: flipped, minutes, seconds });
  }

  handlePopoverKeydown(event: KeyboardEvent, unit: Unit): void {
    if (this.isDisabled() || this.readonly()) return;

    // Digits, Backspace, and Delete pass through to the native `<input>`.
    // The `(input)` handler picks them up via `onSpinnerInput`.
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.flushBuffer();
      this.step(unit, 1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.flushBuffer();
      this.step(unit, -1);
    } else if (event.key === 'PageUp') {
      event.preventDefault();
      this.flushBuffer();
      // Coarse step: 5× the configured step (or 10 for hours).
      const coarse = unit === 'hours' ? 10 : 5;
      for (let i = 0; i < coarse; i++) this.step(unit, 1);
    } else if (event.key === 'PageDown') {
      event.preventDefault();
      this.flushBuffer();
      const coarse = unit === 'hours' ? 10 : 5;
      for (let i = 0; i < coarse; i++) this.step(unit, -1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.flushBuffer();
      // Commit the currently displayed time even if it wasn't edited, so a
      // user who opens the picker on a null value and hits Enter gets the
      // default `00:00` (the fallback returned by `parsed()`).
      this.commit(this.parsed());
      this.close();
      this.triggerEl()?.nativeElement.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.editBuffer.set(null);
      this.close();
      this.triggerEl()?.nativeElement.focus();
    }
    // Tab is handled by the browser; (blur) on the leaving input flushes.
  }

  /** Select-all on focus so the first keystroke replaces the current value. */
  onSpinnerFocus(event: FocusEvent): void {
    const el = event.currentTarget as HTMLInputElement;
    // afterNextRender-ish: wait one tick so iOS / Safari accept the select().
    queueMicrotask(() => el.select());
  }

  /**
   * Native `(input)` event: the typed value is already in `el.value`. Strip
   * non-digits, update the buffer (which drives the displayed text), and
   * commit + auto-advance once the column is full or a third digit would
   * overflow.
   */
  onSpinnerInput(unit: Unit, event: Event): void {
    if (this.isDisabled() || this.readonly()) return;
    const el = event.currentTarget as HTMLInputElement;
    const raw = el.value;
    const digits = raw.replace(/\D/g, '').slice(0, 2);
    if (digits !== raw) el.value = digits;

    this.editBuffer.set({ unit, digits });

    if (digits.length === 2) {
      this.commitDigits(unit, digits);
      this.advanceFocus(unit);
      return;
    }
    if (digits.length === 1 && this.cannotExtend(unit, digits)) {
      // A single digit already saturates the unit (e.g. `9` in minutes: a
      // second `0`–`5` would be needed to stay ≤ 59, but 9 + 0 = 90 > 59).
      this.commitDigits(unit, digits);
      this.advanceFocus(unit);
    }
  }

  /** Commits the current buffer if any. Wired to each input's `(blur)`. */
  onSpinnerBlur(): void {
    this.flushBuffer();
  }

  /** True when no digit `0`–`9` can validly extend the current buffer. */
  private cannotExtend(unit: Unit, digits: string): boolean {
    const candidate = parseInt(digits + '0', 10);
    return candidate > this.maxFor(unit);
  }

  /** Commits any pending buffer. Called on blur, on arrow keys, on Tab. */
  private flushBuffer(): void {
    const buf = this.editBuffer();
    if (!buf || buf.digits.length === 0) {
      this.editBuffer.set(null);
      return;
    }
    this.commitDigits(buf.unit, buf.digits);
  }

  /** Writes the buffered digits into the value and clears the buffer. */
  private commitDigits(unit: Unit, digits: string): void {
    const raw = parseInt(digits, 10);
    if (isNaN(raw)) {
      this.editBuffer.set(null);
      return;
    }
    const max = this.maxFor(unit);
    const clamped = Math.min(max, Math.max(this.minFor(unit), raw));
    const { hours, minutes, seconds } = this.parsed();
    let next: ParsedTime;
    if (unit === 'hours') {
      next = { hours: this.hoursFromTyped(clamped), minutes, seconds };
    } else if (unit === 'minutes') {
      next = { hours, minutes: clamped, seconds };
    } else {
      next = { hours, minutes, seconds: clamped };
    }
    this.editBuffer.set(null);
    this.commit(next);
  }

  /**
   * Map a typed hours value back to 24h. In 24h mode the typed value is the
   * hour. In 12h mode the typed value is interpreted in the current period
   * (AM: 12 maps to 0, others stay; PM: 12 stays, others add 12).
   */
  private hoursFromTyped(typed: number): number {
    if (this.format() === '24h') return typed;
    const isPm = this.period() === 'PM';
    if (typed === 12) return isPm ? 12 : 0;
    return isPm ? typed + 12 : typed;
  }

  private minFor(unit: Unit): number {
    if (unit !== 'hours') return 0;
    return this.format() === '24h' ? 0 : 1;
  }

  private maxFor(unit: Unit): number {
    if (unit === 'hours') return this.format() === '24h' ? 23 : 12;
    return 59;
  }

  /** Move focus to the next unit column, looping back to hours at the end. */
  private advanceFocus(unit: Unit): void {
    const next = this.nextUnit(unit);
    const el =
      next === 'hours'
        ? this.hoursEl()?.nativeElement
        : next === 'minutes'
          ? this.minutesEl()?.nativeElement
          : this.secondsEl()?.nativeElement;
    el?.focus();
  }

  private nextUnit(unit: Unit): Unit {
    if (unit === 'hours') return 'minutes';
    if (unit === 'minutes') return this.includeSeconds() ? 'seconds' : 'hours';
    return 'hours';
  }

  private commit(time: ParsedTime): void {
    const str = formatTime(time, this.includeSeconds());
    if (str === this.value()) return;
    this.value.set(str);
    this.onChange(str);
    this.changed.emit(str);
  }
}

/** Delay before a held chevron button starts repeating, in ms. */
const HOLD_INITIAL_DELAY = 400;
/** Repeat interval while a chevron button is held, in ms. */
const HOLD_INTERVAL_MS = 90;
/** After this many ms of continuous hold, the repeat accelerates. */
const HOLD_ACCELERATE_AFTER_MS = 1500;
/** Repeat interval once the long-press has accelerated, in ms. */
const HOLD_FAST_INTERVAL_MS = 35;

/** Pad a 0–59 unit to two digits. */
function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

/** Parse `"HH:MM"` / `"HH:MM:SS"`; returns `null` for any malformed input. */
function parseTime(input: string | null | undefined): ParsedTime | null {
  if (!input) return null;
  const match = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/.exec(input.trim());
  if (!match) return null;
  const hours = clamp(parseInt(match[1], 10), 0, 23);
  const minutes = clamp(parseInt(match[2], 10), 0, 59);
  const seconds = match[3] !== undefined ? clamp(parseInt(match[3], 10), 0, 59) : 0;
  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return null;
  return { hours, minutes, seconds };
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

function formatTime(time: ParsedTime, includeSeconds: boolean): string {
  const base = `${pad2(time.hours)}:${pad2(time.minutes)}`;
  return includeSeconds ? `${base}:${pad2(time.seconds)}` : base;
}

/** Wrap-around step for a unit. Hours wrap at 24, minutes/seconds at 60. */
function nextTime(
  current: ParsedTime,
  unit: Unit,
  direction: 1 | -1,
  minuteStep: number,
  secondStep: number,
): ParsedTime {
  const { hours, minutes, seconds } = current;
  if (unit === 'hours') {
    const nextHours = (hours + direction + 24) % 24;
    return { hours: nextHours, minutes, seconds };
  }
  if (unit === 'minutes') {
    const nextMinutes = (minutes + direction * minuteStep + 60) % 60;
    return { hours, minutes: nextMinutes, seconds };
  }
  const nextSeconds = (seconds + direction * secondStep + 60) % 60;
  return { hours, minutes, seconds: nextSeconds };
}

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

import { isRtl } from '../direction';
import { FieldLabelComponent } from '../field/field-label.component';
import { FieldMessagesComponent } from '../field/field-messages.component';
import {
  type EaErrorMessages,
  injectControlErrorState,
} from '../forms/control-error-state';
import { EagamiI18nService } from '../i18n/i18n.service';
import { type EaSize } from '../sizes';
import { uniqueId } from '../unique-id';

/** Visual size of the range slider track and thumbs. */
export type RangeSliderSize = EaSize;

/** Tuple model emitted by the range slider: `[low, high]`, with `low <= high`. */
export type RangeSliderValue = readonly [number, number];

/** Identifies which of the two thumbs an event affects. */
type Thumb = 'low' | 'high';

// Default value formatter, identity-checked so a custom `formatValue` bypasses
// the `groupThousands` grouping.
const FORMAT_PLAIN = (value: number): string => `${value}`;

/**
 * Two-thumb extension of `<ea-slider>`. Drives a `[low, high]` numeric range
 * with pointer drag (the closer thumb to the pointer responds) and full
 * keyboard navigation per thumb (arrows / PageUp / PageDown / Home / End).
 * Tab moves between thumbs. Configurable `min`, `max`, `step`, optional value
 * display, and integrates with Angular forms via `ControlValueAccessor`.
 *
 * Overlap rule: a thumb cannot cross past the other; once it reaches the
 * opposite thumb's position, it clamps to that boundary. Drag-induced
 * overlap (where the user yanks the low thumb past the high) is resolved by
 * keeping the moving thumb on its side and the other thumb pinned.
 */
@Component({
  selector: 'ea-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrl: './range-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FieldLabelComponent, FieldMessagesComponent, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeSliderComponent),
      multi: true,
    },
  ],
})
export class RangeSliderComponent implements ControlValueAccessor {
  private readonly i18n = inject(EagamiI18nService);

  readonly trackEl = viewChild<ElementRef<HTMLDivElement>>('trackEl');

  readonly label = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  /** Per-validator-key message overrides for a bound form control (e.g. `{ required: '...' }`). */
  readonly errorMessages = input<EaErrorMessages | undefined>(undefined);
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);
  readonly size = input<RangeSliderSize>('md');
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly showValue = input<boolean>(false);
  readonly showMinMaxLabels = input<boolean>(false);
  readonly formatValue = input<(value: number) => string>(FORMAT_PLAIN);
  /** Group thousands with commas in displayed values (ignored when a custom `formatValue` is set). */
  readonly groupThousands = input<boolean>(true);
  /** Accessible label for the low (start) thumb. Falls back to the field label when omitted. */
  readonly ariaLabelLow = input<string | undefined>(undefined, {
    alias: 'aria-label-low',
  });
  /** Accessible label for the high (end) thumb. Falls back to the field label when omitted. */
  readonly ariaLabelHigh = input<string | undefined>(undefined, {
    alias: 'aria-label-high',
  });
  readonly id = input<string>(uniqueId('ea-range-slider'));

  readonly value = model<RangeSliderValue>([0, 100]);
  /** Fires with the new `[low, high]` tuple whenever either thumb moves. */
  readonly changed = output<RangeSliderValue>();

  private readonly _formDisabled = signal(false);
  readonly dragging = signal<Thumb | null>(null);

  private onChange: (value: RangeSliderValue) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());

  /** Clamped, ordered `[low, high]` tuple: `low <= high`, both within `[min, max]`. */
  readonly clampedValue = computed<RangeSliderValue>(() => {
    const [a, b] = this.value();
    const min = this.min();
    const max = this.max();
    const lo = Math.min(max, Math.max(min, Math.min(a, b)));
    const hi = Math.min(max, Math.max(min, Math.max(a, b)));
    return [lo, hi];
  });

  readonly lowPercent = computed(() => this.toPercent(this.clampedValue()[0]));
  readonly highPercent = computed(() => this.toPercent(this.clampedValue()[1]));

  /** Formats a value for display, grouping thousands with commas unless a custom `formatValue` is set. */
  protected formatDisplay(value: number): string {
    const formatter = this.formatValue();
    if (formatter !== FORMAT_PLAIN) {
      return formatter(value);
    }
    return this.groupThousands()
      ? value.toLocaleString(this.i18n.locale(), { maximumFractionDigits: 20 })
      : `${value}`;
  }

  private readonly errorState = injectControlErrorState({
    errorMsg: this.errorMsg,
    errorMessages: this.errorMessages,
  });
  readonly errorText = this.errorState.error;
  readonly hasError = this.errorState.hasError;
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  readonly hostClasses = computed(() => ({
    [`ea-range-slider--${this.size()}`]: true,
    'ea-range-slider--error': this.hasError(),
    'ea-range-slider--disabled': this.isDisabled(),
    'ea-range-slider--dragging': this.dragging() !== null,
  }));

  writeValue(val: RangeSliderValue | null | undefined): void {
    if (Array.isArray(val) && val.length === 2) {
      const [a, b] = val;
      const safeA = typeof a === 'number' && !isNaN(a) ? a : this.min();
      const safeB = typeof b === 'number' && !isNaN(b) ? b : this.max();
      this.value.set([safeA, safeB]);
    } else {
      this.value.set([this.min(), this.max()]);
    }
  }

  registerOnChange(fn: (value: RangeSliderValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  handleKeydown(event: KeyboardEvent, thumb: Thumb): void {
    if (this.isDisabled()) {
      return;
    }

    const [lo, hi] = this.clampedValue();
    const current = thumb === 'low' ? lo : hi;
    const step = this.step();
    const bigStep = Math.max(step * 10, (this.max() - this.min()) / 10);
    const track = this.trackEl()?.nativeElement;
    const rtl = track ? isRtl(track) : false;
    let next: number;

    switch (event.key) {
      case 'ArrowUp':
        next = current + step;
        break;
      case 'ArrowDown':
        next = current - step;
        break;
      case 'ArrowRight':
        next = current + (rtl ? -step : step);
        break;
      case 'ArrowLeft':
        next = current + (rtl ? step : -step);
        break;
      case 'PageUp':
        next = current + bigStep;
        break;
      case 'PageDown':
        next = current - bigStep;
        break;
      case 'Home':
        next = this.min();
        break;
      case 'End':
        next = this.max();
        break;
      default:
        return;
    }

    event.preventDefault();
    this.commitThumb(thumb, next);
  }

  handleBlur(): void {
    this.onTouched();
  }

  handleTrackPointerDown(event: PointerEvent): void {
    if (this.isDisabled()) {
      return;
    }
    const track = this.trackEl()?.nativeElement;
    if (!track) {
      return;
    }

    // Pick whichever thumb is closer to the pointer's track-relative ratio,
    // breaking ties toward the low thumb. Then begin dragging that thumb.
    const raw = this.pointerToValue(event, track);
    const [lo, hi] = this.clampedValue();
    const target: Thumb = Math.abs(raw - lo) <= Math.abs(raw - hi) ? 'low' : 'high';

    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    this.dragging.set(target);
    this.commitThumb(target, raw);
  }

  handleTrackPointerMove(event: PointerEvent): void {
    const active = this.dragging();
    if (!active || this.isDisabled()) {
      return;
    }
    const track = this.trackEl()?.nativeElement;
    if (!track) {
      return;
    }
    this.commitThumb(active, this.pointerToValue(event, track));
  }

  handleTrackPointerUp(event: PointerEvent): void {
    if (!this.dragging()) {
      return;
    }
    (event.target as HTMLElement).releasePointerCapture?.(event.pointerId);
    this.dragging.set(null);
    this.onTouched();
  }

  private toPercent(value: number): number {
    const range = this.max() - this.min();
    if (range <= 0) {
      return 0;
    }
    return ((value - this.min()) / range) * 100;
  }

  private pointerToValue(event: PointerEvent, track: HTMLDivElement): number {
    const rect = track.getBoundingClientRect();
    let ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    if (isRtl(track)) {
      ratio = 1 - ratio;
    }
    return this.min() + ratio * (this.max() - this.min());
  }

  /** Snap to step, clamp to `[min, max]`, then constrain by the opposite thumb. */
  private commitThumb(thumb: Thumb, raw: number): void {
    const step = this.step();
    const min = this.min();
    const max = this.max();
    const snapped = Math.round((raw - min) / step) * step + min;
    const clamped = Math.min(max, Math.max(min, snapped));
    const rounded = Number(clamped.toFixed(10));

    const [lo, hi] = this.clampedValue();
    let nextLo = lo;
    let nextHi = hi;

    if (thumb === 'low') {
      nextLo = Math.min(rounded, hi);
    } else {
      nextHi = Math.max(rounded, lo);
    }

    if (nextLo === lo && nextHi === hi) {
      return;
    }
    const next: RangeSliderValue = [nextLo, nextHi];
    this.value.set(next);
    this.onChange(next);
    this.changed.emit(next);
  }
}

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
  viewChild,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AlertCircleIconComponent } from '../icons/alert-circle.component';

/** Visual size of the slider track and thumb. */
export type SliderSize = 'sm' | 'md' | 'lg';

/**
 * Single-value range input controlled with pointer drag or full keyboard
 * navigation (arrows, PageUp/PageDown, Home/End). Supports configurable
 * `min`, `max`, and `step`, optional value display, and integrates with
 * Angular forms via `ControlValueAccessor`.
 */
@Component({
  selector: 'ea-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AlertCircleIconComponent, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true,
    },
  ],
})
export class SliderComponent implements ControlValueAccessor {
  readonly trackEl = viewChild<ElementRef<HTMLDivElement>>('trackEl');

  readonly label = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  /** Force the error-state styling without binding `errorMsg`. Lets consumers
   *  render the error text themselves (e.g. above the slider in a form layout)
   *  while still getting the built-in recolour of the fill and thumb. */
  readonly hasError = input<boolean>(false);
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);
  readonly size = input<SliderSize>('md');
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly showValue = input<boolean>(false);
  readonly showMinMaxLabels = input<boolean>(false);
  readonly formatValue = input<(value: number) => string>(value => `${value}`);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly id = input<string>(`ea-slider-${Math.random().toString(36).slice(2, 9)}`);

  readonly value = model<number>(0);
  /** Fires with the new (snapped, clamped) numeric value whenever the slider moves. */
  readonly changed = output<number>();

  private readonly _formDisabled = signal(false);
  readonly dragging = signal(false);

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());

  readonly clampedValue = computed(() => {
    const v = this.value();
    return Math.min(this.max(), Math.max(this.min(), v));
  });

  readonly percent = computed(() => {
    const range = this.max() - this.min();
    if (range <= 0) {
      return 0;
    }
    return ((this.clampedValue() - this.min()) / range) * 100;
  });

  readonly errored = computed(() => this.hasError() || !!this.errorMsg());
  readonly showError = computed(() => !!this.errorMsg());
  /* Hint stays visible when the consumer is rendering the error elsewhere
     (`hasError=true` without `errorMsg`); only the slider's own inline message
     replaces it. */
  readonly showHint = computed(() => !!this.hint() && !this.showError());

  readonly hostClasses = computed(() => ({
    [`ea-slider--${this.size()}`]: true,
    'ea-slider--error': this.errored(),
    'ea-slider--disabled': this.isDisabled(),
    'ea-slider--dragging': this.dragging(),
  }));

  writeValue(val: number): void {
    this.value.set(typeof val === 'number' && !isNaN(val) ? val : this.min());
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    const step = this.step();
    const bigStep = Math.max(step * 10, (this.max() - this.min()) / 10);
    let next: number;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = this.clampedValue() + step;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = this.clampedValue() - step;
        break;
      case 'PageUp':
        next = this.clampedValue() + bigStep;
        break;
      case 'PageDown':
        next = this.clampedValue() - bigStep;
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
    this.commitValue(next);
  }

  handlePointerDown(event: PointerEvent): void {
    if (this.isDisabled()) {
      return;
    }
    const track = this.trackEl()?.nativeElement;
    if (!track) {
      return;
    }

    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    this.dragging.set(true);
    this.updateFromPointer(event, track);
  }

  handlePointerMove(event: PointerEvent): void {
    if (!this.dragging() || this.isDisabled()) {
      return;
    }
    const track = this.trackEl()?.nativeElement;
    if (!track) {
      return;
    }
    this.updateFromPointer(event, track);
  }

  handlePointerUp(event: PointerEvent): void {
    if (!this.dragging()) {
      return;
    }
    (event.target as HTMLElement).releasePointerCapture?.(event.pointerId);
    this.dragging.set(false);
    this.onTouched();
  }

  handleBlur(): void {
    this.onTouched();
  }

  private updateFromPointer(event: PointerEvent, track: HTMLDivElement): void {
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const range = this.max() - this.min();
    const raw = this.min() + ratio * range;
    this.commitValue(raw);
  }

  private commitValue(raw: number): void {
    const step = this.step();
    const min = this.min();
    const max = this.max();
    const snapped = Math.round((raw - min) / step) * step + min;
    const clamped = Math.min(max, Math.max(min, snapped));
    const rounded = Number(clamped.toFixed(10));
    if (rounded === this.value()) {
      return;
    }
    this.value.set(rounded);
    this.onChange(rounded);
    this.changed.emit(rounded);
  }
}

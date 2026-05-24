import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Type,
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
import { LeftHalfStarIconComponent } from '../icons/left-half-star.component';
import { StarIconComponent } from '../icons/star.component';

/** Per-position render state, computed from the current display value. */
export type RatingStarState = 'empty' | 'half' | 'full';

/** Visual size of the rating. */
export type RatingSize = 'sm' | 'md' | 'lg';

/**
 * Star-based rating input. Supports whole-star or half-star granularity (via
 * `allowHalf`), hover preview, keyboard navigation (Left/Right/Up/Down,
 * Home/End, 0-9 to jump), and a read-only display mode.
 *
 * The default `<ea-icon-star>` can be swapped via the `iconClass` input
 * (any standalone Angular component reference, e.g. `[iconClass]="HeartIconComponent"`).
 * When `allowHalf` is true, the half-position render uses `halfIconClass`
 * (default `<ea-icon-left-half-star>`); if a consumer supplies their own
 * `iconClass` without a matching `halfIconClass`, the half is rendered with the
 * default left-half-star.
 *
 * Integrates with Angular forms via `ControlValueAccessor`. Emits the new
 * value through the `value` model (numeric 0..max in 1 or 0.5 increments).
 */
@Component({
  selector: 'ea-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AlertCircleIconComponent, NgClass, NgComponentOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
})
export class RatingComponent implements ControlValueAccessor {
  private readonly starsEl = viewChild<ElementRef<HTMLElement>>('starsEl');
  protected readonly i18n = inject(EagamiI18nService);

  readonly label = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  readonly size = input<RatingSize>('md');
  readonly max = input<number>(5);
  readonly allowHalf = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  /** Clicking the current value clears the rating back to 0. */
  readonly clearable = input<boolean>(true);
  /** Standalone component class rendered for empty / full positions. */
  readonly iconClass = input<Type<unknown>>(StarIconComponent);
  /** Standalone component class rendered for half positions (when `allowHalf` is true). */
  readonly halfIconClass = input<Type<unknown>>(LeftHalfStarIconComponent);
  readonly id = input<string>(`ea-rating-${Math.random().toString(36).slice(2, 9)}`);

  /** Current rating value, 0..max in 1 (or 0.5 when `allowHalf`) increments. */
  readonly value = model<number>(0);

  /** Fires when the user pre-selects a value via hover; `null` when the cursor leaves. */
  readonly hoverChanged = output<number | null>();

  protected readonly hoverValue = signal<number | null>(null);
  protected readonly isFocused = signal(false);
  private readonly _formDisabled = signal(false);

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  protected readonly isDisabled = computed(() => this.disabled() || this._formDisabled());
  protected readonly isInteractive = computed(
    () => !this.isDisabled() && !this.readonly(),
  );
  protected readonly hasError = computed(() => !!this.errorMsg());
  protected readonly showError = this.hasError;
  protected readonly showHint = computed(() => !!this.hint() && !this.hasError());
  protected readonly step = computed(() => (this.allowHalf() ? 0.5 : 1));

  /** Value used to render the stars (hover preview wins over committed value). */
  protected readonly displayValue = computed(() => this.hoverValue() ?? this.value());

  /** 1..max positions for the @for loop. */
  protected readonly positions = computed(() =>
    Array.from({ length: this.max() }, (_, i) => i + 1),
  );

  protected readonly hostClasses = computed(() => ({
    [`ea-rating-field--${this.size()}`]: true,
    'ea-rating-field--error': this.hasError(),
    'ea-rating-field--disabled': this.isDisabled(),
    'ea-rating-field--readonly': this.readonly(),
    'ea-rating-field--focused': this.isFocused(),
  }));

  protected readonly errorId = computed(() => `${this.id()}-error`);
  protected readonly hintId = computed(() => `${this.id()}-hint`);
  protected readonly describedBy = computed(() => {
    const ids: string[] = [];
    if (this.showError()) ids.push(this.errorId());
    if (this.showHint()) ids.push(this.hintId());
    return ids.length ? ids.join(' ') : null;
  });

  protected readonly resolvedAriaLabel = computed(
    () => this.label() ?? this.i18n.messages().rating.label,
  );

  // ----- View helpers ---------------------------------------------------------

  /** Resolves the render state for star `pos` against the current display value. */
  protected stateFor(pos: number): RatingStarState {
    const v = this.displayValue();
    if (v >= pos) return 'full';
    if (this.allowHalf() && v > pos - 1 && v < pos) return 'half';
    return 'empty';
  }

  /** Component class to instantiate for star `pos`. */
  protected iconForState(state: RatingStarState): Type<unknown> {
    return state === 'half' ? this.halfIconClass() : this.iconClass();
  }

  protected starAriaLabel(pos: number): string {
    return this.i18n.messages().rating.valueLabel(pos, this.max());
  }

  // ----- CVA ------------------------------------------------------------------

  writeValue(value: number | null | undefined): void {
    this.value.set(this.clamp(value ?? 0));
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

  // ----- Pointer handlers -----------------------------------------------------

  protected onPointerMove(event: PointerEvent, pos: number): void {
    if (!this.isInteractive()) return;
    this.hoverValue.set(this.computePointerValue(event, pos));
    this.hoverChanged.emit(this.hoverValue());
  }

  protected onPointerLeave(): void {
    if (this.hoverValue() === null) return;
    this.hoverValue.set(null);
    this.hoverChanged.emit(null);
  }

  protected onClick(event: MouseEvent, pos: number): void {
    if (!this.isInteractive()) return;
    const next = this.computePointerValue(event, pos);
    if (this.clearable() && next === this.value()) {
      this.commit(0);
    } else {
      this.commit(next);
    }
  }

  protected onFocus(): void {
    this.isFocused.set(true);
  }

  protected onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }

  // ----- Keyboard -------------------------------------------------------------

  protected onKeydown(event: KeyboardEvent): void {
    if (!this.isInteractive()) return;
    const step = this.step();
    const max = this.max();
    let next: number | null = null;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        next = Math.max(0, this.value() - step);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        next = Math.min(max, this.value() + step);
        break;
      case 'Home':
        next = step;
        break;
      case 'End':
        next = max;
        break;
      case 'Delete':
      case 'Backspace':
        next = 0;
        break;
      default:
        if (/^[0-9]$/.test(event.key)) {
          next = Math.min(max, Math.max(0, parseInt(event.key, 10)));
        }
    }

    if (next !== null) {
      event.preventDefault();
      this.commit(next);
    }
  }

  // ----- Internals ------------------------------------------------------------

  private commit(next: number): void {
    const clamped = this.clamp(next);
    if (clamped === this.value()) return;
    this.value.set(clamped);
    this.onChange(clamped);
  }

  private clamp(value: number): number {
    const max = this.max();
    const step = this.step();
    const snapped = Math.round(value / step) * step;
    return Math.min(max, Math.max(0, snapped));
  }

  private computePointerValue(event: { clientX: number }, pos: number): number {
    if (!this.allowHalf()) return pos;
    const target = (event as PointerEvent).target as HTMLElement | null;
    const rect = target?.getBoundingClientRect();
    if (!rect || rect.width === 0) return pos;
    const ratio = (event.clientX - rect.left) / rect.width;
    return ratio < 0.5 ? pos - 0.5 : pos;
  }
}

import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  type Type,
  computed,
  effect,
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
import { LeftHalfStarIconComponent } from '../icons/left-half-star.component';
import { StarIconComponent } from '../icons/star.component';
import { type EaSize } from '../sizes';
import { uniqueId } from '../unique-id';

/** Per-position render state, computed from the current display value. */
export type RatingStarState = 'empty' | 'half' | 'full';

/** Visual size of the rating. */
export type RatingSize = EaSize;

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
  imports: [FieldLabelComponent, FieldMessagesComponent, NgClass, NgComponentOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
})
export class RatingComponent implements ControlValueAccessor {
  constructor() {
    // Keep the value signal inside the [min, max] range even when set via
    // direct template binding (`[value]="0"` would otherwise bypass
    // `writeValue`'s clamp).
    effect(() => {
      const current = this.value();
      const clamped = this.clamp(current);
      if (clamped !== current) {
        this.value.set(clamped);
      }
    });
  }

  private readonly starsEl = viewChild<ElementRef<HTMLElement>>('starsEl');
  protected readonly i18n = inject(EagamiI18nService);

  readonly label = input<string | undefined>(undefined);
  /** Optional icon component rendered before the label text. */
  readonly labelIcon = input<Type<unknown> | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  /** Per-validator-key message overrides for a bound form control (e.g. `{ required: '...' }`). */
  readonly errorMessages = input<EaErrorMessages | undefined>(undefined);
  readonly size = input<RatingSize>('md');
  readonly min = input<number>(0);
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
  readonly id = input<string>(uniqueId('ea-rating'));

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
  private readonly errorState = injectControlErrorState({
    errorMsg: this.errorMsg,
    errorMessages: this.errorMessages,
  });
  protected readonly errorText = this.errorState.error;
  protected readonly hasError = this.errorState.hasError;
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
    if (this.showError()) {
      ids.push(this.errorId());
    }
    if (this.showHint()) {
      ids.push(this.hintId());
    }
    return ids.length ? ids.join(' ') : null;
  });

  protected readonly resolvedAriaLabel = computed(
    () => this.label() ?? this.i18n.messages().rating.label,
  );

  /** Resolves the render state for star `pos` against the current display value. */
  protected stateFor(pos: number): RatingStarState {
    const v = this.displayValue();
    if (v >= pos) {
      return 'full';
    }
    if (this.allowHalf() && v > pos - 1 && v < pos) {
      return 'half';
    }
    return 'empty';
  }

  /** Component class to instantiate for star `pos`. */
  protected iconForState(state: RatingStarState): Type<unknown> {
    return state === 'half' ? this.halfIconClass() : this.iconClass();
  }

  protected starAriaLabel(pos: number): string {
    return this.i18n.messages().rating.valueLabel(pos, this.max());
  }

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

  protected onPointerMove(event: PointerEvent, pos: number): void {
    if (!this.isInteractive()) {
      return;
    }
    // Clamp the hover preview to `min` so the user never sees a star preview
    // below the floor, matching what an Enter/click would actually commit.
    this.hoverValue.set(Math.max(this.min(), this.computePointerValue(event, pos)));
    this.hoverChanged.emit(this.hoverValue());
  }

  protected onPointerLeave(): void {
    if (this.hoverValue() === null) {
      return;
    }
    this.hoverValue.set(null);
    this.hoverChanged.emit(null);
  }

  protected onClick(event: MouseEvent, pos: number): void {
    if (!this.isInteractive()) {
      return;
    }
    const next = this.computePointerValue(event, pos);
    // Click-same-to-clear only applies when `min === 0`; with a non-zero
    // floor the clear-to-zero action is meaningless, so a re-click is a no-op
    // (just like ArrowDown can't lower past `min`).
    if (this.clearable() && this.min() === 0 && next === this.value()) {
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

  protected onKeydown(event: KeyboardEvent): void {
    if (!this.isInteractive()) {
      return;
    }
    const step = this.step();
    const min = this.min();
    const max = this.max();
    const rtl = isRtl(event.currentTarget as Element);
    const dec = (): number => Math.max(min, this.value() - step);
    const inc = (): number => Math.min(max, this.value() + step);
    let next: number | null = null;

    switch (event.key) {
      case 'ArrowDown':
        next = dec();
        break;
      case 'ArrowUp':
        next = inc();
        break;
      case 'ArrowLeft':
        next = rtl ? inc() : dec();
        break;
      case 'ArrowRight':
        next = rtl ? dec() : inc();
        break;
      case 'Home':
        next = Math.max(min, step);
        break;
      case 'End':
        next = max;
        break;
      case 'Delete':
      case 'Backspace':
        next = min;
        break;
      default:
        if (/^[0-9]$/.test(event.key)) {
          next = Math.min(max, Math.max(min, parseInt(event.key, 10)));
        }
    }

    if (next !== null) {
      event.preventDefault();
      this.commit(next);
    }
  }

  private commit(next: number): void {
    const clamped = this.clamp(next);
    if (clamped === this.value()) {
      return;
    }
    this.value.set(clamped);
    this.onChange(clamped);
  }

  private clamp(value: number): number {
    const min = this.min();
    const max = this.max();
    const step = this.step();
    const snapped = Math.round(value / step) * step;
    return Math.min(max, Math.max(min, snapped));
  }

  private computePointerValue(event: { clientX: number }, pos: number): number {
    if (!this.allowHalf()) {
      return pos;
    }
    const target = (event as PointerEvent).target as HTMLElement | null;
    const rect = target?.getBoundingClientRect();
    if (!rect || rect.width === 0) {
      return pos;
    }
    let ratio = (event.clientX - rect.left) / rect.width;
    if (target && isRtl(target)) {
      ratio = 1 - ratio;
    }
    return ratio < 0.5 ? pos - 0.5 : pos;
  }
}

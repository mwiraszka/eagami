import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  Injector,
  afterNextRender,
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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { EagamiI18nService } from '../i18n/i18n.service';
import { AlertCircleIconComponent } from '../icons/alert-circle.component';
import { DropletIconComponent } from '../icons/droplet.component';

/** Visual size of the color picker trigger. */
export type ColorPickerSize = 'sm' | 'md' | 'lg';
/** Format used to emit the selected value via `value` / `changed`. */
export type ColorPickerFormat = 'hex' | 'rgb' | 'hsl';
/** Which group of inputs the popover currently shows (hex string or RGB channels). */
export type ColorPickerInputMode = 'hex' | 'rgb';
/** Value accepted via `writeValue` — any CSS color string or `null`. */
export type ColorPickerValue = string | null;

interface Rgb {
  r: number;
  g: number;
  b: number;
}

interface Hsv {
  h: number;
  s: number;
  v: number;
}

// Minimal EyeDropper API typing — not yet in lib.dom.
interface EyeDropperResult {
  sRGBHex: string;
}
interface EyeDropperLike {
  open(): Promise<EyeDropperResult>;
}
type EyeDropperCtor = new () => EyeDropperLike;

const DEFAULT_PRESETS: readonly string[] = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
  '#000000',
  '#6b7280',
  '#ffffff',
];

/**
 * Popover color picker with a saturation/value gradient area, hue slider,
 * optional alpha slider, hex + RGB inputs, a configurable preset palette,
 * and an eyedropper (Chromium browsers). Integrates with Angular forms via
 * `ControlValueAccessor`. Accepts any CSS color string in `writeValue`.
 */
@Component({
  selector: 'ea-color-picker',
  imports: [AlertCircleIconComponent, DropletIconComponent, NgClass],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true,
    },
  ],
})
export class ColorPickerComponent implements ControlValueAccessor {
  private readonly hostEl = viewChild<ElementRef<HTMLElement>>('hostEl');
  private readonly triggerEl = viewChild<ElementRef<HTMLButtonElement>>('triggerEl');
  private readonly popoverEl = viewChild<ElementRef<HTMLDivElement>>('popoverEl');
  private readonly svAreaEl = viewChild<ElementRef<HTMLDivElement>>('svAreaEl');
  private readonly hueTrackEl = viewChild<ElementRef<HTMLDivElement>>('hueTrackEl');
  private readonly alphaTrackEl = viewChild<ElementRef<HTMLDivElement>>('alphaTrackEl');
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly i18n = inject(EagamiI18nService);

  readonly label = input<string | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly size = input<ColorPickerSize>('md');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  /** Whether to show the alpha slider. When `false` the emitted value always has alpha = 1. */
  readonly showAlpha = input<boolean>(true);
  /** Output format for emitted values. */
  readonly format = input<ColorPickerFormat>('hex');
  /** Preset swatches shown at the bottom of the popover. Pass an empty array to hide. */
  readonly presets = input<readonly string[]>(DEFAULT_PRESETS);
  readonly id = input<string>(
    `ea-color-picker-${Math.random().toString(36).slice(2, 9)}`,
  );

  readonly value = model<string | null>(null);

  /** Fires with the new color string whenever the selection changes. */
  readonly changed = output<string | null>();

  readonly isOpen = signal(false);
  private readonly hue = signal(0);
  private readonly sat = signal(0);
  private readonly val = signal(0);
  private readonly alpha = signal(1);
  /** Tracks the active drag target so pointermove can route correctly. */
  private readonly dragging = signal<'sv' | 'hue' | 'alpha' | null>(null);
  /** Which input row is visible (hex string or RGB channels). Toggles via the
   * format button. Independent of the `format` input, which only controls the
   * emitted value. */
  readonly inputMode = signal<ColorPickerInputMode>('hex');
  /** What the hex input shows. Kept separate from the canonical hex so the user
   * can type a partial value (`#1`, `#12`, `#123…`) without each keystroke being
   * expanded back into a 6-digit canonical form. */
  readonly hexInputValue = signal('');
  /** Pixel position of the popover when open. Calculated from the trigger's
   * bounding rect so the popover can use `position: fixed` and escape any
   * ancestor with `overflow: hidden`. */
  readonly popoverPosition = signal<{ top: number; left: number } | null>(null);
  private readonly _formDisabled = signal(false);

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  readonly isDisabled = computed(() => this.disabled() || this._formDisabled());

  readonly hasError = computed(() => !!this.errorMsg());
  readonly showError = this.hasError;
  readonly showHint = computed(() => !!this.hint() && !this.hasError());

  readonly rgb = computed<Rgb>(() => hsvToRgb(this.hue(), this.sat(), this.val()));

  readonly displayColor = computed(() => {
    const { r, g, b } = this.rgb();
    return `rgba(${r}, ${g}, ${b}, ${this.alpha()})`;
  });

  /** Opaque version of the current color — used as the hue/SV reference. */
  readonly opaqueColor = computed(() => {
    const { r, g, b } = this.rgb();
    return `rgb(${r}, ${g}, ${b})`;
  });

  readonly hueColor = computed(() => {
    const { r, g, b } = hsvToRgb(this.hue(), 1, 1);
    return `rgb(${r}, ${g}, ${b})`;
  });

  readonly hexDisplay = computed(() =>
    rgbaToHex(this.rgb(), this.alpha(), this.showAlpha()),
  );

  readonly displayValue = computed(() => {
    if (this.value() === null) return '';
    return formatColor(this.rgb(), this.alpha(), this.format(), this.showAlpha());
  });

  readonly resolvedPlaceholder = computed(
    () => this.placeholder() ?? this.i18n.messages().colorPicker.placeholder,
  );

  readonly triggerClasses = computed(() => ({
    [`ea-color-picker__trigger--${this.size()}`]: true,
    'ea-color-picker__trigger--error': this.hasError(),
    'ea-color-picker__trigger--open': this.isOpen(),
    'ea-color-picker__trigger--disabled': this.isDisabled(),
  }));

  /** True when the browser supports the EyeDropper API. */
  readonly hasEyeDropper = computed(() => {
    if (typeof window === 'undefined') return false;
    return (
      typeof (window as unknown as { EyeDropper?: EyeDropperCtor }).EyeDropper ===
      'function'
    );
  });

  constructor() {
    // When the popover opens, anchor it to the trigger using `position: fixed`
    // coordinates so it escapes any ancestor with `overflow: hidden` (a common
    // gotcha in scrollable content panels — same pattern as `<ea-dropdown>`).
    // After the popover renders we measure it and, if it would overflow the
    // viewport bottom, flip it above the trigger (or clamp against the top
    // edge when neither direction fits — better than getting trapped below
    // the fold with no way to scroll, which the page-scroll wouldn't reach
    // because the popover itself is fixed).
    effect(() => {
      const trigger = this.triggerEl()?.nativeElement;
      if (!trigger || !this.isOpen()) {
        this.popoverPosition.set(null);
        return;
      }
      const rect = trigger.getBoundingClientRect();
      this.popoverPosition.set({ top: rect.bottom + 4, left: rect.left });
      // Re-measure once the popover has actually rendered so we know its height.
      afterNextRender(() => this.clampPopoverToViewport(), { injector: this.injector });
    });

    // Close the popover on scroll / resize rather than try to track the trigger
    // — same pattern as `<ea-dropdown>`. SSR-guarded because the website
    // prerenders pages that render this component.
    if (typeof window !== 'undefined') {
      const closeOnViewportChange = (): void => {
        if (this.isOpen()) this.close();
      };
      window.addEventListener('scroll', closeOnViewportChange, {
        capture: true,
        passive: true,
      });
      window.addEventListener('resize', closeOnViewportChange);
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', closeOnViewportChange, { capture: true });
        window.removeEventListener('resize', closeOnViewportChange);
      });
    }
  }

  // ─── ControlValueAccessor ─────────────────────────────────────────────
  writeValue(val: ColorPickerValue): void {
    if (!val) {
      this.value.set(null);
      this.hue.set(0);
      this.sat.set(0);
      this.val.set(0);
      this.alpha.set(1);
      this.hexInputValue.set('');
      return;
    }
    const parsed = parseColor(val);
    if (!parsed) return;
    this.applyRgba(parsed.r, parsed.g, parsed.b, parsed.a, false);
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

  // ─── Open / close ─────────────────────────────────────────────────────
  toggle(): void {
    if (this.isDisabled() || this.readonly()) return;
    if (this.isOpen()) this.close();
    else this.open();
  }

  open(): void {
    if (this.isDisabled() || this.readonly()) return;
    this.isOpen.set(true);
    // `preventScroll: true` — see the matching note in `ea-menu` for why:
    // focusing inside a `position: fixed` popover nested under a sticky/scrolled
    // ancestor otherwise nudges the document scroll position toward the trigger.
    afterNextRender(() => this.svAreaEl()?.nativeElement.focus({ preventScroll: true }), {
      injector: this.injector,
    });
  }

  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.dragging.set(null);
    this.onTouched();
  }

  focus(): void {
    this.triggerEl()?.nativeElement.focus();
  }

  clear(event: Event): void {
    event.stopPropagation();
    if (this.isDisabled() || this.readonly()) return;
    this.value.set(null);
    this.hue.set(0);
    this.sat.set(0);
    this.val.set(0);
    this.alpha.set(1);
    this.hexInputValue.set('');
    this.onChange(null);
    this.onTouched();
    this.changed.emit(null);
  }

  // ─── Position helpers exposed to the template ─────────────────────────
  readonly svPointerLeft = computed(() => `${this.sat() * 100}%`);
  readonly svPointerTop = computed(() => `${(1 - this.val()) * 100}%`);
  readonly huePointerLeft = computed(() => `${(this.hue() / 360) * 100}%`);
  readonly alphaPointerLeft = computed(() => `${this.alpha() * 100}%`);
  readonly hueRounded = computed(() => Math.round(this.hue()));
  readonly alphaPercentRounded = computed(() => Math.round(this.alpha() * 100));

  // ─── SV area interaction ──────────────────────────────────────────────
  onSvPointerDown(event: PointerEvent): void {
    if (this.isDisabled() || this.readonly()) return;
    const target = event.target as HTMLElement;
    target.setPointerCapture?.(event.pointerId);
    this.dragging.set('sv');
    this.updateSvFromPointer(event);
  }

  onSvPointerMove(event: PointerEvent): void {
    if (this.dragging() !== 'sv') return;
    this.updateSvFromPointer(event);
  }

  onSvPointerUp(event: PointerEvent): void {
    if (this.dragging() !== 'sv') return;
    (event.target as HTMLElement).releasePointerCapture?.(event.pointerId);
    this.dragging.set(null);
  }

  onSvKeydown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.readonly()) return;
    const step = event.shiftKey ? 0.1 : 0.01;
    let s = this.sat();
    let v = this.val();
    switch (event.key) {
      case 'ArrowLeft':
        s -= step;
        break;
      case 'ArrowRight':
        s += step;
        break;
      case 'ArrowUp':
        v += step;
        break;
      case 'ArrowDown':
        v -= step;
        break;
      case 'Home':
        s = 0;
        break;
      case 'End':
        s = 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    this.applyHsv(this.hue(), clamp01(s), clamp01(v));
  }

  private updateSvFromPointer(event: PointerEvent): void {
    const area = this.svAreaEl()?.nativeElement;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const x = clamp01((event.clientX - rect.left) / rect.width);
    const y = clamp01((event.clientY - rect.top) / rect.height);
    this.applyHsv(this.hue(), x, 1 - y);
  }

  // ─── Hue strip interaction ────────────────────────────────────────────
  onHuePointerDown(event: PointerEvent): void {
    if (this.isDisabled() || this.readonly()) return;
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    this.dragging.set('hue');
    this.updateHueFromPointer(event);
  }

  onHuePointerMove(event: PointerEvent): void {
    if (this.dragging() !== 'hue') return;
    this.updateHueFromPointer(event);
  }

  onHuePointerUp(event: PointerEvent): void {
    if (this.dragging() !== 'hue') return;
    (event.target as HTMLElement).releasePointerCapture?.(event.pointerId);
    this.dragging.set(null);
  }

  onHueKeydown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.readonly()) return;
    const step = event.shiftKey ? 10 : 1;
    let h = this.hue();
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        h -= step;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        h += step;
        break;
      case 'Home':
        h = 0;
        break;
      case 'End':
        h = 360;
        break;
      default:
        return;
    }
    event.preventDefault();
    this.applyHsv(((h % 360) + 360) % 360, this.sat(), this.val());
  }

  private updateHueFromPointer(event: PointerEvent): void {
    const track = this.hueTrackEl()?.nativeElement;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = clamp01((event.clientX - rect.left) / rect.width);
    this.applyHsv(ratio * 360, this.sat(), this.val());
  }

  // ─── Alpha strip interaction ──────────────────────────────────────────
  onAlphaPointerDown(event: PointerEvent): void {
    if (this.isDisabled() || this.readonly()) return;
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    this.dragging.set('alpha');
    this.updateAlphaFromPointer(event);
  }

  onAlphaPointerMove(event: PointerEvent): void {
    if (this.dragging() !== 'alpha') return;
    this.updateAlphaFromPointer(event);
  }

  onAlphaPointerUp(event: PointerEvent): void {
    if (this.dragging() !== 'alpha') return;
    (event.target as HTMLElement).releasePointerCapture?.(event.pointerId);
    this.dragging.set(null);
  }

  onAlphaKeydown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.readonly()) return;
    const step = event.shiftKey ? 0.1 : 0.01;
    let a = this.alpha();
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        a -= step;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        a += step;
        break;
      case 'Home':
        a = 0;
        break;
      case 'End':
        a = 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    this.alpha.set(clamp01(a));
    this.commit();
  }

  private updateAlphaFromPointer(event: PointerEvent): void {
    const track = this.alphaTrackEl()?.nativeElement;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = clamp01((event.clientX - rect.left) / rect.width);
    this.alpha.set(ratio);
    this.commit();
  }

  // ─── Hex / RGB text inputs ────────────────────────────────────────────
  /**
   * Mirrors the user's literal text into `hexInputValue` and (if the text
   * parses) applies the new color silently — without rewriting the input.
   * Without `refreshHex: false`, typing `#123` would parse, commit, and then
   * snap the input back to `#112233` mid-keystroke, fighting the user's caret.
   * Canonicalization happens only on blur via {@link onHexBlur}.
   */
  onHexInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    this.hexInputValue.set(raw);
    const parsed = parseColor(raw.startsWith('#') ? raw : `#${raw}`);
    if (parsed) {
      this.applyRgba(parsed.r, parsed.g, parsed.b, parsed.a, true, false);
    }
  }

  onHexBlur(): void {
    // Reset the partial text to the canonical hex of the current color.
    this.hexInputValue.set(this.hexDisplay());
    this.onTouched();
  }

  onRgbInput(channel: 'r' | 'g' | 'b', event: Event): void {
    const input = event.target as HTMLInputElement;
    // Truncate to 3 digits — matches `maxlength` on the input. type="text"
    // doesn't enforce maxlength on programmatic value sets so we re-clamp
    // here defensively.
    if (input.value.length > 3) input.value = input.value.slice(0, 3);
    const raw = parseInt(input.value, 10);
    if (Number.isNaN(raw)) return;
    const v = Math.max(0, Math.min(255, raw));
    const next = { ...this.rgb(), [channel]: v };
    this.applyRgba(next.r, next.g, next.b, this.alpha(), true);
  }

  /** Cycles the input row between hex string and RGB channels. */
  cycleInputMode(): void {
    this.inputMode.update(m => (m === 'hex' ? 'rgb' : 'hex'));
  }

  onAlphaInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 3) input.value = input.value.slice(0, 3);
    const raw = parseInt(input.value, 10);
    if (Number.isNaN(raw)) return;
    const next = Math.max(0, Math.min(100, raw)) / 100;
    this.alpha.set(next);
    this.commit();
  }

  // ─── Eyedropper ───────────────────────────────────────────────────────
  async pickFromScreen(): Promise<void> {
    if (this.isDisabled() || this.readonly() || !this.hasEyeDropper()) return;
    const Ctor = (window as unknown as { EyeDropper: EyeDropperCtor }).EyeDropper;
    const dropper = new Ctor();
    try {
      const result = await dropper.open();
      const parsed = parseColor(result.sRGBHex);
      if (parsed) this.applyRgba(parsed.r, parsed.g, parsed.b, this.alpha(), true);
    } catch {
      // User cancelled — no-op.
    }
  }

  // ─── Preset swatches ──────────────────────────────────────────────────
  selectPreset(hex: string): void {
    if (this.isDisabled() || this.readonly()) return;
    const parsed = parseColor(hex);
    if (!parsed) return;
    this.applyRgba(parsed.r, parsed.g, parsed.b, parsed.a, true);
  }

  // ─── Trigger keyboard ─────────────────────────────────────────────────
  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        event.preventDefault();
        this.open();
        break;
    }
  }

  onPopoverKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      this.triggerEl()?.nativeElement.focus({ preventScroll: true });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isOpen()) return;
    const host = this.hostEl()?.nativeElement;
    if (host && !host.contains(event.target as Node)) this.close();
  }

  /**
   * Repositions the popover when it would extend past the viewport edges.
   * Prefers flipping above the trigger when there's more room there, then
   * clamps so the popover always has a small margin from the viewport edges.
   */
  private clampPopoverToViewport(): void {
    const popover = this.popoverEl()?.nativeElement;
    const trigger = this.triggerEl()?.nativeElement;
    const current = this.popoverPosition();
    if (!popover || !trigger || !current) return;

    const margin = 8;
    const triggerRect = trigger.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const viewportW = window.innerWidth;

    let top = current.top;
    const overflowsBottom = top + popoverRect.height > viewportH - margin;
    const roomAbove = triggerRect.top - margin;
    if (overflowsBottom && roomAbove >= popoverRect.height + 4) {
      top = triggerRect.top - popoverRect.height - 4;
    } else if (overflowsBottom) {
      top = Math.max(margin, viewportH - popoverRect.height - margin);
    }

    const left = Math.max(
      margin,
      Math.min(current.left, viewportW - popoverRect.width - margin),
    );

    if (top !== current.top || left !== current.left) {
      this.popoverPosition.set({ top, left });
    }
  }

  // ─── Internal: applying state and committing ──────────────────────────
  private applyHsv(h: number, s: number, v: number): void {
    this.hue.set(h);
    this.sat.set(s);
    this.val.set(v);
    this.commit();
  }

  private applyRgba(
    r: number,
    g: number,
    b: number,
    a: number,
    commit: boolean,
    refreshHex = true,
  ): void {
    const hsv = rgbToHsv(r, g, b);
    // Preserve current hue when the new color is achromatic (sat = 0).
    this.hue.set(hsv.s === 0 ? this.hue() : hsv.h);
    this.sat.set(hsv.s);
    this.val.set(hsv.v);
    this.alpha.set(a);
    if (commit) this.commit(refreshHex);
    else if (refreshHex) this.refreshHexInput();
  }

  private commit(refreshHex = true): void {
    const out = formatColor(this.rgb(), this.alpha(), this.format(), this.showAlpha());
    if (refreshHex) this.refreshHexInput();
    if (out === this.value()) return;
    this.value.set(out);
    this.onChange(out);
    this.changed.emit(out);
  }

  private refreshHexInput(): void {
    this.hexInputValue.set(this.hexDisplay());
  }
}

// ─── Pure color helpers (module-private) ──────────────────────────────────

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

function hsvToRgb(h: number, s: number, v: number): Rgb {
  const c = v * s;
  const hh = (h / 60) % 6;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  const [r, g, b] = sectorToRgb(hh, c, x);
  const m = v - c;
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function sectorToRgb(hh: number, c: number, x: number): [number, number, number] {
  if (hh < 1) return [c, x, 0];
  if (hh < 2) return [x, c, 0];
  if (hh < 3) return [0, c, x];
  if (hh < 4) return [0, x, c];
  if (hh < 5) return [x, 0, c];
  return [c, 0, x];
}

function rgbToHsv(r: number, g: number, b: number): Hsv {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  return { h, s, v: max };
}

function rgbToHsl({ r, g, b }: Rgb): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s, l };
}

function rgbaToHex({ r, g, b }: Rgb, a: number, includeAlpha: boolean): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  const base = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  if (!includeAlpha || a >= 1) return base;
  return `${base}${toHex(Math.round(a * 255))}`;
}

function formatColor(
  rgb: Rgb,
  alpha: number,
  format: ColorPickerFormat,
  includeAlpha: boolean,
): string {
  switch (format) {
    case 'rgb':
      return includeAlpha && alpha < 1
        ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Number(alpha.toFixed(2))})`
        : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    case 'hsl': {
      const { h, s, l } = rgbToHsl(rgb);
      const hh = Math.round(h);
      const ss = Math.round(s * 100);
      const ll = Math.round(l * 100);
      return includeAlpha && alpha < 1
        ? `hsla(${hh}, ${ss}%, ${ll}%, ${Number(alpha.toFixed(2))})`
        : `hsl(${hh}, ${ss}%, ${ll}%)`;
    }
    case 'hex':
    default:
      return rgbaToHex(rgb, alpha, includeAlpha);
  }
}

function parseColor(input: string): (Rgb & { a: number }) | null {
  const value = input.trim();
  if (!value) return null;
  const hex = parseHex(value);
  if (hex) return hex;
  const rgb = parseRgbFunc(value);
  if (rgb) return rgb;
  const hsl = parseHslFunc(value);
  if (hsl) return hsl;
  return parseViaCanvas(value);
}

function parseHex(value: string): (Rgb & { a: number }) | null {
  const m = /^#?([0-9a-f]{3,8})$/i.exec(value);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3 || h.length === 4) {
    h = h
      .split('')
      .map(c => c + c)
      .join('');
  }
  if (h.length !== 6 && h.length !== 8) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

function parseRgbFunc(value: string): (Rgb & { a: number }) | null {
  const m = /^rgba?\(([^)]+)\)$/i.exec(value);
  if (!m) return null;
  const parts = m[1].split(/[,\s/]+/).filter(Boolean);
  if (parts.length < 3) return null;
  const r = clampByte(parseFloat(parts[0]));
  const g = clampByte(parseFloat(parts[1]));
  const b = clampByte(parseFloat(parts[2]));
  const a = parts[3] !== undefined ? clampAlpha(parts[3]) : 1;
  if ([r, g, b].some(Number.isNaN)) return null;
  return { r, g, b, a };
}

function parseHslFunc(value: string): (Rgb & { a: number }) | null {
  const m = /^hsla?\(([^)]+)\)$/i.exec(value);
  if (!m) return null;
  const parts = m[1].split(/[,\s/]+/).filter(Boolean);
  if (parts.length < 3) return null;
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;
  const a = parts[3] !== undefined ? clampAlpha(parts[3]) : 1;
  if ([h, s, l].some(Number.isNaN)) return null;
  const rgb = hslToRgb(h, s, l);
  return { ...rgb, a };
}

function parseViaCanvas(value: string): (Rgb & { a: number }) | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.fillStyle = '#000';
  const before = ctx.fillStyle;
  ctx.fillStyle = value;
  if (
    ctx.fillStyle === before &&
    value.toLowerCase() !== '#000000' &&
    value.toLowerCase() !== 'black'
  ) {
    return null;
  }
  ctx.fillRect(0, 0, 1, 1);
  const data = ctx.getImageData(0, 0, 1, 1).data;
  return { r: data[0], g: data[1], b: data[2], a: data[3] / 255 };
}

function hslToRgb(h: number, s: number, l: number): Rgb {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hh = (h / 60) % 6;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  const [r, g, b] = sectorToRgb(hh, c, x);
  const m = l - c / 2;
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function clampByte(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function clampAlpha(value: string): number {
  if (value.endsWith('%')) return clamp01(parseFloat(value) / 100);
  return clamp01(parseFloat(value));
}

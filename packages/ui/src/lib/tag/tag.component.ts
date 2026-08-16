import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  type ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { XIconComponent } from '../icons/x.component';
import { readableInk } from '../palette/contrast';
import { type EaSize } from '../sizes';
import { TooltipDirective, type TooltipPosition } from '../tooltip/tooltip.directive';
import { isTruncated } from '../truncation';

/** Semantic colour scheme of a tag. */
export type TagVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
/** Visual size of a tag. */
export type TagSize = EaSize;
/** Where a clipped label reveals its full text, or `none` to suppress it. */
export type TagTooltip = 'above' | 'below' | 'none';

/**
 * Inline label commonly used to represent filters, categories, or selected
 * items. When `removable`, renders a close button that emits `removed`; the
 * accessible name of that button is configurable via `removeLabel` and
 * otherwise falls back to the active locale's translation.
 *
 * The projected label is capped by `maxWidth` (or the `--ea-tag-max-width`
 * custom property) and ellipsizes rather than widening the chip, revealing its
 * full text in a tooltip while it is clipped.
 */
@Component({
  selector: 'ea-tag',
  imports: [NgClass, TooltipDirective, XIconComponent],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TagComponent {
  private readonly i18n = inject(EagamiI18nService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly labelEl = viewChild<ElementRef<HTMLElement>>('labelEl');

  readonly variant = input<TagVariant>('default');
  readonly size = input<TagSize>('md');
  readonly removable = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly removeLabel = input<string | undefined>(undefined);
  /**
   * Widest the chip may grow: a number of px, or any CSS length for a chip that
   * has to give way to its container (`'100%'` in a responsive grid cell).
   * Also settable in CSS as `--ea-tag-max-width`, which this input overrides.
   */
  readonly maxWidth = input<number | string | undefined>(200);
  /**
   * Fill colour as a hex value, for a tag carrying a colour of its own (a
   * user-chosen label). Paints the chip and its border, and picks whichever ink
   * reads better on it. Takes precedence over `variant`.
   */
  readonly color = input<string | undefined>(undefined);
  /**
   * Where a label clipped by `maxWidth` reveals its full text. Set `none` for
   * a tag rendered inside a tooltip, which would otherwise stack a second
   * bubble over the first.
   */
  readonly tooltip = input<TagTooltip>('above');
  /**
   * Whether the remove button is a tab stop. Set `false` inside a composite
   * widget (a combobox trigger, a grid cell) whose own keyboard model owns
   * navigation, since roles like `combobox` forbid focusable descendants.
   */
  readonly removeTabbable = input<boolean>(true);

  /** Fires when the user activates the remove button on a `removable` tag. */
  readonly removed = output<void>();

  /** Full label text, held only while the rendered label is clipped. */
  private readonly clippedText = signal('');

  /** Accessible label for the remove button, falling back to the active locale. */
  readonly resolvedRemoveLabel = computed(
    () => this.removeLabel() ?? this.i18n.messages().tag.remove,
  );

  /** Tooltip text for the label; empty suppresses the bubble entirely. */
  protected readonly labelTooltip = computed(() =>
    this.tooltip() === 'none' ? '' : this.clippedText(),
  );

  protected readonly tooltipPosition = computed<TooltipPosition>(() =>
    this.tooltip() === 'below' ? 'bottom' : 'top',
  );

  readonly hostClasses = computed(() => ({
    [`ea-tag--${this.variant()}`]: true,
    [`ea-tag--${this.size()}`]: true,
    'ea-tag--disabled': this.disabled(),
  }));

  /** `maxWidth` as a CSS length; a bare number is px, as the input documents. */
  protected readonly resolvedMaxWidth = computed(() => {
    const max = this.maxWidth();
    if (max === undefined || max === null) {
      return null;
    }
    return typeof max === 'number' ? `${max}px` : max;
  });

  /** Ink that reads on `color`, or `null` when it is not a hex the library can measure. */
  protected readonly resolvedInk = computed(() => {
    const color = this.color();
    if (!color) {
      return null;
    }
    const ink = readableInk(color);
    return ink === null ? null : `var(--color-neutral-${ink === 'light' ? '0' : '950'})`;
  });

  constructor() {
    afterNextRender(() => this.watchLabel());
  }

  onRemove(event: MouseEvent): void {
    event.stopPropagation();
    this.removed.emit();
  }

  /**
   * Keeps `clippedText` in step with the rendered label. Size and text are
   * watched separately because a capped chip holds its width when the text
   * behind the ellipsis changes, so a resize alone would leave stale text.
   */
  private watchLabel(): void {
    const el = this.labelEl()?.nativeElement;
    if (!el) {
      return;
    }
    const measure = () =>
      this.clippedText.set(isTruncated(el) ? (el.textContent ?? '').trim() : '');
    measure();

    if (typeof ResizeObserver !== 'undefined') {
      const resize = new ResizeObserver(measure);
      resize.observe(el);
      this.destroyRef.onDestroy(() => resize.disconnect());
    }
    if (typeof MutationObserver !== 'undefined') {
      const mutation = new MutationObserver(measure);
      mutation.observe(el, { characterData: true, childList: true, subtree: true });
      this.destroyRef.onDestroy(() => mutation.disconnect());
    }
  }
}

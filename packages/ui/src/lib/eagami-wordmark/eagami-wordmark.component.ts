import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { EagamiIconComponent } from '../icons/eagami.component';

/** Content variant: `default` is the bare wordmark, `byline` adds the handcrafted-by line, `tagline` adds the tagline. */
export type EagamiWordmarkVariant = 'default' | 'byline' | 'tagline';
/** @deprecated Numeric variants (1, 2, 3) alias `default`/`byline`/`tagline`. Removed in v3.0.0. */
export type EagamiWordmarkVariantLegacy = 1 | 2 | 3;
/** Layout of the wordmark: `stacked` for multi-line, `inline` for a single line with em-dash separators. */
export type EagamiWordmarkLayout = 'stacked' | 'inline';

/**
 * Branded eagami wordmark logo. Scales continuously from a single `size`
 * pixel value and supports three content variants paired with stacked or
 * inline layouts.
 */
@Component({
  selector: 'ea-eagami-wordmark',
  imports: [EagamiIconComponent],
  templateUrl: './eagami-wordmark.component.html',
  styleUrl: './eagami-wordmark.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--_size]': 'resolvedSize()',
  },
})
export class EagamiWordmarkComponent {
  protected readonly i18n = inject(EagamiI18nService);

  /**
   * Content variant. The numeric values `1`/`2`/`3` are accepted as deprecated
   * aliases for `default`/`byline`/`tagline` and are removed in v3.0.0.
   */
  readonly variant = input<EagamiWordmarkVariant | EagamiWordmarkVariantLegacy>(
    'default',
  );
  readonly layout = input<EagamiWordmarkLayout>('stacked');
  readonly size = input<number>(100);

  /** Collapses the deprecated numeric variants to the string form. */
  private readonly resolvedVariant = computed<EagamiWordmarkVariant>(() => {
    const variant = this.variant();
    switch (variant) {
      case 1:
        return 'default';
      case 2:
        return 'byline';
      case 3:
        return 'tagline';
      default:
        return variant;
    }
  });

  /** Clamps size to a 10px floor and falls back to the default when cleared. */
  protected readonly resolvedSize = computed<number>(() => {
    const raw = this.size();
    const value = typeof raw === 'number' ? raw : Number(raw);
    if (!Number.isFinite(value) || value <= 0) {
      return 100;
    }
    return Math.max(10, value);
  });

  protected readonly showOverline = computed(() => this.resolvedVariant() === 'byline');

  protected readonly showTagline = computed(() => this.resolvedVariant() === 'tagline');

  protected readonly brandText = computed(() => 'eagami');

  // The brand name itself stays untranslated; only the descriptive overline
  // and tagline localize.
  protected readonly ariaLabel = computed(() => {
    const messages = this.i18n.messages().wordmark;
    switch (this.resolvedVariant()) {
      case 'default':
        return 'eagami';
      case 'byline':
        return `${messages.overline} eagami`;
      case 'tagline':
        return `eagami — ${messages.tagline}`;
    }
  });
}

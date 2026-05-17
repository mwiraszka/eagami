import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { EagamiI18nService } from '../i18n/i18n.service';
import { EagamiIconComponent } from '../icons/eagami.component';

/** Variant of the wordmark: 1 is "eagami", 2 is "handcrafted by eagami", 3 is "eagami" with tagline. */
export type EagamiWordmarkVariant = 1 | 2 | 3;
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
    '[style.--_size]': 'size()',
  },
})
export class EagamiWordmarkComponent {
  protected readonly i18n = inject(EagamiI18nService);

  /**
   * The wordmark variant to render. `4` is accepted as a backwards-compatible
   * alias for `3` after the original "eagami design system" variant (the old
   * `3`) was retired in v1.3.0; it renders identically to `3` and will be
   * removed in v2.0.0.
   */
  readonly variant = input<EagamiWordmarkVariant | 4>(1);
  readonly layout = input<EagamiWordmarkLayout>('stacked');
  readonly size = input<number>(32);

  /* Collapse the deprecated `4` alias to `3` once so every downstream computed
     can switch on `EagamiWordmarkVariant` without re-handling the alias. */
  private readonly resolvedVariant = computed<EagamiWordmarkVariant>(() => {
    const v = this.variant();
    return v === 4 ? 3 : v;
  });

  protected readonly showOverline = computed(() => this.resolvedVariant() === 2);

  protected readonly showTagline = computed(() => this.resolvedVariant() === 3);

  protected readonly brandText = computed(() => 'eagami');

  // The brand name itself stays untranslated; only the descriptive overline
  // and tagline localize.
  protected readonly ariaLabel = computed(() => {
    const messages = this.i18n.messages().wordmark;
    switch (this.resolvedVariant()) {
      case 1:
        return 'eagami';
      case 2:
        return `${messages.overline} eagami`;
      case 3:
        return `eagami — ${messages.tagline}`;
    }
  });
}

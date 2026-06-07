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

  /** The wordmark variant to render. */
  readonly variant = input<EagamiWordmarkVariant>(1);
  readonly layout = input<EagamiWordmarkLayout>('stacked');
  readonly size = input<number>(32);

  protected readonly showOverline = computed(() => this.variant() === 2);

  protected readonly showTagline = computed(() => this.variant() === 3);

  protected readonly brandText = computed(() => 'eagami');

  // The brand name itself stays untranslated; only the descriptive overline
  // and tagline localize.
  protected readonly ariaLabel = computed(() => {
    const messages = this.i18n.messages().wordmark;
    switch (this.variant()) {
      case 1:
        return 'eagami';
      case 2:
        return `${messages.overline} eagami`;
      case 3:
        return `eagami — ${messages.tagline}`;
    }
  });
}

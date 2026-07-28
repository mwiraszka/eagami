import { NgTemplateOutlet } from '@angular/common';
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
/** Layout of the wordmark: `stacked` for multi-line, `inline` for a single line with em-dash separators. */
export type EagamiWordmarkLayout = 'stacked' | 'inline';

/**
 * Branded eagami wordmark logo. `size` is the brand text's font-size in px
 * and the rest of the lockup scales proportionally from it; supports three
 * content variants paired with stacked or inline layouts.
 */
@Component({
  selector: 'ea-eagami-wordmark',
  imports: [EagamiIconComponent, NgTemplateOutlet],
  templateUrl: './eagami-wordmark.component.html',
  styleUrl: './eagami-wordmark.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // The wordmark is a fixed brand lockup; it never mirrors with UI direction
    dir: 'ltr',
    '[style.--_size]': 'resolvedSize()',
  },
})
export class EagamiWordmarkComponent {
  protected readonly i18n = inject(EagamiI18nService);

  /** Content variant. */
  readonly variant = input<EagamiWordmarkVariant>('default');
  readonly layout = input<EagamiWordmarkLayout>('stacked');
  readonly size = input<number>(24);

  /** Renders the wordmark as a link to eagami.com; disable to embed it inside a custom link or static context. */
  readonly linked = input<boolean>(true);

  /** Clamps size to a 10px floor and falls back to the default when cleared. */
  protected readonly resolvedSize = computed<number>(() => {
    const raw = this.size();
    const value = typeof raw === 'number' ? raw : Number(raw);
    if (!Number.isFinite(value) || value <= 0) {
      return 24;
    }
    return Math.max(10, value);
  });

  protected readonly showOverline = computed(() => this.variant() === 'byline');

  protected readonly showTagline = computed(() => this.variant() === 'tagline');

  protected readonly brandText = computed(() => 'eagami');

  // The brand name itself stays untranslated; only the descriptive overline
  // and tagline localize.
  protected readonly ariaLabel = computed(() => {
    const messages = this.i18n.messages().wordmark;
    switch (this.variant()) {
      case 'default':
        return 'eagami';
      case 'byline':
        return `${messages.overline} eagami`;
      case 'tagline':
        return `eagami — ${messages.tagline}`;
    }
  });
}

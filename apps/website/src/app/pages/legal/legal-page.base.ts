import { Directive, computed, effect, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

/** Bump when either page's text materially changes. */
const LAST_UPDATED = new Date(2026, 7, 2);

/** Shared wiring for the privacy and terms pages, which differ only in their prose. */
@Directive()
export abstract class LegalPageBase {
  protected abstract readonly section: 'privacy' | 'terms';

  private readonly metaAndTitleService = inject(MetaAndTitleService);
  protected readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;

  // Rendered in the reader's language rather than pinned to an English string
  protected readonly lastUpdated = computed(() =>
    new Intl.DateTimeFormat(this.i18n.locale(), {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(LAST_UPDATED),
  );

  constructor() {
    effect(() => {
      const m = this.messages()[this.section];
      this.metaAndTitleService.updateTitle(m.metaTitle);
      this.metaAndTitleService.updateDescription(m.metaDescription);
    });
  }
}

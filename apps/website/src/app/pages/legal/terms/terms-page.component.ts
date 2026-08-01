import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

/** Bump when the text below materially changes. */
const LAST_UPDATED = new Date(2026, 7, 1);

@Component({
  selector: 'web-terms-page',
  templateUrl: './terms-page.component.html',
  styleUrl: '../legal-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsPageComponent {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly i18n = inject(WebI18nService);

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
      const m = this.messages().terms;
      this.metaAndTitleService.updateTitle(m.metaTitle);
      this.metaAndTitleService.updateDescription(m.metaDescription);
    });
  }
}

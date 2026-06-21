import { CheckIconComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

import { UiShowcaseComponent } from './ui-showcase.component';

@Component({
  selector: 'web-ui-index-page',
  templateUrl: './ui-index-page.component.html',
  styleUrl: './ui-index-page.component.scss',
  imports: [RouterLink, CheckIconComponent, UiShowcaseComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIndexPageComponent {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;

  constructor() {
    effect(() => {
      const m = this.messages().ui.index;
      this.metaAndTitleService.updateTitle(m.metaTitle);
      this.metaAndTitleService.updateDescription(m.metaDescription);
    });
  }
}

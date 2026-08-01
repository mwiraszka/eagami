import { DividerComponent } from '@eagami/ui';

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  effect,
  inject,
} from '@angular/core';

import { UI_CHANGELOG } from '@app/data/changelog.generated';
import { CHANGELOG_URL, MIGRATION_URL } from '@app/data/external-links';
import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

import { InlineMarkdownPipe } from './inline-markdown.pipe';

@Component({
  selector: 'web-ui-changelog-page',
  templateUrl: './ui-changelog-page.component.html',
  styleUrl: './ui-changelog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // None: innerHTML-injected nodes carry no encapsulation attribute, so styles go global
  encapsulation: ViewEncapsulation.None,
  imports: [DividerComponent, InlineMarkdownPipe],
})
export class UiChangelogPageComponent {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;
  protected readonly releases = UI_CHANGELOG;
  protected readonly migrationUrl = MIGRATION_URL;
  protected readonly changelogUrl = CHANGELOG_URL;

  constructor() {
    effect(() => {
      const m = this.messages().ui.changelog;
      this.metaAndTitleService.updateTitle(m.metaTitle);
      this.metaAndTitleService.updateDescription(m.metaDescription);
    });
  }
}

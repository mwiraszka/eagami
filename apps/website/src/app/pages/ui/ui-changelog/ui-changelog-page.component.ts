import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  effect,
  inject,
} from '@angular/core';

import { UI_CHANGELOG } from '@app/data/changelog.generated';
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
  imports: [InlineMarkdownPipe],
})
export class UiChangelogPageComponent {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;
  protected readonly releases = UI_CHANGELOG;
  protected readonly migrationUrl =
    'https://github.com/mwiraszka/eagami/blob/main/packages/ui/MIGRATION.md';
  protected readonly changelogUrl =
    'https://github.com/mwiraszka/eagami/blob/main/packages/ui/CHANGELOG.md';

  constructor() {
    effect(() => {
      const m = this.messages().ui.changelog;
      this.metaAndTitleService.updateTitle(m.metaTitle);
      this.metaAndTitleService.updateDescription(m.metaDescription);
    });
  }
}

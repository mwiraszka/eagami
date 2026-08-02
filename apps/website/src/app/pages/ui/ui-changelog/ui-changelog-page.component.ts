import { DividerComponent } from '@eagami/ui';

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
} from '@angular/core';

import { UI_CHANGELOG } from '@app/data/changelog.generated';
import { CHANGELOG_URL, PACKAGE_URL } from '@app/data/external-links';
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
  // Built here rather than in the template: each locale owns the whole sentence,
  // including where the package name, version, and link fall in it
  protected readonly ledeHtml = computed(() => {
    const m = this.messages().ui.changelog;
    return m.lede(
      `<a href="${PACKAGE_URL}" target="_blank" rel="noopener noreferrer"><code>&#64;eagami/ui</code></a>`,
      '<code>5.0.0</code>',
      `<a href="${CHANGELOG_URL}" target="_blank" rel="noopener noreferrer"><span>${m.historyInline}</span></a>`,
    );
  });

  constructor() {
    effect(() => {
      const m = this.messages().ui.changelog;
      this.metaAndTitleService.updateTitle(m.metaTitle);
      this.metaAndTitleService.updateDescription(m.metaDescription);
    });
  }
}

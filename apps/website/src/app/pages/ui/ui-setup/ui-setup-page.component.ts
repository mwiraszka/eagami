import { DividerComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';

import { CodeSnippetComponent } from '@app/components/code-snippet/code-snippet.component';
import { IntegrationLinksComponent } from '@app/components/integration-links/integration-links.component';
import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

@Component({
  selector: 'web-ui-setup-page',
  templateUrl: './ui-setup-page.component.html',
  styleUrl: './ui-setup-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeSnippetComponent, DividerComponent, IntegrationLinksComponent],
})
export class UiSetupPageComponent {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;

  protected readonly stylesheetSnippet =
    '"styles": ["node_modules/@eagami/ui/src/styles/eagami-ui.scss"]';

  protected readonly fontsSnippet =
    '<link rel="preconnect" href="https://fonts.googleapis.com" />\n' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Syne:wght@400;500;600;700&display=swap" />';

  protected readonly quickStartSnippet = `import { ButtonComponent } from '@eagami/ui';

@Component({
  imports: [ButtonComponent],
  template: \`<ea-button variant="primary" (clicked)="save()">Save</ea-button>\`,
})
export class MyComponent {
  save() { /* ... */ }
}`;

  constructor() {
    effect(() => {
      const m = this.messages().ui.setup;
      this.metaAndTitleService.updateTitle(m.metaTitle);
      this.metaAndTitleService.updateDescription(m.metaDescription);
    });
  }
}

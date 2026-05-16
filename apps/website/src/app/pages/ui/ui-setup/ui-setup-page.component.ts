import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { CodeSnippetComponent } from '@app/components/code-snippet/code-snippet.component';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

@Component({
  selector: 'web-ui-setup-page',
  templateUrl: './ui-setup-page.component.html',
  styleUrl: './ui-setup-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeSnippetComponent],
})
export class UiSetupPageComponent implements OnInit {
  private readonly metaAndTitleService = inject(MetaAndTitleService);

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

  public ngOnInit(): void {
    this.metaAndTitleService.updateTitle('Eagami | UI');
    this.metaAndTitleService.updateDescription(
      'Install @eagami/ui, wire up the global stylesheet and fonts, and import your first component.',
    );
  }
}

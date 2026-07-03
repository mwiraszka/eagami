import {
  CodeIconComponent,
  CommandIconComponent,
  EyeIconComponent,
  PauseCircleIconComponent,
  TargetIconComponent,
  Volume2IconComponent,
} from '@eagami/ui';

import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';

import { CodeSnippetComponent } from '@app/components/code-snippet/code-snippet.component';
import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

@Component({
  selector: 'web-ui-accessibility-page',
  templateUrl: './ui-accessibility-page.component.html',
  styleUrl: './ui-accessibility-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CodeSnippetComponent,
    CodeIconComponent,
    CommandIconComponent,
    EyeIconComponent,
    PauseCircleIconComponent,
    TargetIconComponent,
    Volume2IconComponent,
  ],
})
export class UiAccessibilityPageComponent {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly webI18n = inject(WebI18nService);

  protected readonly messages = this.webI18n.messages;

  protected readonly labelsSnippet = `<!-- Icon-only controls need an explicit accessible name -->
<ea-button aria-label="Close" variant="ghost">
  <ea-icon-x />
</ea-button>

<!-- Form fields get their accessible name from the label input -->
<ea-input label="Email address" type="email" />`;

  constructor() {
    effect(() => {
      const m = this.messages().ui.accessibility;
      this.metaAndTitleService.updateTitle(m.metaTitle);
      this.metaAndTitleService.updateDescription(m.metaDescription);
    });
  }
}

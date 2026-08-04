import { CopyIconComponent, TooltipDirective } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import { ClipboardService } from '@app/services/clipboard.service';

@Component({
  selector: 'web-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrl: './code-snippet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CopyIconComponent, TooltipDirective],
})
export class CodeSnippetComponent {
  readonly code = input.required<string>();

  private readonly clipboard = inject(ClipboardService);
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;

  protected copy(): void {
    this.clipboard.copy(this.code());
  }
}

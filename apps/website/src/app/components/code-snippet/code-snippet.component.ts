import { CopyIconComponent, ToastService, TooltipDirective } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

@Component({
  selector: 'web-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrl: './code-snippet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CopyIconComponent, TooltipDirective],
})
export class CodeSnippetComponent {
  readonly code = input.required<string>();

  private readonly toastService = inject(ToastService);

  protected copy(): void {
    void navigator.clipboard
      .writeText(this.code())
      .then(() => this.toastService.success('Copied to clipboard'))
      .catch(() => this.toastService.error('Could not copy to clipboard'));
  }
}

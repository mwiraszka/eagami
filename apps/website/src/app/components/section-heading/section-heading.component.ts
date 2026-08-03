import { LinkIconComponent, ToastService, TooltipDirective } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';

/**
 * Heading row for a documentation page section: the projected heading on the
 * left and a copy-link button on the right that copies the page URL with the
 * section's fragment. The host section carries the matching `id`.
 */
@Component({
  selector: 'web-section-heading',
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LinkIconComponent, TooltipDirective],
})
export class SectionHeadingComponent {
  readonly fragment = input.required<string>();

  private readonly toastService = inject(ToastService);
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;

  protected copyLink(): void {
    const m = this.messages().common;
    const url = `${window.location.origin}${window.location.pathname}#${this.fragment()}`;
    void navigator.clipboard
      .writeText(url)
      .then(() => this.toastService.success(m.codeSnippet.copySuccess))
      .catch(() => this.toastService.error(m.codeSnippet.copyError));
  }
}

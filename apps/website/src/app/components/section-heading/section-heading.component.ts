import { LinkIconComponent, TooltipDirective } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import { ClipboardService } from '@app/services/clipboard.service';

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

  private readonly clipboard = inject(ClipboardService);
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;

  protected copyLink(): void {
    this.clipboard.copy(
      `${window.location.origin}${window.location.pathname}#${this.fragment()}`,
    );
  }
}

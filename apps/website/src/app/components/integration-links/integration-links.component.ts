import { DownloadIconComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { INTEGRATION_LINKS } from '@app/data/external-links';
import { WebI18nService } from '@app/i18n/web-i18n.service';

@Component({
  selector: 'web-integration-links',
  templateUrl: './integration-links.component.html',
  styleUrl: './integration-links.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DownloadIconComponent],
})
export class IntegrationLinksComponent {
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;

  protected readonly links = INTEGRATION_LINKS;
}

import { DownloadIconComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import type { WebMessages } from '@app/i18n/web-messages.types';

interface IntegrationLink {
  href: string;
  labelKey: keyof WebMessages['ui']['integrations'];
}

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

  protected readonly links: IntegrationLink[] = [
    { href: '/assets/eagami-ui-react.md', labelKey: 'reactLink' },
    { href: '/assets/eagami-ui-flutter.md', labelKey: 'flutterLink' },
    { href: '/assets/eagami-ui-tokens.json', labelKey: 'tokensLink' },
  ];
}

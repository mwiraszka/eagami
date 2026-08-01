import { DividerComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import type { WebMessages } from '@app/i18n/web-messages.types';

@Component({
  selector: 'web-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [DividerComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly i18n = inject(WebI18nService);

  public readonly currentYear = new Date().getFullYear();
  public readonly messages = this.i18n.messages;

  public readonly migrationUrl =
    'https://github.com/mwiraszka/eagami/blob/main/packages/ui/MIGRATION.md';

  public readonly integrationLinks: ReadonlyArray<{
    href: string;
    labelKey: keyof WebMessages['ui']['integrations'];
  }> = [
    { href: '/assets/eagami-ui-react.md', labelKey: 'reactLink' },
    { href: '/assets/eagami-ui-flutter.md', labelKey: 'flutterLink' },
    { href: '/assets/eagami-ui-tokens.json', labelKey: 'tokensLink' },
  ];
}

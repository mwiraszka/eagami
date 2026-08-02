import { DividerComponent, DownloadIconComponent } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  INTEGRATION_LINKS,
  MIGRATION_URL,
  PACKAGE_URL,
  REPO_URL,
} from '@app/data/external-links';
import { PendingLinkDirective } from '@app/directives/pending-link.directive';
import { WebI18nService } from '@app/i18n/web-i18n.service';

@Component({
  selector: 'web-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [DividerComponent, DownloadIconComponent, PendingLinkDirective, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly i18n = inject(WebI18nService);

  public readonly currentYear = new Date().getFullYear();
  public readonly messages = this.i18n.messages;

  public readonly repoUrl = REPO_URL;
  public readonly packageUrl = PACKAGE_URL;
  public readonly migrationUrl = MIGRATION_URL;
  public readonly integrationLinks = INTEGRATION_LINKS;
}

import { DividerComponent, GithubIconComponent, TooltipDirective } from '@eagami/ui';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WebI18nService } from '@app/i18n/web-i18n.service';

@Component({
  selector: 'web-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [DividerComponent, GithubIconComponent, RouterLink, TooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly i18n = inject(WebI18nService);

  public readonly currentYear = new Date().getFullYear();
  public readonly messages = this.i18n.messages;
}

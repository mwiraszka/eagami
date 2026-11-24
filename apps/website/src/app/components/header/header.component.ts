import { EagamiWordmarkComponent } from '@eagami/ui';
import { filter, map } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

import { LocaleSwitcherComponent } from '@app/components/locale-switcher/locale-switcher.component';
import { ThemeToggleComponent } from '@app/components/theme-toggle/theme-toggle.component';
import { PendingLinkDirective } from '@app/directives/pending-link.directive';
import { WebI18nService } from '@app/i18n/web-i18n.service';

@Component({
  selector: 'web-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    EagamiWordmarkComponent,
    LocaleSwitcherComponent,
    PendingLinkDirective,
    RouterLink,
    ThemeToggleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  protected readonly inUiSection = computed(() => this.currentUrl().startsWith('/ui'));
}

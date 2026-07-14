import { EagamiIconComponent, TooltipDirective } from '@eagami/ui';
import { filter, map } from 'rxjs/operators';

import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

import { LocaleSwitcherComponent } from '@app/components/locale-switcher/locale-switcher.component';
import { ThemeToggleComponent } from '@app/components/theme-toggle/theme-toggle.component';
import { PendingLinkDirective } from '@app/directives/pending-link.directive';
import { WebI18nService } from '@app/i18n/web-i18n.service';

@Component({
  selector: 'web-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    EagamiIconComponent,
    LocaleSwitcherComponent,
    PendingLinkDirective,
    RouterLink,
    RouterLinkActive,
    ThemeToggleComponent,
    TooltipDirective,
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

  private readonly isHome = computed(() => {
    const url = this.currentUrl();
    return url === '/' || url === '' || url.startsWith('/?') || url.startsWith('/#');
  });

  private readonly scrolled = signal(false);

  protected readonly brandVisible = computed(() => !this.isHome() || this.scrolled());

  constructor() {
    afterNextRender(() => {
      const update = (): void => this.scrolled.set(window.scrollY > 0);
      update();
      window.addEventListener('scroll', update, { passive: true });
    });
  }
}

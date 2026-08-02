import {
  ChevronRightIconComponent,
  DividerComponent,
  DrawerComponent,
  MenuIconComponent,
} from '@eagami/ui';
import { filter, map, startWith } from 'rxjs';

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { UI_COMPONENTS } from '@app/data/ui-components';
import { PendingLinkDirective } from '@app/directives/pending-link.directive';
import { WebI18nService } from '@app/i18n/web-i18n.service';

const COMPONENTS_PATH = '/ui/components/';

@Component({
  selector: 'web-ui-shell',
  templateUrl: './ui-shell.component.html',
  styleUrl: './ui-shell.component.scss',
  imports: [
    ChevronRightIconComponent,
    DividerComponent,
    DrawerComponent,
    MenuIconComponent,
    NgTemplateOutlet,
    PendingLinkDirective,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiShellComponent {
  private readonly router = inject(Router);
  private readonly i18n = inject(WebI18nService);
  private readonly drawerNav = viewChild<ElementRef<HTMLElement>>('drawerNav');

  protected readonly messages = this.i18n.messages;
  protected readonly components = UI_COMPONENTS;
  protected readonly componentsExpanded = signal(false);
  protected readonly menuOpen = signal(false);

  private readonly path = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.currentPath()),
      startWith(this.currentPath()),
    ),
    { initialValue: this.currentPath() },
  );

  protected readonly isComponentRoute = computed(() =>
    this.path().startsWith(COMPONENTS_PATH),
  );

  constructor() {
    // Keep the group in step with the route: entering a component page expands it
    // (also from external links, e.g. the landing page's "explore more" link) and
    // leaving collapses it
    effect(() => {
      const path = this.path();
      this.componentsExpanded.set(path.startsWith(COMPONENTS_PATH));
      this.menuOpen.set(false);
    });
  }

  protected toggleComponents(): void {
    this.componentsExpanded.update(value => !value);
  }

  // Same-page links raise no navigation event, so close on the click itself
  protected closeOnLinkClick(event: Event): void {
    const target = event.target;

    if (target instanceof HTMLElement && target.closest('a')) {
      this.menuOpen.set(false);
    }
  }

  protected revealActiveLink(): void {
    this.drawerNav()
      ?.nativeElement.querySelector('.ui-shell__link--active')
      ?.scrollIntoView({ block: 'center' });
  }

  private currentPath(): string {
    return this.router.url.split(/[?#]/)[0];
  }
}

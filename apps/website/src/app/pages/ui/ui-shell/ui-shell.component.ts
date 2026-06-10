import { ChevronRightIconComponent, ToastComponent } from '@eagami/ui';
import { filter, map, startWith } from 'rxjs';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { UI_COMPONENTS } from '@app/data/ui-components';
import { WebI18nService } from '@app/i18n/web-i18n.service';
import { ToastOutletService } from '@app/services/toast-outlet.service';

@Component({
  selector: 'web-ui-shell',
  templateUrl: './ui-shell.component.html',
  styleUrl: './ui-shell.component.scss',
  imports: [
    ChevronRightIconComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ToastComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiShellComponent {
  private readonly router = inject(Router);
  private readonly i18n = inject(WebI18nService);

  protected readonly toastOutlet = inject(ToastOutletService);
  protected readonly messages = this.i18n.messages;
  protected readonly components = UI_COMPONENTS;
  protected readonly componentsExpanded = signal(false);

  protected readonly isComponentRoute = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url.startsWith('/ui/components/')),
      startWith(this.router.url.startsWith('/ui/components/')),
    ),
    { initialValue: this.router.url.startsWith('/ui/components/') },
  );

  constructor() {
    if (this.isComponentRoute()) {
      this.componentsExpanded.set(true);
    }
  }

  protected toggleComponents(): void {
    const willExpand = !this.componentsExpanded();
    this.componentsExpanded.update(value => !value);

    /* Expanding Components from a non-component route jumps to the first component;
       stay put if already on a component route so toggling doesn't navigate away. */
    if (willExpand && !this.isComponentRoute() && this.components.length > 0) {
      this.router.navigate(['/ui/components', this.components[0].slug]);
    }
  }
}

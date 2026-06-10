import { ToastComponent } from '@eagami/ui';
import { filter, first } from 'rxjs/operators';

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '@app/components/footer/footer.component';
import { HeaderComponent } from '@app/components/header/header.component';
import { WebI18nService } from '@app/i18n/web-i18n.service';
import { ToastOutletService } from '@app/services/toast-outlet.service';

@Component({
  selector: 'web-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FooterComponent, HeaderComponent, RouterOutlet, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly i18n = inject(WebI18nService);
  private readonly doc = inject(DOCUMENT);
  private readonly appRef = inject(ApplicationRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly toastOutlet = inject(ToastOutletService);
  protected readonly messages = this.i18n.messages;

  constructor() {
    /* The inline <head> script hides `body` via `web-locale-pending` for any
       non-English locale until we reveal it here.

       Gate on `ApplicationRef.isStable`, not `afterNextRender`: the first render
       only claims the prerendered DOM, while hydration mismatch reconciliation
       (which swaps English strings for the active locale) runs in a follow-up
       microtask. Revealing earlier flashes the still-English DOM for a frame;
       `isStable` fires once that reconciliation has settled. */
    if (!this.isBrowser) {
      return;
    }
    this.appRef.isStable
      .pipe(
        filter(stable => stable),
        first(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.doc.documentElement.classList.remove('web-locale-pending');
      });
  }
}

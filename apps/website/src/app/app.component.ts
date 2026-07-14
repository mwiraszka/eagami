import { ToastComponent } from '@eagami/ui';
import { filter, first } from 'rxjs/operators';

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  afterRenderEffect,
  inject,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '@app/components/footer/footer.component';
import { HeaderComponent } from '@app/components/header/header.component';
import { NavigationOverlayComponent } from '@app/components/navigation-overlay/navigation-overlay.component';
import { WebI18nService } from '@app/i18n/web-i18n.service';
import { ToastOutletService } from '@app/services/toast-outlet.service';

@Component({
  selector: 'web-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    FooterComponent,
    HeaderComponent,
    NavigationOverlayComponent,
    RouterOutlet,
    ToastComponent,
  ],
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

  private readonly stable = toSignal(
    this.appRef.isStable.pipe(
      filter(stable => stable),
      first(),
    ),
    { initialValue: false },
  );

  constructor() {
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
        // Hand pre-hydration navigation feedback (index.html click listener)
        // over to the router-driven overlay
        this.doc.documentElement.classList.remove('web-nav-pending');
        this.doc.documentElement.classList.add('web-hydrated');
      });

    /* The inline <head> script hides `body` via `web-locale-pending` for any
       non-English locale until we reveal it here.

       Reveal only once BOTH hold: `ApplicationRef.isStable`, because the first
       render merely claims the prerendered DOM while hydration mismatch
       reconciliation runs in a follow-up microtask, and `applied`, because the
       active locale's dictionaries load lazily. `afterRenderEffect` fires
       after the render that commits the localized strings, so the English
       prerendered DOM is never flashed. */
    afterRenderEffect(() => {
      if (this.stable() && this.i18n.applied()) {
        this.doc.documentElement.classList.remove('web-locale-pending');
      }
    });
  }
}

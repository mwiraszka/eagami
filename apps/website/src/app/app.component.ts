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

  protected readonly messages = this.i18n.messages;

  constructor() {
    /* The inline <head> script adds `web-locale-pending` on `<html>` whenever
       the resolved locale is anything other than English, which hides `body`
       via CSS until we reveal it here.

       Wait on `ApplicationRef.isStable` (first `true` emission) rather than
       `afterNextRender`: the first render only "claims" the prerendered DOM,
       but Angular's hydration mismatch reconciliation (which actually swaps
       the English strings out for the active locale's strings) runs in a
       follow-up microtask. Lifting the gate too early uncovers the still-
       English DOM for a frame. `isStable` fires once all pending tasks have
       settled, which is after the locale strings are in the DOM. */
    if (!this.isBrowser) return;
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

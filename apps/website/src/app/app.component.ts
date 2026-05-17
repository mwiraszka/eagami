import { ToastComponent } from '@eagami/ui';

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  afterNextRender,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '@app/components/footer/footer.component';
import { HeaderComponent } from '@app/components/header/header.component';
import { WebI18nService } from '@app/i18n/web-i18n.service';

@Component({
  selector: 'web-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly i18n = inject(WebI18nService);
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly messages = this.i18n.messages;

  constructor() {
    /* The inline <head> script adds `web-locale-pending` on `<html>` whenever
       the resolved locale is anything other than English, which hides `body`
       via CSS until we reveal it here. `afterNextRender` fires once Angular's
       first client render commits, so by the time the gate lifts the DOM is
       already populated with the active locale's strings — visitors see their
       language directly instead of a flash of the prerendered English. */
    if (!this.isBrowser) return;
    afterNextRender(() => {
      this.doc.documentElement.classList.remove('web-locale-pending');
    });
  }
}

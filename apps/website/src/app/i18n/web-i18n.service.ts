import { EagamiI18nService } from '@eagami/ui';

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Signal, computed, inject, signal } from '@angular/core';

import { WEB_LOCALES, WebLocale } from './locale.types';
import { WEB_MESSAGES } from './messages';
import { WebMessages } from './web-messages.types';

const STORAGE_KEY = 'web-locale';

function isWebLocale(value: unknown): value is WebLocale {
  return typeof value === 'string' && (WEB_LOCALES as readonly string[]).includes(value);
}

/**
 * Holds the active website locale, persists it across reloads (matches the
 * theme service's pattern), keeps the document `lang` attribute in sync, and
 * forwards the locale to the embedded `EagamiI18nService` so the bundled UI
 * library translates in lockstep with the website chrome.
 */
@Injectable({ providedIn: 'root' })
export class WebI18nService {
  private readonly doc = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly eagamiI18n = inject(EagamiI18nService);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /* Read localStorage during signal init (not in the constructor) so the first
     render already speaks the persisted locale. Reading after construction
     would briefly render the prerendered English content before re-rendering
     in the active locale. The matching inline script in `index.html` mirrors
     this for the `<html lang>` attribute so screen readers and the parser
     pick up the right language before hydration. */
  private readonly _locale = signal<WebLocale>(this.readStoredLocale());

  /** The currently active locale. Reactive. */
  public readonly locale: Signal<WebLocale> = this._locale.asReadonly();

  /** The resolved message dictionary for the active locale. */
  public readonly messages: Signal<WebMessages> = computed(
    () => WEB_MESSAGES[this._locale()],
  );

  constructor() {
    if (this.isBrowser) this.applyLocale();
  }

  public setLocale(locale: WebLocale): void {
    if (!isWebLocale(locale)) return;
    this._locale.set(locale);
    this.applyLocale();
  }

  private readStoredLocale(): WebLocale {
    if (!this.isBrowser) return 'en';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return isWebLocale(stored) ? stored : 'en';
    } catch {
      return 'en';
    }
  }

  private applyLocale(): void {
    const locale = this._locale();
    this.eagamiI18n.setLocale(locale);

    if (!this.isBrowser) return;

    localStorage.setItem(STORAGE_KEY, locale);
    this.doc.documentElement.setAttribute('lang', locale);
  }
}

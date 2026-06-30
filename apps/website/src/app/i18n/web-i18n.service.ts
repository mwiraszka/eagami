import { EagamiI18nService } from '@eagami/ui';

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  type Signal,
  computed,
  inject,
  signal,
} from '@angular/core';

import { WEB_LOCALES, WEB_LOCALE_DIRS, type WebLocale } from './locale.types';
import { WEB_MESSAGES } from './messages';
import type { WebMessages } from './web-messages.types';

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
    if (this.isBrowser) {
      this.applyLocale();
    }
  }

  public setLocale(locale: WebLocale): void {
    if (!isWebLocale(locale)) {
      return;
    }
    this._locale.set(locale);
    this.applyLocale();
  }

  private readStoredLocale(): WebLocale {
    if (!this.isBrowser) {
      return 'en';
    }
    /* Precedence must match the inline <head> script in index.html:
       1. Explicit choice in localStorage
       2. navigator.languages: exact match, then language-only match
          (e.g. 'fr' or 'fr-CA' to 'fr-FR', 'es-MX' to 'es-ES')
       3. English default */
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isWebLocale(stored)) {
        return stored;
      }
    } catch {
      // localStorage may be unavailable; fall through to browser preferences
    }
    const preferred = (
      navigator.languages?.length
        ? navigator.languages
        : navigator.language
          ? [navigator.language]
          : []
    ) as readonly string[];
    for (const tag of preferred) {
      const exact = WEB_LOCALES.find(l => l.toLowerCase() === tag.toLowerCase());
      if (exact) {
        return exact;
      }
      const primary = tag.split('-')[0].toLowerCase();
      const byLanguage = WEB_LOCALES.find(l => l.toLowerCase().split('-')[0] === primary);
      if (byLanguage) {
        return byLanguage;
      }
    }
    return 'en';
  }

  private applyLocale(): void {
    const locale = this._locale();
    this.eagamiI18n.setLocale(locale);

    if (!this.isBrowser) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, locale);
    this.doc.documentElement.setAttribute('lang', locale);
    this.doc.documentElement.setAttribute('dir', WEB_LOCALE_DIRS[locale]);
    /* The `web-locale-pending` class set by the inline <head> script is NOT
       removed here. Doing so in the service constructor would fire before
       Angular has re-rendered components with the active locale's strings,
       so the English prerendered DOM would briefly show through the moment
       it became visible. AppComponent clears the class from an
       `afterNextRender` callback instead, after the first render commits
       in the active locale. */
  }
}

import { EagamiI18nService } from '@eagami/ui';

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, type Signal, inject, signal } from '@angular/core';

import { WEB_LOCALE_CHUNKS } from './locale-chunks';
import { WEB_LOCALES, WEB_LOCALE_DIRS, type WebLocale } from './locale.types';
import { en } from './messages/en';
import type { WebMessages } from './web-messages.types';

const STORAGE_KEY = 'web-locale';

function isWebLocale(value: unknown): value is WebLocale {
  return typeof value === 'string' && (WEB_LOCALES as readonly string[]).includes(value);
}

/**
 * Holds the active website locale, persists it across reloads (matches the
 * theme service's pattern), keeps the document `lang` attribute in sync, and
 * forwards the locale to the embedded `EagamiI18nService` so the bundled UI
 * library translates in lockstep with the website chrome. Only English ships
 * in the initial bundle; every other locale's dictionaries (website and
 * library together) load as one lazy chunk, and both services switch in the
 * same tick once it arrives so the page never renders mixed languages.
 */
@Injectable({ providedIn: 'root' })
export class WebI18nService {
  private readonly doc = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly eagamiI18n = inject(EagamiI18nService);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /* Read localStorage during signal init (not in the constructor) so the first
     render already reports the persisted locale. The matching inline script in
     `index.html` mirrors this for the `<html lang>` attribute so screen
     readers and the parser pick up the right language before hydration. */
  private readonly _locale = signal<WebLocale>(this.readStoredLocale());
  private readonly _messages = signal<WebMessages>(en);
  private readonly _applied = signal(false);

  private pendingLocale: WebLocale | null = null;

  /** The currently active locale. Reactive. */
  public readonly locale: Signal<WebLocale> = this._locale.asReadonly();

  /** The resolved message dictionary for the active locale. */
  public readonly messages: Signal<WebMessages> = this._messages.asReadonly();

  /** True once the active locale's dictionaries are loaded and applied. */
  public readonly applied: Signal<boolean> = this._applied.asReadonly();

  constructor() {
    if (this.isBrowser) {
      void this.applyLocale(this._locale());
    }
  }

  public setLocale(locale: WebLocale): void {
    if (!isWebLocale(locale)) {
      return;
    }
    void this.applyLocale(locale);
  }

  private async applyLocale(requested: WebLocale): Promise<void> {
    this.pendingLocale = requested;
    let locale = requested;
    let messages = en;
    if (requested !== 'en') {
      try {
        const [chunk] = await Promise.all([
          WEB_LOCALE_CHUNKS[requested](),
          this.eagamiI18n.loadLocale(requested),
        ]);
        messages = chunk.web;
      } catch {
        // Chunk fetch failed (e.g. offline): fall back to the bundled English
        // rather than stranding the page half-translated
        locale = 'en';
      }
    }
    if (this.pendingLocale !== requested) {
      return;
    }
    this.pendingLocale = null;

    // Both dictionaries are registered by now, so all three signals flip in
    // the same tick and the library switches synchronously in lockstep
    void this.eagamiI18n.setLocale(locale);
    this._locale.set(locale);
    this._messages.set(messages);

    localStorage.setItem(STORAGE_KEY, locale);
    this.doc.documentElement.setAttribute('lang', locale);
    this.doc.documentElement.setAttribute('dir', WEB_LOCALE_DIRS[locale]);
    /* The `web-locale-pending` class set by the inline <head> script is NOT
       removed here: that would fire before Angular re-renders with the new
       strings, flashing the English prerendered DOM. AppComponent clears it
       after the render that follows `applied` flipping true. */
    this._applied.set(true);
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
}

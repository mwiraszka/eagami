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

  private readonly _locale = signal<WebLocale>('en');

  /** The currently active locale. Reactive. */
  public readonly locale: Signal<WebLocale> = this._locale.asReadonly();

  /** The resolved message dictionary for the active locale. */
  public readonly messages: Signal<WebMessages> = computed(
    () => WEB_MESSAGES[this._locale()],
  );

  constructor() {
    if (!this.isBrowser) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    const initial: WebLocale = isWebLocale(stored) ? stored : 'en';

    this._locale.set(initial);
    this.applyLocale();
  }

  public setLocale(locale: WebLocale): void {
    if (!isWebLocale(locale)) return;
    this._locale.set(locale);
    this.applyLocale();
  }

  private applyLocale(): void {
    const locale = this._locale();
    this.eagamiI18n.setLocale(locale);

    if (!this.isBrowser) return;

    localStorage.setItem(STORAGE_KEY, locale);
    this.doc.documentElement.setAttribute('lang', locale);
  }
}

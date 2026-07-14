import { Injectable, type Signal, computed, effect, inject, signal } from '@angular/core';

import { _eagamiI18nLocaleOverride } from './_storybook-locale-override';
import { EAGAMI_I18N_CONFIG } from './i18n.provider';
import type { EagamiLocale, EagamiMessages, EagamiMessagesOverride } from './i18n.types';
import { en } from './messages';

/** Shallow-merges per-component override groups over a complete base dictionary. */
function applyOverrides(
  base: EagamiMessages,
  overrides: EagamiMessagesOverride,
): EagamiMessages {
  const merged = {} as EagamiMessages;
  for (const key of Object.keys(base) as (keyof EagamiMessages)[]) {
    merged[key] = { ...base[key], ...overrides[key] } as EagamiMessages[never];
  }
  return merged;
}

/**
 * Holds the active locale and resolves the matching message dictionary for
 * every Eagami UI component. English is always available; other languages are
 * either registered eagerly via `provideEagamiUi({ locales })` or fetched on
 * demand via `provideEagamiUi({ localeLoaders })`. The `locale` signal is
 * reactive, so changing it at runtime re-renders all components. Unknown or
 * unregistered locales fall back to English.
 */
@Injectable({ providedIn: 'root' })
export class EagamiI18nService {
  private readonly config = inject(EAGAMI_I18N_CONFIG, { optional: true });

  // English is baked in; consumer-registered locales extend it. A locale that
  // was never registered resolves to English rather than to missing strings.
  private readonly registered = new Map<EagamiLocale, EagamiMessages>(
    [en, ...(this.config?.locales ?? [])].map(
      (bundle): [EagamiLocale, EagamiMessages] => [bundle.locale, bundle.messages],
    ),
  );

  private readonly loading = new Map<EagamiLocale, Promise<void>>();
  private pendingSwitch: EagamiLocale | null = null;

  private readonly _locale = signal<EagamiLocale>(this.resolveInitialLocale());

  /** The currently active locale. Read it reactively or call `setLocale()`. */
  readonly locale: Signal<EagamiLocale> = this._locale.asReadonly();

  constructor() {
    // A configured initial locale that is only available through a loader
    // starts on the English fallback and switches as soon as it arrives
    const want = _eagamiI18nLocaleOverride() ?? this.config?.locale;
    if (want && !this.registered.has(want) && this.hasLoader(want)) {
      void this.setLocale(want);
    }

    // Pick up tooling-driven locale changes (Storybook globals dropdown); the
    // override signal is null in production, so this effect is a no-op there.
    effect(() => {
      const override = _eagamiI18nLocaleOverride();
      if (
        override !== null &&
        (this.registered.has(override) || this.hasLoader(override))
      ) {
        void this.setLocale(override);
      }
    });
  }

  /** The resolved message dictionary for the active locale. */
  readonly messages: Signal<EagamiMessages> = computed(() => {
    const base = this.registered.get(this._locale()) ?? en.messages;
    const overrides = this.config?.messages;
    return overrides ? applyOverrides(base, overrides) : base;
  });

  /**
   * Switches the active locale. A registered locale applies synchronously; a
   * locale with a lazy loader is fetched first, then applied, with the newest
   * request superseding any in-flight one. Falls back to English when the
   * locale is neither registered nor loadable, or when its loader fails.
   * Resolves once the switch has been applied (or superseded).
   */
  async setLocale(locale: EagamiLocale): Promise<void> {
    if (this.registered.has(locale)) {
      this.pendingSwitch = null;
      this._locale.set(locale);
      return;
    }
    if (!this.hasLoader(locale)) {
      this.pendingSwitch = null;
      this._locale.set('en');
      return;
    }
    this.pendingSwitch = locale;
    try {
      await this.loadLocale(locale);
    } catch {
      if (this.pendingSwitch === locale) {
        this.pendingSwitch = null;
        this._locale.set('en');
      }
      return;
    }
    if (this.pendingSwitch === locale) {
      this.pendingSwitch = null;
      this._locale.set(locale);
    }
  }

  /**
   * Fetches and registers a locale's dictionary through its configured loader
   * without switching to it, so a later `setLocale()` applies instantly.
   * Resolves immediately when the locale is already registered or has no
   * loader. Rejects when the loader fails; the failure is not cached, so a
   * retry fetches again.
   */
  loadLocale(locale: EagamiLocale): Promise<void> {
    if (this.registered.has(locale)) {
      return Promise.resolve();
    }
    const loader = this.config?.localeLoaders?.[locale];
    if (!loader) {
      return Promise.resolve();
    }
    let pending = this.loading.get(locale);
    if (!pending) {
      pending = loader().then(
        bundle => {
          this.loading.delete(locale);
          this.registered.set(locale, bundle.messages);
        },
        (error: unknown) => {
          this.loading.delete(locale);
          throw error;
        },
      );
      this.loading.set(locale, pending);
    }
    return pending;
  }

  private hasLoader(locale: EagamiLocale): boolean {
    return this.config?.localeLoaders?.[locale] !== undefined;
  }

  private resolveInitialLocale(): EagamiLocale {
    const want = _eagamiI18nLocaleOverride() ?? this.config?.locale ?? 'en';
    return this.registered.has(want) ? want : 'en';
  }
}

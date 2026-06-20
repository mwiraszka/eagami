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
 * the ones registered via `provideEagamiUi({ locales })`. The `locale` signal
 * is reactive, so changing it at runtime re-renders all components. Unknown or
 * unregistered locales fall back to English.
 */
@Injectable({ providedIn: 'root' })
export class EagamiI18nService {
  private readonly config = inject(EAGAMI_I18N_CONFIG, { optional: true });

  // English is baked in; consumer-registered locales extend it. A locale that
  // was never registered resolves to English rather than to missing strings.
  private readonly registered: ReadonlyMap<EagamiLocale, EagamiMessages> = new Map(
    [en, ...(this.config?.locales ?? [])].map(
      (bundle): [EagamiLocale, EagamiMessages] => [bundle.locale, bundle.messages],
    ),
  );

  private readonly _locale = signal<EagamiLocale>(this.resolveInitialLocale());

  /** The currently active locale. Read it reactively or call `setLocale()`. */
  readonly locale: Signal<EagamiLocale> = this._locale.asReadonly();

  constructor() {
    // Pick up tooling-driven locale changes (Storybook globals dropdown); the
    // override signal is null in production, so this effect is a no-op there.
    effect(() => {
      const override = _eagamiI18nLocaleOverride();
      if (override !== null && this.registered.has(override)) {
        this._locale.set(override);
      }
    });
  }

  /** The resolved message dictionary for the active locale. */
  readonly messages: Signal<EagamiMessages> = computed(() => {
    const base = this.registered.get(this._locale()) ?? en.messages;
    const overrides = this.config?.messages;
    return overrides ? applyOverrides(base, overrides) : base;
  });

  /** Switches the active locale; falls back to English if it is not registered. */
  setLocale(locale: EagamiLocale): void {
    this._locale.set(this.registered.has(locale) ? locale : 'en');
  }

  private resolveInitialLocale(): EagamiLocale {
    const want = _eagamiI18nLocaleOverride() ?? this.config?.locale ?? 'en';
    return this.registered.has(want) ? want : 'en';
  }
}

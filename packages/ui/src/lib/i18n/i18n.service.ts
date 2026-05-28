import { Injectable, Signal, computed, effect, inject, signal } from '@angular/core';

import { _eagamiI18nLocaleOverride } from './_storybook-locale-override';
import { EAGAMI_I18N_CONFIG } from './i18n.provider';
import { EagamiLocale, EagamiMessages, EagamiMessagesOverride } from './i18n.types';
import { EAGAMI_MESSAGES, en } from './messages';

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
 * every Eagami UI component. The `locale` signal is reactive, so changing it
 * at runtime re-renders all components with the new strings. Unknown locales
 * (or missing keys via partial overrides) fall back to English.
 */
@Injectable({ providedIn: 'root' })
export class EagamiI18nService {
  private readonly config = inject(EAGAMI_I18N_CONFIG, { optional: true });

  private readonly _locale = signal<EagamiLocale>(
    _eagamiI18nLocaleOverride() ?? this.config?.locale ?? 'en',
  );

  /** The currently active locale. Read it reactively or call `setLocale()`. */
  readonly locale: Signal<EagamiLocale> = this._locale.asReadonly();

  constructor() {
    // Pick up tooling-driven locale changes (Storybook globals dropdown); the
    // override signal is null in production, so this effect is a no-op there.
    effect(() => {
      const override = _eagamiI18nLocaleOverride();
      if (override !== null && EAGAMI_MESSAGES[override]) {
        this._locale.set(override);
      }
    });
  }

  /** The resolved message dictionary for the active locale. */
  readonly messages: Signal<EagamiMessages> = computed(() => {
    const base = EAGAMI_MESSAGES[this._locale()] ?? en;
    const overrides = this.config?.messages;
    return overrides ? applyOverrides(base, overrides) : base;
  });

  /** Switches the active locale; falls back to English if unsupported. */
  setLocale(locale: EagamiLocale): void {
    this._locale.set(EAGAMI_MESSAGES[locale] ? locale : 'en');
  }
}

/**
 * Locales the website ships in. Matches `EagamiLocale` from `@eagami/ui` so the
 * embedded component library and the surrounding website translate in lockstep.
 */
export type WebLocale = 'en' | 'fr-FR' | 'el' | 'pl' | 'es-ES';

export const WEB_LOCALES: readonly WebLocale[] = ['en', 'fr-FR', 'el', 'pl', 'es-ES'];

/** Native-name label shown in the locale switcher. */
export const WEB_LOCALE_LABELS: Record<WebLocale, string> = {
  en: 'English',
  'fr-FR': 'Français',
  el: 'Ελληνικά',
  pl: 'Polski',
  'es-ES': 'Español',
};

/** Flag emoji shown next to each locale in the switcher. */
export const WEB_LOCALE_FLAGS: Record<WebLocale, string> = {
  en: '🇬🇧',
  'fr-FR': '🇫🇷',
  el: '🇬🇷',
  pl: '🇵🇱',
  'es-ES': '🇪🇸',
};

// Matches `EagamiLocale` from `@eagami/ui` so library and website translate in lockstep
export type WebLocale =
  | 'en'
  | 'fr-FR'
  | 'el'
  | 'pl'
  | 'es-ES'
  | 'de'
  | 'pt-BR'
  | 'zh-CN'
  | 'is'
  | 'nl';

export const WEB_LOCALES: readonly WebLocale[] = [
  'en',
  'fr-FR',
  'el',
  'pl',
  'es-ES',
  'de',
  'pt-BR',
  'zh-CN',
  'is',
  'nl',
];

export const WEB_LOCALE_LABELS: Record<WebLocale, string> = {
  en: 'English',
  'fr-FR': 'Français',
  el: 'Ελληνικά',
  pl: 'Polski',
  'es-ES': 'Español',
  de: 'Deutsch',
  'pt-BR': 'Português (Brasil)',
  'zh-CN': '中文',
  is: 'Íslenska',
  nl: 'Nederlands',
};

export const WEB_LOCALE_FLAGS: Record<WebLocale, string> = {
  en: '🇬🇧',
  'fr-FR': '🇫🇷',
  el: '🇬🇷',
  pl: '🇵🇱',
  'es-ES': '🇪🇸',
  de: '🇩🇪',
  'pt-BR': '🇧🇷',
  'zh-CN': '🇨🇳',
  is: '🇮🇸',
  nl: '🇳🇱',
};

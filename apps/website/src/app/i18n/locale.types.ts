import { EAGAMI_LOCALE_META, type EagamiLocale } from '@eagami/ui';

// The website translates in lockstep with the library, so its locale list,
// labels, and flags all derive from @eagami/ui's single `EAGAMI_LOCALE_META`
// source rather than re-declaring them (which silently drifted in the past).
export type WebLocale = EagamiLocale;

export const WEB_LOCALES: readonly WebLocale[] = EAGAMI_LOCALE_META.map(m => m.locale);

export const WEB_LOCALE_LABELS: Record<WebLocale, string> = Object.fromEntries(
  EAGAMI_LOCALE_META.map(m => [m.locale, m.label]),
) as Record<WebLocale, string>;

export const WEB_LOCALE_FLAGS: Record<WebLocale, string> = Object.fromEntries(
  EAGAMI_LOCALE_META.map(m => [m.locale, m.flag]),
) as Record<WebLocale, string>;

export const WEB_LOCALE_DIRS: Record<WebLocale, 'ltr' | 'rtl'> = Object.fromEntries(
  EAGAMI_LOCALE_META.map(m => [m.locale, m.dir]),
) as Record<WebLocale, 'ltr' | 'rtl'>;

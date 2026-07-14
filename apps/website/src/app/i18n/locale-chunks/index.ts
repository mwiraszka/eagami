import type { EagamiLocaleBundle, EagamiLocaleLoader } from '@eagami/ui';

import type { WebLocale } from '../locale.types';
import type { WebMessages } from '../web-messages.types';

/** A locale's website and library dictionaries, shipped as one lazy chunk. */
export interface WebLocaleChunk {
  ui: EagamiLocaleBundle;
  web: WebMessages;
}

/* One dynamic import per locale so the bundler emits a chunk per language and
   a visitor only ever downloads the dictionaries they use. English is bundled
   eagerly as the prerender and fallback locale. */
export const WEB_LOCALE_CHUNKS: Record<
  Exclude<WebLocale, 'en'>,
  () => Promise<WebLocaleChunk>
> = {
  ar: () => import('./ar'),
  de: () => import('./de'),
  el: () => import('./el'),
  'es-ES': () => import('./es-ES'),
  'fr-FR': () => import('./fr-FR'),
  he: () => import('./he'),
  hi: () => import('./hi'),
  is: () => import('./is'),
  nl: () => import('./nl'),
  pl: () => import('./pl'),
  'pt-BR': () => import('./pt-BR'),
  ru: () => import('./ru'),
  uk: () => import('./uk'),
  'zh-CN': () => import('./zh-CN'),
};

/** Hands the library its half of each locale chunk via `provideEagamiUi()`. */
export const UI_LOCALE_LOADERS: Partial<Record<WebLocale, EagamiLocaleLoader>> =
  Object.fromEntries(
    (Object.keys(WEB_LOCALE_CHUNKS) as (keyof typeof WEB_LOCALE_CHUNKS)[]).map(locale => [
      locale,
      () => WEB_LOCALE_CHUNKS[locale]().then(chunk => chunk.ui),
    ]),
  );

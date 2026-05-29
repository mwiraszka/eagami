import type { EagamiLocale, EagamiMessages } from '../i18n.types';
import { el } from './el';
import { en } from './en';
import { esES } from './es-ES';
import { frFR } from './fr-FR';
import { pl } from './pl';

export { el, en, esES, frFR, pl };

/** Built-in message dictionaries, keyed by locale. */
export const EAGAMI_MESSAGES: Record<EagamiLocale, EagamiMessages> = {
  en,
  'fr-FR': frFR,
  el,
  pl,
  'es-ES': esES,
};

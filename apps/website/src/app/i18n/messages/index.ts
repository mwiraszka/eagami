import type { WebLocale } from '../locale.types';
import type { WebMessages } from '../web-messages.types';
import { el } from './el';
import { en } from './en';
import { esES } from './es-ES';
import { frFR } from './fr-FR';
import { pl } from './pl';

export { el, en, esES, frFR, pl };

export const WEB_MESSAGES: Record<WebLocale, WebMessages> = {
  en,
  'fr-FR': frFR,
  el,
  pl,
  'es-ES': esES,
};

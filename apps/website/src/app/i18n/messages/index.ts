import type { WebLocale } from '../locale.types';
import type { WebMessages } from '../web-messages.types';
import { ar } from './ar';
import { de } from './de';
import { el } from './el';
import { en } from './en';
import { esES } from './es-ES';
import { frFR } from './fr-FR';
import { he } from './he';
import { hi } from './hi';
import { is } from './is';
import { nl } from './nl';
import { pl } from './pl';
import { ptBR } from './pt-BR';
import { ru } from './ru';
import { uk } from './uk';
import { zhCN } from './zh-CN';

export { ar, de, el, en, esES, frFR, he, hi, is, nl, pl, ptBR, ru, uk, zhCN };

export const WEB_MESSAGES: Record<WebLocale, WebMessages> = {
  en,
  'fr-FR': frFR,
  el,
  pl,
  'es-ES': esES,
  de,
  'pt-BR': ptBR,
  'zh-CN': zhCN,
  is,
  nl,
  uk,
  ru,
  he,
  ar,
  hi,
};

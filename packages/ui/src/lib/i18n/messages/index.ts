import type { EagamiLocale, EagamiMessages } from '../i18n.types';
import { de } from './de';
import { el } from './el';
import { en } from './en';
import { esES } from './es-ES';
import { frFR } from './fr-FR';
import { is } from './is';
import { nl } from './nl';
import { pl } from './pl';
import { ptBR } from './pt-BR';
import { zhCN } from './zh-CN';

export { de, el, en, esES, frFR, is, nl, pl, ptBR, zhCN };

/** Built-in message dictionaries, keyed by locale. */
export const EAGAMI_MESSAGES: Record<EagamiLocale, EagamiMessages> = {
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
};

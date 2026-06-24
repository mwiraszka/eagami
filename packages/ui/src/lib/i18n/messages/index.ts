import type { EagamiLocaleBundle } from '../i18n.types';
import { de } from './de';
import { el } from './el';
import { en } from './en';
import { esES } from './es-ES';
import { frFR } from './fr-FR';
import { is } from './is';
import { nl } from './nl';
import { pl } from './pl';
import { ptBR } from './pt-BR';
import { ru } from './ru';
import { uk } from './uk';
import { zhCN } from './zh-CN';

export { de, el, en, esES, frFR, is, nl, pl, ptBR, ru, uk, zhCN };

/**
 * Every built-in locale bundle. Registering this pulls all shipped languages
 * into the bundle; import individual locales instead to keep it lean.
 */
export const EAGAMI_ALL_LOCALES: readonly EagamiLocaleBundle[] = [
  en,
  frFR,
  el,
  pl,
  esES,
  de,
  ptBR,
  zhCN,
  is,
  nl,
  uk,
  ru,
];

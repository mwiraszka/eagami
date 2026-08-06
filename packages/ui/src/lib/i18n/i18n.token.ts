import { InjectionToken } from '@angular/core';

import type { EagamiI18nConfig } from './i18n.types';

/** DI token carrying the consumer-supplied i18n configuration. */
export const EAGAMI_I18N_CONFIG = new InjectionToken<EagamiI18nConfig>(
  'EAGAMI_I18N_CONFIG',
);

import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';

import { EagamiI18nConfig } from './i18n.types';

/** DI token carrying the consumer-supplied i18n configuration. */
export const EAGAMI_I18N_CONFIG = new InjectionToken<EagamiI18nConfig>(
  'EAGAMI_I18N_CONFIG',
);

/**
 * Configures Eagami UI for the application. Pass a `locale` to switch every
 * component's built-in strings (and locale-aware date formatting) at once, and
 * optionally `messages` to override individual strings.
 *
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [provideEagamiUi({ locale: 'fr-FR' })],
 * });
 * ```
 *
 * Calling this is optional — without it the library defaults to English.
 */
export function provideEagamiUi(config: EagamiI18nConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: EAGAMI_I18N_CONFIG, useValue: config }]);
}

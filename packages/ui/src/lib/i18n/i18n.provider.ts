import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';

import { applyPalette } from '../palette/apply-palette';
import { derivePalette } from '../palette/derive-palette';
import { EagamiPaletteConfig } from '../palette/palette.types';
import { formatViolations, validatePalette } from '../palette/validate-palette';
import { EagamiI18nConfig } from './i18n.types';

/**
 * Full provider configuration for `provideEagamiUi`. Extends the i18n config
 * with an optional brand palette; omit `palette` to keep the un-themed SCSS
 * defaults.
 */
export interface EagamiUiConfig extends EagamiI18nConfig {
  /**
   * Brand palette config. The library derives a 10-shade scale via OKLCH
   * from each base hex, then asserts WCAG AA contrast on every brand-role
   * pairing. A contrast violation throws at bootstrap.
   */
  palette?: EagamiPaletteConfig;
}

/** DI token carrying the consumer-supplied i18n configuration. */
export const EAGAMI_I18N_CONFIG = new InjectionToken<EagamiI18nConfig>(
  'EAGAMI_I18N_CONFIG',
);

/**
 * Configures Eagami UI for the application.
 *
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideEagamiUi({
 *       locale: 'fr-FR',
 *       palette: { primary: { base: '#3674a1' } },
 *     }),
 *   ],
 * });
 * ```
 *
 * Optional. Without it, the library defaults to English and ships its
 * built-in brand colours.
 */
export function provideEagamiUi(config: EagamiUiConfig = {}): EnvironmentProviders {
  const i18nConfig: EagamiI18nConfig = {
    locale: config.locale,
    messages: config.messages,
  };

  return makeEnvironmentProviders([
    { provide: EAGAMI_I18N_CONFIG, useValue: i18nConfig },
    provideEnvironmentInitializer(() => {
      if (!config.palette) return;
      const palette = derivePalette(config.palette);
      const violations = validatePalette(palette);
      if (violations.length > 0) {
        throw new Error(formatViolations(violations));
      }
      applyPalette(palette);
    }),
  ]);
}

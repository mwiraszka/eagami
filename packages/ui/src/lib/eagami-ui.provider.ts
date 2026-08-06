import {
  CSP_NONCE,
  type EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';

import { EAGAMI_I18N_CONFIG } from './i18n/i18n.token';
import type { EagamiI18nConfig } from './i18n/i18n.types';
import { applyPalette } from './palette/apply-palette';
import { derivePalette } from './palette/derive-palette';
import type { EagamiPaletteConfig } from './palette/palette.types';
import { formatViolations, validatePalette } from './palette/validate-palette';

/**
 * Full provider configuration for `provideEagamiUi()`. Extends the i18n config
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

/**
 * Configures Eagami UI for the application.
 *
 * ```ts
 * import { frFR, provideEagamiUi } from '@eagami/ui';
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideEagamiUi({
 *       locale: 'fr-FR',
 *       locales: [frFR],
 *       palette: { primary: { base: '#3674a1' } },
 *     }),
 *   ],
 * });
 * ```
 *
 * Optional. Without it, the library defaults to English and ships its
 * built-in brand colours. Only English is bundled until you register more
 * languages via `locales` (pass `EAGAMI_ALL_LOCALES` for all of them), or
 * keep them out of the initial bundle entirely with `localeLoaders`:
 *
 * ```ts
 * provideEagamiUi({
 *   localeLoaders: {
 *     'fr-FR': () => import('./i18n/fr-FR').then(m => m.frFR),
 *   },
 * });
 * ```
 *
 * A `palette` installs a `<style>` tag at bootstrap, carrying Angular's
 * `CSP_NONCE` when the app provides one, so a strict `style-src` policy admits
 * it instead of dropping the theme.
 */
export function provideEagamiUi(config: EagamiUiConfig = {}): EnvironmentProviders {
  const i18nConfig: EagamiI18nConfig = {
    locale: config.locale,
    locales: config.locales,
    localeLoaders: config.localeLoaders,
    messages: config.messages,
  };

  return makeEnvironmentProviders([
    { provide: EAGAMI_I18N_CONFIG, useValue: i18nConfig },
    provideEnvironmentInitializer(() => {
      if (!config.palette) {
        return;
      }
      const palette = derivePalette(config.palette);
      const violations = validatePalette(palette);
      if (violations.length > 0) {
        throw new Error(formatViolations(violations));
      }
      applyPalette(palette, inject(CSP_NONCE, { optional: true }));
    }),
  ]);
}

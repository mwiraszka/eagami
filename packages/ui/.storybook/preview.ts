import { setCompodocJson } from '@storybook/addon-docs/angular';
import { applicationConfig } from '@storybook/angular';
import type { Preview } from '@storybook/angular';

import docJson from '../documentation.json';
import { _eagamiI18nLocaleOverride } from '../src/lib/i18n/_storybook-locale-override';
import { EagamiLocale, provideEagamiUi } from '../src/public-api';
// Story-layout utilities (`.story-row`, `.story-stack`, etc.) live in
// `.storybook/preview-head.html` as inline CSS injected into every story
// iframe. Earlier attempts to load them via SCSS import or the host project's
// `styles:` array silently dropped from the final bundle.

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    locale: {
      description: 'Eagami UI locale',
      defaultValue: 'en',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        dynamicTitle: true,
        items: [
          { value: 'en', title: 'English', right: '🇬🇧' },
          { value: 'fr-FR', title: 'Français', right: '🇫🇷' },
          { value: 'el', title: 'Ελληνικά', right: '🇬🇷' },
          { value: 'pl', title: 'Polski', right: '🇵🇱' },
          { value: 'es-ES', title: 'Español', right: '🇪🇸' },
        ],
      },
    },
  },
  decorators: [
    (storyFn, context) => {
      const locale = context.globals['locale'] as EagamiLocale;
      // Storybook does not re-bootstrap the Angular app on global changes, so
      // changing `provideEagamiUi({ locale })` alone doesn't update an already-
      // constructed `EagamiI18nService`. Push the locale through the override
      // signal too — the service watches that and applies new values live.
      _eagamiI18nLocaleOverride.set(locale);
      // Setting <html lang> lets the browser apply locale-aware case mapping
      // to text-transform: uppercase. In `el` that correctly drops the tonos
      // accent on uppercased Greek headings.
      if (typeof document !== 'undefined') {
        document.documentElement.lang = locale;
      }
      return applicationConfig({
        providers: [provideEagamiUi({ locale })],
      })(storyFn, context);
    },
  ],
};

export default preview;

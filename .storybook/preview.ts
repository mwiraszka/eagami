import { setCompodocJson } from '@storybook/addon-docs/angular';
import { applicationConfig } from '@storybook/angular';
import type { Preview } from '@storybook/angular';

import docJson from '../documentation.json';
import { EagamiLocale, provideEagamiUi } from '../src/public-api';
import './storybook.scss';

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

import { setCompodocJson } from '@storybook/addon-docs/angular';
import { type Preview, applicationConfig } from '@storybook/angular';

import docJson from '../documentation.json';
import { _eagamiI18nLocaleOverride } from '../src/lib/i18n/_storybook-locale-override';
import {
  EAGAMI_ALL_LOCALES,
  EAGAMI_LOCALE_META,
  type EagamiLocale,
  provideEagamiUi,
} from '../src/public-api';

// Story-layout helpers (.story-row etc.) live in preview-head.html; loading them
// via SCSS or the styles array gets silently dropped from the bundle.
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      // Auto argType extraction crashes ("Invalid component undefined") in SB 10.4;
      // stories declare their own argTypes instead.
      extractArgTypes: () => null,
      // Default extractor throws on stories with an unresolved component
      extractComponentDescription: (component?: { name?: string }) => {
        const name = component?.name;
        if (!name) {
          return null;
        }
        const entry = (
          docJson as { components?: { name: string; rawdescription?: string }[] }
        ).components?.find(c => c.name === name);
        return entry?.rawdescription ?? null;
      },
    },
    chromatic: {
      modes: {
        light: { globals: { theme: 'light' } },
        dark: { globals: { theme: 'dark' } },
        rtl: { globals: { theme: 'light', direction: 'rtl' } },
      },
      pauseAnimationAtEnd: true,
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
        items: EAGAMI_LOCALE_META.map(({ locale, label, flag }) => ({
          value: locale,
          title: label,
          right: flag,
        })),
      },
    },
    theme: {
      description: 'Color scheme',
      defaultValue: 'auto',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        dynamicTitle: true,
        items: [
          { value: 'auto', title: 'Auto (OS preference)', right: '🖥️' },
          { value: 'light', title: 'Light', right: '☀️' },
          { value: 'dark', title: 'Dark', right: '🌙' },
        ],
      },
    },
    direction: {
      description: 'Text direction',
      defaultValue: 'ltr',
      toolbar: {
        title: 'Direction',
        icon: 'transfer',
        dynamicTitle: true,
        items: [
          { value: 'ltr', title: 'Left to right' },
          { value: 'rtl', title: 'Right to left' },
        ],
      },
    },
  },
  decorators: [
    (storyFn, context) => {
      const locale = context.globals['locale'] as EagamiLocale;
      const theme = context.globals['theme'] as 'auto' | 'light' | 'dark';
      const direction = context.globals['direction'] as 'ltr' | 'rtl';
      // Storybook doesn't re-bootstrap Angular on a global change, so push the
      // locale through the override signal, which the running service watches.
      _eagamiI18nLocaleOverride.set(locale);
      if (typeof document !== 'undefined') {
        // <html lang> drives locale-aware uppercasing (e.g. Greek drops the tonos).
        document.documentElement.lang = locale;
        document.documentElement.dir = direction;
        if (theme === 'auto') {
          delete document.documentElement.dataset['theme'];
        } else {
          document.documentElement.dataset['theme'] = theme;
        }
      }
      return applicationConfig({
        providers: [provideEagamiUi({ locale, locales: EAGAMI_ALL_LOCALES })],
      })(storyFn, context);
    },
  ],
};

export default preview;

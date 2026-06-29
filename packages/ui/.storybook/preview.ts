import { setCompodocJson } from '@storybook/addon-docs/angular';
import { applicationConfig } from '@storybook/angular';
import type { Preview } from '@storybook/angular';

import docJson from '../documentation.json';
import { _eagamiI18nLocaleOverride } from '../src/lib/i18n/_storybook-locale-override';
import {
  EAGAMI_ALL_LOCALES,
  EAGAMI_LOCALE_META,
  type EagamiLocale,
  provideEagamiUi,
} from '../src/public-api';

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
    docs: {
      // Disable @storybook/angular's compodoc-driven argType extraction.
      // Storybook 10.4 + the chromatic runtime crashed with "Invalid
      // component undefined" inside the extractor for every story; stories
      // that need controls declare their own `argTypes` explicitly so we
      // lose nothing by skipping the auto-extract.
      extractArgTypes: () => null,
      // Default extractor throws on stories with an unresolved component
      extractComponentDescription: (component?: { name?: string }) => {
        const name = component?.name;
        if (!name) return null;
        const entry = (
          docJson as { components?: { name: string; rawdescription?: string }[] }
        ).components?.find(c => c.name === name);
        return entry?.rawdescription ?? null;
      },
    },
    chromatic: {
      // Capture every story twice (light + dark) by driving the `theme`
      // toolbar global, which the decorator below maps onto `<html data-
      // theme="…">`. Pause Storybook's animations so screenshots aren't
      // racy with transitions.
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
        // Derived from the library's locale metadata so every shipped language
        // appears automatically; adding a locale never needs a toolbar edit.
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
      // Storybook does not re-bootstrap the Angular app on global changes, so
      // changing `provideEagamiUi({ locale })` alone doesn't update an already-
      // constructed `EagamiI18nService`. Push the locale through the override
      // signal too — the service watches that and applies new values live.
      _eagamiI18nLocaleOverride.set(locale);
      if (typeof document !== 'undefined') {
        // Setting <html lang> lets the browser apply locale-aware case mapping
        // to text-transform: uppercase. In `el` that correctly drops the tonos
        // accent on uppercased Greek headings.
        document.documentElement.lang = locale;
        document.documentElement.dir = direction;
        // The library's design tokens read `[data-theme="light"]` /
        // `[data-theme="dark"]` on `<html>`; the default `auto` removes the
        // attribute and falls back to `prefers-color-scheme`.
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

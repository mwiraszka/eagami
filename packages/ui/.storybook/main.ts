// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from '@storybook/angular';
import { createRequire } from 'module';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);

// pnpm strict hoisting hides these loaders from the root, so resolve them from
// @angular-devkit/build-angular, which depends on them.
function resolveLoader(name: string): string {
  const buildAngularDir = dirname(
    require.resolve('@angular-devkit/build-angular/package.json'),
  );
  return require.resolve(name, { paths: [buildAngularDir] });
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // @chromatic-com/storybook is what makes Chromatic's theme `modes` actually apply.
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@chromatic-com/storybook'],
  framework: '@storybook/angular',
  // One docs entry per component; individual stories are hidden from the sidebar.
  docs: { docsMode: true },
  webpackFinal: async config => {
    const storybookDir = dirname(fileURLToPath(import.meta.url));
    const rules = config.module?.rules || [];

    // The Angular preset's SCSS rules lack css/style-loader (esbuild builder), so
    // exclude .storybook/ from them and add our own rule below.
    for (const rule of rules) {
      if (
        rule &&
        typeof rule === 'object' &&
        'test' in rule &&
        rule.test instanceof RegExp &&
        rule.test.test('.scss')
      ) {
        const existing = rule.exclude;
        const storybookPattern = /[\\/]\.storybook[\\/]/;
        if (Array.isArray(existing)) {
          existing.push(storybookPattern);
        } else if (existing) {
          rule.exclude = [existing, storybookPattern];
        } else {
          rule.exclude = storybookPattern;
        }
      }
    }

    rules.push({
      test: /\.scss$/,
      include: [storybookDir],
      use: [
        resolveLoader('style-loader'),
        resolveLoader('css-loader'),
        resolveLoader('sass-loader'),
      ],
    });

    return config;
  },
};
export default config;

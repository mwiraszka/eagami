// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from '@storybook/angular';
import { createRequire } from 'module';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);

/**
 * Resolve a loader package from @angular-devkit/build-angular's dependency
 * tree. pnpm strict hoisting means these aren't directly resolvable from the
 * project root, but the Angular build package has them as dependencies.
 */
function resolveLoader(name: string): string {
  const buildAngularDir = dirname(
    require.resolve('@angular-devkit/build-angular/package.json'),
  );
  return require.resolve(name, { paths: [buildAngularDir] });
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // `@chromatic-com/storybook` is required for Chromatic's `modes` to apply
  // the `theme` global during capture — without it the light/dark modes are
  // created but both render at the default global (light).
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
  ],
  framework: '@storybook/angular',
  webpackFinal: async config => {
    const storybookDir = dirname(fileURLToPath(import.meta.url));
    const rules = config.module?.rules || [];

    // Exclude .storybook/ from existing SCSS rules set up by the Angular
    // preset — they lack css-loader/style-loader because the browserTarget
    // uses the esbuild-based @angular/build:application builder.
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

    // Add a complete SCSS rule for .storybook/ imports.
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

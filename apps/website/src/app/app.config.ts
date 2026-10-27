import { provideEagamiUi } from '@eagami/ui';
import { provideStaleBuildReload } from '@eagami/ui/router';
import * as Sentry from '@sentry/angular';

import { ViewportScroller } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  type ApplicationConfig,
  ErrorHandler,
  inject,
  provideEnvironmentInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';

import { version } from '../../package.json';
import { routes } from './app.routes';
import { UI_LOCALE_LOADERS } from './i18n/locale-chunks';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useValue: Sentry.createErrorHandler() },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withPreloading(PreloadAllModules),
    ),
    provideStaleBuildReload({
      version,
      onReport: ({ outcome, route, fromVersion, toVersion }) =>
        Sentry.logger.info('Stale build reload', {
          outcome,
          route,
          from_version: fromVersion,
          to_version: toVersion,
        }),
    }),
    provideEnvironmentInitializer(() => {
      const scroller = inject(ViewportScroller);
      // On narrow screens the sticky Eagami UI menu trigger sits under the
      // header; measuring live means it only counts when actually shown
      scroller.setOffset(() => {
        const header = document.querySelector('web-header');
        const trigger = document.querySelector('.ui-shell__menu-trigger');
        const headerHeight = header?.getBoundingClientRect().height ?? 64;
        const triggerHeight = trigger?.getBoundingClientRect().height ?? 0;
        return [0, headerHeight + triggerHeight];
      });
    }),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideEagamiUi({ localeLoaders: UI_LOCALE_LOADERS }),
  ],
};

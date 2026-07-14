import { provideEagamiUi } from '@eagami/ui';

import { ViewportScroller } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  type ApplicationConfig,
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

import { routes } from './app.routes';
import { UI_LOCALE_LOADERS } from './i18n/locale-chunks';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withPreloading(PreloadAllModules),
    ),
    provideEnvironmentInitializer(() => {
      const scroller = inject(ViewportScroller);
      scroller.setOffset(() => {
        const header = document.querySelector('web-header');
        return [0, header?.getBoundingClientRect().height ?? 64];
      });
    }),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideEagamiUi({ localeLoaders: UI_LOCALE_LOADERS }),
  ],
};

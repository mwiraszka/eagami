import { EAGAMI_ALL_LOCALES, provideEagamiUi } from '@eagami/ui';

import { ViewportScroller } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  type ApplicationConfig,
  inject,
  provideEnvironmentInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
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
    provideEagamiUi({ locales: EAGAMI_ALL_LOCALES }),
  ],
};

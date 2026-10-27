import { isStaleBuildReloadError } from '@eagami/ui/router';
import * as Sentry from '@sentry/angular';

import { bootstrapApplication } from '@angular/platform-browser';

import { environment } from '@env';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

Sentry.init({
  dsn: environment.sentryDsn,
  environment: environment.sentryEnvironment,
  enabled: !!environment.sentryDsn,
  tracesSampleRate: 0,
  // Raised by browser extensions running on the page, not by the app
  ignoreErrors: [/runtime\.sendMessage/, /Extension context invalidated/],
  // Taken care of by loading the current build, and reported once settled as a log
  beforeSend: (event, hint) =>
    isStaleBuildReloadError(hint.originalException) ? null : event,
  denyUrls: [
    /^chrome-extension:\/\//,
    /^moz-extension:\/\//,
    /^safari-(web-)?extension:\/\//,
  ],
});

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

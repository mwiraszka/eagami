import { firstValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
import type { Mock } from 'vitest';

import { Location } from '@angular/common';
import { SpyLocation, provideLocationMocks } from '@angular/common/testing';
import { Component, ErrorHandler, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, NavigationError, Router, provideRouter } from '@angular/router';

import {
  LOAD_PAGE,
  type StaleBuildReloadConfig,
  type StaleBuildReloadReport,
  isStaleBuildReloadError,
  provideStaleBuildReload,
} from './stale-build-reload';

@Component({ template: '' })
class BlankComponent {}

const PENDING_RELOAD_KEY = 'ea-pending-reload';
const VERSION = '2.0.0';

describe('provideStaleBuildReload', () => {
  let router: Router;
  let location: SpyLocation;
  let importError: Error;
  let loadPage: Mock<(url: string, replace: boolean) => void>;
  let onReport: Mock<(report: StaleBuildReloadReport) => void>;

  const pendingReload = () =>
    JSON.parse(sessionStorage.getItem(PENDING_RELOAD_KEY) ?? 'null');

  const leavePendingReloadFromPreviousPage = () =>
    sessionStorage.setItem(
      PENDING_RELOAD_KEY,
      JSON.stringify({ pageId: 'previous-page', route: '/events', version: '1.9.0' }),
    );

  const start = (config: StaleBuildReloadConfig = { version: VERSION, onReport }) => {
    TestBed.configureTestingModule({ providers: [provideStaleBuildReload(config)] });
    router = TestBed.inject(Router);
    location = TestBed.inject(SpyLocation);
  };

  beforeEach(() => {
    importError = new TypeError(
      'Failed to fetch dynamically imported module: https://example.com/chunk-OLD.js',
    );
    loadPage = vi.fn<(url: string, replace: boolean) => void>();
    onReport = vi.fn<(report: StaleBuildReloadReport) => void>();

    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: BlankComponent },
          { path: 'about', component: BlankComponent },
          { path: 'events', loadComponent: () => Promise.reject(importError) },
        ]),
        provideLocationMocks(),
        { provide: SpyLocation, useExisting: Location },
        { provide: ErrorHandler, useValue: { handleError: vi.fn() } },
        { provide: LOAD_PAGE, useValue: loadPage },
      ],
      rethrowApplicationErrors: false,
    });
  });

  afterEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  describe('when the page being opened fails to load', () => {
    it('loads it in full as a new history entry', async () => {
      start();
      await router.navigateByUrl('/');

      await expect(router.navigateByUrl('/events')).rejects.toBe(importError);

      expect(loadPage).toHaveBeenCalledExactlyOnceWith('/events', false);
      expect(pendingReload()).toEqual({
        pageId: expect.any(String),
        route: '/events',
        version: VERSION,
      });
    });

    it.each([
      'Failed to fetch dynamically imported module: https://example.com/chunk-OLD.js',
      'error loading dynamically imported module: https://example.com/chunk-OLD.js',
      'Importing a module script failed.',
      "'text/html' is not a valid JavaScript MIME type.",
    ])('recognises the failure as worded "%s"', async message => {
      importError = new TypeError(message);
      start();
      await router.navigateByUrl('/');

      await expect(router.navigateByUrl('/events')).rejects.toBe(importError);

      expect(loadPage).toHaveBeenCalledOnce();
    });

    it('keeps the query and fragment but leaves them out of the report', async () => {
      start();
      await router.navigateByUrl('/');

      await expect(router.navigateByUrl('/events?page=2#top')).rejects.toBe(importError);

      expect(loadPage).toHaveBeenCalledExactlyOnceWith('/events?page=2#top', false);
      expect(pendingReload().route).toBe('/events');
    });

    it('replaces the history entry when it is the first navigation', async () => {
      start();

      await expect(router.navigateByUrl('/events')).rejects.toBe(importError);

      expect(loadPage).toHaveBeenCalledExactlyOnceWith('/events', true);
    });

    it('replaces the history entry when the navigation replaces the URL', async () => {
      start();
      await router.navigateByUrl('/');

      await expect(router.navigateByUrl('/events', { replaceUrl: true })).rejects.toBe(
        importError,
      );

      expect(loadPage).toHaveBeenCalledExactlyOnceWith('/events', true);
    });

    it('replaces the history entry when reached with Back or Forward', async () => {
      start();
      const firstNavigationEnd = firstValueFrom(
        router.events.pipe(filter(event => event instanceof NavigationEnd)),
      );
      router.initialNavigation();
      await firstNavigationEnd;
      const navigationError = firstValueFrom(
        router.events.pipe(filter(event => event instanceof NavigationError)),
      );

      location.simulateUrlPop('/events');
      await navigationError;

      expect(loadPage).toHaveBeenCalledExactlyOnceWith('/events', true);
    });

    it('marks the error as answered by the reload', async () => {
      start();
      await router.navigateByUrl('/');

      await expect(router.navigateByUrl('/events')).rejects.toBe(importError);

      expect(isStaleBuildReloadError(importError)).toBe(true);
    });
  });

  describe('when the page does not load the current build', () => {
    it('does not for any other navigation error', async () => {
      importError = new TypeError("Cannot read properties of undefined (reading 'id')");
      start();
      await router.navigateByUrl('/');

      await expect(router.navigateByUrl('/events')).rejects.toBe(importError);

      expect(loadPage).not.toHaveBeenCalled();
      expect(isStaleBuildReloadError(importError)).toBe(false);
    });

    it('does not while offline', async () => {
      vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
      start();
      await router.navigateByUrl('/');

      await expect(router.navigateByUrl('/events')).rejects.toBe(importError);

      expect(loadPage).not.toHaveBeenCalled();
      expect(isStaleBuildReloadError(importError)).toBe(false);
    });

    it('does not when session storage is unavailable', async () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new DOMException('Storage is disabled', 'SecurityError');
      });
      start();
      await router.navigateByUrl('/');

      await expect(router.navigateByUrl('/events')).rejects.toBe(importError);

      expect(loadPage).not.toHaveBeenCalled();
      expect(isStaleBuildReloadError(importError)).toBe(false);
    });

    it('does not during server rendering', async () => {
      TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
      start();
      await router.navigateByUrl('/');

      await expect(router.navigateByUrl('/events')).rejects.toBe(importError);

      expect(loadPage).not.toHaveBeenCalled();
    });
  });

  describe('after the reload', () => {
    it('reports the page opening on the current build', async () => {
      leavePendingReloadFromPreviousPage();
      start();

      await router.navigateByUrl('/about');

      expect(onReport).toHaveBeenCalledExactlyOnceWith({
        outcome: 'recovered',
        route: '/events',
        fromVersion: '1.9.0',
        toVersion: VERSION,
      });
      expect(pendingReload()).toBeNull();
    });

    it('reports a page that still fails and leaves its error unmarked', async () => {
      leavePendingReloadFromPreviousPage();
      start();

      await expect(router.navigateByUrl('/events')).rejects.toBe(importError);

      expect(loadPage).not.toHaveBeenCalled();
      expect(isStaleBuildReloadError(importError)).toBe(false);
      expect(onReport).toHaveBeenCalledExactlyOnceWith({
        outcome: 'failed-after-reload',
        route: '/events',
        fromVersion: '1.9.0',
        toVersion: VERSION,
      });
      expect(pendingReload()).toBeNull();
    });

    it('does not report navigations once the outcome is known', async () => {
      leavePendingReloadFromPreviousPage();
      start();
      await router.navigateByUrl('/about');

      await router.navigateByUrl('/');

      expect(onReport).toHaveBeenCalledOnce();
    });

    it('settles quietly without an onReport', async () => {
      leavePendingReloadFromPreviousPage();
      start({});

      await router.navigateByUrl('/about');

      expect(pendingReload()).toBeNull();
    });
  });

  describe('when the visitor stays on the page instead of leaving it', () => {
    it('reports it once they open a page that loads', async () => {
      start();
      await router.navigateByUrl('/');
      await expect(router.navigateByUrl('/events')).rejects.toBe(importError);

      await router.navigateByUrl('/about');

      expect(onReport).toHaveBeenCalledExactlyOnceWith({
        outcome: 'stayed',
        route: '/events',
        fromVersion: VERSION,
        toVersion: VERSION,
      });
      expect(pendingReload()).toBeNull();
    });

    it('reports it and reloads again when another page fails to load', async () => {
      start();
      await router.navigateByUrl('/');
      await expect(router.navigateByUrl('/events')).rejects.toBe(importError);

      await expect(router.navigateByUrl('/events')).rejects.toBe(importError);

      expect(onReport).toHaveBeenCalledExactlyOnceWith({
        outcome: 'stayed',
        route: '/events',
        fromVersion: VERSION,
        toVersion: VERSION,
      });
      expect(loadPage).toHaveBeenCalledTimes(2);
      expect(pendingReload()).not.toBeNull();
    });
  });
});

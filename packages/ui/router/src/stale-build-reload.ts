import { DOCUMENT, Location, isPlatformBrowser } from '@angular/common';
import {
  type EnvironmentProviders,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';
import { NavigationEnd, NavigationError, Router } from '@angular/router';

/**
 * How a reload into the current build turned out:
 *
 * - `'recovered'`: the reloaded page opened
 * - `'failed-after-reload'`: the reloaded page failed to open too, so the error is left to surface
 * - `'stayed'`: the visitor chose to stay when the browser asked them to confirm leaving
 */
export type StaleBuildReloadOutcome = 'recovered' | 'failed-after-reload' | 'stayed';

export interface StaleBuildReloadReport {
  outcome: StaleBuildReloadOutcome;
  /** The path that failed to open, without its query or fragment. */
  route: string;
  /** The `version` configured in the build that failed to open the page. */
  fromVersion?: string;
  /** The `version` configured in the build making the report. */
  toVersion?: string;
}

export interface StaleBuildReloadConfig {
  /** The app's version, carried across the reload so a report names both builds. */
  version?: string;
  /** Called once per reload with how it turned out, for example to log it. */
  onReport?: (report: StaleBuildReloadReport) => void;
}

interface PendingReload {
  pageId: string;
  route: string;
  version?: string;
}

const PENDING_RELOAD_KEY = 'ea-pending-reload';

// Each browser engine words a failed dynamic import differently
const CHUNK_LOAD_FAILURES = [
  'Failed to fetch dynamically imported module', // Chromium
  'error loading dynamically imported module', // Firefox
  'Importing a module script failed', // WebKit
  'is not a valid JavaScript MIME type', // WebKit, when the host answers a removed file with the app's page
];

const STALE_BUILD_RELOAD_CONFIG = new InjectionToken<StaleBuildReloadConfig>(
  'STALE_BUILD_RELOAD_CONFIG',
);

// Swappable in tests, since jsdom cannot navigate
export const LOAD_PAGE = new InjectionToken<(url: string, replace: boolean) => void>(
  'LOAD_PAGE',
  {
    providedIn: 'root',
    factory: () => {
      const location = inject(DOCUMENT).location;
      return (url, replace) => (replace ? location.replace(url) : location.assign(url));
    },
  },
);

const reloadedErrors = new WeakSet<Error>();

/**
 * Whether `error` is a failed page load that `provideStaleBuildReload()` has
 * already answered by reloading. Error reporters can drop it, since the
 * reload's outcome reaches `onReport` instead:
 *
 * ```ts
 * Sentry.init({
 *   beforeSend: (event, hint) =>
 *     isStaleBuildReloadError(hint.originalException) ? null : event,
 * });
 * ```
 */
export function isStaleBuildReloadError(error: unknown): boolean {
  return error instanceof Error && reloadedErrors.has(error);
}

function isChunkLoadFailure(error: unknown): error is TypeError {
  return (
    error instanceof TypeError &&
    CHUNK_LOAD_FAILURES.some(failure => error.message.includes(failure))
  );
}

function isSessionStorageAvailable(): boolean {
  const probeKey = `${PENDING_RELOAD_KEY}-probe`;
  try {
    sessionStorage.setItem(probeKey, probeKey);
    sessionStorage.removeItem(probeKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * A pending reload left by another page means this page is that reload. One
 * left by this same page means the visitor stayed when asked to confirm leaving.
 */
@Injectable()
class StaleBuildReloader {
  private readonly config = inject(STALE_BUILD_RELOAD_CONFIG);
  private readonly loadPage = inject(LOAD_PAGE);
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  private readonly canTrackReloads = isSessionStorageAvailable();
  private readonly pageId = Math.random().toString(36).slice(2);

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.settlePendingReload();
      } else if (event instanceof NavigationError && isChunkLoadFailure(event.error)) {
        this.reloadIntoCurrentBuild(event.url, event.error);
      }
    });
  }

  private settlePendingReload(): void {
    const pending = this.takePendingReload();

    if (pending) {
      this.report(pending.pageId === this.pageId ? 'stayed' : 'recovered', pending);
    }
  }

  private reloadIntoCurrentBuild(url: string, error: TypeError): void {
    const pending = this.takePendingReload();

    if (pending) {
      const isAfterReload = pending.pageId !== this.pageId;
      this.report(isAfterReload ? 'failed-after-reload' : 'stayed', pending);

      if (isAfterReload) {
        return;
      }
    }

    // Untracked, a failing reload could repeat forever, and offline it would only leave the app
    if (!this.canTrackReloads || !navigator.onLine) {
      return;
    }

    const navigation = this.router.currentNavigation();
    // A first load, Back or Forward, or a replacing navigation already has its history entry
    const replace =
      !this.router.navigated ||
      navigation?.trigger !== 'imperative' ||
      !!navigation.extras.replaceUrl;

    const reload: PendingReload = {
      pageId: this.pageId,
      route: url.replace(/[?#].*/, ''),
      version: this.config.version,
    };
    sessionStorage.setItem(PENDING_RELOAD_KEY, JSON.stringify(reload));
    reloadedErrors.add(error);

    this.loadPage(this.location.prepareExternalUrl(url), replace);
  }

  private takePendingReload(): PendingReload | null {
    const value = this.canTrackReloads
      ? sessionStorage.getItem(PENDING_RELOAD_KEY)
      : null;

    if (!value) {
      return null;
    }

    sessionStorage.removeItem(PENDING_RELOAD_KEY);
    return JSON.parse(value);
  }

  private report(outcome: StaleBuildReloadOutcome, pending: PendingReload): void {
    this.config.onReport?.({
      outcome,
      route: pending.route,
      fromVersion: pending.version,
      toVersion: this.config.version,
    });
  }
}

/**
 * Loads the current build in full when the code of a page being opened fails
 * to load, which is what a tab still running a build that a deploy has since
 * replaced runs into. The reload opens the page the visitor asked for, and
 * stops after one attempt if the new build fails as well.
 *
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [provideRouter(routes), provideStaleBuildReload()],
 * });
 * ```
 *
 * Does nothing during server rendering.
 */
export function provideStaleBuildReload(
  config: StaleBuildReloadConfig = {},
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: STALE_BUILD_RELOAD_CONFIG, useValue: config },
    StaleBuildReloader,
    // Created ahead of the first navigation, which a tab restored on an old build can fail
    provideEnvironmentInitializer(() => {
      if (isPlatformBrowser(inject(PLATFORM_ID))) {
        inject(StaleBuildReloader);
      }
    }),
  ]);
}

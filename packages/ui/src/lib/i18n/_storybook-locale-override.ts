import { signal } from '@angular/core';

import type { EagamiLocale } from './i18n.types';

/**
 * Module-level signal that lets external tooling (notably the Storybook
 * preview decorator) imperatively override the active locale on a running
 * `EagamiI18nService` without re-bootstrapping the Angular application.
 *
 * `null` means "no override": the service uses its constructor-time locale.
 *
 * @internal Not part of the public API. Library consumers should call
 *           `EagamiI18nService.setLocale()` instead.
 */
export const _eagamiI18nLocaleOverride = signal<EagamiLocale | null>(null);

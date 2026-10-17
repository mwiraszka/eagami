import { InjectionToken } from '@angular/core';

/**
 * When a form component shows its validation error.
 *
 * - `'change'`: once the user changes the field and leaves it, or submits the
 *   form. A field the user tabs past stays quiet, and a new error waits until
 *   focus leaves the field.
 * - `'touch'`: as soon as the user leaves the field, even unchanged, and live
 *   while they edit it after that.
 */
export type EaShowErrorsOn = 'change' | 'touch';

/**
 * App-wide defaults for form components, set through
 * `provideEagamiUi({ forms })`. A form component's own `showErrorsOn` input
 * wins over these for that one field.
 */
export interface EagamiFormsConfig {
  /** When form components show their validation errors; `'change'` by default. */
  showErrorsOn?: EaShowErrorsOn;
}

/** DI token carrying the consumer-supplied form defaults. */
export const EAGAMI_FORMS_CONFIG = new InjectionToken<EagamiFormsConfig>(
  'EAGAMI_FORMS_CONFIG',
  { providedIn: 'root', factory: () => ({}) },
);

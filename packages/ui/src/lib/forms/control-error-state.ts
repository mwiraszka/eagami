import {
  Injector,
  type Signal,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { type AbstractControl, NgControl, type ValidationErrors } from '@angular/forms';

import { EagamiI18nService } from '../i18n/i18n.service';
import type { EagamiMessages } from '../i18n/i18n.types';

/** Validator error keys the library ships built-in localized messages for. */
export type EaValidationErrorKey =
  'required' | 'email' | 'min' | 'max' | 'minlength' | 'maxlength' | 'pattern';

/**
 * Per-error-key message overrides for a form control. Keys are validator error
 * names (`required`, `email`, or any custom validator key); values are the text
 * shown when that error is the active one. Keys left unset fall back to the
 * library's localized default message.
 */
export type EaErrorMessages = Partial<Record<string, string>>;

export interface ControlErrorStateConfig {
  /** Explicit error text; shown unconditionally and overrides any auto-derived message. */
  errorMsg: Signal<string | null | undefined>;
  /** Per-error-key overrides for auto-derived validation messages. */
  errorMessages: Signal<EaErrorMessages | undefined>;
}

export interface ControlErrorState {
  /** Error text to display, or `null` when the field is valid or untouched. */
  readonly error: Signal<string | null>;
  /** Whether the field should render its error state. */
  readonly hasError: Signal<boolean>;
}

/**
 * Derives a form control's display error from, in priority order: an explicit
 * `errorMsg`, a consumer `errorMessages` override, then the library's localized
 * default for the active `ValidationErrors` key. Auto-derived messages surface
 * only once the bound control is `invalid && touched`, matching the moment a
 * user expects validation feedback. The control arrives as a signal so callers
 * decide how it is resolved: from the host's own `NgControl` (CVA components)
 * or from projected content (`<ea-form-field>`).
 */
export function controlErrorStateFrom(
  control: Signal<AbstractControl | null>,
  config: ControlErrorStateConfig,
): ControlErrorState {
  const i18n = inject(EagamiI18nService);

  // Bumped on every status/touched change so the computed re-reads the control
  const revision = signal(0);

  effect(onCleanup => {
    const ctrl = control();
    if (!ctrl) {
      return;
    }
    const sub = ctrl.events.subscribe(() => revision.update(r => r + 1));
    onCleanup(() => sub.unsubscribe());
  });

  const autoError = computed<string | null>(() => {
    revision();
    const ctrl = control();
    if (!ctrl || !ctrl.invalid || !ctrl.touched || !ctrl.errors) {
      return null;
    }
    return resolveValidationMessage(ctrl.errors, config.errorMessages(), i18n.messages());
  });

  const error = computed<string | null>(() => config.errorMsg() || autoError());
  const hasError = computed(() => error() !== null);

  return { error, hasError };
}

/**
 * `controlErrorStateFrom` for a component hosting its own form directive.
 *
 * The bound `NgControl` is resolved lazily from the injector rather than via
 * constructor injection: a control that provides `NG_VALUE_ACCESSOR` cannot
 * also inject its own `NgControl` directly without a circular dependency.
 * `afterNextRender` defers resolution to the browser, after the host directive
 * (`formControl` / `ngModel`) exists, so the server render simply shows no
 * error (an untouched control never does).
 *
 * The lookup is `self`-scoped to the host element. Without it the search walks
 * up the element injectors, so a field rendered inside another bound field
 * (the checkboxes in a multi-select's option list, say) would adopt the outer
 * control and repeat its error message on every row.
 */
export function injectControlErrorState(
  config: ControlErrorStateConfig,
): ControlErrorState {
  const injector = inject(Injector);

  const control = signal<AbstractControl | null>(null);

  afterNextRender(
    () => {
      const ngControl = injector.get(NgControl, null, { self: true, optional: true });
      control.set(ngControl?.control ?? null);
    },
    { injector },
  );

  return controlErrorStateFrom(control, config);
}

/**
 * Picks the first active error key and resolves its message: a consumer
 * override wins, otherwise the localized built-in default (interpolating the
 * validator's own params), falling back to a generic message for unknown keys.
 */
function resolveValidationMessage(
  errors: ValidationErrors,
  overrides: EaErrorMessages | undefined,
  messages: EagamiMessages,
): string | null {
  const key = Object.keys(errors)[0];
  if (!key) {
    return null;
  }

  const override = overrides?.[key];
  if (override) {
    return override;
  }

  const v = messages.validation;
  const detail = errors[key];
  switch (key) {
    case 'required':
      return v.required;
    case 'email':
      return v.email;
    case 'minlength':
      return v.minlength(detail?.requiredLength ?? 0);
    case 'maxlength':
      return v.maxlength(detail?.requiredLength ?? 0);
    case 'min':
      return v.min(detail?.min ?? 0);
    case 'max':
      return v.max(detail?.max ?? 0);
    case 'pattern':
      return v.pattern;
    default:
      return v.invalid;
  }
}

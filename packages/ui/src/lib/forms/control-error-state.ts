import {
  DestroyRef,
  ElementRef,
  Injector,
  type Signal,
  afterNextRender,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import {
  type AbstractControl,
  FormResetEvent,
  FormSubmittedEvent,
  NgControl,
  TouchedChangeEvent,
  type ValidationErrors,
} from '@angular/forms';

import { EagamiI18nService } from '../i18n/i18n.service';
import type { EagamiMessages } from '../i18n/i18n.types';
import { PointerPressTracker } from '../pointer-press';
import { EAGAMI_FORMS_CONFIG, type EaShowErrorsOn } from './forms-config';

/** Validator error keys the library ships built-in localized messages for. */
export type EaValidationErrorKey =
  'required' | 'email' | 'min' | 'max' | 'minlength' | 'maxlength' | 'pattern';

/**
 * Per-error-key message overrides for a form control. Keys are validator error
 * names (`required`, `email`, or any custom validator key); values are the text
 * shown when that error is the active one. Keys left unset fall back to the
 * library's localized default message, and a key set to `null` is never shown,
 * so a field whose only errors are hidden keeps out of its error state.
 */
export type EaErrorMessages = Partial<Record<string, string | null>>;

export interface ControlErrorStateConfig {
  /** Explicit error text; shown unconditionally and overrides any auto-derived message. */
  errorMsg: Signal<string | null | undefined>;
  /** Per-error-key overrides for auto-derived validation messages. */
  errorMessages: Signal<EaErrorMessages | undefined>;
  /** Field-level `showErrorsOn`; `undefined` falls back to the app-wide `forms` config. */
  showErrorsOn?: Signal<EaShowErrorsOn | undefined>;
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
 * default for the active `ValidationErrors` key.
 *
 * Auto-derived messages surface only once the bound control is `invalid &&
 * touched`. Under the default `showErrorsOn: 'change'`, a new one waits while
 * focus is still inside the field, until the user leaves it or submits the
 * form, so nothing is flagged mid-edit, and a field the user only passed
 * through, leaving it without changing it, stays quiet until they change it or
 * the form is submitted, so tabbing past an empty required field never flags
 * it. `'touch'` drops both holds. A message already showing follows the value
 * as it is typed and clears the moment it is fixed. A message revealed by a
 * pointer press moving focus away waits until that press has landed its click,
 * in either mode. The control arrives as a signal
 * so callers decide how it is resolved: from the host's own `NgControl` (CVA
 * components) or from projected content (`<ea-form-field>`).
 */
export function controlErrorStateFrom(
  control: Signal<AbstractControl | null>,
  config: ControlErrorStateConfig,
): ControlErrorState {
  const i18n = inject(EagamiI18nService);
  const press = inject(PointerPressTracker);
  const injector = inject(Injector);
  const destroyRef = inject(DestroyRef);
  const host = inject<ElementRef<HTMLElement>>(ElementRef, { optional: true });
  const formsConfig = inject(EAGAMI_FORMS_CONFIG);

  const showOnTouch = computed(
    () => (config.showErrorsOn?.() ?? formsConfig.showErrorsOn ?? 'change') === 'touch',
  );

  // Bumped on every status/touched change so the computed re-reads the control
  const revision = signal(0);
  const editing = signal(false);
  // A submit shows every error at once, including one held back mid-edit
  const revealedBySubmit = signal(false);
  // Set when the user leaves the field without changing it; a field the app marks
  // touched shows its errors straight away
  const passedThrough = signal(false);

  // The message a blur reveals grows the field and shifts the layout under the
  // pointer, so while the press behind that blur is down the click would land
  // on whatever moved into its place
  const revealPending = signal(false);
  let dropPendingReveal: (() => void) | null = null;
  const holdRevealForPress = (): void => {
    dropPendingReveal?.();
    revealPending.set(true);
    dropPendingReveal = press.whenPressEnds(() => revealPending.set(false));
  };
  destroyRef.onDestroy(() => dropPendingReveal?.());

  effect(onCleanup => {
    const ctrl = control();
    if (!ctrl) {
      return;
    }
    const onSubmit = (): void => {
      revealedBySubmit.set(true);
      passedThrough.set(false);
    };
    const sub = ctrl.events.subscribe(event => {
      if (event instanceof TouchedChangeEvent) {
        if (event.touched) {
          holdRevealForPress();
        }
        // The field's own blur marks it touched while focus is still inside it
        passedThrough.set(event.touched && editing() && ctrl.pristine);
      }
      if (event instanceof FormSubmittedEvent) {
        onSubmit();
      }
      if (event instanceof FormResetEvent) {
        passedThrough.set(false);
      }
      revision.update(r => r + 1);
    });
    const rootSub =
      ctrl.root === ctrl
        ? null
        : ctrl.root.events.subscribe(event => {
            if (event instanceof FormSubmittedEvent) {
              onSubmit();
            }
            if (event instanceof FormResetEvent) {
              passedThrough.set(false);
            }
          });
    onCleanup(() => {
      sub.unsubscribe();
      rootSub?.unsubscribe();
      dropPendingReveal?.();
      revealPending.set(false);
    });
  });

  if (host) {
    afterNextRender(
      () => {
        const element = host.nativeElement;
        const onFocusIn = (): void => {
          editing.set(true);
          revealedBySubmit.set(false);
        };
        const onFocusOut = (event: FocusEvent): void => {
          if (
            event.relatedTarget instanceof Node &&
            element.contains(event.relatedTarget)
          ) {
            return;
          }
          editing.set(false);
          revealedBySubmit.set(false);
          holdRevealForPress();
        };
        editing.set(element.contains(document.activeElement));
        element.addEventListener('focusin', onFocusIn);
        element.addEventListener('focusout', onFocusOut);
        destroyRef.onDestroy(() => {
          element.removeEventListener('focusin', onFocusIn);
          element.removeEventListener('focusout', onFocusOut);
        });
      },
      { injector },
    );
  }

  const validationError = computed<string | null>(() => {
    revision();
    const ctrl = control();
    if (!ctrl || !ctrl.invalid || !ctrl.touched || !ctrl.errors) {
      return null;
    }
    if (ctrl.pristine && passedThrough() && !showOnTouch()) {
      return null;
    }
    return resolveValidationMessage(ctrl.errors, config.errorMessages(), i18n.messages());
  });

  // Only a new message is held back; one already showing keeps following the value
  const autoError = linkedSignal<
    { message: string | null; holding: boolean },
    string | null
  >({
    source: () => ({
      message: validationError(),
      holding: revealPending() || (editing() && !revealedBySubmit() && !showOnTouch()),
    }),
    computation: ({ message, holding }, previous) =>
      previous?.value || !holding ? message : null,
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
 * Picks the first active error key the consumer hasn't hidden and resolves its
 * message: a consumer override wins, otherwise the localized built-in default
 * (interpolating the validator's own params), falling back to a generic message
 * for unknown keys.
 */
function resolveValidationMessage(
  errors: ValidationErrors,
  overrides: EaErrorMessages | undefined,
  messages: EagamiMessages,
): string | null {
  const key = Object.keys(errors).find(name => overrides?.[name] !== null);
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

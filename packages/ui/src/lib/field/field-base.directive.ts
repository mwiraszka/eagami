import { Directive, type TemplateRef, type Type, input } from '@angular/core';

import { type EaErrorMessages } from '../forms/control-error-state';
import type { EaShowErrorsOn } from '../forms/forms-config';

/**
 * Label, hint and validation inputs shared by every form control that renders
 * `<ea-field-messages>`. Controls with an inline label (checkbox, switch)
 * extend this directly; controls with a field label above them extend
 * `LabelledFieldControlBase`.
 */
@Directive()
export abstract class FieldControlBase {
  /** Text label for the control. */
  readonly label = input<string | undefined>(undefined);
  /** Helper text shown below the control; hidden while an error is showing. */
  readonly hint = input<string | undefined>(undefined);
  /** Error message shown below the control; replaces the hint and flags the control invalid. */
  readonly errorMsg = input<string | undefined>(undefined);
  /** Per-validator-key message overrides for a bound form control (e.g. `{ required: '...' }`). */
  readonly errorMessages = input<EaErrorMessages | undefined>(undefined);
  /** When the error shows: `'change'` once the user changes the field and leaves it, `'blur'` once they leave it, even unchanged, `'touch'` the same but live while they edit; unset follows the app-wide `forms` option of `provideEagamiUi`. */
  readonly showErrorsOn = input<EaShowErrorsOn | undefined>(undefined);
  /** Marks the control as required. */
  readonly required = input<boolean>(false);
}

/** Field label inputs on top of `FieldControlBase`, for controls that render `<ea-field-label>`. */
@Directive()
export abstract class LabelledFieldControlBase extends FieldControlBase {
  /** Optional icon component rendered before the label text. */
  readonly labelIcon = input<Type<unknown> | undefined>(undefined);
  /** Help revealed by an info button beside the label, as plain text or a template. */
  readonly labelHelp = input<string | TemplateRef<unknown> | undefined>(undefined);
  /** Adds a muted "(optional)" note after the label, unless `required` is also set. */
  readonly optional = input<boolean>(false);
}

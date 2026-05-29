import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { AlertCircleIconComponent } from '../icons/alert-circle.component';

// Shared hint/error block for form-like components. Renders the error (with
// alert icon and role="alert") when `error` is set, otherwise the hint. The
// `id` seeds `{id}-error` / `{id}-hint` so a control's `aria-describedby` can
// point at whichever is showing. `display: contents` keeps the host out of the
// field's flex flow.
@Component({
  selector: 'ea-field-messages',
  imports: [AlertCircleIconComponent],
  templateUrl: './field-messages.component.html',
  styleUrl: './field-messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldMessagesComponent {
  readonly id = input.required<string>();
  readonly error = input<string | null | undefined>(undefined);
  readonly hint = input<string | null | undefined>(undefined);
}

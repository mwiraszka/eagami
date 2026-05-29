import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Shared field label for form-like components. Renders a `<label for>` when
// `forId` points at a single control, otherwise a `<span>` (grouped controls
// labelled via `aria-labelledby`). `display: contents` keeps the host out of
// the field's flex flow.
@Component({
  selector: 'ea-field-label',
  templateUrl: './field-label.component.html',
  styleUrl: './field-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldLabelComponent {
  readonly text = input.required<string>();
  readonly forId = input<string | undefined>(undefined);
  readonly required = input<boolean>(false);
  readonly labelId = input<string | undefined>(undefined);
}

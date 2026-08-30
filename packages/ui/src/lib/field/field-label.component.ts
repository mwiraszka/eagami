import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, type Type, input } from '@angular/core';

// Shared field label for form-like components. Renders a `<label for>` when
// `forId` points at a single control, otherwise a `<span>` (grouped controls
// labelled via `aria-labelledby`). `display: contents` keeps the host out of
// the field's flex flow.
@Component({
  selector: 'ea-field-label',
  templateUrl: './field-label.component.html',
  styleUrl: './field-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, NgTemplateOutlet],
})
export class FieldLabelComponent {
  readonly text = input.required<string>();
  /** Optional icon component rendered before the label text. */
  readonly icon = input<Type<unknown> | undefined>(undefined);
  readonly forId = input<string | undefined>(undefined);
  readonly required = input<boolean>(false);
  readonly labelId = input<string | undefined>(undefined);
}

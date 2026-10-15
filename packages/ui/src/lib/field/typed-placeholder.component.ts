import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Typewriter text drawn over an empty native field in place of its
// placeholder, styled exactly like `::placeholder` and followed by an upright
// cursor. The host positions it over the field and keeps the whole hint on the
// native `placeholder` attribute, which is what assistive technology reads.
@Component({
  selector: 'ea-typed-placeholder',
  template: `{{ text() }}<span class="ea-typed-placeholder__cursor"></span>`,
  styleUrl: './typed-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    dir: 'auto',
    '[class.ea-typed-placeholder--blinking]': '!typing()',
  },
})
export class TypedPlaceholderComponent {
  readonly text = input.required<string>();
  readonly typing = input.required<boolean>();
}

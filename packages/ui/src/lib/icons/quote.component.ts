import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-quote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path d="M10 12H4V6h6v6.5a5.5 5.5 0 0 1-5 5.5" />
      <path d="M20 12h-6V6h6v6.5a5.5 5.5 0 0 1-5 5.5" />
    </svg>
  `,
})
export class QuoteIconComponent extends IconComponentBase {
  static readonly slug = 'quote';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'quote',
    'blockquote',
    'citation',
    'text',
    'format',
    'guillemets',
    'cita',
    'comillas',
    'παράθεση',
    'εισαγωγικά',
    'cytat',
    'cudzysłów',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-paintbrush',
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
      <path d="m12.95 8.13 4.25-4.25a1.5 1.5 0 0 1 2.12 2.12l-4.25 4.25" />
      <path d="m10.83 6 6.37 6.37-2.48 2.47-6.36-6.36z" />
      <path d="m8.36 8.48-3.18 3.18a3.5 3.5 0 0 0 0 4.95l3.88 3.89 5.66-5.66" />
    </svg>
  `,
})
export class PaintbrushIconComponent extends IconComponentBase {
  static readonly slug = 'paintbrush';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'paintbrush',
    'brush',
    'paint',
    'design',
    'customize',
    'art',
    'pinceau',
    'peinture',
    'pincel',
    'pintura',
    'πινέλο',
    'ζωγραφική',
    'pędzel',
    'malowanie',
  ];
}

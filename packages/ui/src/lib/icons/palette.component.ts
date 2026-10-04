import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-palette',
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
      <path
        d="M12 4c5 0 9 3.2 9 7.5 0 2.5-2 4-4.5 4h-1.8a1.7 1.7 0 0 0-1.2 2.9c.9.9.3 2.6-1.5 2.6-5 0-9-3.8-9-8.5S7 4 12 4z" />
      <path d="M8.05 11.06h.01" />
      <path d="M10.56 8.55h.01" />
      <path d="M14.1 8.86h.01" />
      <path d="M16.14 11.77h.01" />
    </svg>
  `,
})
export class PaletteIconComponent extends IconComponentBase {
  static readonly slug = 'palette';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'palette',
    'color',
    'paint',
    'theme',
    'art',
    'couleur',
    'peinture',
    'paleta',
    'pintura',
    'παλέτα',
    'χρώμα',
    'kolor',
  ];
}

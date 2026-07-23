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
        d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
      <circle
        cx="13.5"
        cy="6.5"
        r=".5"
        fill="currentColor" />
      <circle
        cx="17.5"
        cy="10.5"
        r=".5"
        fill="currentColor" />
      <circle
        cx="6.5"
        cy="12.5"
        r=".5"
        fill="currentColor" />
      <circle
        cx="8.5"
        cy="7.5"
        r=".5"
        fill="currentColor" />
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

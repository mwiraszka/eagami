import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-array',
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
        d="M2.5 9a1.5 1.5 0 0 1-1.5-1.5V2.5a1.5 1.5 0 0 1 1.5-1.5h9a1.5 1.5 0 0 1 1.5 1.5" />
      <path
        d="M5 12.5a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5h9a1.5 1.5 0 0 1 1.5 1.5" />
      <path
        d="M7.5 16a1.5 1.5 0 0 1-1.5-1.5V9.5a1.5 1.5 0 0 1 1.5-1.5h9a1.5 1.5 0 0 1 1.5 1.5" />
      <path
        d="M10 19.5a1.5 1.5 0 0 1-1.5-1.5V13a1.5 1.5 0 0 1 1.5-1.5h9a1.5 1.5 0 0 1 1.5 1.5" />
      <rect
        x="11"
        y="15"
        width="12"
        height="8"
        rx="1.5" />
    </svg>
  `,
})
export class ArrayIconComponent extends IconComponentBase {
  static override readonly defaultStrokeWidth = 1.5;
  static readonly slug = 'array';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'array',
    'stack',
    'pile',
    'cards',
    'deck',
    'layers',
    'collection',
    'list',
    'tableau',
    'cartes',
    'matriz',
    'pila',
    'πίνακας',
    'στοίβα',
    'tablica',
    'stos',
  ];
}

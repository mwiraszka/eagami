import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-sort-ascending',
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
      <path d="M3 6h5" />
      <path d="M3 12h8" />
      <path d="M3 18h11" />
      <path d="M19 20V4" />
      <path d="m16 7 3-3 3 3" />
    </svg>
  `,
})
export class SortAscendingIconComponent extends IconComponentBase {
  static readonly slug = 'sort-ascending';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'sort-ascending',
    'sort',
    'ascending',
    'order',
    'increase',
    'arrange',
    'trier',
    'croissant',
    'ordenar',
    'ascendente',
    'ταξινόμηση',
    'αύξουσα',
    'sortuj',
    'rosnąco',
  ];
}

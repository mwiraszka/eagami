import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-sort-descending',
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
      <path d="M3 6h11" />
      <path d="M3 12h8" />
      <path d="M3 18h5" />
      <path d="M19 4v16" />
      <path d="m16 17 3 3 3-3" />
    </svg>
  `,
})
export class SortDescendingIconComponent extends IconComponentBase {
  static readonly slug = 'sort-descending';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'sort-descending',
    'sort',
    'descending',
    'order',
    'decrease',
    'arrange',
    'trier',
    'décroissant',
    'ordenar',
    'descendente',
    'ταξινόμηση',
    'φθίνουσα',
    'sortuj',
    'malejąco',
  ];
}

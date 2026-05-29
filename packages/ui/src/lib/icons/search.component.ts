import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-search',
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
      <circle
        cx="11"
        cy="11"
        r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  `,
})
export class SearchIconComponent extends IconComponentBase {
  static readonly slug = 'search';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'search',
    'find',
    'magnify',
    'lookup',
    'query',
    'recherche',
    'chercher',
    'buscar',
    'búsqueda',
    'αναζήτηση',
    'βρες',
    'szukaj',
    'wyszukaj',
  ];
}

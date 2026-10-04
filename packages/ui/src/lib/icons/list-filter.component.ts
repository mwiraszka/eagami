import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-list-filter',
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
      <path d="M2 6h20" />
      <path d="M6 12h12" />
      <path d="M10 18h4" />
    </svg>
  `,
})
export class ListFilterIconComponent extends IconComponentBase {
  static readonly slug = 'list-filter';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'list-filter',
    'filter',
    'refine',
    'narrow',
    'options',
    'sort',
    'filtrer',
    'affiner',
    'filtrar',
    'refinar',
    'φίλτρο',
    'φιλτράρισμα',
    'filtr',
    'filtruj',
  ];
}

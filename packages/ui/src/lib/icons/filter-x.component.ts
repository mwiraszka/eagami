import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-filter-x',
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
      <path d="M12.5 4H2l8 9.46V19l4 2v-7.54l2.3-2.72" />
      <path d="m16.5 2.5 5 5" />
      <path d="m21.5 2.5-5 5" />
    </svg>
  `,
})
export class FilterXIconComponent extends IconComponentBase {
  static readonly slug = 'filter-x';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'filter-x',
    'filter',
    'clear',
    'remove',
    'funnel',
    'filtre',
    'filtro',
    'φίλτρο',
    'filtr',
  ];
}

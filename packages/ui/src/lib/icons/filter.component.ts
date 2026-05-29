import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-filter',
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  `,
})
export class FilterIconComponent extends IconComponentBase {
  static readonly slug = 'filter';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'filter',
    'funnel',
    'sort',
    'refine',
    'filtre',
    'entonnoir',
    'filtro',
    'embudo',
    'φίλτρο',
    'χωνί',
    'filtr',
    'lejek',
  ];
}

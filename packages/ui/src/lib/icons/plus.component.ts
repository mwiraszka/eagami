import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-plus',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <line
        x1="12"
        y1="5"
        x2="12"
        y2="19" />
      <line
        x1="5"
        y1="12"
        x2="19"
        y2="12" />
    </svg>
  `,
})
export class PlusIconComponent extends IconComponentBase {
  static readonly slug = 'plus';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'plus',
    'add',
    'new',
    'create',
    'positive',
    'ajouter',
    'añadir',
    'agregar',
    'συν',
    'προσθήκη',
    'dodaj',
    'plus',
  ];
}

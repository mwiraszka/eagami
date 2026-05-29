import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-chevrons-up-down',
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
      <polyline points="7 15 12 20 17 15" />
      <polyline points="17 9 12 4 7 9" />
    </svg>
  `,
})
export class ChevronsUpDownIconComponent extends IconComponentBase {
  static readonly slug = 'chevrons-up-down';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'chevrons-up-down',
    'chevrons',
    'up',
    'down',
    'sort',
    'expand',
    'haut',
    'bas',
    'arriba',
    'abajo',
    'πάνω',
    'κάτω',
    'góra',
    'dół',
  ];
}

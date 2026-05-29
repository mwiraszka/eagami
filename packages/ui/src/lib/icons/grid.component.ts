import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-grid',
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
      <rect
        x="3"
        y="3"
        width="7"
        height="7" />
      <rect
        x="14"
        y="3"
        width="7"
        height="7" />
      <rect
        x="14"
        y="14"
        width="7"
        height="7" />
      <rect
        x="3"
        y="14"
        width="7"
        height="7" />
    </svg>
  `,
})
export class GridIconComponent extends IconComponentBase {
  static readonly slug = 'grid';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'grid',
    'layout',
    'tiles',
    'gallery',
    'cells',
    'grille',
    'cuadrícula',
    'πλέγμα',
    'siatka',
    'układ',
  ];
}

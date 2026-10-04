import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-diamond',
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
      <path d="M12 2 22 12 12 22 2 12z" />
    </svg>
  `,
})
export class DiamondIconComponent extends IconComponentBase {
  static readonly slug = 'diamond';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'diamond',
    'shape',
    'rhombus',
    'gem',
    'losange',
    'diamant',
    'diamante',
    'rombo',
    'ρόμβος',
    'διαμάντι',
    'romb',
    'diament',
  ];
}

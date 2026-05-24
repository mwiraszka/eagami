import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-corner-right-up',
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
      <polyline points="10 9 15 4 20 9" />
      <path d="M4 20h7a4 4 0 0 0 4-4V4" />
    </svg>
  `,
})
export class CornerRightUpIconComponent extends IconComponentBase {
  static readonly slug = 'corner-right-up';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'corner-right-up',
    'corner',
    'right',
    'up',
    'arrow',
    'coin',
    'droite',
    'haut',
    'esquina',
    'derecha',
    'arriba',
    'γωνία',
    'δεξιά',
    'πάνω',
    'róg',
    'prawo',
    'góra',
  ];
}

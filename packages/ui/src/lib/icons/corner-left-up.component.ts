import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-corner-left-up',
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
      <polyline points="14 9 9 4 4 9" />
      <path d="M20 20h-7a4 4 0 0 1-4-4V4" />
    </svg>
  `,
})
export class CornerLeftUpIconComponent extends IconComponentBase {
  static readonly slug = 'corner-left-up';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'corner-left-up',
    'corner',
    'left',
    'up',
    'arrow',
    'coin',
    'gauche',
    'haut',
    'esquina',
    'izquierda',
    'arriba',
    'γωνία',
    'αριστερά',
    'πάνω',
    'róg',
    'lewo',
    'góra',
  ];
}

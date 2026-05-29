import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-arrow-up-right',
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
      <line
        x1="7"
        y1="17"
        x2="17"
        y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  `,
})
export class ArrowUpRightIconComponent extends IconComponentBase {
  static readonly slug = 'arrow-up-right';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'arrow-up-right',
    'arrow',
    'up',
    'right',
    'northeast',
    'flèche',
    'haut',
    'droite',
    'flecha',
    'arriba',
    'derecha',
    'βέλος',
    'πάνω',
    'δεξιά',
    'strzałka',
    'góra',
    'prawo',
  ];
}

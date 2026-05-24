import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-arrow-up-left',
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
        x1="17"
        y1="17"
        x2="7"
        y2="7" />
      <polyline points="7 17 7 7 17 7" />
    </svg>
  `,
})
export class ArrowUpLeftIconComponent extends IconComponentBase {
  static readonly slug = 'arrow-up-left';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'arrow-up-left',
    'arrow',
    'up',
    'left',
    'northwest',
    'flèche',
    'haut',
    'gauche',
    'flecha',
    'arriba',
    'izquierda',
    'βέλος',
    'πάνω',
    'αριστερά',
    'strzałka',
    'góra',
    'lewo',
  ];
}

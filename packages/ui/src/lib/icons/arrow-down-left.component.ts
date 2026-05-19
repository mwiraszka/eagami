import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-arrow-down-left',
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
        x1="17"
        y1="7"
        x2="7"
        y2="17" />
      <polyline points="17 17 7 17 7 7" />
    </svg>
  `,
})
export class ArrowDownLeftIconComponent extends IconComponentBase {
  static readonly slug = 'arrow-down-left';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'arrow-down-left',
    'arrow',
    'down',
    'left',
    'southwest',
    'flèche',
    'bas',
    'gauche',
    'flecha',
    'abajo',
    'izquierda',
    'βέλος',
    'κάτω',
    'αριστερά',
    'strzałka',
    'dół',
    'lewo',
  ];
}

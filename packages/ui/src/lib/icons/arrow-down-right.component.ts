import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-arrow-down-right',
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
        x1="7"
        y1="7"
        x2="17"
        y2="17" />
      <polyline points="17 7 17 17 7 17" />
    </svg>
  `,
})
export class ArrowDownRightIconComponent extends IconComponentBase {
  static readonly slug = 'arrow-down-right';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'arrow-down-right',
    'arrow',
    'down',
    'right',
    'southeast',
    'flèche',
    'bas',
    'droite',
    'flecha',
    'abajo',
    'derecha',
    'βέλος',
    'κάτω',
    'δεξιά',
    'strzałka',
    'dół',
    'prawo',
  ];
}

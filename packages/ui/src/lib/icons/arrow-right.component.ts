import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-arrow-right',
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
        x1="5"
        y1="12"
        x2="19"
        y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  `,
})
export class ArrowRightIconComponent extends IconComponentBase {
  static readonly slug = 'arrow-right';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'arrow-right',
    'arrow',
    'right',
    'east',
    'forward',
    'next',
    'flèche',
    'droite',
    'flecha',
    'derecha',
    'βέλος',
    'δεξιά',
    'strzałka',
    'prawo',
  ];
}

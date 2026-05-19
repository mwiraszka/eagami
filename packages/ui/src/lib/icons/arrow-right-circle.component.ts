import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-arrow-right-circle',
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
      <circle
        cx="12"
        cy="12"
        r="10" />
      <polyline points="12 16 16 12 12 8" />
      <line
        x1="8"
        y1="12"
        x2="16"
        y2="12" />
    </svg>
  `,
})
export class ArrowRightCircleIconComponent extends IconComponentBase {
  static readonly slug = 'arrow-right-circle';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'arrow-right-circle',
    'arrow',
    'right',
    'circle',
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

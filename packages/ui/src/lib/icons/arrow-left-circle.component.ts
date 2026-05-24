import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-arrow-left-circle',
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
      <circle
        cx="12"
        cy="12"
        r="10" />
      <polyline points="12 8 8 12 12 16" />
      <line
        x1="16"
        y1="12"
        x2="8"
        y2="12" />
    </svg>
  `,
})
export class ArrowLeftCircleIconComponent extends IconComponentBase {
  static readonly slug = 'arrow-left-circle';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'arrow-left-circle',
    'arrow',
    'left',
    'circle',
    'west',
    'back',
    'previous',
    'flèche',
    'gauche',
    'flecha',
    'izquierda',
    'βέλος',
    'αριστερά',
    'strzałka',
    'lewo',
  ];
}

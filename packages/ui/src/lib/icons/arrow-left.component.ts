import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-arrow-left',
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
        x1="19"
        y1="12"
        x2="5"
        y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  `,
})
export class ArrowLeftIconComponent extends IconComponentBase {
  static readonly slug = 'arrow-left';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'arrow-left',
    'arrow',
    'left',
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

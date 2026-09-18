import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-dice-1',
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
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2" />
      <path d="M12 12h.01" />
    </svg>
  `,
})
export class Dice1IconComponent extends IconComponentBase {
  static readonly slug = 'dice-1';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'dice',
    'die',
    'one',
    'random',
    'chance',
    'game',
    'dé',
    'dado',
    'ζάρι',
  ];
}

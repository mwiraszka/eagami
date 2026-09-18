import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-dice-2',
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
      <path d="M16 8h.01" />
      <path d="M8 16h.01" />
    </svg>
  `,
})
export class Dice2IconComponent extends IconComponentBase {
  static readonly slug = 'dice-2';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'dice',
    'die',
    'two',
    'random',
    'chance',
    'game',
    'dé',
    'dado',
    'ζάρι',
  ];
}

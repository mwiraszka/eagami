import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-slash',
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
      <line
        x1="4.93"
        y1="4.93"
        x2="19.07"
        y2="19.07" />
    </svg>
  `,
})
export class SlashIconComponent extends IconComponentBase {
  static readonly slug = 'slash';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'slash',
    'cancel',
    'forbidden',
    'no',
    'disabled',
    'barre',
    'barra',
    'πλάγια',
    'ukośnik',
    'zakaz',
  ];
}

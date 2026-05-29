import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-corner-up-left',
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
      <polyline points="9 14 4 9 9 4" />
      <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
    </svg>
  `,
})
export class CornerUpLeftIconComponent extends IconComponentBase {
  static readonly slug = 'corner-up-left';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'corner-up-left',
    'corner',
    'up',
    'left',
    'arrow',
    'undo',
    'coin',
    'haut',
    'gauche',
    'esquina',
    'arriba',
    'izquierda',
    'γωνία',
    'πάνω',
    'αριστερά',
    'róg',
    'góra',
    'lewo',
  ];
}

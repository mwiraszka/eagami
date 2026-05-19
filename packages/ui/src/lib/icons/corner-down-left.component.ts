import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-corner-down-left',
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
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  `,
})
export class CornerDownLeftIconComponent extends IconComponentBase {
  static readonly slug = 'corner-down-left';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'corner-down-left',
    'corner',
    'down',
    'left',
    'arrow',
    'return',
    'enter',
    'coin',
    'bas',
    'gauche',
    'esquina',
    'abajo',
    'izquierda',
    'γωνία',
    'κάτω',
    'αριστερά',
    'róg',
    'dół',
    'lewo',
  ];
}

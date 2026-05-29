import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-corner-left-down',
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
      <polyline points="14 15 9 20 4 15" />
      <path d="M20 4h-7a4 4 0 0 0-4 4v12" />
    </svg>
  `,
})
export class CornerLeftDownIconComponent extends IconComponentBase {
  static readonly slug = 'corner-left-down';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'corner-left-down',
    'corner',
    'left',
    'down',
    'arrow',
    'coin',
    'gauche',
    'bas',
    'esquina',
    'izquierda',
    'abajo',
    'γωνία',
    'αριστερά',
    'κάτω',
    'róg',
    'lewo',
    'dół',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-corner-down-right',
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
      <polyline points="15 10 20 15 15 20" />
      <path d="M4 4v7a4 4 0 0 0 4 4h12" />
    </svg>
  `,
})
export class CornerDownRightIconComponent extends IconComponentBase {
  static readonly slug = 'corner-down-right';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'corner-down-right',
    'corner',
    'down',
    'right',
    'arrow',
    'coin',
    'bas',
    'droite',
    'esquina',
    'abajo',
    'derecha',
    'γωνία',
    'κάτω',
    'δεξιά',
    'róg',
    'dół',
    'prawo',
  ];
}

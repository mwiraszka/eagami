import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-corner-right-down',
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
      <polyline points="10 15 15 20 20 15" />
      <path d="M4 4h7a4 4 0 0 1 4 4v12" />
    </svg>
  `,
})
export class CornerRightDownIconComponent extends IconComponentBase {
  static readonly slug = 'corner-right-down';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'corner-right-down',
    'corner',
    'right',
    'down',
    'arrow',
    'coin',
    'droite',
    'bas',
    'esquina',
    'derecha',
    'abajo',
    'γωνία',
    'δεξιά',
    'κάτω',
    'róg',
    'prawo',
    'dół',
  ];
}

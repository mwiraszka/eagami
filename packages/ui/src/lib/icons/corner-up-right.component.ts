import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-corner-up-right',
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
      <polyline points="15 14 20 9 15 4" />
      <path d="M4 20v-7a4 4 0 0 1 4-4h12" />
    </svg>
  `,
})
export class CornerUpRightIconComponent extends IconComponentBase {
  static readonly slug = 'corner-up-right';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'corner-up-right',
    'corner',
    'up',
    'right',
    'arrow',
    'redo',
    'coin',
    'haut',
    'droite',
    'esquina',
    'arriba',
    'derecha',
    'γωνία',
    'πάνω',
    'δεξιά',
    'róg',
    'góra',
    'prawo',
  ];
}

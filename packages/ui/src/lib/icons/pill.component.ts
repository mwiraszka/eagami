import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-pill',
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
      <path d="M8 15l7-7a3.54 3.54 0 0 0-5-5l-7 7a3.54 3.54 0 0 0 5 5z" />
      <path d="m6.5 6.5 5 5" />
      <circle
        cx="17"
        cy="17"
        r="4" />
      <path d="M13 17h8" />
    </svg>
  `,
})
export class PillIconComponent extends IconComponentBase {
  static readonly slug = 'pill';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'pill',
    'medicine',
    'medication',
    'capsule',
    'drug',
    'pharmacy',
    'médicament',
    'pilule',
    'pastilla',
    'medicamento',
    'χάπι',
    'φάρμακο',
    'tabletka',
    'lek',
  ];
}

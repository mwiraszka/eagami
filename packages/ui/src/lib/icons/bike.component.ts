import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-bike',
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
        cx="5.5"
        cy="17"
        r="3.5" />
      <circle
        cx="18.5"
        cy="17"
        r="3.5" />
      <path d="m5.5 17 5-10" />
      <path d="M9 7h3" />
      <path d="M9 10h7.75L12 17H5.5" />
      <path d="m18.5 17-3-12h-2" />
    </svg>
  `,
})
export class BikeIconComponent extends IconComponentBase {
  static readonly slug = 'bike';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'bike',
    'bicycle',
    'cycling',
    'cycle',
    'ride',
    'transport',
    'vélo',
    'bicyclette',
    'bicicleta',
    'ciclismo',
    'ποδήλατο',
    'ποδηλασία',
    'rower',
    'kolarstwo',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-plane',
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
      <path
        d="M20.07 3.93C20.78 4.64 20.57 5.84 19.51 6.9L16.32 10.08 18.3 18.42 16.54 20.19 12.79 13.62 9.61 16.8 10.03 19.63 8.76 20.9 6.64 17.36 3.1 15.24 4.37 13.97 7.2 14.39 10.38 11.21 3.81 7.46 5.58 5.7 13.92 7.68 17.1 4.49C18.16 3.43 19.36 3.22 20.07 3.93z" />
    </svg>
  `,
})
export class PlaneIconComponent extends IconComponentBase {
  static readonly slug = 'plane';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'plane',
    'airplane',
    'flight',
    'travel',
    'airport',
    'avion',
    'vol',
    'avión',
    'vuelo',
    'αεροπλάνο',
    'πτήση',
    'samolot',
    'lot',
  ];
}

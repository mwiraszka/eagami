import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-laptop',
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
      <rect
        x="5"
        y="4"
        width="14"
        height="10"
        rx="1.5" />
      <path d="M5 14 2.5 19.5h19L19 14" />
    </svg>
  `,
})
export class LaptopIconComponent extends IconComponentBase {
  static readonly slug = 'laptop';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'laptop',
    'computer',
    'notebook',
    'portable',
    'device',
    'screen',
    'ordinateur portable',
    'portátil',
    'φορητός υπολογιστής',
    'laptop',
  ];
}

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
      <path d="M4 16V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9" />
      <path d="M4 16h16l1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
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

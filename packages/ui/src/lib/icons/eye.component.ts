import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-eye',
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
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle
        cx="12"
        cy="12"
        r="3" />
    </svg>
  `,
})
export class EyeIconComponent extends IconComponentBase {
  static readonly slug = 'eye';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'eye',
    'view',
    'see',
    'visible',
    'show',
    'watch',
    'œil',
    'voir',
    'ojo',
    'ver',
    'μάτι',
    'δες',
    'oko',
    'pokaż',
  ];
}

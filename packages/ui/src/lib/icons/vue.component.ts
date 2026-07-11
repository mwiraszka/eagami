import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-vue',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.color]': "brand() ? '#4FC08D' : null" },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path
        d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z" />
    </svg>
  `,
})
export class VueIconComponent extends IconComponentBase {
  static readonly slug = 'vue';
  static readonly category: IconCategory = 'eagami';
  static readonly isBrand = true;
  static readonly tags: ReadonlyArray<string> = [
    'vue',
    'vuejs',
    'framework',
    'javascript',
    'frontend',
  ];
  readonly brand = input<boolean>(false);
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-umbrella',
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
      <path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7" />
    </svg>
  `,
})
export class UmbrellaIconComponent extends IconComponentBase {
  static readonly slug = 'umbrella';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'umbrella',
    'rain',
    'weather',
    'protection',
    'parapluie',
    'pluie',
    'paraguas',
    'lluvia',
    'ομπρέλα',
    'βροχή',
    'parasol',
    'deszcz',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-flag',
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
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line
        x1="4"
        y1="22"
        x2="4"
        y2="15" />
    </svg>
  `,
})
export class FlagIconComponent extends IconComponentBase {
  static readonly slug = 'flag';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'flag',
    'mark',
    'report',
    'country',
    'banner',
    'drapeau',
    'bandera',
    'σημαία',
    'flaga',
    'oznacz',
  ];
}

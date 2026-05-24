import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-shield-off',
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
      <path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18" />
      <path d="M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38" />
      <line
        x1="1"
        y1="1"
        x2="23"
        y2="23" />
    </svg>
  `,
})
export class ShieldOffIconComponent extends IconComponentBase {
  static readonly slug = 'shield-off';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'shield-off',
    'shield',
    'off',
    'unprotected',
    'unsafe',
    'disabled',
    'bouclier',
    'escudo',
    'ασπίδα',
    'tarcza',
  ];
}

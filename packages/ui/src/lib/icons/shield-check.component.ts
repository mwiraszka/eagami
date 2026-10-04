import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-shield-check',
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m8.5 11.5 2.5 2.5 4.5-5" />
    </svg>
  `,
})
export class ShieldCheckIconComponent extends IconComponentBase {
  static readonly slug = 'shield-check';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'shield-check',
    'shield',
    'security',
    'protected',
    'safe',
    'bouclier',
    'escudo',
    'ασπίδα',
    'tarcza',
  ];
}

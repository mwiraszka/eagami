import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-shield',
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  `,
})
export class ShieldIconComponent extends IconComponentBase {
  static readonly slug = 'shield';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'shield',
    'security',
    'protect',
    'safe',
    'guard',
    'bouclier',
    'protection',
    'escudo',
    'seguridad',
    'ασπίδα',
    'προστασία',
    'tarcza',
    'ochrona',
  ];
}

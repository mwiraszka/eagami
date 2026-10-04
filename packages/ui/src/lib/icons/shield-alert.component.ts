import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-shield-alert',
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
      <path d="M12 7.5v5" />
      <path d="M12 16h.01" />
    </svg>
  `,
})
export class ShieldAlertIconComponent extends IconComponentBase {
  static readonly slug = 'shield-alert';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'shield-alert',
    'shield',
    'security',
    'warning',
    'risk',
    'bouclier',
    'alerte',
    'escudo',
    'alerta',
    'ασπίδα',
    'προειδοποίηση',
    'tarcza',
    'ostrzeżenie',
  ];
}

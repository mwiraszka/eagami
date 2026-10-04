import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-fingerprint',
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
      <path d="M12 12v9.5" />
      <path d="M9 20v-8a3 3 0 0 1 6 0v5" />
      <path d="M6 17v-5a6 6 0 0 1 12 0v6" />
      <path d="M3 14.5V12a9 9 0 0 1 14.5-7.1" />
      <path d="M20.2 8.3A9 9 0 0 1 21 12v3" />
      <path d="M15 20.5v1" />
    </svg>
  `,
})
export class FingerprintIconComponent extends IconComponentBase {
  static readonly slug = 'fingerprint';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'fingerprint',
    'biometric',
    'identity',
    'security',
    'touch',
    'empreinte',
    'huella',
    'δακτυλικό',
    'odcisk',
  ];
}

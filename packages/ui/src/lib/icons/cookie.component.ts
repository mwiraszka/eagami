import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-cookie',
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
      <path d="M11 17h.01" />
      <path
        d="M11.496 2c.324-.016.558.292.529.615a4 4 0 004.235 4.368.713.713 0 01.758.757 4 4 0 004.366 4.237c.323-.03.63.204.614.527a10 10 0 01-2.915 6.566A1 1 0 114.93 4.918 10 10 0 0111.496 2" />
      <path d="M12 12h.01" />
      <path d="M16 16h.01" />
      <path d="M16 3h.01" />
      <path d="M21 4h.01" />
      <path d="M21 8h.01" />
      <path d="M7 14h.01" />
      <path d="M9 8h.01" />
    </svg>
  `,
})
export class CookieIconComponent extends IconComponentBase {
  static readonly slug = 'cookie';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'cookie',
    'consent',
    'privacy',
    'biscuit',
    'tracking',
    'consentement',
    'galleta',
    'consentimiento',
    'μπισκότο',
    'συγκατάθεση',
    'ciasteczko',
    'zgoda',
  ];
}

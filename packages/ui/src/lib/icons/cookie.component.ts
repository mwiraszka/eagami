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
      <path
        d="M10.31 2.14A10 10 0 1 0 21.33 15.59A1.1 1.1 0 0 0 20.25 14.09A4.6 4.6 0 0 1 15.6 8.17A1.1 1.1 0 0 0 14.7 6.76A3.6 3.6 0 0 1 11.6 3.22A1.1 1.1 0 0 0 10.31 2.14z" />
      <path d="M8 9.5h.01" />
      <path d="M7.5 15h.01" />
      <path d="M12 13.5h.01" />
      <path d="M14 17.5h.01" />
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

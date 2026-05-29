import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-lock',
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
      <rect
        x="3"
        y="11"
        width="18"
        height="11"
        rx="2"
        ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  `,
})
export class LockIconComponent extends IconComponentBase {
  static readonly slug = 'lock';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'lock',
    'secure',
    'password',
    'private',
    'closed',
    'verrou',
    'cadenas',
    'candado',
    'cerrado',
    'κλειδαριά',
    'ασφαλές',
    'kłódka',
    'zamknij',
  ];
}

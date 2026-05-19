import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-user-check',
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle
        cx="8.5"
        cy="7"
        r="4" />
      <polyline points="17 11 19 13 23 9" />
    </svg>
  `,
})
export class UserCheckIconComponent extends IconComponentBase {
  static readonly slug = 'user-check';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'user-check',
    'user',
    'check',
    'verified',
    'approved',
    'confirm',
    'utilisateur',
    'usuario',
    'verificado',
    'χρήστης',
    'επιβεβαίωση',
    'użytkownik',
    'zatwierdź',
  ];
}

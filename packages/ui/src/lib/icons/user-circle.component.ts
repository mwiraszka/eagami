import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-user-circle',
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
      <circle
        cx="12"
        cy="12"
        r="10" />
      <circle
        cx="12"
        cy="10"
        r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  `,
})
export class UserCircleIconComponent extends IconComponentBase {
  static readonly slug = 'user-circle';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'user-circle',
    'user',
    'account',
    'profile',
    'avatar',
    'person',
    'utilisateur',
    'compte',
    'usuario',
    'cuenta',
    'χρήστης',
    'λογαριασμός',
    'użytkownik',
    'konto',
  ];
}

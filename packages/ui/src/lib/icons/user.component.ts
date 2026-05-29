import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-user',
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle
        cx="12"
        cy="7"
        r="4" />
    </svg>
  `,
})
export class UserIconComponent extends IconComponentBase {
  static readonly slug = 'user';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'user',
    'person',
    'profile',
    'account',
    'avatar',
    'utilisateur',
    'personne',
    'usuario',
    'persona',
    'χρήστης',
    'άτομο',
    'użytkownik',
    'osoba',
  ];
}

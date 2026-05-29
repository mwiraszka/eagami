import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-user-minus',
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle
        cx="8.5"
        cy="7"
        r="4" />
      <line
        x1="23"
        y1="11"
        x2="17"
        y2="11" />
    </svg>
  `,
})
export class UserMinusIconComponent extends IconComponentBase {
  static readonly slug = 'user-minus';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'user-minus',
    'user',
    'minus',
    'remove',
    'delete',
    'unfollow',
    'utilisateur',
    'usuario',
    'eliminar',
    'χρήστης',
    'αφαίρεση',
    'użytkownik',
    'usuń',
  ];
}

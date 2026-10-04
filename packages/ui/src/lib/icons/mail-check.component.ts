import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-mail-check',
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
      <path d="M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9.5" />
      <path d="m22 6-10 7L2 6" />
      <path d="m16 18.5 2 2 4-4.5" />
    </svg>
  `,
})
export class MailCheckIconComponent extends IconComponentBase {
  static readonly slug = 'mail-check';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'mail-check',
    'mail',
    'email',
    'envelope',
    'delivered',
    'courrier',
    'correo',
    'αλληλογραφία',
    'poczta',
  ];
}

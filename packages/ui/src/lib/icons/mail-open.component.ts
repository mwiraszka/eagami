import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-mail-open',
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
      <path d="M2 10l10-7 10 7v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
      <path d="m2 10 10 6.5 10-6.5" />
    </svg>
  `,
})
export class MailOpenIconComponent extends IconComponentBase {
  static readonly slug = 'mail-open';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'mail-open',
    'email',
    'read',
    'opened',
    'envelope',
    'message',
    'courriel lu',
    'enveloppe',
    'correo leído',
    'sobre',
    'αναγνωσμένο',
    'φάκελος',
    'przeczytana wiadomość',
    'koperta',
  ];
}

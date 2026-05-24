import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-log-in',
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
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line
        x1="15"
        y1="12"
        x2="3"
        y2="12" />
    </svg>
  `,
})
export class LogInIconComponent extends IconComponentBase {
  static readonly slug = 'log-in';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'log-in',
    'log',
    'in',
    'login',
    'sign in',
    'enter',
    'access',
    'connexion',
    'iniciar sesión',
    'entrar',
    'σύνδεση',
    'είσοδος',
    'logowanie',
    'zaloguj',
  ];
}

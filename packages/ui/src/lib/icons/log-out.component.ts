import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-log-out',
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line
        x1="21"
        y1="12"
        x2="9"
        y2="12" />
    </svg>
  `,
})
export class LogOutIconComponent extends IconComponentBase {
  static readonly slug = 'log-out';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'log-out',
    'log',
    'out',
    'logout',
    'sign out',
    'exit',
    'leave',
    'déconnexion',
    'cerrar sesión',
    'salir',
    'αποσύνδεση',
    'έξοδος',
    'wylogowanie',
    'wyjdź',
  ];
}

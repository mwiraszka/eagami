import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-database',
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
      <ellipse
        cx="12"
        cy="5"
        rx="9"
        ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  `,
})
export class DatabaseIconComponent extends IconComponentBase {
  static readonly slug = 'database';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'database',
    'storage',
    'data',
    'server',
    'sql',
    'base de données',
    'données',
    'base de datos',
    'datos',
    'βάση δεδομένων',
    'δεδομένα',
    'baza danych',
    'dane',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-bug',
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
        x="7"
        y="7"
        width="10"
        height="13"
        rx="5" />
      <path d="M9 7a3 3 0 0 1 6 0" />
      <path d="m8 2.5 1.5 2" />
      <path d="m16 2.5-1.5 2" />
      <path d="M7 11H3.5" />
      <path d="M7 15H3" />
      <path d="M20.5 11H17" />
      <path d="M21 15h-4" />
      <path d="m7.5 18.5-2.5 2.5" />
      <path d="m16.5 18.5 2.5 2.5" />
      <path d="M12 11v9" />
    </svg>
  `,
})
export class BugIconComponent extends IconComponentBase {
  static readonly slug = 'bug';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'bug',
    'insect',
    'issue',
    'error',
    'debug',
    'bogue',
    'insecte',
    'bicho',
    'fallo',
    'σφάλμα',
    'έντομο',
    'błąd',
    'owad',
  ];
}

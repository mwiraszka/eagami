import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-double-exclamation-mark',
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
      <path d="M7 6v7.5" />
      <path d="M7 17.5h.01" />
      <path d="M17 6v7.5" />
      <path d="M17 17.5h.01" />
    </svg>
  `,
})
export class DoubleExclamationMarkIconComponent extends IconComponentBase {
  static readonly slug = 'double-exclamation-mark';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'double exclamation mark',
    'exclamation marks',
    'brilliant',
    'emphasis',
    'chess',
    'double point d’exclamation',
    'doble signo de exclamación',
    'διπλό θαυμαστικό',
  ];
}

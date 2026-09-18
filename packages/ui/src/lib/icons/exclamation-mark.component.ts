import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-exclamation-mark',
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
      <path d="M12 5v9.5" />
      <path d="M12 19.5h.01" />
    </svg>
  `,
})
export class ExclamationMarkIconComponent extends IconComponentBase {
  static readonly slug = 'exclamation-mark';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'exclamation mark',
    'exclamation',
    'alert',
    'important',
    'good move',
    'chess',
    'point d’exclamation',
    'signo de exclamación',
    'θαυμαστικό',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-check-check',
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
      <path d="M18 6 7 17l-5-5" />
      <path d="m22 10-7.5 7.5L13 16" />
    </svg>
  `,
})
export class CheckCheckIconComponent extends IconComponentBase {
  static readonly slug = 'check-check';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'check-check',
    'check',
    'double',
    'read',
    'delivered',
    'done',
    'coche',
    'lu',
    'verificación',
    'leído',
    'τσεκ',
    'διαβασμένο',
    'znacznik',
    'przeczytane',
  ];
}

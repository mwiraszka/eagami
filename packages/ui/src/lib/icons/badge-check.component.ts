import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-badge-check',
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
      <path
        d="M22 12l-2.42 3.14-.51 3.93-3.93.51L12 22l-3.14-2.42-3.93-.51-.51-3.93L2 12l2.42-3.14.51-3.93 3.93-.51L12 2l3.14 2.42 3.93.51.51 3.93z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </svg>
  `,
})
export class BadgeCheckIconComponent extends IconComponentBase {
  static readonly slug = 'badge-check';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'badge-check',
    'verified',
    'check',
    'badge',
    'approved',
    'vérifié',
    'verificado',
    'επαληθευμένο',
    'zweryfikowano',
  ];
}

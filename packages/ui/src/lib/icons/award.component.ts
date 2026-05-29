import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-award',
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
      <circle
        cx="12"
        cy="8"
        r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  `,
})
export class AwardIconComponent extends IconComponentBase {
  static readonly slug = 'award';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'award',
    'medal',
    'prize',
    'trophy',
    'achievement',
    'badge',
    'récompense',
    'médaille',
    'premio',
    'medalla',
    'βραβείο',
    'μετάλλιο',
    'nagroda',
    'medal',
  ];
}

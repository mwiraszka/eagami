import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-gift',
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
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect
        x="2"
        y="7"
        width="20"
        height="5" />
      <line
        x1="12"
        y1="22"
        x2="12"
        y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  `,
})
export class GiftIconComponent extends IconComponentBase {
  static readonly slug = 'gift';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'gift',
    'present',
    'birthday',
    'box',
    'reward',
    'cadeau',
    'regalo',
    'sorpresa',
    'δώρο',
    'έκπληξη',
    'prezent',
    'podarunek',
  ];
}

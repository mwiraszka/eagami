import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-frown',
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
        cy="12"
        r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line
        x1="9"
        y1="9"
        x2="9.01"
        y2="9" />
      <line
        x1="15"
        y1="9"
        x2="15.01"
        y2="9" />
    </svg>
  `,
})
export class FrownIconComponent extends IconComponentBase {
  static readonly slug = 'frown';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'frown',
    'sad',
    'unhappy',
    'emoji',
    'face',
    'triste',
    'mécontent',
    'enfadado',
    'cara',
    'λυπημένος',
    'πρόσωπο',
    'smutny',
    'twarz',
  ];
}

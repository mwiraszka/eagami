import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-trophy',
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
      <path d="M8 2h8v6a4 4 0 0 1-8 0z" />
      <path d="M8 4H5v3a3 3 0 0 0 3 3" />
      <path d="M16 4h3v3a3 3 0 0 1-3 3" />
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="16" />
      <path d="M7 22h10l-1-6H8z" />
    </svg>
  `,
})
export class TrophyIconComponent extends IconComponentBase {
  static readonly slug = 'trophy';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'trophy',
    'award',
    'prize',
    'cup',
    'winner',
    'sport',
    'champion',
    'trophée',
    'récompense',
    'trofeo',
    'premio',
    'τρόπαιο',
    'βραβείο',
    'puchar',
    'nagroda',
  ];
}

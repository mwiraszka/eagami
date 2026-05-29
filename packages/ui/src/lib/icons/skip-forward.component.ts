import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-skip-forward',
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
      <polygon points="5 4 15 12 5 20 5 4" />
      <line
        x1="19"
        y1="5"
        x2="19"
        y2="19" />
    </svg>
  `,
})
export class SkipForwardIconComponent extends IconComponentBase {
  static readonly slug = 'skip-forward';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'skip-forward',
    'skip',
    'forward',
    'next',
    'media',
    'player',
    'suivant',
    'siguiente',
    'επόμενο',
    'następny',
    'do przodu',
    'music',
    'audio',
  ];
}

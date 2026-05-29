import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-zoom-out',
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
        cx="11"
        cy="11"
        r="8" />
      <line
        x1="21"
        y1="21"
        x2="16.65"
        y2="16.65" />
      <line
        x1="8"
        y1="11"
        x2="14"
        y2="11" />
    </svg>
  `,
})
export class ZoomOutIconComponent extends IconComponentBase {
  static readonly slug = 'zoom-out';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'zoom-out',
    'zoom',
    'out',
    'shrink',
    'reduce',
    'farther',
    'réduire',
    'alejar',
    'reducir',
    'σμίκρυνση',
    'απομάκρυνση',
    'pomniejsz',
    'oddal',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-pause-circle',
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
      <line
        x1="10"
        y1="15"
        x2="10"
        y2="9" />
      <line
        x1="14"
        y1="15"
        x2="14"
        y2="9" />
    </svg>
  `,
})
export class PauseCircleIconComponent extends IconComponentBase {
  static readonly slug = 'pause-circle';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'pause-circle',
    'pause',
    'circle',
    'stop',
    'media',
    'player',
    'pausa',
    'παύση',
    'pauza',
    'wstrzymaj',
    'music',
    'audio',
  ];
}

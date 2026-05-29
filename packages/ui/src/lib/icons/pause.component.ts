import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-pause',
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
      <rect
        x="6"
        y="4"
        width="4"
        height="16" />
      <rect
        x="14"
        y="4"
        width="4"
        height="16" />
    </svg>
  `,
})
export class PauseIconComponent extends IconComponentBase {
  static readonly slug = 'pause';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'pause',
    'stop',
    'media',
    'player',
    'wait',
    'pausa',
    'παύση',
    'pauza',
    'wstrzymaj',
    'music',
    'audio',
  ];
}

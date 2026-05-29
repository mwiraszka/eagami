import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-cast',
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
        d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
      <line
        x1="2"
        y1="20"
        x2="2.01"
        y2="20" />
    </svg>
  `,
})
export class CastIconComponent extends IconComponentBase {
  static readonly slug = 'cast';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'cast',
    'stream',
    'broadcast',
    'chromecast',
    'screen',
    'mirror',
    'diffusion',
    'transmettre',
    'transmisión',
    'transmitir',
    'μετάδοση',
    'αναμετάδοση',
    'transmisja',
    'nadawanie',
  ];
}

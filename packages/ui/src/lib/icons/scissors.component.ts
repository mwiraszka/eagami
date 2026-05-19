import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-scissors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <circle
        cx="6"
        cy="6"
        r="3" />
      <circle
        cx="6"
        cy="18"
        r="3" />
      <line
        x1="20"
        y1="4"
        x2="8.12"
        y2="15.88" />
      <line
        x1="14.47"
        y1="14.48"
        x2="20"
        y2="20" />
      <line
        x1="8.12"
        y1="8.12"
        x2="12"
        y2="12" />
    </svg>
  `,
})
export class ScissorsIconComponent extends IconComponentBase {
  static readonly slug = 'scissors';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'scissors',
    'cut',
    'snip',
    'clip',
    'shears',
    'ciseaux',
    'couper',
    'tijeras',
    'cortar',
    'ψαλίδι',
    'κοπή',
    'nożyczki',
    'tnij',
  ];
}

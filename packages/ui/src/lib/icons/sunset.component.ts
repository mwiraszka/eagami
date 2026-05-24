import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-sunset',
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
      <path d="M17 18a5 5 0 0 0-10 0" />
      <line
        x1="12"
        y1="9"
        x2="12"
        y2="2" />
      <line
        x1="4.22"
        y1="10.22"
        x2="5.64"
        y2="11.64" />
      <line
        x1="1"
        y1="18"
        x2="3"
        y2="18" />
      <line
        x1="21"
        y1="18"
        x2="23"
        y2="18" />
      <line
        x1="18.36"
        y1="11.64"
        x2="19.78"
        y2="10.22" />
      <line
        x1="23"
        y1="22"
        x2="1"
        y2="22" />
      <polyline points="16 5 12 9 8 5" />
    </svg>
  `,
})
export class SunsetIconComponent extends IconComponentBase {
  static readonly slug = 'sunset';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'sunset',
    'sun',
    'evening',
    'dusk',
    'weather',
    'coucher du soleil',
    'atardecer',
    'puesta',
    'δύση',
    'σούρουπο',
    'zachód',
    'wieczór',
  ];
}

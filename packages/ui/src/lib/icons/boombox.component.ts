import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-boombox',
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
        x="2"
        y="8"
        width="20"
        height="12"
        rx="2" />
      <path d="M6 8V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
      <circle
        cx="7.5"
        cy="14"
        r="2.5" />
      <circle
        cx="16.5"
        cy="14"
        r="2.5" />
      <path d="M11.5 11h1" />
    </svg>
  `,
})
export class BoomboxIconComponent extends IconComponentBase {
  static readonly slug = 'boombox';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'boombox',
    'stereo',
    'radio',
    'cassette',
    'speaker',
    'radiocassette',
    'radiocasete',
    'φορητό στερεοφωνικό',
    'magnetofon',
    'music',
    'audio',
  ];
}

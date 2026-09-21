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
      <path d="M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
      <path d="M8 8v1" />
      <path d="M12 8v1" />
      <path d="M16 8v1" />
      <rect
        x="2"
        y="9"
        width="20"
        height="12"
        rx="2" />
      <circle
        cx="8"
        cy="15"
        r="2" />
      <circle
        cx="16"
        cy="15"
        r="2" />
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

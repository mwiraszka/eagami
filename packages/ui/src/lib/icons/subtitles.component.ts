import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-subtitles',
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
        y="5"
        width="20"
        height="14"
        rx="2" />
      <path d="M10.74 10.2a2.5 2.5 0 1 0 0 3.6" />
      <path d="M17.24 10.2a2.5 2.5 0 1 0 0 3.6" />
    </svg>
  `,
})
export class SubtitlesIconComponent extends IconComponentBase {
  static readonly slug = 'subtitles';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'subtitles',
    'captions',
    'closed captions',
    'cc',
    'accessibility',
    'sous-titres',
    'subtítulos',
    'υπότιτλοι',
    'napisy',
  ];
}

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
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2" />
      <line
        x1="7"
        y1="15"
        x2="12"
        y2="15" />
      <line
        x1="14.5"
        y1="15"
        x2="17"
        y2="15" />
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

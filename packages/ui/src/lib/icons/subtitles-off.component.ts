import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-subtitles-off',
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
      <path d="M10.5 5H19a2 2 0 0 1 2 2v8.5" />
      <path d="M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2" />
      <path d="M7 15h4" />
      <line
        x1="1"
        y1="1"
        x2="23"
        y2="23" />
    </svg>
  `,
})
export class SubtitlesOffIconComponent extends IconComponentBase {
  static readonly slug = 'subtitles-off';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'subtitles-off',
    'subtitles',
    'captions',
    'off',
    'hide',
    'closed captions',
    'cc',
    'sous-titres désactivés',
    'subtítulos desactivados',
    'υπότιτλοι απενεργοποιημένοι',
    'napisy wyłączone',
    'video',
  ];
}

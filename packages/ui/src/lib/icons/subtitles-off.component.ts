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
      <path d="M7.55 5H20a2 2 0 0 1 2 2v10a2 2 0 0 1-.83 1.62" />
      <path d="M16.45 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 .83-1.62" />
      <path d="M7.47 10.02a2.5 2.5 0 1 0 3.27 3.78" />
      <path d="M17.24 10.2a2.5 2.5 0 0 0-3.92.57" />
      <path d="M16.73 14.18a2.5 2.5 0 0 0 .51-.38" />
      <path d="m2 2 20 20" />
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

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

/**
 * YouTube icon (Feather outline).
 *
 * @remarks
 * Prior to v1.4 this slug rendered Eagami's brand-filled YouTube mark. v1.4
 * aligns the canonical slug with Feather Icons, so `YoutubeIconComponent` now
 * renders Feather's outline. The brand-filled mark that previously shipped
 * here has moved to `<ea-icon-youtube-2>` / `Youtube2IconComponent`.
 */
@Component({
  selector: 'ea-icon-youtube',
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
        d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  `,
})
export class YoutubeIconComponent extends IconComponentBase {
  static readonly slug = 'youtube';
  static readonly category: IconCategory = 'feather';
  static readonly isBrand = true;
  static readonly tags: ReadonlyArray<string> = [
    'youtube',
    'video',
    'streaming',
    'social',
  ];
}

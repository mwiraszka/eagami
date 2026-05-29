import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

/**
 * Facebook icon (Feather outline).
 *
 * @remarks
 * The brand-filled Facebook mark lives at `<ea-icon-facebook-2>` /
 * `Facebook2IconComponent`.
 */
@Component({
  selector: 'ea-icon-facebook',
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  `,
})
export class FacebookIconComponent extends IconComponentBase {
  static readonly slug = 'facebook';
  static readonly category: IconCategory = 'feather';
  static readonly isBrand = true;
  static readonly tags: ReadonlyArray<string> = ['facebook', 'social', 'meta', 'network'];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

/**
 * Twitch icon (Feather outline).
 *
 * @remarks
 * The brand-filled Twitch mark lives at `<ea-icon-twitch-2>` /
 * `Twitch2IconComponent`.
 */
@Component({
  selector: 'ea-icon-twitch',
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
      <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
    </svg>
  `,
})
export class TwitchIconComponent extends IconComponentBase {
  static readonly slug = 'twitch';
  static readonly category: IconCategory = 'feather';
  static readonly isBrand = true;
  static readonly tags: ReadonlyArray<string> = [
    'twitch',
    'streaming',
    'gaming',
    'video',
  ];
}

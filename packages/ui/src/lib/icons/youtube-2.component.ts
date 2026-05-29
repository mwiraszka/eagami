import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

/**
 * YouTube brand mark (Eagami brand-filled).
 *
 * @remarks
 * The Feather outline lives at `<ea-icon-youtube>` / `YoutubeIconComponent`.
 * Set the `brand` input to render in the official brand colour.
 */
@Component({
  selector: 'ea-icon-youtube-2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.color]': "brand() ? '#FF0000' : null" },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      width="100%"
      height="100%">
      <path
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.546 15.568V8.432L15.818 12l-6.272 3.568Z" />
    </svg>
  `,
})
export class Youtube2IconComponent extends IconComponentBase {
  static readonly slug = 'youtube-2';
  static readonly category: IconCategory = 'eagami';
  static readonly isBrand = true;
  static readonly tags: ReadonlyArray<string> = [
    'youtube-2',
    'youtube',
    'video',
    'streaming',
    'social',
    'mark',
  ];
  readonly brand = input<boolean>(false);
}

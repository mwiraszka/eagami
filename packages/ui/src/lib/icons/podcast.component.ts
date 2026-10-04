import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-podcast',
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
        x="10"
        y="8.5"
        width="4"
        height="8.5"
        rx="2" />
      <path d="M12 17v4" />
      <path d="M9 21h6" />
      <path d="M18 11a6 6 0 0 0-2.56-4.91" />
      <path d="M6 11a6 6 0 0 1 2.56-4.91" />
      <path d="M22 11a10 10 0 0 0-4.26-8.19" />
      <path d="M2 11a10 10 0 0 1 4.26-8.19" />
    </svg>
  `,
})
export class PodcastIconComponent extends IconComponentBase {
  static readonly slug = 'podcast';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'podcast',
    'broadcast',
    'episode',
    'show',
    'audio',
    'balado',
    'pódcast',
    'πόντκαστ',
    'podkast',
  ];
}

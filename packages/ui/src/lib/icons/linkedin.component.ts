import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

/**
 * LinkedIn icon (Feather outline).
 *
 * @remarks
 * The brand-filled LinkedIn mark lives at `<ea-icon-linkedin-2>` /
 * `Linkedin2IconComponent`.
 */
@Component({
  selector: 'ea-icon-linkedin',
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
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect
        x="2"
        y="9"
        width="4"
        height="12" />
      <circle
        cx="4"
        cy="4"
        r="2" />
    </svg>
  `,
})
export class LinkedinIconComponent extends IconComponentBase {
  static readonly slug = 'linkedin';
  static readonly category: IconCategory = 'feather';
  static readonly isBrand = true;
  static readonly tags: ReadonlyArray<string> = [
    'linkedin',
    'social',
    'network',
    'professional',
    'job',
  ];
}

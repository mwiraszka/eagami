import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-briefcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <rect
        x="2"
        y="7"
        width="20"
        height="14"
        rx="2"
        ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  `,
})
export class BriefcaseIconComponent extends IconComponentBase {
  static readonly slug = 'briefcase';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'briefcase',
    'work',
    'business',
    'job',
    'office',
    'mallette',
    'travail',
    'maletín',
    'trabajo',
    'χαρτοφύλακας',
    'εργασία',
    'teczka',
    'praca',
  ];
}

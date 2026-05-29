import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-git-merge',
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
      <circle
        cx="18"
        cy="18"
        r="3" />
      <circle
        cx="6"
        cy="6"
        r="3" />
      <path d="M6 21V9a9 9 0 0 0 9 9" />
    </svg>
  `,
})
export class GitMergeIconComponent extends IconComponentBase {
  static readonly slug = 'git-merge';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'git-merge',
    'git',
    'merge',
    'version',
    'control',
    'combine',
    'fusion',
    'fusionner',
    'fusión',
    'συγχώνευση',
    'scalanie',
    'merge',
  ];
}

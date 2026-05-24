import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-git-branch',
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
      <line
        x1="6"
        y1="3"
        x2="6"
        y2="15" />
      <circle
        cx="18"
        cy="6"
        r="3" />
      <circle
        cx="6"
        cy="18"
        r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  `,
})
export class GitBranchIconComponent extends IconComponentBase {
  static readonly slug = 'git-branch';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'git-branch',
    'git',
    'branch',
    'version',
    'control',
    'fork',
    'branche',
    'rama',
    'κλάδος',
    'gałąź',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-git-pull-request',
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
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <line
        x1="6"
        y1="9"
        x2="6"
        y2="21" />
    </svg>
  `,
})
export class GitPullRequestIconComponent extends IconComponentBase {
  static readonly slug = 'git-pull-request';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'git-pull-request',
    'git',
    'pull',
    'request',
    'pr',
    'version',
    'control',
    'review',
    'demande',
    'solicitud',
    'αίτημα',
    'prośba',
  ];
}

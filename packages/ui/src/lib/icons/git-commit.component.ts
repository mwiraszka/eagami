import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-git-commit',
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
      <circle
        cx="12"
        cy="12"
        r="4" />
      <line
        x1="1.05"
        y1="12"
        x2="7"
        y2="12" />
      <line
        x1="17.01"
        y1="12"
        x2="22.96"
        y2="12" />
    </svg>
  `,
})
export class GitCommitIconComponent extends IconComponentBase {
  static readonly slug = 'git-commit';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'git-commit',
    'git',
    'commit',
    'version',
    'control',
    'change',
    'commit',
    'cambio',
    'υποβολή',
    'commit',
  ];
}

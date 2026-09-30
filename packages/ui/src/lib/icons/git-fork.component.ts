import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-git-fork',
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
        cx="12"
        cy="18"
        r="3" />
      <circle
        cx="6"
        cy="6"
        r="3" />
      <circle
        cx="18"
        cy="6"
        r="3" />
      <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
      <path d="M12 12v3" />
    </svg>
  `,
})
export class GitForkIconComponent extends IconComponentBase {
  static readonly slug = 'git-fork';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'git-fork',
    'fork',
    'git',
    'branch',
    'repository',
    'version control',
    'dupliquer',
    'dépôt',
    'bifurcación',
    'repositorio',
    'διακλάδωση',
    'αποθετήριο',
    'rozwidlenie',
    'repozytorium',
  ];
}

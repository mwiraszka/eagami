import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-git-compare',
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
      <path d="M11 18H8a2 2 0 0 1-2-2V9" />
    </svg>
  `,
})
export class GitCompareIconComponent extends IconComponentBase {
  static readonly slug = 'git-compare';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'git-compare',
    'git',
    'compare',
    'diff',
    'branch',
    'comparer',
    'comparar',
    'σύγκριση',
    'porównaj',
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-git-merge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: inline-flex; width: 1em; height: 1em;' },
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
export class GitMergeIconComponent {}

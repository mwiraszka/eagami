import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-git-pull-request',
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
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <line
        x1="6"
        y1="9"
        x2="6"
        y2="21" />
    </svg>
  `,
})
export class GitPullRequestIconComponent {}

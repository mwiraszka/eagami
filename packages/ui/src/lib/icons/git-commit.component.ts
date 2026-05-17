import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-git-commit',
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
export class GitCommitIconComponent {}

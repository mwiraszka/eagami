import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-git-branch',
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
export class GitBranchIconComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-archive',
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
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect
        x="1"
        y="3"
        width="22"
        height="5" />
      <line
        x1="10"
        y1="12"
        x2="14"
        y2="12" />
    </svg>
  `,
})
export class ArchiveIconComponent {}

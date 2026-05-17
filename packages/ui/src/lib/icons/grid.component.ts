import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-grid',
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
      <rect
        x="3"
        y="3"
        width="7"
        height="7" />
      <rect
        x="14"
        y="3"
        width="7"
        height="7" />
      <rect
        x="14"
        y="14"
        width="7"
        height="7" />
      <rect
        x="3"
        y="14"
        width="7"
        height="7" />
    </svg>
  `,
})
export class GridIconComponent {}

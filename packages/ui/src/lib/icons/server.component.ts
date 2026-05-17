import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-server',
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
        x="2"
        y="2"
        width="20"
        height="8"
        rx="2"
        ry="2" />
      <rect
        x="2"
        y="14"
        width="20"
        height="8"
        rx="2"
        ry="2" />
      <line
        x1="6"
        y1="6"
        x2="6.01"
        y2="6" />
      <line
        x1="6"
        y1="18"
        x2="6.01"
        y2="18" />
    </svg>
  `,
})
export class ServerIconComponent {}

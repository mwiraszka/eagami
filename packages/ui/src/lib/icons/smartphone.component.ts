import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-smartphone',
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
        x="5"
        y="2"
        width="14"
        height="20"
        rx="2"
        ry="2" />
      <line
        x1="12"
        y1="18"
        x2="12.01"
        y2="18" />
    </svg>
  `,
})
export class SmartphoneIconComponent {}

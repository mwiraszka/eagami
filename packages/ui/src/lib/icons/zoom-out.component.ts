import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-zoom-out',
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
        cx="11"
        cy="11"
        r="8" />
      <line
        x1="21"
        y1="21"
        x2="16.65"
        y2="16.65" />
      <line
        x1="8"
        y1="11"
        x2="14"
        y2="11" />
    </svg>
  `,
})
export class ZoomOutIconComponent {}

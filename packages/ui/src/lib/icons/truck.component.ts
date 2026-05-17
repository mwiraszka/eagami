import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-truck',
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
        x="1"
        y="3"
        width="15"
        height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle
        cx="5.5"
        cy="18.5"
        r="2.5" />
      <circle
        cx="18.5"
        cy="18.5"
        r="2.5" />
    </svg>
  `,
})
export class TruckIconComponent {}

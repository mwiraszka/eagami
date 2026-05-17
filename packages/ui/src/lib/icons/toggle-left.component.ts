import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-toggle-left',
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
        y="5"
        width="22"
        height="14"
        rx="7"
        ry="7" />
      <circle
        cx="8"
        cy="12"
        r="3" />
    </svg>
  `,
})
export class ToggleLeftIconComponent {}

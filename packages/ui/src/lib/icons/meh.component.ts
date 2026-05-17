import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-meh',
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
        r="10" />
      <line
        x1="8"
        y1="15"
        x2="16"
        y2="15" />
      <line
        x1="9"
        y1="9"
        x2="9.01"
        y2="9" />
      <line
        x1="15"
        y1="9"
        x2="15.01"
        y2="9" />
    </svg>
  `,
})
export class MehIconComponent {}

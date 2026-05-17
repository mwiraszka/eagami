import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-percent',
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
        x1="19"
        y1="5"
        x2="5"
        y2="19" />
      <circle
        cx="6.5"
        cy="6.5"
        r="2.5" />
      <circle
        cx="17.5"
        cy="17.5"
        r="2.5" />
    </svg>
  `,
})
export class PercentIconComponent {}

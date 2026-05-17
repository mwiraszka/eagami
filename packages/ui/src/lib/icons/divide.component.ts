import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-divide',
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
        cy="6"
        r="2" />
      <line
        x1="5"
        y1="12"
        x2="19"
        y2="12" />
      <circle
        cx="12"
        cy="18"
        r="2" />
    </svg>
  `,
})
export class DivideIconComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-credit-card',
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
        y="4"
        width="22"
        height="16"
        rx="2"
        ry="2" />
      <line
        x1="1"
        y1="10"
        x2="23"
        y2="10" />
    </svg>
  `,
})
export class CreditCardIconComponent {}

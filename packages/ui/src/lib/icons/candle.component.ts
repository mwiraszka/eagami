import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-candle',
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
      <path d="M12 2c2 2 2 4 0 6-2-2-2-4 0-6z" />
      <path d="M8 10h8v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" />
    </svg>
  `,
})
export class CandleIconComponent {}

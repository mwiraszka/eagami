import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-hash',
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
        x1="4"
        y1="9"
        x2="20"
        y2="9" />
      <line
        x1="4"
        y1="15"
        x2="20"
        y2="15" />
      <line
        x1="10"
        y1="3"
        x2="8"
        y2="21" />
      <line
        x1="16"
        y1="3"
        x2="14"
        y2="21" />
    </svg>
  `,
})
export class HashIconComponent {}

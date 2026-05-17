import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-move',
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
      <polyline points="5 9 2 12 5 15" />
      <polyline points="9 5 12 2 15 5" />
      <polyline points="15 19 12 22 9 19" />
      <polyline points="19 9 22 12 19 15" />
      <line
        x1="2"
        y1="12"
        x2="22"
        y2="12" />
      <line
        x1="12"
        y1="2"
        x2="12"
        y2="22" />
    </svg>
  `,
})
export class MoveIconComponent {}

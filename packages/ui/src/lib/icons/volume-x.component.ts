import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-volume-x',
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
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line
        x1="23"
        y1="9"
        x2="17"
        y2="15" />
      <line
        x1="17"
        y1="9"
        x2="23"
        y2="15" />
    </svg>
  `,
})
export class VolumeXIconComponent {}

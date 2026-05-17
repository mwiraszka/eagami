import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-align-center',
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
        x1="18"
        y1="10"
        x2="6"
        y2="10" />
      <line
        x1="21"
        y1="6"
        x2="3"
        y2="6" />
      <line
        x1="21"
        y1="14"
        x2="3"
        y2="14" />
      <line
        x1="18"
        y1="18"
        x2="6"
        y2="18" />
    </svg>
  `,
})
export class AlignCenterIconComponent {}

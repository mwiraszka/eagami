import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-soccer-ball',
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
      <polygon
        points="12 2 17.88 3.91 21.51 8.91 21.51 15.09 17.88 20.09 12 22 6.12 20.09 2.49 15.09 2.49 8.91 6.12 3.91" />
      <polygon points="12 7 16.755 10.455 14.939 16.045 9.061 16.045 7.245 10.455" />
      <line
        x1="12"
        y1="7"
        x2="12"
        y2="3" />
      <line
        x1="16.755"
        y1="10.455"
        x2="20.56"
        y2="9.22" />
      <line
        x1="14.939"
        y1="16.045"
        x2="17.29"
        y2="19.28" />
      <line
        x1="9.061"
        y1="16.045"
        x2="6.71"
        y2="19.28" />
      <line
        x1="7.245"
        y1="10.455"
        x2="3.44"
        y2="9.22" />
    </svg>
  `,
})
export class SoccerBallIconComponent {}

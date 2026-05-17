import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-chrome',
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
      <circle
        cx="12"
        cy="12"
        r="4" />
      <line
        x1="21.17"
        y1="8"
        x2="12"
        y2="8" />
      <line
        x1="3.95"
        y1="6.06"
        x2="8.54"
        y2="14" />
      <line
        x1="10.88"
        y1="21.94"
        x2="15.46"
        y2="14" />
    </svg>
  `,
})
export class ChromeIconComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-codepen',
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
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      <line
        x1="12"
        y1="22"
        x2="12"
        y2="15.5" />
      <polyline points="22 8.5 12 15.5 2 8.5" />
      <polyline points="2 15.5 12 8.5 22 15.5" />
      <line
        x1="12"
        y1="2"
        x2="12"
        y2="8.5" />
    </svg>
  `,
})
export class CodepenIconComponent {}

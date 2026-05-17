import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-film',
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
        x="2"
        y="2"
        width="20"
        height="20"
        rx="2.18"
        ry="2.18" />
      <line
        x1="7"
        y1="2"
        x2="7"
        y2="22" />
      <line
        x1="17"
        y1="2"
        x2="17"
        y2="22" />
      <line
        x1="2"
        y1="12"
        x2="22"
        y2="12" />
      <line
        x1="2"
        y1="7"
        x2="7"
        y2="7" />
      <line
        x1="2"
        y1="17"
        x2="7"
        y2="17" />
      <line
        x1="17"
        y1="17"
        x2="22"
        y2="17" />
      <line
        x1="17"
        y1="7"
        x2="22"
        y2="7" />
    </svg>
  `,
})
export class FilmIconComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-play-circle',
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
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  `,
})
export class PlayCircleIconComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-music',
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
      <path d="M9 18V5l12-2v13" />
      <circle
        cx="6"
        cy="18"
        r="3" />
      <circle
        cx="18"
        cy="16"
        r="3" />
    </svg>
  `,
})
export class MusicIconComponent {}

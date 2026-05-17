import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ea-icon-voicemail',
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
        cx="5.5"
        cy="11.5"
        r="4.5" />
      <circle
        cx="18.5"
        cy="11.5"
        r="4.5" />
      <line
        x1="5.5"
        y1="16"
        x2="18.5"
        y2="16" />
    </svg>
  `,
})
export class VoicemailIconComponent {}

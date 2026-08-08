import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-timecode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <rect
        x="2"
        y="7"
        width="20"
        height="10"
        rx="2" />
      <line
        x1="5.5"
        y1="10.5"
        x2="5.5"
        y2="13.5" />
      <line
        x1="12"
        y1="10.5"
        x2="12"
        y2="13.5" />
      <line
        x1="18.5"
        y1="10.5"
        x2="18.5"
        y2="13.5" />
      <circle
        cx="8.75"
        cy="10.6"
        r="0.7"
        fill="currentColor"
        stroke="none" />
      <circle
        cx="8.75"
        cy="13.4"
        r="0.7"
        fill="currentColor"
        stroke="none" />
      <circle
        cx="15.25"
        cy="10.6"
        r="0.7"
        fill="currentColor"
        stroke="none" />
      <circle
        cx="15.25"
        cy="13.4"
        r="0.7"
        fill="currentColor"
        stroke="none" />
    </svg>
  `,
})
export class TimecodeIconComponent extends IconComponentBase {
  static readonly slug = 'timecode';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'timecode',
    'timestamp',
    'duration',
    'runtime',
    'position',
    'code temporel',
    'código de tiempo',
    'χρονοκώδικας',
    'kod czasowy',
  ];
}

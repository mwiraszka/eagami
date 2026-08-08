import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-waveform',
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
      <line
        x1="3"
        y1="10"
        x2="3"
        y2="14" />
      <line
        x1="6.5"
        y1="7"
        x2="6.5"
        y2="17" />
      <line
        x1="10"
        y1="4"
        x2="10"
        y2="20" />
      <line
        x1="13.5"
        y1="8"
        x2="13.5"
        y2="16" />
      <line
        x1="17"
        y1="5.5"
        x2="17"
        y2="18.5" />
      <line
        x1="20.5"
        y1="9.5"
        x2="20.5"
        y2="14.5" />
    </svg>
  `,
})
export class WaveformIconComponent extends IconComponentBase {
  static readonly slug = 'waveform';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'waveform',
    'audio',
    'amplitude',
    'sound wave',
    'levels',
    "forme d'onde",
    'forma de onda',
    'κυματομορφή',
    'przebieg dźwięku',
  ];
}

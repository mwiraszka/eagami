import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-sine-wave',
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
      <path
        d="M2 12c1-3.1 1.4-5 2.5-5c1.9 0 3.1 10 5 10s3.1-10 5-10 3.1 10 5 10c1.1 0 1.5-1.9 2.5-5" />
    </svg>
  `,
})
export class SineWaveIconComponent extends IconComponentBase {
  static readonly slug = 'sine-wave';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'sine-wave',
    'sine',
    'waveform',
    'wave',
    'audio',
    'signal',
    'oscillator',
    'sinusoïde',
    'onde sinusoïdale',
    'sinusoide',
    'onda sinusoidal',
    'ημιτονοειδές κύμα',
    'sinusoida',
    'fala sinusoidalna',
  ];
}

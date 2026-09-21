import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-cosine-wave',
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
      <path d="M2 7c1.9 0 3.1 10 5 10s3.1-10 5-10 3.1 10 5 10 3.1-10 5-10" />
    </svg>
  `,
})
export class CosineWaveIconComponent extends IconComponentBase {
  static readonly slug = 'cosine-wave';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'cosine-wave',
    'cosine',
    'waveform',
    'wave',
    'audio',
    'signal',
    'oscillator',
    'cosinus',
    'onde cosinusoïdale',
    'coseno',
    'onda cosenoidal',
    'συνημιτονοειδές κύμα',
    'fala cosinusoidalna',
  ];
}

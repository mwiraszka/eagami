import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-headset',
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
      <path d="M3 16v-5a9 9 0 0 1 18 0v5" />
      <path d="M21 17a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
      <path d="M3 17a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      <path d="M19 19v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
    </svg>
  `,
})
export class HeadsetIconComponent extends IconComponentBase {
  static readonly slug = 'headset';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'headset',
    'headphones',
    'microphone',
    'support',
    'call',
    'gaming',
    'casque',
    'auriculares',
    'ακουστικά',
    'słuchawki',
    'audio',
  ];
}

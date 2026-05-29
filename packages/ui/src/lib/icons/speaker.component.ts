import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-speaker',
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
        x="4"
        y="2"
        width="16"
        height="20"
        rx="2"
        ry="2" />
      <circle
        cx="12"
        cy="14"
        r="4" />
      <line
        x1="12"
        y1="6"
        x2="12.01"
        y2="6" />
    </svg>
  `,
})
export class SpeakerIconComponent extends IconComponentBase {
  static readonly slug = 'speaker';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'speaker',
    'audio',
    'sound',
    'music',
    'volume',
    'haut-parleur',
    'altavoz',
    'sonido',
    'ηχείο',
    'ήχος',
    'głośnik',
    'dźwięk',
  ];
}

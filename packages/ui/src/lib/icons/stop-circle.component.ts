import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-stop-circle',
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
      <circle
        cx="12"
        cy="12"
        r="10" />
      <rect
        x="9"
        y="9"
        width="6"
        height="6" />
    </svg>
  `,
})
export class StopCircleIconComponent extends IconComponentBase {
  static readonly slug = 'stop-circle';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'stop-circle',
    'stop',
    'circle',
    'media',
    'player',
    'end',
    'arrêter',
    'detener',
    'parar',
    'σταμάτημα',
    'τέλος',
    'zatrzymaj',
    'stop',
    'music',
    'audio',
  ];
}

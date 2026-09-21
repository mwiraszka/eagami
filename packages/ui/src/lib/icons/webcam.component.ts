import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-webcam',
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
        cy="10"
        r="8" />
      <circle
        cx="12"
        cy="10"
        r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </svg>
  `,
})
export class WebcamIconComponent extends IconComponentBase {
  static readonly slug = 'webcam';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'webcam',
    'camera',
    'video call',
    'stream',
    'conference',
    'caméra web',
    'cámara web',
    'κάμερα web',
    'kamera internetowa',
    'video',
  ];
}

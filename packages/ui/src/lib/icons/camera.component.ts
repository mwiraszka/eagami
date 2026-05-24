import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-camera',
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
        d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle
        cx="12"
        cy="13"
        r="4" />
    </svg>
  `,
})
export class CameraIconComponent extends IconComponentBase {
  static readonly slug = 'camera';
  static readonly category: IconCategory = 'feather';
  static override readonly defaultStrokeWidth = 1.5;
  static readonly tags: ReadonlyArray<string> = [
    'camera',
    'photo',
    'photography',
    'picture',
    'snapshot',
    'appareil photo',
    'cámara',
    'foto',
    'κάμερα',
    'φωτογραφία',
    'aparat',
    'zdjęcie',
  ];
}

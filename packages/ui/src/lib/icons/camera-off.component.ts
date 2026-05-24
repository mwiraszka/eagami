import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-camera-off',
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
        x1="1"
        y1="1"
        x2="23"
        y2="23" />
      <path
        d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56" />
    </svg>
  `,
})
export class CameraOffIconComponent extends IconComponentBase {
  static readonly slug = 'camera-off';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'camera-off',
    'camera',
    'off',
    'disabled',
    'photo',
    'mute',
    'appareil photo',
    'désactivé',
    'cámara',
    'apagado',
    'κάμερα',
    'απενεργοποιημένη',
    'aparat',
    'wyłączony',
  ];
}

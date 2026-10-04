import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-switch-camera',
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
      <path d="M7.5 12.75a2 2 0 0 1 2-2h6" />
      <path d="m13.75 9 1.75 1.75-1.75 1.75" />
      <path d="M16.5 14.25a2 2 0 0 1-2 2h-6" />
      <path d="m10.25 14.5-1.75 1.75 1.75 1.75" />
    </svg>
  `,
})
export class SwitchCameraIconComponent extends IconComponentBase {
  static readonly slug = 'switch-camera';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'switch-camera',
    'camera',
    'switch',
    'flip',
    'front',
    'rear',
    'changer de caméra',
    'cambiar cámara',
    'εναλλαγή κάμερας',
    'przełącz kamerę',
    'video',
  ];
}

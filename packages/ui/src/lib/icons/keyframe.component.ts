import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-keyframe',
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
        x1="2"
        y1="12"
        x2="6.5"
        y2="12" />
      <line
        x1="17.5"
        y1="12"
        x2="22"
        y2="12" />
      <path d="M12 7l5 5-5 5-5-5z" />
    </svg>
  `,
})
export class KeyframeIconComponent extends IconComponentBase {
  static readonly slug = 'keyframe';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'keyframe',
    'animation',
    'timeline marker',
    'tween',
    'waypoint',
    'image clé',
    'fotograma clave',
    'καρέ-κλειδί',
    'klatka kluczowa',
  ];
}

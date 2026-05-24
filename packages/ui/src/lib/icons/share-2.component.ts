import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-share-2',
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
        cx="18"
        cy="5"
        r="3" />
      <circle
        cx="6"
        cy="12"
        r="3" />
      <circle
        cx="18"
        cy="19"
        r="3" />
      <line
        x1="8.59"
        y1="13.51"
        x2="15.42"
        y2="17.49" />
      <line
        x1="15.41"
        y1="6.51"
        x2="8.59"
        y2="10.49" />
    </svg>
  `,
})
export class Share2IconComponent extends IconComponentBase {
  static readonly slug = 'share-2';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'share-2',
    'share',
    '2',
    'send',
    'network',
    'social',
    'partager',
    'compartir',
    'κοινοποίηση',
    'udostępnij',
  ];
}

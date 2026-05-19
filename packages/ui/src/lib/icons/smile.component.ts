import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-smile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      width="100%"
      height="100%">
      <circle
        cx="12"
        cy="12"
        r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line
        x1="9"
        y1="9"
        x2="9.01"
        y2="9" />
      <line
        x1="15"
        y1="9"
        x2="15.01"
        y2="9" />
    </svg>
  `,
})
export class SmileIconComponent extends IconComponentBase {
  static readonly slug = 'smile';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'smile',
    'happy',
    'face',
    'emoji',
    'positive',
    'sourire',
    'visage',
    'sonrisa',
    'feliz',
    'cara',
    'χαμόγελο',
    'χαρούμενος',
    'uśmiech',
    'twarz',
  ];
}

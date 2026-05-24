import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-skip-back',
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
      <polygon points="19 20 9 12 19 4 19 20" />
      <line
        x1="5"
        y1="19"
        x2="5"
        y2="5" />
    </svg>
  `,
})
export class SkipBackIconComponent extends IconComponentBase {
  static readonly slug = 'skip-back';
  static readonly category: IconCategory = 'feather';
  static readonly tags: ReadonlyArray<string> = [
    'skip-back',
    'skip',
    'back',
    'previous',
    'media',
    'player',
    'précédent',
    'anterior',
    'προηγούμενο',
    'poprzedni',
    'cofnij',
    'music',
    'audio',
  ];
}

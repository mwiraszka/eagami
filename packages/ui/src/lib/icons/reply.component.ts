import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-reply',
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
      <path d="m9 6-6 6 6 6" />
      <path d="M3 12h10a8 8 0 0 1 8 8" />
    </svg>
  `,
})
export class ReplyIconComponent extends IconComponentBase {
  static readonly slug = 'reply';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'reply',
    'respond',
    'answer',
    'message',
    'email',
    'répondre',
    'responder',
    'απάντηση',
    'odpowiedz',
  ];
}

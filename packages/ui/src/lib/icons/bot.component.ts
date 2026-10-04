import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-bot',
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
      <rect
        x="4"
        y="8"
        width="16"
        height="12"
        rx="3" />
      <path d="M12 8V5.5" />
      <circle
        cx="12"
        cy="4"
        r="1.5" />
      <path d="M9 12.5h.01" />
      <path d="M15 12.5h.01" />
      <path d="M9.5 16.5h5" />
      <path d="M2 13v3" />
      <path d="M22 13v3" />
    </svg>
  `,
})
export class BotIconComponent extends IconComponentBase {
  static readonly slug = 'bot';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'bot',
    'robot',
    'ai',
    'assistant',
    'chatbot',
    'ρομπότ',
    'robot',
  ];
}

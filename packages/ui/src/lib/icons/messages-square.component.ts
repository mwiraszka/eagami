import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-messages-square',
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
      <path d="M14 3H4a2 2 0 0 0-2 2v11l3.5-3.5H14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
      <path d="M19 8.5h1a2 2 0 0 1 2 2V21l-3.5-3.5H10a2 2 0 0 1-2-2V15" />
    </svg>
  `,
})
export class MessagesSquareIconComponent extends IconComponentBase {
  static readonly slug = 'messages-square';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'messages-square',
    'conversation',
    'chat',
    'messages',
    'comments',
    'discussion',
    'messagerie',
    'échange',
    'conversación',
    'mensajes',
    'συνομιλία',
    'μηνύματα',
    'rozmowa',
    'wiadomości',
  ];
}

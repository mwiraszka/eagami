import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-newspaper',
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
      <path d="M2 18V4a2 2 0 0 1 2-2h13" />
      <rect
        x="6"
        y="5"
        width="16"
        height="17"
        rx="2" />
      <rect
        x="9.5"
        y="8.5"
        width="9"
        height="3.5"
        rx="1" />
      <path d="M18.5 15.5h-9" />
      <path d="M15.5 19h-6" />
    </svg>
  `,
})
export class NewspaperIconComponent extends IconComponentBase {
  static readonly slug = 'newspaper';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'newspaper',
    'news',
    'article',
    'press',
    'headline',
    'journal',
    'presse',
    'actualités',
    'periódico',
    'noticias',
    'εφημερίδα',
    'ειδήσεις',
    'gazeta',
    'wiadomości',
  ];
}

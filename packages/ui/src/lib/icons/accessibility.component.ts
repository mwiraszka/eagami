import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-accessibility',
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
        cx="10"
        cy="4"
        r="1.5" />
      <path d="M10 8v5" />
      <path d="M10 10.5h4.5" />
      <path d="M10 13h5l2 5h2.5" />
      <path d="M5.4 13.63a5 5 0 1 0 8.8 4.58" />
    </svg>
  `,
})
export class AccessibilityIconComponent extends IconComponentBase {
  static readonly slug = 'accessibility';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'accessibility',
    'a11y',
    'inclusive',
    'disability',
    'person',
    'accessibilité',
    'accesibilidad',
    'προσβασιμότητα',
    'dostępność',
  ];
}

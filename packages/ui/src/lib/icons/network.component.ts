import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-network',
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
        x="16"
        y="16"
        width="6"
        height="6"
        rx="1" />
      <rect
        x="2"
        y="16"
        width="6"
        height="6"
        rx="1" />
      <rect
        x="9"
        y="2"
        width="6"
        height="6"
        rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  `,
})
export class NetworkIconComponent extends IconComponentBase {
  static readonly slug = 'network';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'network',
    'connection',
    'topology',
    'infrastructure',
    'nodes',
    'lan',
    'réseau',
    'connexion',
    'red',
    'conexión',
    'δίκτυο',
    'σύνδεση',
    'sieć',
    'połączenie',
  ];
}

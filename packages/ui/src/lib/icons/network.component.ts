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
      <circle
        cx="12"
        cy="5"
        r="3" />
      <circle
        cx="5"
        cy="19"
        r="3" />
      <circle
        cx="19"
        cy="19"
        r="3" />
      <path d="M10.66 7.68 6.34 16.32" />
      <path d="m13.34 7.68 4.32 8.64" />
      <path d="M8 19h8" />
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

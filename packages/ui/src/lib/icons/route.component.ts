import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type IconCategory, IconComponentBase } from './icon-category';

@Component({
  selector: 'ea-icon-route',
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
        cx="5.5"
        cy="18.5"
        r="2.5" />
      <circle
        cx="18.5"
        cy="5.5"
        r="2.5" />
      <path d="M8 18.5h8a3.25 3.25 0 0 0 0-6.5H8a3.25 3.25 0 0 1 0-6.5h8" />
    </svg>
  `,
})
export class RouteIconComponent extends IconComponentBase {
  static readonly slug = 'route';
  static readonly category: IconCategory = 'eagami';
  static readonly tags: ReadonlyArray<string> = [
    'route',
    'directions',
    'path',
    'journey',
    'delivery',
    'navigation',
    'itinéraire',
    'trajet',
    'ruta',
    'trayecto',
    'διαδρομή',
    'κατευθύνσεις',
    'trasa',
    'droga',
  ];
}

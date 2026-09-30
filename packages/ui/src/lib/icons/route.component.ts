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
        cx="6"
        cy="19"
        r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle
        cx="18"
        cy="5"
        r="3" />
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

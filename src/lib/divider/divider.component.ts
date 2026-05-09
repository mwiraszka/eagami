import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

/** Orientation of the divider rule. */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Thin separator used to visually divide content. Renders horizontally by
 * default and may include an optional centred label (e.g. "or").
 */
@Component({
  selector: 'ea-divider',
  imports: [NgClass],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DividerComponent {
  readonly orientation = input<DividerOrientation>('horizontal');
  readonly label = input<string | undefined>(undefined);

  readonly hostClasses = computed(() => ({
    [`ea-divider--${this.orientation()}`]: true,
    'ea-divider--with-label': !!this.label(),
  }));
}

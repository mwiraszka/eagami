import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type EmptyStateSize = 'sm' | 'md' | 'lg';
export type EmptyStateHeadingLevel = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

@Component({
  selector: 'ea-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class EmptyStateComponent {
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly size = input<EmptyStateSize>('md');
  readonly headingLevel = input<EmptyStateHeadingLevel>('h2');

  readonly hostClasses = computed(() => ({
    [`ea-empty-state--${this.size()}`]: true,
  }));
}

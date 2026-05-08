import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type EmptyStateSize = 'sm' | 'md' | 'lg';

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

  readonly hostClasses = computed(() => ({
    [`ea-empty-state--${this.size()}`]: true,
  }));
}

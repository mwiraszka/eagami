import {
  ChangeDetectionStrategy,
  Component,
  type OnDestroy,
  type OnInit,
  computed,
  inject,
  input,
} from '@angular/core';

import { StepperComponent } from './stepper.component';

/**
 * Single step within an `<ea-stepper>`. Registers itself with the parent on
 * init, exposes its `label` / `completed` / `optional` flags, and shows its
 * projected content when active.
 */
@Component({
  selector: 'ea-step',
  host: { '[style.display]': 'isActive() ? null : "none"' },
  template: `
    @if (isActive()) {
      <div
        class="ea-step__panel"
        role="tabpanel"
        [id]="id() + '-panel'"
        [attr.aria-labelledby]="id() + '-tab'"
        tabindex="0">
        <ng-content />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent implements OnInit, OnDestroy {
  private readonly stepper = inject(StepperComponent);

  readonly label = input.required<string>();
  readonly completed = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly optional = input<boolean>(false);
  readonly id = input<string>(`ea-step-${Math.random().toString(36).slice(2, 9)}`);

  readonly isActive = computed(
    () => this.stepper.indexOf(this) === this.stepper.activeStep(),
  );

  ngOnInit(): void {
    this.stepper.registerStep(this);
  }

  ngOnDestroy(): void {
    this.stepper.unregisterStep(this);
  }
}

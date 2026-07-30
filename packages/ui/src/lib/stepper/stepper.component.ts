import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';

import { isRtl } from '../direction';
import { EagamiI18nService } from '../i18n/i18n.service';
import { CheckIconComponent } from '../icons/check.component';
import { type EaSize } from '../sizes';
import { uniqueId } from '../unique-id';
import type { StepComponent } from './step.component';

/** Visual size of the stepper. */
export type StepperSize = EaSize;

/**
 * Multi-step navigation paired with content panels. Child `<ea-step>`
 * components register themselves automatically and the active panel is
 * shown based on the `activeStep` (zero-based index) two-way binding.
 *
 * In `linear` mode, steps cannot be navigated to until all earlier
 * non-optional steps are marked `completed`. Otherwise any step can be
 * clicked. ArrowLeft / ArrowRight walk through reachable steps; Home/End
 * jump to the extremes.
 */
@Component({
  selector: 'ea-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckIconComponent, NgClass],
})
export class StepperComponent {
  protected readonly i18n = inject(EagamiI18nService);

  readonly registeredSteps = signal<StepComponent[]>([]);

  readonly activeStep = model<number>(0);
  readonly linear = input<boolean>(false);
  readonly size = input<StepperSize>('md');
  readonly disabled = input<boolean>(false);
  readonly id = input<string>(uniqueId('ea-stepper'));

  /** Fires with the new active step index when the user navigates. */
  readonly changed = output<number>();

  readonly hostClasses = computed(() => ({
    [`ea-stepper--${this.size()}`]: true,
    'ea-stepper--disabled': this.disabled(),
  }));

  registerStep(step: StepComponent): void {
    this.registeredSteps.update(steps => [...steps, step]);
  }

  unregisterStep(step: StepComponent): void {
    this.registeredSteps.update(steps => steps.filter(s => s !== step));
  }

  /** Returns the index of a given step, or `-1` if it isn't registered. */
  indexOf(step: StepComponent): number {
    return this.registeredSteps().indexOf(step);
  }

  /**
   * True when the user can navigate directly to the step at `index`. In
   * non-linear mode this is true for any non-disabled step; in linear mode,
   * every non-optional earlier step must also be marked `completed`.
   */
  canNavigateTo(index: number): boolean {
    if (this.disabled()) {
      return false;
    }
    const steps = this.registeredSteps();
    if (index < 0 || index >= steps.length) {
      return false;
    }
    if (steps[index].disabled()) {
      return false;
    }
    if (!this.linear()) {
      return true;
    }
    if (index <= this.activeStep()) {
      return true;
    }
    for (let i = 0; i < index; i++) {
      const step = steps[i];
      if (!step.completed() && !step.optional()) {
        return false;
      }
    }
    return true;
  }

  /** Activate the step at `index` if reachable. */
  selectStep(index: number): void {
    if (!this.canNavigateTo(index)) {
      return;
    }
    if (index === this.activeStep()) {
      return;
    }
    this.activeStep.set(index);
    this.changed.emit(index);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }
    const steps = this.registeredSteps();
    if (steps.length === 0) {
      return;
    }

    const rtl = isRtl(event.currentTarget as Element);
    const forwardKey = rtl ? 'ArrowLeft' : 'ArrowRight';
    const backwardKey = rtl ? 'ArrowRight' : 'ArrowLeft';

    let nextIndex = -1;
    if (event.key === forwardKey) {
      event.preventDefault();
      nextIndex = this.nextReachable(this.activeStep(), 1);
    } else if (event.key === backwardKey) {
      event.preventDefault();
      nextIndex = this.nextReachable(this.activeStep(), -1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = this.firstReachable();
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = this.lastReachable();
    }

    if (nextIndex >= 0 && nextIndex !== this.activeStep()) {
      this.selectStep(nextIndex);
      const buttons = (
        event.currentTarget as HTMLElement
      ).querySelectorAll<HTMLButtonElement>('.ea-stepper__button:not([disabled])');
      // Match the focused button to the new index (visit order matches DOM order)
      const reachableIndices = this.registeredSteps()
        .map((_, i) => i)
        .filter(i => this.canNavigateTo(i));
      const buttonIdx = reachableIndices.indexOf(nextIndex);
      buttons[buttonIdx]?.focus();
    }
  }

  private nextReachable(from: number, direction: 1 | -1): number {
    const steps = this.registeredSteps();
    for (let i = from + direction; i >= 0 && i < steps.length; i += direction) {
      if (this.canNavigateTo(i)) {
        return i;
      }
    }
    return -1;
  }

  private firstReachable(): number {
    const steps = this.registeredSteps();
    for (let i = 0; i < steps.length; i++) {
      if (this.canNavigateTo(i)) {
        return i;
      }
    }
    return -1;
  }

  private lastReachable(): number {
    const steps = this.registeredSteps();
    for (let i = steps.length - 1; i >= 0; i--) {
      if (this.canNavigateTo(i)) {
        return i;
      }
    }
    return -1;
  }
}

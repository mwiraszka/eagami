import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { StepComponent } from './step.component';
import { StepperComponent } from './stepper.component';

@Component({
  template: `
    <ea-stepper
      [activeStep]="activeStep()"
      [linear]="linear()"
      [disabled]="disabled()"
      (changed)="onChanged($event)">
      <ea-step
        label="One"
        [completed]="step1Completed()"
        >Step one body</ea-step
      >
      <ea-step
        label="Two"
        [completed]="step2Completed()"
        [optional]="step2Optional()">
        Step two body
      </ea-step>
      <ea-step
        label="Three"
        [disabled]="step3Disabled()"
        >Step three body</ea-step
      >
    </ea-stepper>
  `,
  imports: [StepperComponent, StepComponent],
})
class HostComponent {
  activeStep = signal(0);
  linear = signal(false);
  disabled = signal(false);
  step1Completed = signal(false);
  step2Completed = signal(false);
  step2Optional = signal(false);
  step3Disabled = signal(false);
  changedEvents: number[] = [];

  onChanged(index: number): void {
    this.changedEvents.push(index);
  }
}

describe('StepperComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  function getButtons(): HTMLButtonElement[] {
    return Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
        '.ea-stepper__button',
      ),
    );
  }

  function getActivePanel(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.ea-step__panel');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders a button per step', () => {
      expect(getButtons().length).toBe(3);
    });

    it('marks the first step active by default', () => {
      const buttons = getButtons();
      expect(buttons[0].classList).toContain('ea-stepper__button--active');
      expect(buttons[1].classList).not.toContain('ea-stepper__button--active');
    });

    it('shows the active step body', () => {
      const panel = getActivePanel();
      expect(panel).toBeTruthy();
      expect(panel!.textContent).toContain('Step one body');
    });

    it('renders connectors between steps', () => {
      const connectors = fixture.nativeElement.querySelectorAll('.ea-stepper__connector');
      expect(connectors.length).toBe(2);
    });

    it('renders the optional marker when a step is optional', () => {
      host.step2Optional.set(true);
      fixture.detectChanges();

      const optional = fixture.nativeElement.querySelector('.ea-stepper__optional');
      expect(optional.textContent).toContain('optional');
    });

    it('renders a check icon on completed steps', () => {
      host.step1Completed.set(true);
      fixture.detectChanges();

      const buttons = getButtons();
      const check = buttons[0].querySelector('ea-icon-check');
      expect(check).toBeTruthy();
      expect(buttons[0].classList).toContain('ea-stepper__button--completed');
    });
  });

  describe('Navigation', () => {
    it('changes active step on click', () => {
      getButtons()[1].click();
      fixture.detectChanges();

      const buttons = getButtons();
      expect(buttons[1].classList).toContain('ea-stepper__button--active');
      expect(getActivePanel()!.textContent).toContain('Step two body');
    });

    it('emits changed with the new index', () => {
      getButtons()[2].click();

      expect(host.changedEvents).toEqual([2]);
    });

    it('does not emit when clicking the already-active step', () => {
      getButtons()[0].click();

      expect(host.changedEvents).toEqual([]);
    });

    it('disables a step when its disabled input is true', () => {
      host.step3Disabled.set(true);
      fixture.detectChanges();

      const buttons = getButtons();
      expect(buttons[2].disabled).toBe(true);

      buttons[2].click();

      expect(host.changedEvents).toEqual([]);
    });
  });

  describe('Linear mode', () => {
    beforeEach(() => {
      host.linear.set(true);
      fixture.detectChanges();
    });

    it('blocks navigation to later steps until earlier ones are completed', () => {
      // step 0 is active; step 1 isn't completed, so step 2 isn't reachable
      const buttons = getButtons();
      expect(buttons[2].disabled).toBe(true);

      buttons[2].click();
      expect(host.changedEvents).toEqual([]);
    });

    it('allows skipping optional steps', () => {
      host.step1Completed.set(true);
      host.step2Optional.set(true);
      fixture.detectChanges();

      // step 1 completed and step 2 optional, so step 2 (index 2, "Three") is reachable
      const buttons = getButtons();
      expect(buttons[2].disabled).toBe(false);
    });

    it('unblocks the next step when the current is completed', () => {
      host.step1Completed.set(true);
      fixture.detectChanges();

      const buttons = getButtons();
      expect(buttons[1].disabled).toBe(false);
      buttons[1].click();

      expect(host.changedEvents).toEqual([1]);
    });
  });

  describe('Keyboard navigation', () => {
    function dispatchKey(key: string): void {
      const list = fixture.nativeElement.querySelector('.ea-stepper__list');
      list.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      fixture.detectChanges();
    }

    it('moves forward on ArrowRight', () => {
      dispatchKey('ArrowRight');

      expect(host.changedEvents).toEqual([1]);
    });

    it('moves backward on ArrowLeft', () => {
      host.activeStep.set(2);
      fixture.detectChanges();

      dispatchKey('ArrowLeft');

      expect(host.changedEvents).toEqual([1]);
    });

    it('jumps to first / last reachable on Home / End', () => {
      host.activeStep.set(1);
      fixture.detectChanges();

      dispatchKey('Home');
      dispatchKey('End');

      expect(host.changedEvents).toEqual([0, 2]);
    });
  });

  describe('Disabled stepper', () => {
    beforeEach(() => {
      host.disabled.set(true);
      fixture.detectChanges();
    });

    it('disables every step button when the stepper itself is disabled', () => {
      const buttons = getButtons();
      buttons.forEach(b => expect(b.disabled).toBe(true));
    });

    it('ignores click navigation when disabled', () => {
      getButtons()[1].click();

      expect(host.changedEvents).toEqual([]);
    });
  });
});

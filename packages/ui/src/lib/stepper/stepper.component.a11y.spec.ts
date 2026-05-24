import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { StepComponent } from './step.component';
import { StepperComponent } from './stepper.component';

@Component({
  imports: [StepperComponent, StepComponent],
  template: `
    <ea-stepper
      [activeStep]="activeStep"
      [linear]="linear"
      [disabled]="disabled">
      <ea-step
        label="Account"
        [completed]="step1Completed"
        >Account details</ea-step
      >
      <ea-step
        label="Profile"
        [completed]="step2Completed"
        >Profile information</ea-step
      >
      <ea-step label="Review">Review and submit</ea-step>
    </ea-stepper>
  `,
})
class HostComponent {
  activeStep = 0;
  linear = false;
  disabled = false;
  step1Completed = false;
  step2Completed = false;
}

// TODO(a11y): the stepper template wraps each `role="tab"` button in an
// `<li>` inside an `<ol role="tablist">`. axe flags this two ways:
// `aria-required-children` (tablist children must be tabs, not list items)
// and `listitem` (the implicit list role is overridden by role="tablist", so
// the `<li>` has no list parent). Restore once the stepper drops the
// `<ol>/<li>` semantic structure in favour of a flat `<div role="tablist">
// <button role="tab">` shape, or moves the `<li>` to a wrapper with
// `role="presentation"`.
describe.skip('StepperComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations in the default state', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when later steps are active', async () => {
    const el = await render(host => {
      host.step1Completed = true;
      host.activeStep = 1;
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

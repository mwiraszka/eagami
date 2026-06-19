import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SliderComponent } from './slider.component';

@Component({
  imports: [SliderComponent],
  template: `
    <ea-slider
      [label]="label"
      [value]="value"
      [min]="min"
      [max]="max"
      [step]="step"
      [hint]="hint"
      [errorMsg]="errorMsg"
      [disabled]="disabled"
      [showValue]="showValue"
      [showMinMaxLabels]="showMinMaxLabels" />
  `,
})
class HostComponent {
  label: string | undefined = 'Volume';
  value = 50;
  min = 0;
  max = 100;
  step = 1;
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
  disabled = false;
  showValue = false;
  showMinMaxLabels = false;
}

describe('SliderComponent a11y', () => {
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

  it('has no detectable violations with a hint', async () => {
    const el = await render(host => (host.hint = 'Choose a value'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with an error message', async () => {
    const el = await render(host => (host.errorMsg = 'Out of range'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with min/max labels and value display', async () => {
    const el = await render(host => {
      host.showMinMaxLabels = true;
      host.showValue = true;
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NumberInputComponent } from './number-input.component';

@Component({
  imports: [NumberInputComponent],
  template: `
    <ea-number-input
      [label]="label"
      [aria-label]="ariaLabel"
      [placeholder]="placeholder"
      [hint]="hint"
      [errorMsg]="errorMsg"
      [min]="min"
      [max]="max"
      [disabled]="disabled"
      [required]="required" />
  `,
})
class HostComponent {
  label: string | undefined = 'Quantity';
  ariaLabel: string | undefined = undefined;
  placeholder = '0';
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
  min: number | undefined = 0;
  max: number | undefined = 100;
  disabled = false;
  required = false;
}

describe('NumberInputComponent a11y', () => {
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
    const el = await render(host => (host.hint = 'Enter a whole number'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the error state', async () => {
    const el = await render(host => (host.errorMsg = 'Quantity is required'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with only an aria-label (no visible label)', async () => {
    const el = await render(host => {
      host.label = undefined;
      host.ariaLabel = 'Quantity';
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

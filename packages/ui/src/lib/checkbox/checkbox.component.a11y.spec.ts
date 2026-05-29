import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { CheckboxComponent, type CheckboxSize } from './checkbox.component';

@Component({
  imports: [CheckboxComponent],
  template: `
    <ea-checkbox
      [label]="label"
      [size]="size"
      [disabled]="disabled"
      [indeterminate]="indeterminate"
      [hint]="hint"
      [errorMsg]="errorMsg" />
  `,
})
class HostComponent {
  label: string | undefined = 'I agree to the terms';
  size: CheckboxSize = 'md';
  disabled = false;
  indeterminate = false;
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
}

describe('CheckboxComponent a11y', () => {
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
    const el = await render(host => (host.hint = 'Required to continue'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with an error message', async () => {
    const el = await render(host => (host.errorMsg = 'You must accept the terms'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the indeterminate state', async () => {
    const el = await render(host => (host.indeterminate = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

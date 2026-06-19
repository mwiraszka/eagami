import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { InputComponent, type InputType } from './input.component';

@Component({
  imports: [InputComponent],
  template: `
    <ea-input
      [label]="label"
      [type]="type"
      [placeholder]="placeholder"
      [hint]="hint"
      [errorMsg]="errorMsg"
      [disabled]="disabled"
      [required]="required" />
  `,
})
class HostComponent {
  label: string | undefined = 'Email';
  type: InputType = 'text';
  placeholder = 'Enter your email';
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
  disabled = false;
  required = false;
}

describe('InputComponent a11y', () => {
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
    const el = await render(host => (host.hint = 'We will never share your email'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the error state', async () => {
    const el = await render(host => (host.errorMsg = 'Email is required'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations for type="password"', async () => {
    const el = await render(host => (host.type = 'password'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

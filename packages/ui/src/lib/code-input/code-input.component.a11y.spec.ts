import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { CodeInputComponent, CodeInputSize } from './code-input.component';

@Component({
  imports: [CodeInputComponent],
  template: `
    <ea-code-input
      [label]="label"
      [length]="length"
      [size]="size"
      [disabled]="disabled"
      [hint]="hint"
      [errorMsg]="errorMsg" />
  `,
})
class HostComponent {
  label: string | undefined = 'Verification code';
  length = 6;
  size: CodeInputSize = 'md';
  disabled = false;
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
}

describe('CodeInputComponent a11y', () => {
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
    const el = await render(host => (host.hint = 'Check your email for the code'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with an error message', async () => {
    const el = await render(host => (host.errorMsg = 'Invalid code'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

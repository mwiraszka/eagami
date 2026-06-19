import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SwitchComponent } from './switch.component';

@Component({
  imports: [SwitchComponent],
  template: `
    <ea-switch
      [label]="label"
      [hint]="hint"
      [errorMsg]="errorMsg"
      [disabled]="disabled"
      [checked]="checked" />
  `,
})
class HostComponent {
  label: string | undefined = 'Enable notifications';
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
  disabled = false;
  checked = false;
}

describe('SwitchComponent a11y', () => {
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

  it('has no detectable violations when checked', async () => {
    const el = await render(host => (host.checked = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a hint', async () => {
    const el = await render(host => (host.hint = 'You can unsubscribe later'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with an error message', async () => {
    const el = await render(host => (host.errorMsg = 'Required'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

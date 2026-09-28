import { axe } from 'vitest-axe';

import { Component, type Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { CheckIconComponent } from '../icons/check.component';
import { XIconComponent } from '../icons/x.component';
import { SwitchComponent, type SwitchVariant } from './switch.component';

@Component({
  imports: [SwitchComponent],
  template: `
    <ea-switch
      [label]="label"
      [hint]="hint"
      [errorMsg]="errorMsg"
      [disabled]="disabled"
      [checked]="checked"
      [variant]="variant"
      [onIcon]="onIcon"
      [offIcon]="offIcon" />
  `,
})
class HostComponent {
  label: string | undefined = 'Enable notifications';
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
  disabled = false;
  checked = false;
  variant: SwitchVariant = 'default';
  onIcon: Type<unknown> | undefined = undefined;
  offIcon: Type<unknown> | undefined = undefined;
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

  it('has no detectable violations with a status tone and thumb icons', async () => {
    const el = await render(host => {
      host.variant = 'warning';
      host.onIcon = CheckIconComponent;
      host.offIcon = XIconComponent;
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when a toned switch with icons is on', async () => {
    const el = await render(host => {
      host.variant = 'warning';
      host.checked = true;
      host.onIcon = CheckIconComponent;
      host.offIcon = XIconComponent;
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

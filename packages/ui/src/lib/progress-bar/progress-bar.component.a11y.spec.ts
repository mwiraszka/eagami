import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ProgressBarComponent, ProgressBarVariant } from './progress-bar.component';

@Component({
  imports: [ProgressBarComponent],
  template: `
    <ea-progress-bar
      [value]="value"
      [max]="max"
      [variant]="variant"
      [label]="label"
      [showValue]="showValue"
      [indeterminate]="indeterminate" />
  `,
})
class HostComponent {
  value = 40;
  max = 100;
  variant: ProgressBarVariant = 'default';
  label: string | undefined = 'Uploading files';
  showValue = false;
  indeterminate = false;
}

describe('ProgressBarComponent a11y', () => {
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

  it('has no detectable violations with the value visible', async () => {
    const el = await render(host => (host.showValue = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the indeterminate state', async () => {
    const el = await render(host => (host.indeterminate = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it.each(['success', 'warning', 'error', 'info'] as const)(
    'has no detectable violations for the %s variant',
    async variant => {
      const el = await render(host => (host.variant = variant));

      const results = await axe(el);

      expect(results).toHaveNoViolations();
    },
  );
});

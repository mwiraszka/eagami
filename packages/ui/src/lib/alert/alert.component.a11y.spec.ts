import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AlertComponent, AlertVariant } from './alert.component';

@Component({
  imports: [AlertComponent],
  template: `
    <ea-alert
      [variant]="variant"
      [dismissible]="dismissible">
      {{ text }}
    </ea-alert>
  `,
})
class HostComponent {
  text = 'Your changes have been saved.';
  variant: AlertVariant = 'default';
  dismissible = false;
}

describe('AlertComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it.each(['default', 'success', 'warning', 'error', 'info'] as const)(
    'has no detectable violations for the %s variant',
    async variant => {
      const el = await render(host => (host.variant = variant));

      const results = await axe(el);

      expect(results).toHaveNoViolations();
    },
  );

  it('has no detectable violations when dismissible', async () => {
    const el = await render(host => {
      host.variant = 'info';
      host.dismissible = true;
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

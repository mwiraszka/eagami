import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AlertComponent, type AlertLive, type AlertVariant } from './alert.component';

@Component({
  imports: [AlertComponent],
  template: `
    <ea-alert
      [variant]="variant"
      [dismissible]="dismissible"
      [live]="live">
      {{ text }}
    </ea-alert>
  `,
})
class HostComponent {
  text = 'Your changes have been saved.';
  variant: AlertVariant = 'default';
  dismissible = false;
  live: AlertLive = 'auto';
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

  it.each(['assertive', 'polite', 'off'] as const)(
    'has no detectable violations when live is %s',
    async live => {
      const el = await render(host => {
        host.variant = 'warning';
        host.live = live;
      });

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

import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SettingsIconComponent } from '../icons/settings.component';
import { ButtonLinkComponent } from './button-link.component';
import { type ButtonAlign, type ButtonVariant } from './button.component';

@Component({
  imports: [ButtonLinkComponent],
  template: `
    <a
      eaButtonLink
      href="/pricing"
      [variant]="variant"
      [align]="align"
      [fullWidth]="fullWidth"
      [disabled]="disabled">
      {{ text }}
    </a>
  `,
})
class HostComponent {
  text = 'See pricing';
  variant: ButtonVariant = 'primary';
  align: ButtonAlign = 'center';
  fullWidth = false;
  disabled = false;
}

@Component({
  imports: [ButtonLinkComponent],
  template: `
    <a
      eaButtonLink
      href="/settings"
      aria-label="Settings"
      variant="ghost"
      [icon]="icon">
    </a>
  `,
})
class IconOnlyHostComponent {
  icon = SettingsIconComponent;
}

describe('ButtonLinkComponent a11y', () => {
  async function render<T>(host: new () => T, setup?: (instance: T) => void) {
    await TestBed.configureTestingModule({
      imports: [host],
    }).compileComponents();
    const fixture = TestBed.createComponent(host);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    // jsdom mis-evaluates the label's `:empty` rule in getComputedStyle, so axe would
    // read the link text as display:none; strip styles to assess the semantic DOM
    document.querySelectorAll('style').forEach(el => el.remove());
    return fixture.nativeElement as HTMLElement;
  }

  it.each(['primary', 'secondary', 'ghost', 'danger', 'link'] as const)(
    'has no detectable violations for the %s variant',
    async variant => {
      const el = await render(HostComponent, host => (host.variant = variant));

      const results = await axe(el);

      expect(results).toHaveNoViolations();
    },
  );

  it('has no detectable violations as a start-aligned full-width row', async () => {
    const el = await render(HostComponent, host => {
      host.fullWidth = true;
      host.align = 'start';
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(HostComponent, host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations as an icon-only link with aria-label', async () => {
    const el = await render(IconOnlyHostComponent);

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

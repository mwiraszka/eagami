import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ButtonComponent, type ButtonSize, type ButtonVariant } from './button.component';

@Component({
  imports: [ButtonComponent],
  template: `
    <ea-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading">
      {{ text }}
    </ea-button>
  `,
})
class HostComponent {
  text = 'Save changes';
  variant: ButtonVariant = 'primary';
  size: ButtonSize = 'md';
  disabled = false;
  loading = false;
}

describe('ButtonComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    // jsdom mis-evaluates `:empty` in getComputedStyle, so applied component styles make
    // axe treat text-bearing elements as display:none. Strip styles so axe assesses the
    // semantic DOM, as it did under the style-free jest setup.
    document.querySelectorAll('style').forEach(el => el.remove());
    return fixture.nativeElement as HTMLElement;
  }

  it.each(['primary', 'secondary', 'ghost', 'danger'] as const)(
    'has no detectable violations for the %s variant',
    async variant => {
      const el = await render(host => (host.variant = variant));

      const results = await axe(el);

      expect(results).toHaveNoViolations();
    },
  );

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when loading', async () => {
    const el = await render(host => (host.loading = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

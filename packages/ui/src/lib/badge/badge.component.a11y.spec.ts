import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { BadgeComponent } from './badge.component';

@Component({
  imports: [BadgeComponent],
  template: `
    <ea-badge
      [variant]="variant"
      [size]="size"
      [shape]="shape">
      {{ text }}
    </ea-badge>
  `,
})
class HostComponent {
  text = 'New';
  variant: 'default' | 'success' | 'warning' | 'error' | 'info' = 'default';
  size: 'sm' | 'md' | 'lg' = 'md';
  shape: 'pill' | 'pin' = 'pill';
}

describe('BadgeComponent a11y', () => {
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
});

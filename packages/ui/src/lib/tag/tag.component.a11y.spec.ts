import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TagComponent, type TagSize, type TagVariant } from './tag.component';

@Component({
  imports: [TagComponent],
  template: `
    <ea-tag
      [variant]="variant"
      [size]="size"
      [removable]="removable"
      [disabled]="disabled"
      [color]="color"
      [ink]="ink">
      {{ text }}
    </ea-tag>
  `,
})
class HostComponent {
  text = 'Filter';
  variant: TagVariant = 'default';
  size: TagSize = 'md';
  removable = false;
  disabled = false;
  color: string | undefined = undefined;
  ink: string | undefined = undefined;
}

describe('TagComponent a11y', () => {
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

  it('has no detectable violations when removable', async () => {
    const el = await render(host => (host.removable = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a theme colour and its ink', async () => {
    const el = await render(host => {
      host.color = 'var(--color-brand-default)';
      host.ink = 'var(--color-neutral-0)';
      host.removable = true;
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled and removable', async () => {
    const el = await render(host => {
      host.removable = true;
      host.disabled = true;
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

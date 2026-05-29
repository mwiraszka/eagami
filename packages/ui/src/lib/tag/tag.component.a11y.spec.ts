import { axe } from 'jest-axe';

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
      [disabled]="disabled">
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

  it('has no detectable violations when disabled and removable', async () => {
    const el = await render(host => {
      host.removable = true;
      host.disabled = true;
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeComponent } from './badge.component';

@Component({
  imports: [BadgeComponent],
  template: `
    <ea-badge
      [variant]="variant"
      [size]="size">
      Hello
    </ea-badge>
  `,
})
class HostComponent {
  variant: 'default' | 'success' | 'warning' | 'error' | 'info' = 'default';
  size: 'sm' | 'md' | 'lg' = 'md';
}

describe('BadgeComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  function getBadge(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-badge');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('projects content into the badge', () => {
    expect(getBadge().textContent?.trim()).toBe('Hello');
  });

  it('applies the default variant and size classes', () => {
    expect(getBadge().classList).toContain('ea-badge--default');
    expect(getBadge().classList).toContain('ea-badge--md');
  });

  it('applies the success variant class', () => {
    host.variant = 'success';
    fixture.detectChanges();

    expect(getBadge().classList).toContain('ea-badge--success');
    expect(getBadge().classList).not.toContain('ea-badge--default');
  });

  it('applies the small size class', () => {
    host.size = 'sm';
    fixture.detectChanges();

    expect(getBadge().classList).toContain('ea-badge--sm');
    expect(getBadge().classList).not.toContain('ea-badge--md');
  });

  it.each(['default', 'success', 'warning', 'error', 'info'] as const)(
    'supports the %s variant',
    variant => {
      host.variant = variant;
      fixture.detectChanges();

      expect(getBadge().classList).toContain(`ea-badge--${variant}`);
    },
  );

  it.each(['sm', 'md', 'lg'] as const)('supports the %s size', size => {
    host.size = size;
    fixture.detectChanges();

    expect(getBadge().classList).toContain(`ea-badge--${size}`);
  });
});

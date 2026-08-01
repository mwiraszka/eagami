import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeComponent } from './badge.component';

@Component({
  imports: [BadgeComponent],
  template: `
    <ea-badge
      [variant]="variant()"
      [size]="size()"
      [shape]="shape()">
      Hello
    </ea-badge>
  `,
})
class HostComponent {
  variant = signal<'default' | 'success' | 'warning' | 'error' | 'info'>('default');
  size = signal<'sm' | 'md' | 'lg'>('md');
  shape = signal<'pill' | 'pin'>('pill');
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

  it('applies the default variant, size, and shape classes', () => {
    expect(getBadge().classList).toContain('ea-badge--default');
    expect(getBadge().classList).toContain('ea-badge--md');
    expect(getBadge().classList).toContain('ea-badge--pill');
  });

  it('applies the success variant class', () => {
    host.variant.set('success');
    fixture.detectChanges();

    expect(getBadge().classList).toContain('ea-badge--success');
    expect(getBadge().classList).not.toContain('ea-badge--default');
  });

  it('applies the small size class', () => {
    host.size.set('sm');
    fixture.detectChanges();

    expect(getBadge().classList).toContain('ea-badge--sm');
    expect(getBadge().classList).not.toContain('ea-badge--md');
  });

  it.each(['default', 'success', 'warning', 'error', 'info'] as const)(
    'supports the %s variant',
    variant => {
      host.variant.set(variant);
      fixture.detectChanges();

      expect(getBadge().classList).toContain(`ea-badge--${variant}`);
    },
  );

  it.each(['sm', 'md', 'lg'] as const)('supports the %s size', size => {
    host.size.set(size);
    fixture.detectChanges();

    expect(getBadge().classList).toContain(`ea-badge--${size}`);
  });

  it.each(['pill', 'pin'] as const)('supports the %s shape', shape => {
    host.shape.set(shape);
    fixture.detectChanges();

    expect(getBadge().classList).toContain(`ea-badge--${shape}`);
  });
});

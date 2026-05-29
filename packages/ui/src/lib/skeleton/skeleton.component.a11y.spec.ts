import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SkeletonComponent, type SkeletonVariant } from './skeleton.component';

@Component({
  imports: [SkeletonComponent],
  template: `
    <ea-skeleton
      [variant]="variant"
      [width]="width"
      [height]="height"
      [animated]="animated" />
  `,
})
class HostComponent {
  variant: SkeletonVariant = 'text';
  width: string | undefined = undefined;
  height: string | undefined = undefined;
  animated = true;
}

describe('SkeletonComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it.each(['text', 'circle', 'rect'] as const)(
    'has no detectable violations for the %s variant',
    async variant => {
      const el = await render(host => (host.variant = variant));

      const results = await axe(el);

      expect(results).toHaveNoViolations();
    },
  );

  it('has no detectable violations when animation is disabled', async () => {
    const el = await render(host => (host.animated = false));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

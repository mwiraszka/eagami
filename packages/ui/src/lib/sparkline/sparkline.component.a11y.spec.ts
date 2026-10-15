import { axe } from 'vitest-axe';

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SparklineComponent, type SparklineVariant } from './sparkline.component';

@Component({
  imports: [SparklineComponent],
  template: `<ea-sparkline
    [data]="data()"
    [variant]="variant()"
    [showTooltip]="true" />`,
})
class HostComponent {
  readonly data = signal<(number | null)[]>([12, 18, 15, 22, 19, 27]);
  readonly variant = signal<SparklineVariant>('line');
}

describe('SparklineComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('has no detectable violations as a line', async () => {
    const { el } = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations as bars', async () => {
    const { el } = await render(host => host.variant.set('bar'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with the tooltip open', async () => {
    const { fixture, el } = await render();
    document.elementFromPoint = () => el.querySelector('.ea-sparkline__anchor');
    el.querySelector('.ea-sparkline__svg')!.dispatchEvent(
      new PointerEvent('pointermove', { clientX: 200, pointerType: 'mouse' }),
    );
    fixture.detectChanges();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
    document.querySelectorAll('.ea-tooltip').forEach(tip => tip.remove());
  });

  it('has no detectable violations in the empty state', async () => {
    const { el } = await render(host => host.data.set([]));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

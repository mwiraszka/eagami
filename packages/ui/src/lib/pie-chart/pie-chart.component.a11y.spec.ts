import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { PieChartComponent, type PieChartSlice } from './pie-chart.component';

@Component({
  imports: [PieChartComponent],
  template: `<ea-pie-chart [data]="data" />`,
})
class HostComponent {
  data: PieChartSlice[] = [
    { label: 'Desktop', value: 50 },
    { label: 'Mobile', value: 30 },
  ];
}

describe('PieChartComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('has no detectable violations in the default state', async () => {
    const { el } = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a point highlighted', async () => {
    const { fixture, el } = await render();
    el.querySelector('.ea-pie-chart__plot')!.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the empty state', async () => {
    const { el } = await render(host => (host.data = []));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

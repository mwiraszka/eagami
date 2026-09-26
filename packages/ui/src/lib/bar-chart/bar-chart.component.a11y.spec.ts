import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { type ChartSeries } from '../chart/chart';
import { BarChartComponent } from './bar-chart.component';

@Component({
  imports: [BarChartComponent],
  template: `<ea-bar-chart
    [labels]="labels"
    [series]="series" />`,
})
class HostComponent {
  labels = ['Jan', 'Feb', 'Mar'];
  series: ChartSeries[] = [
    { name: 'Visitors', data: [10, 20, 15] },
    { name: 'Sign-ups', data: [5, 8, 12] },
  ];
}

describe('BarChartComponent a11y', () => {
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
    el.querySelector('.ea-bar-chart__plot')!.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the empty state', async () => {
    const { el } = await render(host => (host.series = []));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

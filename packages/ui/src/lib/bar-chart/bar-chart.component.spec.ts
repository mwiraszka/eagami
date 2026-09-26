import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { type ChartPointEvent, type ChartSeries } from '../chart/chart';
import { BarChartComponent } from './bar-chart.component';

const LABELS = ['Q1', 'Q2', 'Q3'];
const SERIES: ChartSeries[] = [
  { name: 'Hardware', data: [40, 50, 60] },
  { name: 'Software', data: [20, null, 35] },
];

describe('BarChartComponent', () => {
  let fixture: ComponentFixture<BarChartComponent>;
  let el: HTMLElement;

  function query<T extends Element>(selector: string): T | null {
    return el.querySelector<T>(selector);
  }

  function queryAll(selector: string): Element[] {
    return Array.from(el.querySelectorAll(selector));
  }

  function plot(): HTMLElement {
    return query<HTMLElement>('.ea-bar-chart__plot')!;
  }

  function live(): string | undefined {
    return query('.ea-bar-chart__live')?.textContent?.trim();
  }

  function press(key: string): void {
    plot().dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BarChartComponent);
    fixture.componentRef.setInput('labels', LABELS);
    fixture.componentRef.setInput('series', SERIES);
    fixture.detectChanges();
    el = fixture.nativeElement;

    // jsdom cannot hit-test, so report the tooltip anchor as the topmost element
    // rather than letting the tooltip's occlusion check hide every bubble
    document.elementFromPoint = () => el.querySelector('.ea-bar-chart__anchor');
  });

  afterEach(() => {
    document.querySelectorAll('.ea-tooltip').forEach(tip => tip.remove());
  });

  describe('Rendering', () => {
    it('draws a bar per plotted value, skipping nulls', () => {
      expect(queryAll('.ea-bar-chart__bar')).toHaveLength(5);
    });

    it('rounds the data end of each bar', () => {
      expect(query('.ea-bar-chart__bar')!.getAttribute('d')).toContain('A');
    });

    it('stacks series into one bar per label when stacked', () => {
      fixture.componentRef.setInput('stacked', true);
      fixture.componentRef.setInput('showValues', true);
      fixture.detectChanges();

      const totals = queryAll('.ea-bar-chart__value').map(v => v.textContent?.trim());
      expect(totals).toEqual(['60', '50', '95']);
    });

    it('prints each bar value when showValues is set', () => {
      fixture.componentRef.setInput('showValues', true);
      fixture.detectChanges();

      expect(queryAll('.ea-bar-chart__value')).toHaveLength(5);
    });

    it('applies the orientation, size, and animation classes', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.componentRef.setInput('size', 'sm');
      fixture.componentRef.setInput('animation', 'cascade');
      fixture.detectChanges();

      const root = query('.ea-bar-chart')!;
      expect(root.classList).toContain('ea-bar-chart--horizontal');
      expect(root.classList).toContain('ea-bar-chart--sm');
      expect(root.classList).toContain('ea-bar-chart--animate-cascade');
    });

    it('staggers cascade delays by label', () => {
      const delays = queryAll('.ea-bar-chart__bar').map(b =>
        (b as SVGElement).style.getPropertyValue('--ea-chart-delay'),
      );

      expect(delays[0]).toBe('0ms');
      expect(delays[delays.length - 1]).not.toBe('0ms');
    });

    it('extends negative bars below the baseline', () => {
      fixture.componentRef.setInput('series', [{ name: 'Net', data: [5, -5, 5] }]);
      fixture.componentRef.setInput('showValues', true);
      fixture.detectChanges();

      const baseline = Number(query('.ea-bar-chart__baseline')!.getAttribute('y1'));
      const negativeLabel = queryAll('.ea-bar-chart__value')[1];
      expect(Number(negativeLabel.getAttribute('y'))).toBeGreaterThan(baseline);
    });

    it('omits gridlines when showGrid is false', () => {
      fixture.componentRef.setInput('showGrid', false);
      fixture.detectChanges();

      expect(queryAll('.ea-bar-chart__grid')).toHaveLength(0);
    });
  });

  describe('Legend', () => {
    it('lists every series when there is more than one', () => {
      expect(queryAll('.ea-bar-chart__legend-item')).toHaveLength(2);
    });

    it('is omitted when showLegend is false', () => {
      fixture.componentRef.setInput('showLegend', false);
      fixture.detectChanges();

      expect(query('.ea-bar-chart__legend')).toBeNull();
    });
  });

  describe('Empty state', () => {
    it('shows the localized no-data message', () => {
      fixture.componentRef.setInput('series', [{ name: 'Empty', data: [null, null] }]);
      fixture.detectChanges();

      expect(query('.ea-bar-chart__empty')?.textContent?.trim()).toBe('No data');
    });
  });

  describe('ARIA', () => {
    it('exposes the plot as a focusable group named "Bar chart" by default', () => {
      expect(plot().getAttribute('role')).toBe('group');
      expect(plot().getAttribute('tabindex')).toBe('0');
      expect(plot().getAttribute('aria-label')).toBe('Bar chart');
    });

    it('carries every value in the data table', () => {
      const cells = queryAll('.ea-bar-chart__table td').map(c => c.textContent?.trim());

      expect(cells).toEqual(['40', '20', '50', '–', '60', '35']);
    });
  });

  describe('Keyboard', () => {
    it('steps through labels with the category-axis arrows', () => {
      press('ArrowRight');
      press('ArrowRight');

      expect(live()).toBe('Hardware, Q2: 50');
    });

    it('steps through series with the value-axis arrows', () => {
      press('ArrowRight');
      press('ArrowUp');

      expect(live()).toBe('Software, Q1: 20');
    });

    it('swaps the arrow axes when horizontal', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.detectChanges();

      press('ArrowDown');
      press('ArrowDown');

      expect(live()).toBe('Hardware, Q2: 50');
    });

    it('clears the highlight on Escape', () => {
      press('ArrowRight');
      press('Escape');

      expect(document.querySelector('.ea-tooltip')).toBeNull();
    });
  });

  describe('Outputs', () => {
    it('emits pointClick for the highlighted bar on Enter', () => {
      const clicks: ChartPointEvent[] = [];
      fixture.componentInstance.pointClick.subscribe(e => clicks.push(e));
      press('End');

      press('Enter');

      expect(clicks).toEqual([
        { seriesIndex: 0, seriesName: 'Hardware', index: 2, label: 'Q3', value: 60 },
      ]);
    });

    it('emits activePointChange as the highlight moves', () => {
      const changes: (ChartPointEvent | null)[] = [];
      fixture.componentInstance.activePointChange.subscribe(e => changes.push(e));

      press('ArrowRight');
      press('ArrowUp');

      expect(changes.map(c => c?.seriesName)).toEqual(['Hardware', 'Software']);
    });
  });
});

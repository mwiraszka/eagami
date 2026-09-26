import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { type ChartPointEvent, type ChartSeries } from '../chart/chart';
import { LineChartComponent } from './line-chart.component';

const LABELS = ['Jan', 'Feb', 'Mar', 'Apr'];
const SERIES: ChartSeries[] = [
  { name: 'Visitors', data: [10, 20, 15, 30] },
  { name: 'Sign-ups', data: [5, null, 8, 12] },
];

describe('LineChartComponent', () => {
  let fixture: ComponentFixture<LineChartComponent>;
  let el: HTMLElement;

  function query<T extends Element>(selector: string): T | null {
    return el.querySelector<T>(selector);
  }

  function queryAll(selector: string): Element[] {
    return Array.from(el.querySelectorAll(selector));
  }

  function plot(): HTMLElement {
    return query<HTMLElement>('.ea-line-chart__plot')!;
  }

  function press(key: string): void {
    plot().dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LineChartComponent);
    fixture.componentRef.setInput('labels', LABELS);
    fixture.componentRef.setInput('series', SERIES);
    fixture.detectChanges();
    el = fixture.nativeElement;

    // jsdom cannot hit-test, so report the tooltip anchor as the topmost element
    // rather than letting the tooltip's occlusion check hide every bubble
    document.elementFromPoint = () => el.querySelector('.ea-line-chart__anchor');
  });

  afterEach(() => {
    document.querySelectorAll('.ea-tooltip').forEach(tip => tip.remove());
  });

  describe('Rendering', () => {
    it('draws one line per series', () => {
      expect(queryAll('.ea-line-chart__series')).toHaveLength(2);
    });

    it('splits a line at a null value', () => {
      const secondSeries = queryAll('.ea-line-chart__series')[1];

      expect(secondSeries.querySelectorAll('.ea-line-chart__line')).toHaveLength(2);
    });

    it('marks every plotted value with a point by default', () => {
      expect(queryAll('.ea-line-chart__point')).toHaveLength(7);
    });

    it('hides points when showPoints is false', () => {
      fixture.componentRef.setInput('showPoints', false);
      fixture.detectChanges();

      expect(queryAll('.ea-line-chart__point')).toHaveLength(0);
    });

    it('fills the area beneath each line when showArea is set', () => {
      fixture.componentRef.setInput('showArea', true);
      fixture.detectChanges();

      expect(queryAll('.ea-line-chart__area').length).toBeGreaterThan(0);
    });

    it('renders a gridline per y-axis tick, and none when showGrid is false', () => {
      expect(queryAll('.ea-line-chart__grid').length).toBeGreaterThan(1);

      fixture.componentRef.setInput('showGrid', false);
      fixture.detectChanges();

      expect(queryAll('.ea-line-chart__grid')).toHaveLength(0);
    });

    it('labels the x-axis with the category labels', () => {
      const texts = queryAll('.ea-line-chart__axis--x').map(t => t.textContent?.trim());

      expect(texts).toEqual(LABELS);
    });

    it('draws a smooth curve with cubic segments', () => {
      fixture.componentRef.setInput('curve', 'smooth');
      fixture.detectChanges();

      expect(query('.ea-line-chart__line')!.getAttribute('d')).toContain('C');
    });

    it('draws a step curve with horizontal and vertical segments', () => {
      fixture.componentRef.setInput('curve', 'step');
      fixture.detectChanges();

      expect(query('.ea-line-chart__line')!.getAttribute('d')).toMatch(/H.*V/);
    });

    it('applies the size and animation classes', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.componentRef.setInput('animation', 'rise');
      fixture.detectChanges();

      const root = query('.ea-line-chart')!;
      expect(root.classList).toContain('ea-line-chart--lg');
      expect(root.classList).toContain('ea-line-chart--animate-rise');
    });

    it('wraps every line in one group for the reveal animation', () => {
      fixture.componentRef.setInput('animation', 'reveal');
      fixture.detectChanges();

      expect(query('.ea-line-chart')!.classList).toContain(
        'ea-line-chart--animate-reveal',
      );
      expect(
        query('.ea-line-chart__lines')!.querySelectorAll('.ea-line-chart__series'),
      ).toHaveLength(2);
    });

    it('sets the animation duration as a custom property', () => {
      fixture.componentRef.setInput('animationDuration', 900);
      fixture.detectChanges();

      expect(
        query<HTMLElement>('.ea-line-chart')!.style.getPropertyValue(
          '--ea-chart-duration',
        ),
      ).toBe('900ms');
    });

    it('re-creates the plot when the data changes, replaying its animation', () => {
      const before = query('.ea-line-chart__svg');

      fixture.componentRef.setInput('series', [{ name: 'Only', data: [1, 2, 3, 4] }]);
      fixture.detectChanges();

      expect(query('.ea-line-chart__svg')).not.toBe(before);
    });

    it('uses custom formatting for axis labels', () => {
      fixture.componentRef.setInput('formatValue', (v: number) => `$${v}`);
      fixture.detectChanges();

      const ticks = queryAll('.ea-line-chart__axis--y').map(t => t.textContent?.trim());
      expect(ticks.every(t => t?.startsWith('$'))).toBe(true);
    });
  });

  describe('Legend', () => {
    it('lists every series when there is more than one', () => {
      expect(queryAll('.ea-line-chart__legend-item')).toHaveLength(2);
    });

    it('is omitted for a single series', () => {
      fixture.componentRef.setInput('series', [SERIES[0]]);
      fixture.detectChanges();

      expect(query('.ea-line-chart__legend')).toBeNull();
    });

    it('is omitted when showLegend is false', () => {
      fixture.componentRef.setInput('showLegend', false);
      fixture.detectChanges();

      expect(query('.ea-line-chart__legend')).toBeNull();
    });
  });

  describe('Empty state', () => {
    it('shows the localized no-data message', () => {
      fixture.componentRef.setInput('series', []);
      fixture.detectChanges();

      expect(query('.ea-line-chart__empty')?.textContent?.trim()).toBe('No data');
      expect(query('.ea-line-chart__plot')).toBeNull();
    });
  });

  describe('ARIA', () => {
    it('exposes the plot as a focusable group with a chart role description', () => {
      expect(plot().getAttribute('role')).toBe('group');
      expect(plot().getAttribute('tabindex')).toBe('0');
      expect(plot().getAttribute('aria-roledescription')).toBe('chart');
    });

    it('defaults the accessible name to "Line chart"', () => {
      expect(plot().getAttribute('aria-label')).toBe('Line chart');
    });

    it('uses aria-label when provided', () => {
      fixture.componentRef.setInput('aria-label', 'Monthly traffic');
      fixture.detectChanges();

      expect(plot().getAttribute('aria-label')).toBe('Monthly traffic');
    });

    it('hides the drawing and carries the data in a table', () => {
      expect(query('.ea-line-chart__svg')!.getAttribute('aria-hidden')).toBe('true');
      const rows = queryAll('.ea-line-chart__table tbody tr');
      expect(rows).toHaveLength(4);
      expect(rows[1].textContent).toContain('–');
    });
  });

  describe('Keyboard', () => {
    it('highlights the first point on focus and announces it', () => {
      plot().dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      const tip = document.querySelector('.ea-tooltip');
      expect(tip?.getAttribute('role')).toBe('tooltip');
      expect(tip?.textContent).toContain('Jan');
      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe(
        'Visitors, Jan: 10',
      );
    });

    it('moves between labels with the horizontal arrows', () => {
      press('ArrowRight');
      press('ArrowRight');

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe(
        'Visitors, Feb: 20',
      );
    });

    it('moves between series with the vertical arrows, skipping gaps', () => {
      press('ArrowRight');
      press('ArrowRight');
      press('ArrowDown');

      // Sign-ups has no February value, so the highlight stays on Visitors
      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe(
        'Visitors, Feb: 20',
      );

      press('ArrowRight');
      press('ArrowDown');

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe('Sign-ups, Mar: 8');
    });

    it('jumps to the ends with Home and End', () => {
      press('End');

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe(
        'Visitors, Apr: 30',
      );

      press('Home');

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe(
        'Visitors, Jan: 10',
      );
    });

    it('clears the highlight on Escape', () => {
      press('ArrowRight');
      press('Escape');

      expect(document.querySelector('.ea-tooltip')).toBeNull();
    });
  });

  describe('Outputs', () => {
    it('emits pointClick for the highlighted point on Enter', () => {
      const clicks: ChartPointEvent[] = [];
      fixture.componentInstance.pointClick.subscribe(e => clicks.push(e));
      press('End');

      press('Enter');

      expect(clicks).toEqual([
        { seriesIndex: 0, seriesName: 'Visitors', index: 3, label: 'Apr', value: 30 },
      ]);
    });

    it('emits activePointChange as the highlight moves and clears', () => {
      const changes: (ChartPointEvent | null)[] = [];
      fixture.componentInstance.activePointChange.subscribe(e => changes.push(e));

      press('ArrowRight');
      press('Escape');

      expect(changes.map(c => c?.label ?? null)).toEqual(['Jan', null]);
    });
  });
});

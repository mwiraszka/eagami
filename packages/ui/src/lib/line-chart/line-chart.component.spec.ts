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

    it('lands on the first plotted value when the first series is empty', () => {
      fixture.componentRef.setInput('series', [
        { name: 'Empty', data: [null, null, null, null] },
        SERIES[0],
      ]);
      fixture.detectChanges();

      plot().dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

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

  describe('Pointer', () => {
    function svg(): SVGSVGElement {
      return query<SVGSVGElement>('.ea-line-chart__svg')!;
    }

    function pointer(type: string, x: number, y: number): void {
      svg().dispatchEvent(
        new MouseEvent(type, { clientX: x, clientY: y, bubbles: true }),
      );
      fixture.detectChanges();
    }

    function pointAt(i: number): [number, number] {
      const point = queryAll('.ea-line-chart__point')[i];
      return [Number(point.getAttribute('cx')), Number(point.getAttribute('cy'))];
    }

    it('highlights the series nearest the pointer at the nearest label', () => {
      // Points 0-3 are Visitors, 4-6 are Sign-ups (Feb is missing)
      const [x, y] = pointAt(5);

      pointer('pointermove', x, y);

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe('Sign-ups, Mar: 8');
      expect(document.querySelector('.ea-tooltip')).toBeTruthy();
    });

    it('highlights on pointerdown for touch', () => {
      const [x, y] = pointAt(0);

      pointer('pointerdown', x, y);

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe(
        'Visitors, Jan: 10',
      );
    });

    it('dims the other series while one is highlighted', () => {
      const [x, y] = pointAt(0);

      pointer('pointermove', x, y);

      expect(queryAll('.ea-line-chart__series--dimmed')).toHaveLength(1);
    });

    it('emits pointClick for the highlighted point on click', () => {
      const clicks: ChartPointEvent[] = [];
      fixture.componentInstance.pointClick.subscribe(e => clicks.push(e));
      const [x, y] = pointAt(3);
      pointer('pointermove', x, y);

      svg().dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(clicks.map(c => c.label)).toEqual(['Apr']);
    });

    it('ignores a click with nothing highlighted', () => {
      const clicks: ChartPointEvent[] = [];
      fixture.componentInstance.pointClick.subscribe(e => clicks.push(e));

      svg().dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(clicks).toEqual([]);
    });

    it('clears the highlight when the pointer leaves', () => {
      const [x, y] = pointAt(0);
      pointer('pointermove', x, y);

      pointer('pointerleave', 0, 0);

      expect(document.querySelector('.ea-tooltip')).toBeNull();
    });

    it('highlights nothing at a label with no values', () => {
      fixture.componentRef.setInput('series', [{ name: 'Gappy', data: [1, null, 3] }]);
      fixture.detectChanges();
      const middle = (pointAt(0)[0] + pointAt(1)[0]) / 2;

      pointer('pointermove', middle, 0);

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe('');
    });

    it('centers a lone value', () => {
      fixture.componentRef.setInput('labels', ['Only']);
      fixture.componentRef.setInput('series', [{ name: 'Single', data: [5] }]);
      fixture.detectChanges();
      const [x, y] = pointAt(0);

      pointer('pointermove', x, y);

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe('Single, Only: 5');
    });
  });

  describe('Scale', () => {
    function tickValues(): string[] {
      return queryAll('.ea-line-chart__axis--y').map(t => t.textContent!.trim());
    }

    it('honours explicit y bounds', () => {
      fixture.componentRef.setInput('yMin', 0);
      fixture.componentRef.setInput('yMax', 50);
      fixture.detectChanges();

      const ticks = tickValues();
      expect(ticks[0]).toBe('0');
      expect(ticks[ticks.length - 1]).toBe('50');
    });

    it('swaps y bounds given the wrong way round', () => {
      fixture.componentRef.setInput('yMin', 50);
      fixture.componentRef.setInput('yMax', 0);
      fixture.detectChanges();

      expect(tickValues().length).toBeGreaterThan(0);
    });

    it('extends the axis to zero under an area fill', () => {
      fixture.componentRef.setInput('series', [{ name: 'High', data: [80, 90, 85] }]);
      fixture.componentRef.setInput('showArea', true);
      fixture.detectChanges();

      expect(tickValues()[0]).toBe('0');
    });

    it('smooths flat and steep runs without overshooting', () => {
      fixture.componentRef.setInput('curve', 'smooth');
      fixture.componentRef.setInput('series', [
        { name: 'Shape', data: [0, 0, 100, 0, 1, 2, 3, 100] },
      ]);
      fixture.componentRef.setInput('labels', ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
      fixture.detectChanges();

      const d = query('.ea-line-chart__line')!.getAttribute('d')!;
      expect(d).toContain('C');
      expect(d).not.toContain('NaN');
    });

    it('draws a two-point smooth curve as a straight line', () => {
      fixture.componentRef.setInput('curve', 'smooth');
      fixture.componentRef.setInput('series', [{ name: 'Pair', data: [1, 2] }]);
      fixture.detectChanges();

      expect(query('.ea-line-chart__line')!.getAttribute('d')).not.toContain('C');
    });

    it('thins crowded x-axis labels', () => {
      const labels = Array.from({ length: 60 }, (_, i) => `Label ${i}`);
      fixture.componentRef.setInput('labels', labels);
      fixture.componentRef.setInput('series', [
        { name: 'Dense', data: labels.map((_, i) => i) },
      ]);
      fixture.detectChanges();

      expect(queryAll('.ea-line-chart__axis--x').length).toBeLessThan(60);
    });
  });

  describe('Keyboard edges', () => {
    it('wraps between series with ArrowUp', () => {
      press('ArrowRight');
      press('ArrowUp');

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe('Sign-ups, Jan: 5');
    });

    it('stays put at the last label', () => {
      press('End');
      press('ArrowRight');

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe(
        'Visitors, Apr: 30',
      );
    });

    it('ignores unrelated keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'a', cancelable: true });
      press('ArrowRight');

      plot().dispatchEvent(event);

      expect(event.defaultPrevented).toBe(false);
    });

    it('does nothing when no series holds a value', () => {
      fixture.componentRef.setInput('series', [
        { name: 'Blank', data: [null] },
        { name: 'Value', data: [null, 4] },
      ]);
      fixture.detectChanges();

      press('Home');

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe('Value, Feb: 4');
    });
  });

  describe('Viewport', () => {
    it('lays out at the measured width of its host', () => {
      Object.defineProperty(el, 'clientWidth', { configurable: true, value: 800 });

      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();
      // The size change triggers the measurement after render; the next pass lays out with it
      fixture.detectChanges();

      expect(query('.ea-line-chart__svg')!.getAttribute('width')).toBe('800');
    });
  });

  describe('Fallbacks', () => {
    it('leaves the label blank for values past the end of labels', () => {
      fixture.componentRef.setInput('labels', ['Jan']);
      fixture.componentRef.setInput('series', [{ name: 'Long', data: [1, 2] }]);
      fixture.detectChanges();

      press('End');

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe('Long, : 2');
    });

    it('draws a flat axis when both bounds are equal', () => {
      fixture.componentRef.setInput('yMin', 5);
      fixture.componentRef.setInput('yMax', 5);
      fixture.detectChanges();

      expect(query('.ea-line-chart__point')!.getAttribute('cy')).not.toBe('NaN');
    });

    it('keeps a pointer highlight when the plot then takes focus', () => {
      press('End');

      plot().dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe(
        'Visitors, Apr: 30',
      );
    });
  });
});

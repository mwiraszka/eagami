/// <reference types="node" />
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { type ChartPointEvent, type ChartSeries } from '../chart/chart';
import { LineChartComponent, type LineChartVisibleRange } from './line-chart.component';

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

      expect(query('.ea-line-chart__empty-message')?.textContent?.trim()).toBe('No data');
      expect(query('.ea-line-chart__plot')).toBeNull();
    });

    it('draws the axes in place of the plot', () => {
      fixture.componentRef.setInput('series', [{ name: 'Visitors', data: [] }]);
      fixture.detectChanges();

      const texts = queryAll('.ea-line-chart__axis--x').map(t => t.textContent?.trim());
      expect(query('.ea-line-chart__empty .ea-line-chart__baseline')).not.toBeNull();
      expect(queryAll('.ea-line-chart__grid').length).toBeGreaterThan(1);
      expect(texts).toEqual(LABELS);
      expect(queryAll('.ea-line-chart__axis--y')).toHaveLength(0);
    });

    it('labels the y-axis when both of its bounds are set', () => {
      fixture.componentRef.setInput('series', []);
      fixture.componentRef.setInput('yMin', 0);
      fixture.componentRef.setInput('yMax', 100);
      fixture.detectChanges();

      const ticks = queryAll('.ea-line-chart__axis--y').map(t => t.textContent?.trim());
      expect(ticks[0]).toBe('0');
      expect(ticks[ticks.length - 1]).toBe('100');
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

    function firePointer(
      pointerType: string,
      type: string,
      [x, y]: [number, number],
      buttons = 0,
    ): void {
      svg().dispatchEvent(
        new PointerEvent(type, {
          clientX: x,
          clientY: y,
          pointerId: 1,
          pointerType,
          buttons,
          bubbles: true,
        }),
      );
      fixture.detectChanges();
    }

    // The order a browser reports a tap in: a pointer without hover leaves as it lifts
    function tap(at: [number, number], pointerType = 'touch'): void {
      firePointer(pointerType, 'pointerdown', at, 1);
      firePointer(pointerType, 'pointerup', at);
      firePointer(pointerType, 'pointerleave', at);
    }

    function announced(): string {
      return query('.ea-line-chart__live')!.textContent!.trim();
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

    it('keeps a tapped point showing once the finger lifts', () => {
      const at = pointAt(1);

      tap(at);

      expect(announced()).toBe('Visitors, Feb: 20');
      expect(document.querySelector('.ea-tooltip')).toBeTruthy();
    });

    it('keeps a point tapped with a pen showing once it lifts', () => {
      const at = pointAt(1);

      tap(at, 'pen');

      expect(document.querySelector('.ea-tooltip')).toBeTruthy();
    });

    it('emits pointClick for a tapped point', () => {
      const clicks: ChartPointEvent[] = [];
      fixture.componentInstance.pointClick.subscribe(e => clicks.push(e));
      tap(pointAt(3));

      svg().dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(clicks.map(c => c.label)).toEqual(['Apr']);
    });

    it('moves the tooltip to the next point tapped', () => {
      tap(pointAt(0));

      tap(pointAt(3));

      expect(announced()).toBe('Visitors, Apr: 30');
      expect(document.querySelectorAll('.ea-tooltip')).toHaveLength(1);
    });

    it('hides a tapped point once a press lands elsewhere on the page', () => {
      tap(pointAt(1));

      document.body.dispatchEvent(
        new PointerEvent('pointerdown', { pointerType: 'touch', bubbles: true }),
      );
      fixture.detectChanges();

      expect(announced()).toBe('');
      expect(document.querySelector('.ea-tooltip')).toBeNull();
    });

    it('hides a tapped point once the plot loses focus', () => {
      tap(pointAt(1));

      plot().dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(document.querySelector('.ea-tooltip')).toBeNull();
    });

    it('hides the tooltip when a scroll cancels the touch', () => {
      const at = pointAt(1);
      firePointer('touch', 'pointerdown', at, 1);

      firePointer('touch', 'pointercancel', at);
      firePointer('touch', 'pointerleave', at);

      expect(announced()).toBe('');
      expect(document.querySelector('.ea-tooltip')).toBeNull();
    });

    it('hides the tooltip when a mouse leaves after a click', () => {
      const at = pointAt(1);

      tap(at, 'mouse');

      expect(document.querySelector('.ea-tooltip')).toBeNull();
    });

    it('hides a tapped point once the pen hovers out of the chart', () => {
      const at = pointAt(1);
      tap(at, 'pen');

      firePointer('pen', 'pointermove', at);
      firePointer('pen', 'pointerleave', [0, 0]);

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

  describe('Unchanged defaults', () => {
    function attrs(selector: string, names: string[]): string[] {
      return queryAll(selector).map(node =>
        names
          .map(name =>
            name === 'text' ? node.textContent!.trim() : node.getAttribute(name),
          )
          .join('|'),
      );
    }

    // A snapshot of the default rendering, so an unintended change to it fails here
    it('renders as recorded when none of the x-scale inputs are set', () => {
      fixture.componentRef.setInput('curve', 'smooth');
      fixture.componentRef.setInput('series', [
        { name: 'A', data: [12, 20, 15, 28] },
        { name: 'B', data: [14, null, 18, 22] },
      ]);
      fixture.detectChanges();

      expect(attrs('.ea-line-chart__point', ['cx', 'cy'])).toEqual([
        '26.4|128.39999999999998',
        '175.60000000000002|76.66666666666667',
        '324.8|109',
        '474|24.93333333333333',
        '26.4|115.46666666666667',
        '324.8|89.60000000000001',
        '474|63.73333333333334',
      ]);
      expect(attrs('.ea-line-chart__line', ['d'])).toEqual([
        'M26.4,128.39999999999998C76.13333333333334,111.15555555555554,125.86666666666667,76.66666666666667,175.60000000000002,76.66666666666667C225.33333333333334,76.66666666666667,275.06666666666666,109,324.8,109C374.53333333333336,109,424.26666666666665,52.95555555555555,474,24.93333333333333',
        'M26.4,115.46666666666667',
        'M324.8,89.60000000000001L474,63.73333333333334',
      ]);
      expect(attrs('.ea-line-chart__axis--x', ['x', 'y', 'text'])).toEqual([
        '26.4|228|Jan',
        '175.60000000000002|228|Feb',
        '324.8|228|Mar',
        '469.2|228|Apr',
      ]);
      expect(attrs('.ea-line-chart__axis--y', ['x', 'y', 'text'])).toEqual([
        '20.4|206|0',
        '20.4|173.66666666666669|5',
        '20.4|141.33333333333334|10',
        '20.4|109|15',
        '20.4|76.66666666666667|20',
        '20.4|44.33333333333333|25',
        '20.4|12|30',
      ]);
      expect(attrs('.ea-line-chart__hit', ['x', 'y', 'width', 'height'])).toEqual([
        '26.4|12|447.6|194',
      ]);
    });

    it('neither clips nor pans the plot', () => {
      const wheel = new WheelEvent('wheel', { deltaX: 50, cancelable: true });

      query('.ea-line-chart__svg')!.dispatchEvent(wheel);

      expect(wheel.defaultPrevented).toBe(false);
      expect(query('[clip-path]')).toBeNull();
      expect(query('.ea-line-chart--pannable')).toBeNull();
    });
  });

  describe('Headroom', () => {
    function tickValues(): string[] {
      return queryAll('.ea-line-chart__axis--y').map(t => t.textContent!.trim());
    }

    it('extends the scale past values on its bounds, reaching zero when the gap below stays narrow', () => {
      fixture.componentRef.setInput('series', [{ name: 'Edge', data: [10, 20, 15, 30] }]);
      fixture.detectChanges();

      const ticks = tickValues();
      expect(ticks[0]).toBe('0');
      expect(ticks[ticks.length - 1]).toBe('35');
      const baseline = Number(query('.ea-line-chart__baseline')!.getAttribute('y1'));
      const lowest = Math.max(
        ...queryAll('.ea-line-chart__point').map(p => Number(p.getAttribute('cy'))),
      );
      expect(baseline - lowest).toBeGreaterThanOrEqual(12);
    });

    it('leaves explicit bounds as given', () => {
      fixture.componentRef.setInput('series', [{ name: 'Edge', data: [10, 20, 15, 30] }]);
      fixture.componentRef.setInput('yMin', 10);
      fixture.componentRef.setInput('yMax', 30);
      fixture.detectChanges();

      const ticks = tickValues();
      expect(ticks[0]).toBe('10');
      expect(ticks[ticks.length - 1]).toBe('30');
    });

    it('keeps an area fill anchored at zero', () => {
      fixture.componentRef.setInput('series', [{ name: 'Zero', data: [0, 20, 15, 30] }]);
      fixture.componentRef.setInput('showArea', true);
      fixture.detectChanges();

      expect(tickValues()[0]).toBe('0');
    });
  });

  describe('Right padding', () => {
    function plotRight(): number {
      const hit = query('.ea-line-chart__hit')!;
      return Number(hit.getAttribute('x')) + Number(hit.getAttribute('width'));
    }

    it('reserves nothing extra when no label reaches the right edge', () => {
      const labels = Array.from({ length: 60 }, (_, i) => `Label ${i}`);
      fixture.componentRef.setInput('labels', labels);
      fixture.componentRef.setInput('series', [
        { name: 'Dense', data: labels.map((_, i) => i) },
      ]);
      fixture.detectChanges();

      const drawn = queryAll('.ea-line-chart__axis--x').map(t => t.textContent!.trim());
      expect(drawn).not.toContain('Label 59');
      expect(plotRight()).toBe(480 - 6);
    });

    it('nudges a label drawn at the last point inward instead of reserving room for it', () => {
      fixture.componentRef.setInput('labels', ['Jan', 'Feb', 'Mar', 'Wednesday']);
      fixture.detectChanges();

      // "Wednesday" is 9 characters at 12px: 64.8px wide, so its centre sits half that in
      expect(plotRight()).toBe(480 - 6);
      const last = queryAll('.ea-line-chart__axis--x').at(-1)!;
      expect(Number(last.getAttribute('x'))).toBeCloseTo(480 - 32.4);
      const tick = queryAll('.ea-line-chart__x-tick').at(-1)!;
      expect(Number(tick.getAttribute('x1'))).toBeCloseTo(plotRight());
    });
  });

  describe('Numeric x scale', () => {
    function pointXs(): number[] {
      return queryAll('.ea-line-chart__point').map(p => Number(p.getAttribute('cx')));
    }

    beforeEach(() => {
      fixture.componentRef.setInput('labels', ['First', 'Second', 'Third']);
      fixture.componentRef.setInput('series', [{ name: 'Reading', data: [4, 6, 5] }]);
      fixture.componentRef.setInput('xValues', [0, 1, 10]);
      fixture.detectChanges();
    });

    it('places points in proportion to their x values', () => {
      const [a, b, c] = pointXs();

      expect((c - b) / (b - a)).toBeCloseTo(9);
    });

    it('draws every given tick, widening the axis for any past the points', () => {
      fixture.componentRef.setInput('xTicks', [
        { value: 0, label: 'Zero' },
        { value: 5, label: 'Five' },
        { value: 10, label: 'Ten' },
        { value: 12, label: 'Past the end' },
      ]);
      fixture.detectChanges();
      const [first, , last] = pointXs();

      const ticks = queryAll('.ea-line-chart__axis--x');
      expect(ticks.map(t => t.textContent!.trim())).toEqual([
        'Zero',
        'Five',
        'Ten',
        'Past the end',
      ]);
      expect(Number(ticks[1].getAttribute('x'))).toBeCloseTo((first + last) / 2);

      press('End');

      expect(document.querySelector('.ea-tooltip')?.textContent).toContain('Third');
    });

    it('draws a smooth line through every point, even where two share an x position', () => {
      fixture.componentRef.setInput('curve', 'smooth');
      fixture.componentRef.setInput('labels', ['A', 'B', 'C', 'D', 'E']);
      fixture.componentRef.setInput('series', [
        { name: 'Reading', data: [4, 6, 5, 7, 6] },
      ]);
      fixture.componentRef.setInput('xValues', [0, 3, 3, 7, 10]);
      fixture.detectChanges();

      const d = query('.ea-line-chart__line')!.getAttribute('d')!;
      expect(d).not.toContain('NaN');
      const points = queryAll('.ea-line-chart__point').map(
        p => `${p.getAttribute('cx')},${p.getAttribute('cy')}`,
      );
      points.forEach(point => expect(d).toContain(point));
      expect(d.endsWith(points.at(-1)!)).toBe(true);
    });

    it('drops per-point labels that would collide', () => {
      fixture.componentRef.setInput('xValues', [0, 0.1, 10]);
      fixture.detectChanges();

      expect(queryAll('.ea-line-chart__axis--x').map(t => t.textContent!.trim())).toEqual(
        ['First', 'Third'],
      );
    });

    it('highlights the plotted point nearest the pointer', () => {
      const [, second] = pointXs();

      query('.ea-line-chart__svg')!.dispatchEvent(
        new MouseEvent('pointermove', { clientX: second + 3, clientY: 0, bubbles: true }),
      );
      fixture.detectChanges();

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe(
        'Reading, Second: 6',
      );
    });

    it('skips points without an x value', () => {
      fixture.componentRef.setInput('xValues', [0, 1]);
      fixture.detectChanges();

      expect(pointXs()).toHaveLength(2);
      expect(queryAll('.ea-line-chart__table tbody tr')).toHaveLength(3);
    });
  });

  describe('Lone point', () => {
    function hitCentre(): number {
      const hit = query('.ea-line-chart__hit')!;
      return Number(hit.getAttribute('x')) + Number(hit.getAttribute('width')) / 2;
    }

    function pointX(): number {
      return Number(query('.ea-line-chart__point')!.getAttribute('cx'));
    }

    beforeEach(() => {
      fixture.componentRef.setInput('labels', ['Only']);
      fixture.componentRef.setInput('series', [{ name: 'Rating', data: [1474] }]);
      fixture.componentRef.setInput('xValues', [60]);
      fixture.componentRef.setInput('xTicks', [{ value: 0, label: 'Start' }]);
      fixture.componentRef.setInput('visibleXSpan', 500);
      fixture.detectChanges();
    });

    it('sits in the middle of the plot, with its ticks still drawn', () => {
      expect(pointX()).toBeCloseTo(hitCentre());
      expect(queryAll('.ea-line-chart__axis--x').map(t => t.textContent?.trim())).toEqual(
        ['Start'],
      );
    });

    it('sits halfway up a y-axis fitted around its value, with no break', () => {
      fixture.componentRef.setInput('showAxisBreak', true);
      fixture.detectChanges();
      const hit = query('.ea-line-chart__hit')!;
      const middle =
        Number(hit.getAttribute('y')) + Number(hit.getAttribute('height')) / 2;
      const ticks = queryAll('.ea-line-chart__axis--y').map(t =>
        Number(t.textContent!.replace(/,/g, '')),
      );

      expect(Number(query('.ea-line-chart__point')!.getAttribute('cy'))).toBeCloseTo(
        middle,
      );
      expect(Math.min(...ticks)).toBeLessThan(1474);
      expect(Math.max(...ticks)).toBeGreaterThan(1474);
      expect(query('.ea-line-chart__axis-break')).toBeNull();
    });

    it('stays in view under a pinch, since one point gives nothing to zoom in on', () => {
      const ranges: LineChartVisibleRange[] = [];
      fixture.componentInstance.visibleRangeChange.subscribe(r => ranges.push(r));
      const wheel = new WheelEvent('wheel', { deltaY: -5000, cancelable: true });
      Object.defineProperty(wheel, 'ctrlKey', { value: true });
      Object.defineProperty(wheel, 'clientX', { value: 0 });

      query('.ea-line-chart__svg')!.dispatchEvent(wheel);
      fixture.detectChanges();

      expect(ranges).toEqual([]);
      expect(query('.ea-line-chart--pannable')).toBeNull();
      expect(pointX()).toBeCloseTo(hitCentre());
    });
  });

  describe('Visible window', () => {
    const xValues = Array.from({ length: 11 }, (_, i) => i * 10);
    const ranges: LineChartVisibleRange[] = [];

    function svg(): SVGSVGElement {
      return query<SVGSVGElement>('.ea-line-chart__svg')!;
    }

    function inView(): string[] {
      const hit = query('.ea-line-chart__hit')!;
      const left = Number(hit.getAttribute('x'));
      const right = left + Number(hit.getAttribute('width'));
      return queryAll('.ea-line-chart__point')
        .map((p, i) => ({ i, x: Number(p.getAttribute('cx')) }))
        .filter(p => p.x >= left && p.x <= right)
        .map(p => `P${p.i}`);
    }

    function yTicks(): number[] {
      return queryAll('.ea-line-chart__axis--y').map(t => Number(t.textContent!.trim()));
    }

    function mouse(type: string, clientX: number, buttons = 1): void {
      svg().dispatchEvent(new MouseEvent(type, { clientX, buttons, bubbles: true }));
      fixture.detectChanges();
    }

    beforeEach(() => {
      ranges.length = 0;
      fixture.componentInstance.visibleRangeChange.subscribe(r => ranges.push(r));
      fixture.componentRef.setInput(
        'labels',
        xValues.map((_, i) => `P${i}`),
      );
      fixture.componentRef.setInput('series', [{ name: 'Level', data: [...xValues] }]);
      fixture.componentRef.setInput('xValues', xValues);
      fixture.componentRef.setInput('xTicks', [
        { value: 0, label: 'Start' },
        { value: 50, label: 'Middle' },
        { value: 90, label: 'Late' },
      ]);
      fixture.componentRef.setInput('visibleXSpan', 30);
      fixture.detectChanges();
    });

    it('opens on the latest stretch, clipped to the plot', () => {
      expect(inView()).toEqual(['P7', 'P8', 'P9', 'P10']);
      expect(query('.ea-line-chart--pannable')).toBeTruthy();
      expect(query('g[clip-path]')).toBeTruthy();
    });

    it('draws only the ticks inside the window', () => {
      expect(queryAll('.ea-line-chart__axis--x').map(t => t.textContent!.trim())).toEqual(
        ['Late'],
      );
    });

    it('fits the y-axis to the points in view, with room below the lowest', () => {
      const ticks = yTicks();

      expect(Math.min(...ticks)).toBeGreaterThanOrEqual(50);
      expect(Math.max(...ticks)).toBeLessThanOrEqual(100);
      const baseline = Number(query('.ea-line-chart__baseline')!.getAttribute('y1'));
      const p7 = Number(queryAll('.ea-line-chart__point')[7].getAttribute('cy'));
      expect(baseline - p7).toBeGreaterThanOrEqual(12);
    });

    it('pans with a horizontal wheel and with Shift + wheel', () => {
      const swipe = new WheelEvent('wheel', { deltaX: -1000, cancelable: true });
      svg().dispatchEvent(swipe);
      fixture.detectChanges();

      expect(swipe.defaultPrevented).toBe(true);
      expect(inView()).toEqual(['P0', 'P1', 'P2', 'P3']);
      expect(ranges.at(-1)).toEqual({ start: 0, end: 30 });
      expect(Math.max(...yTicks())).toBeLessThanOrEqual(30);

      const shifted = new WheelEvent('wheel', {
        deltaY: 10,
        deltaMode: WheelEvent.DOM_DELTA_LINE,
        cancelable: true,
      });
      // jsdom drops modifier keys from a WheelEvent's init dictionary
      Object.defineProperty(shifted, 'shiftKey', { value: true });
      svg().dispatchEvent(shifted);
      fixture.detectChanges();

      expect(ranges.at(-1)!.start).toBeGreaterThan(0);
    });

    it('widens and narrows the window with a pinch reported as Ctrl + wheel', () => {
      const pinch = (deltaY: number) => {
        const wheel = new WheelEvent('wheel', { deltaY, cancelable: true });
        // jsdom drops modifier keys and pointer coordinates from a WheelEvent's init dictionary
        Object.defineProperty(wheel, 'ctrlKey', { value: true });
        Object.defineProperty(wheel, 'clientX', { value: 0 });
        svg().dispatchEvent(wheel);
        fixture.detectChanges();
        return wheel;
      };

      const out = pinch(60);

      expect(out.defaultPrevented).toBe(true);
      const widened = ranges.at(-1)!;
      expect(widened.end - widened.start).toBeGreaterThan(30);

      pinch(1000);

      expect(query('.ea-line-chart--pannable')).toBeNull();

      pinch(-150);

      const narrowed = ranges.at(-1)!;
      expect(narrowed.end - narrowed.start).toBeLessThan(100);
      expect(query('.ea-line-chart--pannable')).toBeTruthy();
    });

    it('never narrows the window past two gaps between points', () => {
      const wheel = new WheelEvent('wheel', { deltaY: -5000, cancelable: true });
      Object.defineProperty(wheel, 'ctrlKey', { value: true });
      Object.defineProperty(wheel, 'clientX', { value: 0 });
      svg().dispatchEvent(wheel);
      fixture.detectChanges();

      const range = ranges.at(-1)!;
      expect(range.end - range.start).toBe(20);
    });

    it('scales the window with Safari pinch gestures', () => {
      const start = new Event('gesturestart', { cancelable: true });
      svg().dispatchEvent(start);
      const change = new Event('gesturechange', { cancelable: true });
      Object.defineProperty(change, 'scale', { value: 0.5 });
      Object.defineProperty(change, 'clientX', { value: 0 });
      svg().dispatchEvent(change);
      svg().dispatchEvent(new Event('gestureend'));
      fixture.detectChanges();

      expect(start.defaultPrevented).toBe(true);
      expect(change.defaultPrevented).toBe(true);
      const range = ranges.at(-1)!;
      expect(range.end - range.start).toBeCloseTo(60);
    });

    it('keeps the whole range on the y-axis when the window holds no points', () => {
      fixture.componentRef.setInput('labels', ['A', 'B', 'C']);
      fixture.componentRef.setInput('series', [{ name: 'Level', data: [40, null, 60] }]);
      fixture.componentRef.setInput('xValues', [0, 50, 100]);
      fixture.componentRef.setInput('xTicks', null);
      fixture.detectChanges();

      svg().dispatchEvent(new WheelEvent('wheel', { deltaX: -40, cancelable: true }));
      fixture.detectChanges();

      expect(inView()).toEqual([]);
      expect(Math.min(...yTicks())).toBeLessThanOrEqual(40);
      expect(Math.max(...yTicks())).toBeGreaterThanOrEqual(60);
    });

    it('ignores a pinch on a chart with no window', () => {
      fixture.componentRef.setInput('visibleXSpan', null);
      fixture.detectChanges();
      const wheel = new WheelEvent('wheel', { deltaY: 60, cancelable: true });
      Object.defineProperty(wheel, 'ctrlKey', { value: true });
      svg().dispatchEvent(wheel);
      const gesture = new Event('gesturestart', { cancelable: true });
      svg().dispatchEvent(gesture);
      const change = new Event('gesturechange', { cancelable: true });
      svg().dispatchEvent(change);

      expect(wheel.defaultPrevented).toBe(false);
      expect(gesture.defaultPrevented).toBe(false);
      expect(change.defaultPrevented).toBe(false);
    });

    it('leaves a vertical wheel to scroll the page', () => {
      const scroll = new WheelEvent('wheel', { deltaY: 40, cancelable: true });

      svg().dispatchEvent(scroll);

      expect(scroll.defaultPrevented).toBe(false);
      expect(ranges).toEqual([]);
    });

    it('pans a page at a time for page-mode wheels', () => {
      svg().dispatchEvent(
        new WheelEvent('wheel', { deltaX: -1, deltaMode: WheelEvent.DOM_DELTA_PAGE }),
      );
      fixture.detectChanges();

      // One page is the plot's width, a little more than the span between the inset edges
      const end = ranges.at(-1)!.end;
      expect(end).toBeLessThan(70);
      expect(end).toBeGreaterThan(65);
    });

    it('pans with a drag and swallows the click that ends it', () => {
      const clicks: ChartPointEvent[] = [];
      fixture.componentInstance.pointClick.subscribe(e => clicks.push(e));

      mouse('pointerdown', 300);
      mouse('pointermove', 302);
      expect(ranges).toEqual([]);

      mouse('pointermove', 800);
      expect(query('.ea-line-chart--panning')).toBeTruthy();
      mouse('pointerup', 800, 0);
      svg().dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(inView()).toEqual(['P4', 'P5', 'P6']);
      expect(query('.ea-line-chart--panning')).toBeNull();
      expect(clicks).toEqual([]);
    });

    it('leaves no tooltip behind once a touch pan lifts', () => {
      const touch = (type: string, clientX: number, buttons: number) => {
        svg().dispatchEvent(
          new PointerEvent(type, {
            clientX,
            pointerId: 1,
            pointerType: 'touch',
            buttons,
            bubbles: true,
          }),
        );
        fixture.detectChanges();
      };
      touch('pointerdown', 300, 1);

      touch('pointermove', 800, 1);
      touch('pointerup', 800, 0);
      touch('pointerleave', 800, 0);

      expect(inView()).toEqual(['P4', 'P5', 'P6']);
      expect(document.querySelector('.ea-tooltip')).toBeNull();
    });

    it('forgets a drag released outside the chart', () => {
      mouse('pointerdown', 300);
      mouse('pointermove', 800, 0);

      expect(ranges).toEqual([]);
    });

    it('focuses the first point in view and pans as the arrows leave it', () => {
      plot().dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe('Level, P7: 70');

      press('ArrowLeft');

      expect(ranges.at(-1)).toEqual({ start: 60, end: 90 });
      expect(inView()).toContain('P6');

      press('Home');

      expect(ranges.at(-1)).toEqual({ start: 0, end: 30 });
      expect(Math.max(...yTicks())).toBeLessThanOrEqual(30);

      press('End');

      expect(ranges.at(-1)).toEqual({ start: 70, end: 100 });
    });

    it('lists every point in the data table', () => {
      expect(queryAll('.ea-line-chart__table tbody tr')).toHaveLength(11);
    });

    it('windows an evenly spaced chart by index', () => {
      fixture.componentRef.setInput('xValues', null);
      fixture.componentRef.setInput('xTicks', null);
      fixture.componentRef.setInput('visibleXSpan', 3);
      fixture.detectChanges();

      expect(inView()).toEqual(['P7', 'P8', 'P9', 'P10']);
      expect(queryAll('.ea-line-chart__axis--x').map(t => t.textContent!.trim())).toEqual(
        ['P7', 'P8', 'P9', 'P10'],
      );

      const [x] = [Number(queryAll('.ea-line-chart__point')[8].getAttribute('cx'))];
      mouse('pointermove', x, 0);

      expect(query('.ea-line-chart__live')!.textContent?.trim()).toBe('Level, P8: 80');
    });

    it('shows everything once the span covers the data', () => {
      fixture.componentRef.setInput('visibleXSpan', 200);
      fixture.detectChanges();

      expect(inView()).toHaveLength(11);
      expect(query('.ea-line-chart--pannable')).toBeNull();
    });

    it('renders at exactly its height input, windowed or not', () => {
      for (const height of [160, 320]) {
        fixture.componentRef.setInput('height', height);
        fixture.detectChanges();

        expect(svg().getAttribute('height')).toBe(String(height));
        expect(query('.ea-line-chart')!.children).toHaveLength(2);
      }
    });
  });

  describe('Axis break', () => {
    function breakY(): number {
      const d = query('.ea-line-chart__y-axis')!.getAttribute('d')!;
      const [, upper, lower] = /L[\d.]+,([\d.]+)M[\d.]+,([\d.]+)/.exec(d)!;
      return (Number(upper) + Number(lower)) / 2;
    }

    beforeEach(() => {
      fixture.componentRef.setInput('series', [{ name: 'High', data: [70, 80, 75, 90] }]);
      fixture.componentRef.setInput('showAxisBreak', true);
      fixture.detectChanges();
    });

    it('cuts a y-axis that stops short of zero with two slashes', () => {
      expect(
        query('.ea-line-chart__axis-break')!.getAttribute('d')!.match(/M/g),
      ).toHaveLength(2);
      expect(
        query('.ea-line-chart__y-axis')!.getAttribute('d')!.match(/M/g),
      ).toHaveLength(2);
    });

    it('labels no tick at or below the break', () => {
      const cut = breakY();

      const ticks = queryAll('.ea-line-chart__axis--y');
      expect(ticks.length).toBeGreaterThan(0);
      ticks.forEach(t => expect(Number(t.getAttribute('y'))).toBeLessThan(cut));
    });

    it('keeps a wide gap between the lowest point and the baseline', () => {
      const baseline = Number(query('.ea-line-chart__baseline')!.getAttribute('y1'));
      const lowest = Math.max(
        ...queryAll('.ea-line-chart__point').map(p => Number(p.getAttribute('cy'))),
      );

      // Six axis font sizes at 12px
      expect(baseline - lowest).toBeGreaterThanOrEqual(72);
      expect(breakY()).toBeGreaterThan(lowest);
    });

    it('masks the break out of a crosshair drawn across it', () => {
      press('Home');

      expect(query('.ea-line-chart__crosshair')!.getAttribute('mask')).toMatch(/^url\(#/);
      expect(query('mask rect[fill="black"]')).toBeTruthy();
    });

    it('draws no break once the axis reaches zero', () => {
      fixture.componentRef.setInput('series', [{ name: 'Low', data: [2, 20, 15, 30] }]);
      fixture.detectChanges();

      expect(query('.ea-line-chart__axis-break')).toBeNull();
      expect(query('.ea-line-chart__y-axis')).toBeNull();
    });

    it('draws no break unless asked to', () => {
      fixture.componentRef.setInput('showAxisBreak', false);
      fixture.detectChanges();

      expect(query('.ea-line-chart__axis-break')).toBeNull();
    });
  });

  describe('X-axis labels', () => {
    function labels(): Element[] {
      return queryAll('.ea-line-chart__axis--x');
    }

    it('marks every label with a tick below the axis', () => {
      const ticks = queryAll('.ea-line-chart__x-tick');

      expect(ticks).toHaveLength(labels().length);
      const tick = ticks[0];
      expect(
        Number(tick.getAttribute('y2')) - Number(tick.getAttribute('y1')),
      ).toBeCloseTo(6.8);
    });

    it('keeps labels level by default', () => {
      expect(labels()[0].getAttribute('transform')).toBeNull();
      expect(labels()[0].getAttribute('text-anchor')).toBe('middle');
    });

    it.each([
      ['diagonal', -45],
      ['vertical', -90],
    ] as const)('turns labels set %s', (orientation, angle) => {
      fixture.componentRef.setInput('xLabelOrientation', orientation);
      fixture.detectChanges();

      const label = labels()[0];
      expect(label.getAttribute('transform')).toMatch(new RegExp(`^rotate\\(${angle} `));
      expect(label.getAttribute('text-anchor')).toBe('end');
    });

    it('turns labels automatically only once they crowd', () => {
      fixture.componentRef.setInput('xLabelOrientation', 'auto');
      fixture.detectChanges();

      expect(labels()[0].getAttribute('transform')).toBeNull();

      const crowded = Array.from({ length: 16 }, (_, i) => `Category ${i}`);
      fixture.componentRef.setInput('labels', crowded);
      fixture.componentRef.setInput('series', [
        { name: 'Many', data: crowded.map((_, i) => i) },
      ]);
      fixture.detectChanges();

      expect(labels()[0].getAttribute('transform')).toMatch(/^rotate\(-(45|90) /);
    });
  });

  describe('Draw animation', () => {
    it('fades the points in only once the lines have finished drawing', () => {
      const scss = readFileSync(
        join(process.cwd(), 'src/lib/line-chart/line-chart.component.scss'),
        'utf8',
      );
      const draw = scss.slice(
        scss.indexOf('&--animate-draw'),
        scss.indexOf('&--animate-reveal'),
      );

      expect(draw).toMatch(
        /\.ea-line-chart__point \{[^}]*animation-delay: var\(--ea-chart-duration, 600ms\);/,
      );
    });
  });
});

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

  describe('Pointer', () => {
    function svg(): SVGSVGElement {
      return query<SVGSVGElement>('.ea-bar-chart__svg')!;
    }

    function pointer(type: string, x: number, y: number): void {
      svg().dispatchEvent(
        new MouseEvent(type, { clientX: x, clientY: y, bubbles: true }),
      );
      fixture.detectChanges();
    }

    // The first two numbers of a bar's path: its left edge and, for an upright
    // bar rounded at the top, its baseline
    function barOrigin(i: number): [number, number] {
      const [x, y] = queryAll('.ea-bar-chart__bar')
        [i].getAttribute('d')!
        .slice(1)
        .split(/[^\d.-]+/)
        .map(Number);
      return [x, y];
    }

    it('highlights the bar under the pointer', () => {
      // Bars run Q1 Hardware, Q1 Software, Q2 Hardware, ...
      const [x, y] = barOrigin(1);

      pointer('pointermove', x + 1, y - 1);

      expect(live()).toBe('Software, Q1: 20');
      expect(queryAll('.ea-bar-chart__bar--dimmed')).toHaveLength(4);
    });

    it('clears the highlight outside every category', () => {
      pointer('pointermove', 0, 0);

      expect(live()).toBe('');
    });

    it('emits pointClick on click and clears on pointerleave', () => {
      const clicks: ChartPointEvent[] = [];
      fixture.componentInstance.pointClick.subscribe(e => clicks.push(e));
      const [x, y] = barOrigin(0);
      pointer('pointerdown', x + 1, y - 1);

      svg().dispatchEvent(new MouseEvent('click', { bubbles: true }));
      pointer('pointerleave', 0, 0);

      expect(clicks.map(c => c.seriesName)).toEqual(['Hardware']);
      expect(live()).toBe('');
    });

    it('picks the stacked segment under the pointer, else the top of the stack', () => {
      fixture.componentRef.setInput('stacked', true);
      fixture.detectChanges();
      const [x, y] = barOrigin(0);

      pointer('pointermove', x + 1, y + 1);

      expect(live()).toBe('Hardware, Q1: 40');

      pointer('pointermove', x + 1, 1);

      expect(live()).toBe('Software, Q1: 20');
    });

    it('highlights nothing at a label with no values', () => {
      fixture.componentRef.setInput('series', [{ name: 'Gappy', data: [5, null, 5] }]);
      fixture.detectChanges();
      const [x] = barOrigin(0);
      const [x2] = barOrigin(1);

      pointer('pointermove', (x + x2) / 2 + 1, 10);

      expect(live()).toBe('');
    });

    it('tracks the pointer along the vertical axis when horizontal', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.detectChanges();
      const cells = queryAll('.ea-bar-chart__bar');
      const y = Number(cells[0].getAttribute('d')!.split(/[^\d.-]+/)[2]);
      const x = Number(
        cells[0]
          .getAttribute('d')!
          .slice(1)
          .split(/[^\d.-]+/)[0],
      );

      pointer('pointermove', x + 1, y + 1);

      expect(live()).toBe('Hardware, Q1: 40');
    });
  });

  describe('Layout edges', () => {
    it('stacks negative values below the baseline with their own total', () => {
      fixture.componentRef.setInput('series', [
        { name: 'Gain', data: [5, -3] },
        { name: 'Loss', data: [-4, -2] },
      ]);
      fixture.componentRef.setInput('stacked', true);
      fixture.componentRef.setInput('showValues', true);
      fixture.detectChanges();

      const totals = queryAll('.ea-bar-chart__value').map(v => v.textContent?.trim());
      expect(totals).toEqual(['5', '-4', '-5']);
    });

    it('rounds negative horizontal bars on the left and labels them at their end', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.componentRef.setInput('series', [{ name: 'Net', data: [5, -5, 0] }]);
      fixture.componentRef.setInput('showValues', true);
      fixture.detectChanges();

      const anchors = queryAll('.ea-bar-chart__value').map(v =>
        v.getAttribute('text-anchor'),
      );
      expect(anchors).toEqual(['start', 'end', 'start']);
      expect(queryAll('.ea-bar-chart__bar')).toHaveLength(2);
    });

    it('stacks horizontally with rounded outer segments', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.componentRef.setInput('stacked', true);
      fixture.componentRef.setInput('series', [
        { name: 'Up', data: [3, -2] },
        { name: 'More', data: [2, -1] },
      ]);
      fixture.detectChanges();

      expect(queryAll('.ea-bar-chart__bar')).toHaveLength(4);
    });

    it('truncates long category labels when horizontal', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.componentRef.setInput('labels', [
        'A category label far too long to fit beside the bars',
        'Q2',
        'Q3',
      ]);
      fixture.detectChanges();

      const labels = queryAll('.ea-bar-chart__axis').map(t => t.textContent!.trim());
      expect(labels.some(l => l.endsWith('…'))).toBe(true);
    });

    it('thins crowded category labels when vertical', () => {
      const labels = Array.from({ length: 60 }, (_, i) => `Category ${i}`);
      fixture.componentRef.setInput('labels', labels);
      fixture.componentRef.setInput('series', [
        { name: 'Dense', data: labels.map(() => 1) },
      ]);
      fixture.detectChanges();

      expect(queryAll('.ea-bar-chart__axis').length).toBeLessThan(60 + 10);
    });

    it('uses custom formatting', () => {
      fixture.componentRef.setInput('formatValue', (v: number) => `${v} u`);
      fixture.componentRef.setInput('showValues', true);
      fixture.detectChanges();

      expect(query('.ea-bar-chart__value')!.textContent?.trim()).toBe('40 u');
    });
  });

  describe('Keyboard edges', () => {
    it('jumps with Home and End and wraps series with ArrowDown', () => {
      press('End');

      expect(live()).toBe('Hardware, Q3: 60');

      press('ArrowDown');

      expect(live()).toBe('Software, Q3: 35');

      press('Home');

      expect(live()).toBe('Software, Q1: 20');
    });

    it('skips a label the current series has no value at', () => {
      press('ArrowRight');
      press('ArrowUp');
      press('ArrowRight');

      expect(live()).toBe('Hardware, Q2: 50');
    });

    it('stays put at either end', () => {
      press('ArrowRight');
      press('ArrowLeft');

      expect(live()).toBe('Hardware, Q1: 40');
    });

    it('ignores unrelated keys', () => {
      press('ArrowRight');
      const event = new KeyboardEvent('keydown', { key: 'a', cancelable: true });

      plot().dispatchEvent(event);

      expect(event.defaultPrevented).toBe(false);
    });

    it('does nothing without a plotted value', () => {
      fixture.componentRef.setInput('series', [{ name: 'Tail', data: [null, 2] }]);
      fixture.detectChanges();

      plot().dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      press('Escape');
      press('Home');

      expect(live()).toBe('Tail, Q2: 2');
    });
  });

  describe('Horizontal chrome', () => {
    it('draws vertical gridlines and middle-aligned value labels', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.componentRef.setInput('showValues', true);
      fixture.detectChanges();

      const grid = query('.ea-bar-chart__grid')!;
      expect(grid.getAttribute('x1')).toBe(grid.getAttribute('x2'));
      expect(query('.ea-bar-chart__value')!.getAttribute('dominant-baseline')).toBe(
        'middle',
      );

      fixture.componentRef.setInput('showGrid', false);
      fixture.detectChanges();

      expect(query('.ea-bar-chart__grid')).toBeNull();
    });

    it('draws a vertical baseline', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.detectChanges();

      const baseline = query('.ea-bar-chart__baseline')!;
      expect(baseline.getAttribute('x1')).toBe(baseline.getAttribute('x2'));
    });

    it('omits the legend for a single series', () => {
      fixture.componentRef.setInput('series', [SERIES[0]]);
      fixture.detectChanges();

      expect(query('.ea-bar-chart__legend')).toBeNull();
    });
  });

  describe('Fallbacks', () => {
    it('leaves the label blank for values past the end of labels', () => {
      fixture.componentRef.setInput('labels', ['Q1']);
      fixture.componentRef.setInput('series', [{ name: 'Long', data: [1, 2] }]);
      fixture.detectChanges();

      press('End');

      expect(live()).toBe('Long, : 2');
    });

    it('cascades a single label without a delay', () => {
      fixture.componentRef.setInput('labels', ['Only']);
      fixture.componentRef.setInput('series', [{ name: 'One', data: [3] }]);
      fixture.componentRef.setInput('animation', 'cascade');
      fixture.detectChanges();

      expect(
        (query('.ea-bar-chart__bar') as SVGElement).style.getPropertyValue(
          '--ea-chart-delay',
        ),
      ).toBe('0ms');
    });

    it('ignores a click with nothing highlighted', () => {
      const clicks: ChartPointEvent[] = [];
      fixture.componentInstance.pointClick.subscribe(e => clicks.push(e));

      query('.ea-bar-chart__svg')!.dispatchEvent(
        new MouseEvent('click', { bubbles: true }),
      );

      expect(clicks).toEqual([]);
    });

    it('keeps a highlight when the plot then takes focus', () => {
      press('End');

      plot().dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(live()).toBe('Hardware, Q3: 60');
    });

    it('stays on the last label and on a series without a neighbour value', () => {
      press('End');
      press('ArrowRight');

      expect(live()).toBe('Hardware, Q3: 60');

      press('ArrowLeft');
      press('ArrowUp');

      expect(live()).toBe('Hardware, Q2: 50');
    });

    it('anchors the tooltip at the end of a negative stack', () => {
      fixture.componentRef.setInput('series', [
        { name: 'Gain', data: [5] },
        { name: 'Loss', data: [-4] },
        { name: 'More loss', data: [-2] },
      ]);
      fixture.componentRef.setInput('labels', ['Mon']);
      fixture.componentRef.setInput('stacked', true);
      fixture.detectChanges();

      press('ArrowRight');
      press('ArrowUp');
      press('ArrowUp');

      expect(live()).toBe('More loss, Mon: -2');
      expect(document.querySelector('.ea-tooltip')?.textContent).toContain('-2');
    });
  });
});

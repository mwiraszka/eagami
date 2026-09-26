import { type ComponentFixture, TestBed } from '@angular/core/testing';

import {
  PieChartComponent,
  type PieChartSlice,
  type PieChartSliceEvent,
} from './pie-chart.component';

const DATA: PieChartSlice[] = [
  { label: 'Desktop', value: 50 },
  { label: 'Mobile', value: 30 },
  { label: 'Tablet', value: 20 },
];

describe('PieChartComponent', () => {
  let fixture: ComponentFixture<PieChartComponent>;
  let el: HTMLElement;

  function query<T extends Element>(selector: string): T | null {
    return el.querySelector<T>(selector);
  }

  function queryAll(selector: string): Element[] {
    return Array.from(el.querySelectorAll(selector));
  }

  function plot(): HTMLElement {
    return query<HTMLElement>('.ea-pie-chart__plot')!;
  }

  function live(): string | undefined {
    return query('.ea-pie-chart__live')?.textContent?.trim();
  }

  function press(key: string): void {
    plot().dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PieChartComponent);
    fixture.componentRef.setInput('data', DATA);
    fixture.detectChanges();
    el = fixture.nativeElement;

    // jsdom cannot hit-test, so report the tooltip anchor as the topmost element
    // rather than letting the tooltip's occlusion check hide every bubble
    document.elementFromPoint = () => el.querySelector('.ea-pie-chart__anchor');
  });

  afterEach(() => {
    document.querySelectorAll('.ea-tooltip').forEach(tip => tip.remove());
  });

  describe('Rendering', () => {
    it('draws a slice per positive value', () => {
      fixture.componentRef.setInput('data', [...DATA, { label: 'None', value: 0 }]);
      fixture.detectChanges();

      expect(queryAll('.ea-pie-chart__slice')).toHaveLength(3);
    });

    it('cuts out the center as a donut', () => {
      fixture.componentRef.setInput('variant', 'donut');
      fixture.detectChanges();

      // A donut slice runs two arcs: out along the rim, back along the hole
      const arcs = query('.ea-pie-chart__slice')!.getAttribute('d')!.match(/A/g);
      expect(arcs).toHaveLength(2);
      expect(query('.ea-pie-chart')!.classList).toContain('ea-pie-chart--donut');
    });

    it('draws a lone slice as a full circle', () => {
      fixture.componentRef.setInput('data', [{ label: 'All', value: 1 }]);
      fixture.detectChanges();

      expect(query('.ea-pie-chart__slice')!.getAttribute('d')).not.toContain('NaN');
    });

    it('applies the animation class', () => {
      fixture.componentRef.setInput('animation', 'grow');
      fixture.detectChanges();

      expect(query('.ea-pie-chart')!.classList).toContain('ea-pie-chart--animate-grow');
    });
  });

  describe('Legend', () => {
    it('lists every slice with its share', () => {
      const items = queryAll('.ea-pie-chart__legend-item').map(i =>
        i.textContent?.replace(/\s+/g, ' ').trim(),
      );

      expect(items).toEqual(['Desktop 50%', 'Mobile 30%', 'Tablet 20%']);
    });

    it('drops the shares when showPercentages is false', () => {
      fixture.componentRef.setInput('showPercentages', false);
      fixture.detectChanges();

      expect(query('.ea-pie-chart__legend-percent')).toBeNull();
    });

    it('is omitted when showLegend is false', () => {
      fixture.componentRef.setInput('showLegend', false);
      fixture.detectChanges();

      expect(query('.ea-pie-chart__legend')).toBeNull();
    });
  });

  describe('Empty state', () => {
    it('shows the localized no-data message when every value is zero', () => {
      fixture.componentRef.setInput('data', [{ label: 'None', value: 0 }]);
      fixture.detectChanges();

      expect(query('.ea-pie-chart__empty')?.textContent?.trim()).toBe('No data');
    });
  });

  describe('ARIA', () => {
    it('exposes the plot as a focusable group named "Pie chart" by default', () => {
      expect(plot().getAttribute('role')).toBe('group');
      expect(plot().getAttribute('aria-roledescription')).toBe('chart');
      expect(plot().getAttribute('aria-label')).toBe('Pie chart');
    });

    it('carries each value and share in the data table', () => {
      const firstRow = queryAll('.ea-pie-chart__table tbody tr')[0];
      const cells = Array.from(firstRow.children).map(c => c.textContent?.trim());

      expect(cells).toEqual(['Desktop', '50', '50%']);
    });
  });

  describe('Keyboard', () => {
    it('cycles through slices with the arrows', () => {
      press('ArrowRight');
      press('ArrowRight');

      expect(live()).toBe('Mobile: 30, 30%');

      press('ArrowLeft');
      press('ArrowLeft');

      expect(live()).toBe('Tablet: 20, 20%');
    });

    it('pulls the highlighted slice out from the center', () => {
      press('ArrowRight');

      const slice = query<SVGElement>('.ea-pie-chart__slice')!;
      expect(slice.style.transform).toContain('translate');
    });
  });

  describe('Outputs', () => {
    it('emits sliceClick for the highlighted slice on Enter', () => {
      const clicks: PieChartSliceEvent[] = [];
      fixture.componentInstance.sliceClick.subscribe(e => clicks.push(e));
      press('End');

      press('Enter');

      expect(clicks).toEqual([{ index: 2, label: 'Tablet', value: 20, percent: 20 }]);
    });

    it('emits activeSliceChange with null once cleared', () => {
      const changes: (PieChartSliceEvent | null)[] = [];
      fixture.componentInstance.activeSliceChange.subscribe(e => changes.push(e));

      press('ArrowRight');
      press('Escape');

      expect(changes.map(c => c?.label ?? null)).toEqual(['Desktop', null]);
    });
  });

  describe('Pointer', () => {
    // The plot is 240px square with its center at (120, 120)
    function pointer(type: string, x: number, y: number): void {
      query('.ea-pie-chart__svg')!.dispatchEvent(
        new MouseEvent(type, { clientX: x, clientY: y, bubbles: true }),
      );
      fixture.detectChanges();
    }

    it('highlights the slice under the pointer', () => {
      pointer('pointermove', 180, 120);

      expect(live()).toBe('Desktop: 50, 50%');

      pointer('pointermove', 60, 120);

      expect(live()).toBe('Mobile: 30, 30%');
    });

    it("reaches the slice that wraps past twelve o'clock", () => {
      pointer('pointerdown', 60, 60);

      expect(live()).toBe('Tablet: 20, 20%');
      expect(document.querySelector('.ea-tooltip')?.textContent).toContain('20 (20%)');
    });

    it('highlights nothing outside the pie or inside the donut hole', () => {
      pointer('pointermove', 0, 0);

      expect(live()).toBe('');

      fixture.componentRef.setInput('variant', 'donut');
      fixture.detectChanges();
      pointer('pointermove', 120, 120);

      expect(live()).toBe('');
    });

    it('emits sliceClick on click and clears on pointerleave', () => {
      const clicks: PieChartSliceEvent[] = [];
      fixture.componentInstance.sliceClick.subscribe(e => clicks.push(e));
      pointer('pointermove', 180, 120);

      query('.ea-pie-chart__svg')!.dispatchEvent(
        new MouseEvent('click', { bubbles: true }),
      );
      pointer('pointerleave', 0, 0);

      expect(clicks.map(c => c.label)).toEqual(['Desktop']);
      expect(live()).toBe('');
    });

    it('does not pull a lone slice out of place', () => {
      fixture.componentRef.setInput('data', [{ label: 'All', value: 3 }]);
      fixture.detectChanges();

      press('ArrowRight');

      expect(query<SVGElement>('.ea-pie-chart__slice')!.style.transform).toBe('');
    });

    it('treats a non-finite value as zero', () => {
      fixture.componentRef.setInput('data', [...DATA, { label: 'Broken', value: NaN }]);
      fixture.detectChanges();

      expect(queryAll('.ea-pie-chart__slice')).toHaveLength(3);
    });
  });

  describe('Keyboard edges', () => {
    it('wraps backwards from the first slice and jumps with Home', () => {
      press('ArrowRight');
      press('ArrowUp');

      expect(live()).toBe('Tablet: 20, 20%');

      press('Home');

      expect(live()).toBe('Desktop: 50, 50%');
    });

    it('ignores unrelated keys', () => {
      press('ArrowRight');
      const event = new KeyboardEvent('keydown', { key: 'a', cancelable: true });

      plot().dispatchEvent(event);

      expect(event.defaultPrevented).toBe(false);
    });

    it('focuses the first slice and clears on blur', () => {
      plot().dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(live()).toBe('Desktop: 50, 50%');

      plot().dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(live()).toBe('');
    });
  });

  describe('Chrome', () => {
    it('hides the legend in the empty state', () => {
      fixture.componentRef.setInput('data', []);
      fixture.detectChanges();

      expect(query('.ea-pie-chart__legend')).toBeNull();
    });

    it('uses aria-label as the accessible name', () => {
      fixture.componentRef.setInput('aria-label', 'Traffic by device');
      fixture.detectChanges();

      expect(plot().getAttribute('aria-label')).toBe('Traffic by device');
    });

    it('formats tooltip values with formatValue', () => {
      fixture.componentRef.setInput('formatValue', (v: number) => `${v} visits`);
      fixture.detectChanges();

      press('ArrowRight');

      expect(live()).toBe('Desktop: 50 visits, 50%');
    });
  });

  describe('Fallbacks', () => {
    it('draws a lone donut slice as a full ring', () => {
      fixture.componentRef.setInput('variant', 'donut');
      fixture.componentRef.setInput('data', [{ label: 'All', value: 1 }]);
      fixture.detectChanges();

      const d = query('.ea-pie-chart__slice')!.getAttribute('d')!;
      expect(d.match(/M/g)).toHaveLength(2);
    });

    it('places the donut tooltip on the ring', () => {
      fixture.componentRef.setInput('variant', 'donut');
      fixture.detectChanges();

      press('ArrowRight');

      expect(document.querySelector('.ea-tooltip')).toBeTruthy();
    });

    it('ignores a click with nothing highlighted', () => {
      const clicks: PieChartSliceEvent[] = [];
      fixture.componentInstance.sliceClick.subscribe(e => clicks.push(e));

      query('.ea-pie-chart__svg')!.dispatchEvent(
        new MouseEvent('click', { bubbles: true }),
      );

      expect(clicks).toEqual([]);
    });

    it('keeps a highlight when the plot then takes focus', () => {
      press('End');

      plot().dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(live()).toBe('Tablet: 20, 20%');
    });
  });
});

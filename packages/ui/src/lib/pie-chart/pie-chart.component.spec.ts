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
});

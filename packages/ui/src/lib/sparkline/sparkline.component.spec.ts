import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SparklineComponent } from './sparkline.component';

describe('SparklineComponent', () => {
  let fixture: ComponentFixture<SparklineComponent>;
  let el: HTMLElement;

  function query<T extends Element>(selector: string): T | null {
    return el.querySelector<T>(selector);
  }

  function queryAll(selector: string): Element[] {
    return Array.from(el.querySelectorAll(selector));
  }

  function set(inputs: Record<string, unknown>): void {
    for (const [name, value] of Object.entries(inputs)) {
      fixture.componentRef.setInput(name, value);
    }
    fixture.detectChanges();
  }

  function root(): HTMLElement {
    return query<HTMLElement>('.ea-sparkline')!;
  }

  function summary(): string {
    const id = root().getAttribute('aria-describedby')!;
    return el.querySelector(`#${id}`)!.textContent!.trim();
  }

  function markerPoints(): string[] {
    return queryAll('.ea-sparkline__marker:not(.ea-sparkline__marker--active)').map(
      marker => `${marker.getAttribute('cx')},${marker.getAttribute('cy')}`,
    );
  }

  function pointer(type: string, x: number, pointerType = 'mouse'): void {
    query('.ea-sparkline__svg')!.dispatchEvent(
      new PointerEvent(type, { clientX: x, clientY: 0, pointerType, bubbles: true }),
    );
    fixture.detectChanges();
  }

  function tooltip(): string | undefined {
    return document.querySelector('.ea-tooltip')?.textContent?.trim();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SparklineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SparklineComponent);
    fixture.componentRef.setInput('data', [10, 20, 30]);
    fixture.detectChanges();
    el = fixture.nativeElement;

    // jsdom cannot hit-test, so report the tooltip anchor as the topmost element
    // rather than letting the tooltip's occlusion check hide every bubble
    document.elementFromPoint = () => el.querySelector('.ea-sparkline__anchor');
  });

  afterEach(() => {
    document.querySelectorAll('.ea-tooltip').forEach(tip => tip.remove());
  });

  describe('Rendering', () => {
    it('traces a line across the full width, inset for its markers', () => {
      expect(query('.ea-sparkline__line')!.getAttribute('d')).toBe(
        'M5.5,26.5L240,16L474.5,5.5',
      );
      expect(query('.ea-sparkline__area')).toBeNull();
    });

    it('sizes itself to the height input', () => {
      set({ height: 64 });

      expect(root().style.height).toBe('64px');
      expect(query('svg')!.getAttribute('height')).toBe('64');
    });

    it('fills the area under the line down to the bottom edge', () => {
      set({ variant: 'area' });

      expect(query('.ea-sparkline__area')!.getAttribute('d')).toBe(
        'M5.5,26.5L240,16L474.5,5.5L474.5,32L5.5,32Z',
      );
      expect(query('.ea-sparkline__line')).not.toBeNull();
    });

    it('smooths the line with a curve', () => {
      set({ curve: 'smooth', data: [10, 30, 20] });

      expect(query('.ea-sparkline__line')!.getAttribute('d')).toContain('C');
    });

    it('breaks the line at a gap and marks a lone value with a dot', () => {
      set({ data: [10, 20, null, 30, null, 40, 50], markers: 'none' });

      expect(queryAll('.ea-sparkline__line')).toHaveLength(2);
      expect(queryAll('.ea-sparkline__marker')).toHaveLength(1);
    });

    it('places a flat run halfway up', () => {
      set({ data: [5, 5, 5] });

      expect(query('.ea-sparkline__line')!.getAttribute('d')).toBe(
        'M5.5,16L240,16L474.5,16',
      );
    });

    it('zooms in on the spread of the values by default', () => {
      set({ data: [10, 20] });

      expect(query('.ea-sparkline__line')!.getAttribute('d')).toBe('M5.5,26.5L474.5,5.5');
    });

    it('starts the scale at zero when asked to', () => {
      set({ data: [10, 20], startAtZero: true });

      expect(query('.ea-sparkline__line')!.getAttribute('d')).toBe('M5.5,16L474.5,5.5');
    });

    it('colors the sparkline from the color input, or the palette', () => {
      expect(root().style.getPropertyValue('--ea-chart-color')).toBe(
        'var(--color-chart-1)',
      );

      set({ color: 'rebeccapurple' });

      expect(root().style.getPropertyValue('--ea-chart-color')).toBe('rebeccapurple');
    });

    it('applies the variant and animation classes', () => {
      set({ variant: 'bar', animation: 'fade' });

      expect(root().classList).toContain('ea-sparkline--bar');
      expect(root().classList).toContain('ea-sparkline--animate-fade');
    });

    it('draws nothing without a value', () => {
      set({ data: [null, NaN] });

      expect(query('svg')).toBeNull();
    });
  });

  describe('Markers', () => {
    it('marks the latest value by default', () => {
      expect(markerPoints()).toEqual(['474.5,5.5']);
    });

    it('marks the latest value past trailing gaps', () => {
      set({ data: [10, 30, 20, 25, null] });

      expect(markerPoints()).toEqual(['357.25,10.75']);
    });

    it('adds the highest and lowest values for extremes', () => {
      set({ data: [20, 10, 40, 30, 25], markers: 'extremes' });

      expect(markerPoints()).toEqual(['474.5,16', '240,5.5', '122.75,26.5']);
    });

    it('marks every value for all', () => {
      set({ data: [10, null, 20, 30], markers: 'all' });

      expect(markerPoints()).toHaveLength(3);
    });

    it('marks nothing when markers are off', () => {
      set({ markers: 'none' });

      expect(queryAll('.ea-sparkline__marker')).toHaveLength(0);
    });
  });

  describe('Bars', () => {
    beforeEach(() => set({ variant: 'bar' }));

    it('draws a bar per value, standing on zero', () => {
      const bars = queryAll('.ea-sparkline__bar');

      expect(bars).toHaveLength(3);
      // Zero sits at the bottom, so the tallest bar spans the full height
      expect(bars[2].getAttribute('y')).toBe('0');
      expect(bars[2].getAttribute('height')).toBe('32');
      expect(queryAll('.ea-sparkline__line')).toHaveLength(0);
    });

    it('hangs a negative value below zero', () => {
      set({ data: [10, -10] });

      const [up, down] = queryAll('.ea-sparkline__bar');
      expect(up.getAttribute('y')).toBe('0');
      expect(up.getAttribute('height')).toBe('16');
      expect(down.getAttribute('y')).toBe('16');
      expect(down.getAttribute('height')).toBe('16');
    });

    it('skips a gap', () => {
      set({ data: [10, null, 30] });

      expect(queryAll('.ea-sparkline__bar')).toHaveLength(2);
    });

    it('dims every bar but the marked ones', () => {
      const dimmed = queryAll('.ea-sparkline__bar').map(bar =>
        bar.classList.contains('ea-sparkline__bar--dimmed'),
      );

      expect(dimmed).toEqual([true, true, false]);
    });

    it('dims no bar when markers are off, or mark every value', () => {
      set({ markers: 'none' });

      expect(queryAll('.ea-sparkline__bar--dimmed')).toHaveLength(0);

      set({ markers: 'all' });

      expect(queryAll('.ea-sparkline__bar--dimmed')).toHaveLength(0);
    });

    it('dims every bar but the one under the pointer', () => {
      set({ showTooltip: true });

      pointer('pointermove', 80);

      const dimmed = queryAll('.ea-sparkline__bar').map(bar =>
        bar.classList.contains('ea-sparkline__bar--dimmed'),
      );
      expect(dimmed).toEqual([false, true, true]);
      expect(tooltip()).toBe('10');
    });
  });

  describe('Tooltip', () => {
    beforeEach(() => set({ showTooltip: true }));

    it('shows the value nearest the pointer, with an enlarged dot', () => {
      pointer('pointermove', 250);

      expect(tooltip()).toBe('20');
      const active = query('.ea-sparkline__marker--active')!;
      expect(active.getAttribute('cx')).toBe('240');
      expect(active.getAttribute('cy')).toBe('16');
    });

    it('formats the value with formatValue', () => {
      set({ formatValue: (value: number) => `$${value}` });

      pointer('pointermove', 470);

      expect(tooltip()).toBe('$30');
    });

    it('skips a gap for the nearest value', () => {
      set({ data: [10, null, 30] });

      pointer('pointermove', 250);

      expect(tooltip()).toBe('30');
    });

    it('clears once the pointer leaves', () => {
      pointer('pointermove', 250);
      pointer('pointerleave', 250);

      expect(tooltip()).toBeUndefined();
      expect(query('.ea-sparkline__marker--active')).toBeNull();
    });

    it('clears when a finger lifts, but not when a mouse button does', () => {
      pointer('pointerdown', 250, 'touch');

      expect(tooltip()).toBe('20');

      pointer('pointerup', 250, 'touch');

      expect(tooltip()).toBeUndefined();

      pointer('pointerdown', 250);
      pointer('pointerup', 250);

      expect(tooltip()).toBe('20');
    });

    it('shows nothing when showTooltip is off', () => {
      set({ showTooltip: false });

      pointer('pointermove', 250);

      expect(tooltip()).toBeUndefined();
      expect(query('.ea-sparkline__marker--active')).toBeNull();
      expect(root().classList).not.toContain('ea-sparkline--interactive');
    });
  });

  describe('Accessibility', () => {
    it('is a single image with a default name', () => {
      expect(root().getAttribute('role')).toBe('img');
      expect(root().getAttribute('aria-label')).toBe('Trend');
      expect(query('svg')!.getAttribute('aria-hidden')).toBe('true');
    });

    it('takes its name from aria-label', () => {
      set({ 'aria-label': 'Weekly revenue' });

      expect(root().getAttribute('aria-label')).toBe('Weekly revenue');
    });

    it('describes the first, last, lowest, and highest values', () => {
      set({ data: [20, 10, 40, 30] });

      expect(summary()).toBe('From 20 to 30, low 10, high 40');
    });

    it('formats the described values with formatValue', () => {
      set({ formatValue: (value: number) => `$${value}` });

      expect(summary()).toBe('From $10 to $30, low $10, high $30');
    });

    it('describes an empty sparkline as having no data', () => {
      set({ data: [] });

      expect(summary()).toBe('No data');
    });
  });
});

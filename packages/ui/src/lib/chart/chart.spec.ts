import { chartColor, estimateTextWidth, niceScale } from './chart';

describe('chart helpers', () => {
  describe('niceScale', () => {
    it('extends the range outward to round ticks', () => {
      const scale = niceScale(3, 97);

      expect(scale.min).toBe(0);
      expect(scale.max).toBe(100);
      expect(scale.ticks).toEqual([0, 20, 40, 60, 80, 100]);
    });

    it('spans negative and positive values', () => {
      const scale = niceScale(-14, 12, 4);

      expect(scale.min).toBeLessThanOrEqual(-14);
      expect(scale.max).toBeGreaterThanOrEqual(12);
      expect(scale.ticks).toContain(0);
    });

    it('rounds away floating-point error in tick values', () => {
      const scale = niceScale(0, 0.7);

      expect(scale.ticks.every(t => String(t).length <= 4)).toBe(true);
    });

    it.each([
      [0, 20, 10, 2],
      [0, 25, 10, 2.5],
      [0, 45, 10, 5],
      [0, 90, 10, 10],
    ])('steps %d to %d in round increments', (min, max, ticks, step) => {
      const scale = niceScale(min, max, ticks);

      expect(scale.ticks[1] - scale.ticks[0]).toBe(step);
    });

    it('opens a flat range at zero', () => {
      expect(niceScale(0, 0).max).toBeGreaterThan(0);
    });

    it('opens a flat range so a single value still has an axis', () => {
      const scale = niceScale(5, 5);

      expect(scale.max).toBeGreaterThan(scale.min);
    });

    it('falls back to a unit range for non-finite input', () => {
      expect(niceScale(Infinity, -Infinity)).toEqual({ min: 0, max: 1, ticks: [0, 1] });
    });
  });

  describe('chartColor', () => {
    it('assigns palette slots in order', () => {
      expect(chartColor(0)).toBe('var(--color-chart-1)');
      expect(chartColor(7)).toBe('var(--color-chart-8)');
    });

    it('wraps past the last slot', () => {
      expect(chartColor(8)).toBe('var(--color-chart-1)');
    });

    it('prefers an explicit color', () => {
      expect(chartColor(0, 'rebeccapurple')).toBe('rebeccapurple');
    });
  });

  it('estimates text width from its length', () => {
    expect(estimateTextWidth('abcd', 10)).toBeCloseTo(24);
  });
});

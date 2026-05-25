import { hexToOklch, hexToRgb, oklchToHex, rgbToHex } from './oklch';

describe('hex ⇆ rgb', () => {
  it('parses and re-emits a hex round-trip', () => {
    expect(rgbToHex(hexToRgb('#3674a1'))).toBe('#3674a1');
  });

  it('rejects malformed hex strings', () => {
    expect(() => hexToRgb('not-a-colour')).toThrow();
    expect(() => hexToRgb('#abc')).toThrow();
  });
});

describe('hex ⇆ oklch round-trip', () => {
  it.each(['#000000', '#ffffff', '#3674a1', '#e07a5f', '#4b91c3'])(
    'preserves %s within ±2 sRGB units after a hex → oklch → hex round-trip',
    hex => {
      const out = oklchToHex(hexToOklch(hex));
      const a = hexToRgb(hex);
      const b = hexToRgb(out);

      expect(Math.abs(a.r - b.r)).toBeLessThanOrEqual(2);
      expect(Math.abs(a.g - b.g)).toBeLessThanOrEqual(2);
      expect(Math.abs(a.b - b.b)).toBeLessThanOrEqual(2);
    },
  );
});

describe('hexToOklch', () => {
  it('returns L ≈ 0 for black and L ≈ 1 for white', () => {
    expect(hexToOklch('#000000').l).toBeCloseTo(0, 2);
    expect(hexToOklch('#ffffff').l).toBeCloseTo(1, 2);
  });

  it('returns C ≈ 0 for any grey', () => {
    expect(hexToOklch('#808080').c).toBeLessThan(0.01);
  });

  it('places blue (#0000ff) at the blue end of the hue wheel (≈ 264°)', () => {
    const { h } = hexToOklch('#0000ff');

    expect(h).toBeGreaterThan(250);
    expect(h).toBeLessThan(280);
  });
});

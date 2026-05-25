import { contrastRatio, relativeLuminance } from './contrast';

describe('relativeLuminance', () => {
  it('returns 0 for black and 1 for white', () => {
    expect(relativeLuminance('#000000')).toBeCloseTo(0, 4);
    expect(relativeLuminance('#ffffff')).toBeCloseTo(1, 4);
  });
});

describe('contrastRatio', () => {
  it('returns 21:1 for the black/white extremes', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0);
  });

  it('is symmetric: order of arguments does not matter', () => {
    expect(contrastRatio('#3674a1', '#ffffff')).toBeCloseTo(
      contrastRatio('#ffffff', '#3674a1'),
      4,
    );
  });

  it('returns 1:1 for identical colours', () => {
    expect(contrastRatio('#3674a1', '#3674a1')).toBeCloseTo(1, 4);
  });

  it("clears the 4.5:1 text bar for the library's brand-600 against white", () => {
    expect(contrastRatio('#2a5b7e', '#ffffff')).toBeGreaterThanOrEqual(4.5);
  });
});

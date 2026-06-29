import { isRtl } from './direction';

describe('isRtl', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns true when the computed direction is rtl', () => {
    const el = document.createElement('div');
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      direction: 'rtl',
    } as CSSStyleDeclaration);

    expect(isRtl(el)).toBe(true);
  });

  it('returns false when the computed direction is ltr', () => {
    const el = document.createElement('div');
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      direction: 'ltr',
    } as CSSStyleDeclaration);

    expect(isRtl(el)).toBe(false);
  });
});

import { applyPalette } from './apply-palette';
import type { ModePalette } from './palette.types';

const PALETTE: ModePalette = {
  light: { '--color-brand-base': '#3674a1' },
  dark: { '--color-brand-base': '#8ab6d6' },
};

describe('applyPalette', () => {
  function getTag(): HTMLStyleElement | null {
    return document.getElementById('eagami-palette') as HTMLStyleElement | null;
  }

  afterEach(() => {
    getTag()?.remove();
  });

  it('installs the derived values for both modes', () => {
    applyPalette(PALETTE);

    const css = getTag()?.textContent ?? '';

    expect(css).toContain('--color-brand-base: #3674a1;');
    expect(css).toContain('--color-brand-base: #8ab6d6;');
  });

  it('replaces the stylesheet rather than appending a second one', () => {
    applyPalette(PALETTE);

    applyPalette({ light: { '--x': 'red' }, dark: { '--x': 'blue' } });

    expect(document.querySelectorAll('#eagami-palette')).toHaveLength(1);
    expect(getTag()?.textContent).not.toContain('#3674a1');
  });

  it('carries a nonce so a strict style-src policy admits the tag', () => {
    applyPalette(PALETTE, 'r4nd0m');

    expect(getTag()?.getAttribute('nonce')).toBe('r4nd0m');
  });

  it('sets the nonce before the tag enters the document', () => {
    const seen: (string | null)[] = [];
    const appendChild = document.head.appendChild.bind(document.head);
    vi.spyOn(document.head, 'appendChild').mockImplementation(node => {
      seen.push((node as HTMLElement).getAttribute('nonce'));
      return appendChild(node);
    });

    applyPalette(PALETTE, 'r4nd0m');

    expect(seen).toEqual(['r4nd0m']);
  });

  it('leaves the tag unadorned when no nonce is in play', () => {
    applyPalette(PALETTE, null);

    expect(getTag()?.hasAttribute('nonce')).toBe(false);
  });
});

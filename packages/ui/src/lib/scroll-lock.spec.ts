import { ScrollLock } from './scroll-lock';

describe('ScrollLock', () => {
  afterEach(() => {
    document.documentElement.style.overflow = '';
    document.body.style.paddingRight = '';
  });

  it('shuts off the root scroller on the first hold and restores it on the last', () => {
    const lock = new ScrollLock();

    lock.acquire();
    lock.acquire();
    expect(document.documentElement.style.overflow).toBe('hidden');

    lock.release();
    expect(document.documentElement.style.overflow).toBe('hidden');

    lock.release();
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('puts back the inline styles it found', () => {
    document.documentElement.style.overflow = 'scroll';
    const lock = new ScrollLock();

    lock.acquire();
    lock.release();

    expect(document.documentElement.style.overflow).toBe('scroll');
  });

  it('ignores a release with nothing held', () => {
    const lock = new ScrollLock();

    lock.release();
    lock.acquire();
    expect(document.documentElement.style.overflow).toBe('hidden');

    lock.release();
    expect(document.documentElement.style.overflow).toBe('');
  });
});

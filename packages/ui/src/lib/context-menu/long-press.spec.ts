import type { PopoverAnchorPoint } from '../popover/popover-positioning';
import { LONG_PRESS_DELAY_MS, watchLongPress } from './long-press';

describe('watchLongPress', () => {
  let element: HTMLElement;
  let inner: HTMLElement;
  let stop: () => void;
  let presses: Array<{ point: PopoverAnchorPoint; target: EventTarget | null }>;
  let claim: boolean;

  function pointer(
    type: string,
    options: { x?: number; y?: number; pointerType?: string; on?: HTMLElement } = {},
  ): PointerEvent {
    const event = new PointerEvent(type, {
      bubbles: true,
      cancelable: true,
      clientX: options.x ?? 20,
      clientY: options.y ?? 30,
      pointerId: 1,
      pointerType: options.pointerType ?? 'touch',
      isPrimary: true,
    });
    (options.on ?? inner).dispatchEvent(event);
    return event;
  }

  function click(): MouseEvent {
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    inner.dispatchEvent(event);
    return event;
  }

  function contextMenu(): MouseEvent {
    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
    inner.dispatchEvent(event);
    return event;
  }

  beforeEach(() => {
    vi.useFakeTimers();
    element = document.createElement('div');
    inner = document.createElement('span');
    element.appendChild(inner);
    document.body.appendChild(element);
    presses = [];
    claim = true;
    stop = watchLongPress(element, (point, target) => {
      presses.push({ point, target });
      return claim;
    });
  });

  afterEach(() => {
    stop();
    element.remove();
    vi.useRealTimers();
  });

  it('reports a touch held still for the long-press delay', () => {
    pointer('pointerdown', { x: 12, y: 34 });

    vi.advanceTimersByTime(LONG_PRESS_DELAY_MS);

    expect(presses).toEqual([{ point: { x: 12, y: 34 }, target: inner }]);
  });

  it('ignores a touch released before the delay', () => {
    pointer('pointerdown');
    vi.advanceTimersByTime(LONG_PRESS_DELAY_MS - 1);

    pointer('pointerup');
    vi.advanceTimersByTime(LONG_PRESS_DELAY_MS);

    expect(presses).toEqual([]);
  });

  it('ignores a touch that moves off into a scroll', () => {
    pointer('pointerdown', { x: 20, y: 30 });

    pointer('pointermove', { x: 20, y: 60 });
    vi.advanceTimersByTime(LONG_PRESS_DELAY_MS);

    expect(presses).toEqual([]);
  });

  it('keeps a press that only trembles in place', () => {
    pointer('pointerdown', { x: 20, y: 30 });

    pointer('pointermove', { x: 23, y: 32 });
    vi.advanceTimersByTime(LONG_PRESS_DELAY_MS);

    expect(presses).toHaveLength(1);
  });

  it('leaves a mouse press to the right-click', () => {
    pointer('pointerdown', { pointerType: 'mouse' });

    vi.advanceTimersByTime(LONG_PRESS_DELAY_MS);

    expect(presses).toEqual([]);
  });

  it('swallows the click a claimed press ends with', () => {
    pointer('pointerdown');
    vi.advanceTimersByTime(LONG_PRESS_DELAY_MS);
    pointer('pointerup');

    const trailing = click();
    const next = click();

    expect(trailing.defaultPrevented).toBe(true);
    expect(next.defaultPrevented).toBe(false);
  });

  it('keeps the click of a press nothing claims', () => {
    claim = false;
    pointer('pointerdown');
    vi.advanceTimersByTime(LONG_PRESS_DELAY_MS);
    pointer('pointerup');

    const trailing = click();

    expect(presses).toHaveLength(1);
    expect(trailing.defaultPrevented).toBe(false);
  });

  it('lets the next press land its click when the claimed one sent none', () => {
    pointer('pointerdown');
    vi.advanceTimersByTime(LONG_PRESS_DELAY_MS);
    pointer('pointerup');

    pointer('pointerdown', { pointerType: 'mouse' });
    const next = click();

    expect(next.defaultPrevented).toBe(false);
  });

  it("cancels Android's contextmenu for a press it has already claimed", () => {
    const outside = vi.fn();
    document.addEventListener('contextmenu', outside, true);
    pointer('pointerdown');
    vi.advanceTimersByTime(LONG_PRESS_DELAY_MS);

    const request = contextMenu();

    expect(request.defaultPrevented).toBe(true);
    expect(outside).not.toHaveBeenCalled();
    document.removeEventListener('contextmenu', outside, true);
  });

  it("stands down when Android's contextmenu arrives before the hold completes", () => {
    pointer('pointerdown');
    vi.advanceTimersByTime(LONG_PRESS_DELAY_MS / 2);

    const request = contextMenu();
    vi.advanceTimersByTime(LONG_PRESS_DELAY_MS);

    expect(request.defaultPrevented).toBe(false);
    expect(presses).toEqual([]);
  });

  it('stops reporting once stopped', () => {
    stop();
    pointer('pointerdown');

    vi.advanceTimersByTime(LONG_PRESS_DELAY_MS);

    expect(presses).toEqual([]);
  });
});

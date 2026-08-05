import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import {
  REAL_GET_COMPUTED_STYLE,
  type TopLayerStubs,
  installTopLayerStubs,
} from '../../test-setup';
import {
  type PopoverPlacement,
  type PopoverPositionResult,
  computePopoverPosition,
} from './popover-positioning';
import { PopoverComponent, type PopoverScrollBehavior } from './popover.component';

@Component({
  imports: [PopoverComponent],
  template: `
    <button
      #trigger
      class="anchor-btn">
      Anchor
    </button>
    <ea-popover
      [anchor]="trigger"
      [open]="open()"
      [placement]="placement()"
      [flip]="flip()"
      [matchAnchorWidth]="matchAnchorWidth()"
      [scrollBehavior]="scrollBehavior()"
      [closeOnOutsideClick]="closeOnOutsideClick()"
      [closeOnEscape]="closeOnEscape()"
      (closeRequested)="onClose()">
      <div class="popover-body">Popover body</div>
    </ea-popover>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopoverHostComponent {
  readonly open = signal<boolean>(false);
  readonly placement = signal<PopoverPlacement>('bottom-start');
  readonly flip = signal<boolean>(true);
  readonly matchAnchorWidth = signal<boolean>(false);
  readonly scrollBehavior = signal<PopoverScrollBehavior>('reposition');
  readonly closeOnOutsideClick = signal<boolean>(true);
  readonly closeOnEscape = signal<boolean>(true);
  readonly closeCount = signal<number>(0);
  readonly popover = viewChild.required(PopoverComponent);

  onClose(): void {
    this.closeCount.update(c => c + 1);
    this.open.set(false);
  }
}

@Component({
  imports: [PopoverComponent],
  template: `
    <button
      #trigger
      class="ref-anchor-btn">
      Anchor
    </button>
    <ea-popover
      [anchor]="triggerRef()"
      [open]="true">
      <div>Popover body</div>
    </ea-popover>
  `,
})
class ElementRefAnchorHostComponent {
  readonly triggerRef = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
}

@Component({
  imports: [PopoverComponent],
  template: `
    <button
      #trigger
      class="trap-anchor-btn">
      Anchor
    </button>
    <ea-popover
      [anchor]="trigger"
      [open]="true"
      [trapFocus]="trapFocus()">
      <button
        class="trap-disabled"
        disabled>
        Disabled
      </button>
      <button class="trap-first">First</button>
      <button class="trap-last">Last</button>
      <span
        class="trap-untabbable"
        tabindex="-1">
        Untabbable
      </span>
      <button class="trap-unrendered">Unrendered</button>
    </ea-popover>
  `,
})
class TrapFocusHostComponent {
  readonly trapFocus = signal<boolean>(true);
}

@Component({
  imports: [PopoverComponent],
  template: `
    <ea-popover
      [anchor]="undefined"
      [open]="true">
      <div>Popover body</div>
    </ea-popover>
  `,
})
class UnanchoredHostComponent {}

describe('PopoverComponent', () => {
  let fixture: ComponentFixture<PopoverHostComponent>;
  let host: PopoverHostComponent;

  function getSurface(): HTMLElement | null {
    // Surface renders unconditionally (keeps `<ng-content/>` available), toggles via
    // `display: none`, and teleports to `document.body`; query the global DOM and treat
    // a hidden surface as "not open". Specs that mount a second host leave more than
    // one surface in the body, so pick the one that is actually shown.
    return (
      Array.from(document.querySelectorAll<HTMLElement>('.ea-popover__surface')).find(
        surface => surface.style.display !== 'none',
      ) ?? null
    );
  }

  function getAnchor(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.anchor-btn');
  }

  function nextFrame(): Promise<void> {
    return new Promise(resolve => requestAnimationFrame(() => resolve()));
  }

  // The surface measures 0x0 under jsdom, so only the anchor rect has to be faked
  // for the resolved coordinates to be predictable.
  async function openAnchoredAt(rect: DOMRect): Promise<void> {
    getAnchor().getBoundingClientRect = () => rect;
    host.open.set(true);
    fixture.detectChanges();
    await nextFrame();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Destroy tears down the teleported surface
    fixture.destroy();
    // Scrub any surface that survived destruction (e.g. a test left the popover open)
    document.querySelectorAll('.ea-popover__surface').forEach(node => node.remove());
  });

  describe('Rendering', () => {
    it('does not render the surface when closed', () => {
      expect(getSurface()).toBeNull();
    });

    it('renders the surface when open', () => {
      host.open.set(true);
      fixture.detectChanges();

      expect(getSurface()).toBeTruthy();
    });

    it('projects content into the surface', () => {
      host.open.set(true);
      fixture.detectChanges();

      expect(getSurface()?.querySelector('.popover-body')?.textContent).toBe(
        'Popover body',
      );
    });

    it('applies a placement-specific class', () => {
      // Disable flip; jsdom's 0x0 layout would otherwise flip the placement to `bottom-end`
      host.flip.set(false);
      host.open.set(true);
      host.placement.set('top-end');
      fixture.detectChanges();

      expect(getSurface()?.classList).toContain('ea-popover__surface--top-end');
    });

    it('applies the default ARIA role of `dialog`', () => {
      host.open.set(true);
      fixture.detectChanges();

      expect(getSurface()?.getAttribute('role')).toBe('dialog');
    });
  });

  describe('Dismissal', () => {
    it('emits closeRequested on Escape when closeOnEscape is true', () => {
      host.open.set(true);
      fixture.detectChanges();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(host.closeCount()).toBe(1);
    });

    it('does not emit closeRequested on Escape when closeOnEscape is false', () => {
      host.closeOnEscape.set(false);
      host.open.set(true);
      fixture.detectChanges();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(host.closeCount()).toBe(0);
    });

    it('consumes the Escape it handles, so a host modal keeps its own open', () => {
      host.open.set(true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        cancelable: true,
      });
      document.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
    });

    it('leaves an Escape it ignores for the modal to act on', () => {
      host.closeOnEscape.set(false);
      host.open.set(true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        cancelable: true,
      });
      document.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(false);
    });

    it('leaves an Escape untouched while closed', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        cancelable: true,
      });
      document.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(false);
    });

    it('emits closeRequested on click outside the anchor and surface', () => {
      host.open.set(true);
      fixture.detectChanges();
      const outside = document.createElement('div');
      document.body.appendChild(outside);

      outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(host.closeCount()).toBe(1);
      outside.remove();
    });

    it('does not emit closeRequested on click inside the surface', () => {
      host.open.set(true);
      fixture.detectChanges();
      const surface = getSurface()!;

      surface.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(host.closeCount()).toBe(0);
    });

    it('does not emit closeRequested on click on the anchor', () => {
      host.open.set(true);
      fixture.detectChanges();
      const anchor = getAnchor();

      anchor.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(host.closeCount()).toBe(0);
    });

    it('ignores dismissal events while closed', () => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(host.closeCount()).toBe(0);
    });
  });

  describe('Anchoring', () => {
    it('writes the resolved viewport coordinates onto the surface', async () => {
      await openAnchoredAt(new DOMRect(200, 100, 80, 32));

      expect(getSurface()?.style.top).toBe('134px');
      expect(getSurface()?.style.left).toBe('200px');
    });

    it('sets a min-width hint from the anchor when matchAnchorWidth is on', async () => {
      host.matchAnchorWidth.set(true);

      await openAnchoredAt(new DOMRect(200, 100, 240, 32));

      expect(getSurface()?.style.minWidth).toBe('240px');
    });

    it('leaves min-width alone when matchAnchorWidth is off', async () => {
      await openAnchoredAt(new DOMRect(200, 100, 240, 32));

      expect(getSurface()?.style.minWidth).toBe('');
    });

    it('holds the surface unpositioned for the tick it opens on', () => {
      getAnchor().getBoundingClientRect = () => new DOMRect(200, 100, 80, 32);

      host.open.set(true);
      fixture.detectChanges();

      expect(getSurface()?.classList).not.toContain('ea-popover__surface--positioned');
    });

    it('reveals the surface once the post-frame re-measure has landed', async () => {
      await openAnchoredAt(new DOMRect(200, 100, 80, 32));

      expect(getSurface()?.classList).toContain('ea-popover__surface--positioned');
    });

    it('accepts an ElementRef anchor', async () => {
      const refFixture = TestBed.createComponent(ElementRefAnchorHostComponent);
      refFixture.detectChanges();
      const trigger: HTMLButtonElement =
        refFixture.nativeElement.querySelector('.ref-anchor-btn');
      trigger.getBoundingClientRect = () => new DOMRect(300, 400, 60, 20);

      refFixture.detectChanges();
      await nextFrame();
      refFixture.detectChanges();

      expect(getSurface()?.style.top).toBe('422px');
      refFixture.destroy();
    });

    it('stays unpositioned while no anchor is available', () => {
      const orphanFixture = TestBed.createComponent(UnanchoredHostComponent);

      expect(() => orphanFixture.detectChanges()).not.toThrow();

      expect(getSurface()?.classList).not.toContain('ea-popover__surface--positioned');
      orphanFixture.destroy();
    });

    it('mirrors the anchor font-family tokens onto the portaled surface', async () => {
      const anchor = getAnchor();
      const realGetComputedStyle = window.getComputedStyle.bind(window);
      const anchorStyle = document.createElement('div').style;
      anchorStyle.setProperty('--font-family-sans', 'Consumer Sans');
      vi.spyOn(window, 'getComputedStyle').mockImplementation((element, pseudoElement) =>
        element === anchor ? anchorStyle : realGetComputedStyle(element, pseudoElement),
      );

      await openAnchoredAt(new DOMRect(200, 100, 80, 32));

      expect(getSurface()?.style.getPropertyValue('--font-family-sans')).toBe(
        'Consumer Sans',
      );
    });

    it('mirrors the anchor direction onto the portaled surface', async () => {
      const anchor = getAnchor();
      const rtlStyle = document.createElement('div').style;
      rtlStyle.direction = 'rtl';
      vi.spyOn(window, 'getComputedStyle').mockImplementation((element, pseudoElement) =>
        element === anchor ? rtlStyle : REAL_GET_COMPUTED_STYLE(element, pseudoElement),
      );

      await openAnchoredAt(new DOMRect(200, 100, 80, 32));

      expect(getSurface()?.dir).toBe('rtl');
      expect(getSurface()?.style.left).toBe('280px');
    });
  });

  describe('Scroll and resize', () => {
    it('survives a scroll dispatched straight at window', async () => {
      await openAnchoredAt(new DOMRect(10, 10, 40, 20));

      // A window-targeted scroll has a non-Node target, which `contains` rejects
      expect(() => window.dispatchEvent(new Event('scroll'))).not.toThrow();
    });

    it('closes on an outside scroll when scrollBehavior is close', async () => {
      host.scrollBehavior.set('close');
      await openAnchoredAt(new DOMRect(200, 100, 80, 32));

      document.body.dispatchEvent(new Event('scroll'));
      fixture.detectChanges();

      expect(host.closeCount()).toBe(1);
    });

    it('re-tracks the anchor on scroll when scrollBehavior is reposition', async () => {
      await openAnchoredAt(new DOMRect(200, 100, 80, 32));
      getAnchor().getBoundingClientRect = () => new DOMRect(200, 300, 80, 32);

      document.body.dispatchEvent(new Event('scroll'));
      fixture.detectChanges();

      expect(getSurface()?.style.top).toBe('334px');
      expect(host.closeCount()).toBe(0);
    });

    it('does nothing on scroll when scrollBehavior is ignore', async () => {
      host.scrollBehavior.set('ignore');
      await openAnchoredAt(new DOMRect(200, 100, 80, 32));
      getAnchor().getBoundingClientRect = () => new DOMRect(200, 300, 80, 32);

      document.body.dispatchEvent(new Event('scroll'));
      fixture.detectChanges();

      expect(getSurface()?.style.top).toBe('134px');
      expect(host.closeCount()).toBe(0);
    });

    it('ignores scrolling that originates inside the surface', async () => {
      host.scrollBehavior.set('close');
      await openAnchoredAt(new DOMRect(200, 100, 80, 32));

      getSurface()?.dispatchEvent(new Event('scroll'));
      fixture.detectChanges();

      expect(host.closeCount()).toBe(0);
    });

    it('still responds to a window resize when scrollBehavior is close', async () => {
      host.scrollBehavior.set('close');
      await openAnchoredAt(new DOMRect(200, 100, 80, 32));

      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();

      expect(host.closeCount()).toBe(1);
    });

    it('stops tracking the viewport once destroyed', async () => {
      const measure = vi.fn(() => new DOMRect(200, 100, 80, 32));
      const anchor = getAnchor();
      anchor.getBoundingClientRect = measure;
      host.open.set(true);
      fixture.detectChanges();
      await nextFrame();
      fixture.destroy();
      measure.mockClear();

      document.body.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('resize'));

      expect(measure).not.toHaveBeenCalled();
    });
  });

  describe('Focus trap', () => {
    let trapFixture: ComponentFixture<TrapFocusHostComponent>;
    let trapHost: TrapFocusHostComponent;
    let surface: HTMLElement;
    let first: HTMLElement;
    let last: HTMLElement;

    // jsdom lays nothing out, so the trap's visibility filter needs explicit
    // client rects to tell a rendered control from a hidden one
    function stubRendered(element: Element, rendered: boolean): void {
      Object.defineProperty(element, 'getClientRects', {
        configurable: true,
        value: () => (rendered ? [new DOMRect(0, 0, 10, 10)] : []),
      });
    }

    function tab(options: { shiftKey?: boolean } = {}): KeyboardEvent {
      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: options.shiftKey ?? false,
        bubbles: true,
        cancelable: true,
      });
      surface.dispatchEvent(event);
      return event;
    }

    beforeEach(() => {
      trapFixture = TestBed.createComponent(TrapFocusHostComponent);
      trapHost = trapFixture.componentInstance;
      trapFixture.detectChanges();
      surface = getSurface()!;
      surface
        .querySelectorAll('.trap-disabled, .trap-first, .trap-last, .trap-untabbable')
        .forEach(element => stubRendered(element, true));
      stubRendered(surface.querySelector('.trap-unrendered')!, false);
      first = surface.querySelector('.trap-first')!;
      last = surface.querySelector('.trap-last')!;
    });

    afterEach(() => {
      trapFixture.destroy();
    });

    it('wraps Tab from the last control back to the first', () => {
      last.focus();

      tab();

      expect(document.activeElement).toBe(first);
    });

    it('wraps Shift+Tab from the first control back to the last', () => {
      first.focus();

      tab({ shiftKey: true });

      expect(document.activeElement).toBe(last);
    });

    it('pulls focus in when Tab arrives from outside the surface', () => {
      const outside: HTMLButtonElement =
        trapFixture.nativeElement.querySelector('.trap-anchor-btn');
      outside.focus();

      tab();

      expect(document.activeElement).toBe(first);
    });

    it('leaves a Tab between two controls to the browser', () => {
      first.focus();

      const event = tab();

      expect(event.defaultPrevented).toBe(false);
      expect(document.activeElement).toBe(first);
    });

    it('swallows Tab when nothing inside the surface is focusable', () => {
      surface.querySelectorAll('*').forEach(element => stubRendered(element, false));

      const event = tab();

      expect(event.defaultPrevented).toBe(true);
    });

    it('leaves Tab untouched when trapFocus is off', () => {
      trapHost.trapFocus.set(false);
      trapFixture.detectChanges();
      last.focus();

      const event = tab();

      expect(event.defaultPrevented).toBe(false);
      expect(document.activeElement).toBe(last);
    });
  });

  describe('Top layer', () => {
    let stubs: TopLayerStubs;

    beforeEach(() => {
      stubs = installTopLayerStubs();
    });

    afterEach(() => {
      stubs.restore();
    });

    it('promotes the surface when the anchor sits inside a modal', () => {
      stubs.openAsModal(fixture.nativeElement);

      host.open.set(true);
      fixture.detectChanges();

      expect(getSurface()?.getAttribute('popover')).toBe('manual');
      expect(stubs.shown()).toEqual([getSurface()]);
    });

    it('demotes the surface again on close', () => {
      stubs.openAsModal(fixture.nativeElement);
      host.open.set(true);
      fixture.detectChanges();
      const surface = getSurface()!;

      host.open.set(false);
      fixture.detectChanges();

      expect(surface.hasAttribute('popover')).toBe(false);
      expect(stubs.shown()).toEqual([]);
    });

    it('leaves the surface in the normal layer outside a modal', () => {
      host.open.set(true);
      fixture.detectChanges();

      expect(getSurface()?.hasAttribute('popover')).toBe(false);
      expect(stubs.shown()).toEqual([]);
    });
  });
});

describe('computePopoverPosition', () => {
  const viewport = { width: 1024, height: 768 };
  const popoverRect = { width: 200, height: 100 };

  function anchor(top: number, left: number, width = 80, height = 32): DOMRect {
    return {
      top,
      left,
      width,
      height,
      bottom: top + height,
      right: left + width,
      x: left,
      y: top,
      toJSON: () => ({}),
    } as DOMRect;
  }

  it('places below-and-aligned-start by default', () => {
    const result: PopoverPositionResult = computePopoverPosition(
      anchor(100, 200),
      popoverRect,
      viewport,
      { placement: 'bottom-start', offset: 4 },
    );

    expect(result.top).toBe(136);
    expect(result.left).toBe(200);
    expect(result.placement).toBe('bottom-start');
  });

  it('places below-and-aligned-end', () => {
    const result = computePopoverPosition(
      anchor(100, 200, 80, 32),
      popoverRect,
      viewport,
      { placement: 'bottom-end', offset: 4 },
    );

    expect(result.left).toBe(80);
  });

  it('aligns -start to the anchor end edge under RTL', () => {
    const result = computePopoverPosition(
      anchor(100, 200, 80, 32),
      popoverRect,
      viewport,
      { placement: 'bottom-start', offset: 4, rtl: true },
    );

    expect(result.left).toBe(80);
  });

  it('aligns -end to the anchor start edge under RTL', () => {
    const result = computePopoverPosition(
      anchor(100, 200, 80, 32),
      popoverRect,
      viewport,
      { placement: 'bottom-end', offset: 4, rtl: true },
    );

    expect(result.left).toBe(200);
  });

  it('centres on bottom for cardinal placement', () => {
    const result = computePopoverPosition(
      anchor(100, 200, 80, 32),
      popoverRect,
      viewport,
      { placement: 'bottom', offset: 4 },
    );

    expect(result.left).toBe(140);
  });

  it('flips to top when bottom would overflow the viewport', () => {
    const result = computePopoverPosition(
      anchor(700, 200, 80, 32),
      popoverRect,
      viewport,
      { placement: 'bottom-start', offset: 4 },
    );

    expect(result.placement).toBe('top-start');
    expect(result.top).toBe(596);
  });

  it('does not flip when flip is disabled, even on overflow', () => {
    const result = computePopoverPosition(
      anchor(700, 200, 80, 32),
      popoverRect,
      viewport,
      { placement: 'bottom-start', offset: 4, flip: false },
    );

    expect(result.placement).toBe('bottom-start');
  });

  it('clamps the popover inside the viewport when both sides overflow', () => {
    const result = computePopoverPosition(
      anchor(100, 900, 80, 32),
      popoverRect,
      viewport,
      { placement: 'bottom-start', offset: 4, margin: 8 },
    );

    expect(result.left).toBe(viewport.width - popoverRect.width - 8);
  });

  it('returns a width hint when matchAnchorWidth is true', () => {
    const result = computePopoverPosition(
      anchor(100, 200, 240, 32),
      popoverRect,
      viewport,
      { placement: 'bottom-start', matchAnchorWidth: true },
    );

    expect(result.width).toBe(240);
  });

  it('places to the right side for right placement', () => {
    const result = computePopoverPosition(
      anchor(100, 200, 80, 32),
      popoverRect,
      viewport,
      { placement: 'right', offset: 4 },
    );

    expect(result.left).toBe(284);
    expect(result.placement).toBe('right');
  });

  it('flips right to left when right overflows', () => {
    const result = computePopoverPosition(
      anchor(100, 900, 80, 32),
      popoverRect,
      viewport,
      { placement: 'right', offset: 4 },
    );

    expect(result.placement).toBe('left');
  });

  it('centres above the anchor for the top placement', () => {
    const result = computePopoverPosition(
      anchor(300, 200, 80, 32),
      popoverRect,
      viewport,
      { placement: 'top', offset: 4 },
    );

    expect(result.top).toBe(196);
    expect(result.left).toBe(140);
    expect(result.placement).toBe('top');
  });

  it('centres beside the anchor for the left placement', () => {
    const result = computePopoverPosition(
      anchor(300, 500, 80, 32),
      popoverRect,
      viewport,
      { placement: 'left', offset: 4 },
    );

    expect(result.left).toBe(296);
    expect(result.top).toBe(266);
  });

  it('flips top to bottom when the top would clear the viewport', () => {
    const result = computePopoverPosition(
      anchor(20, 200, 80, 32),
      popoverRect,
      viewport,
      {
        placement: 'top',
        offset: 4,
      },
    );

    expect(result.placement).toBe('bottom');
    expect(result.top).toBe(56);
    expect(result.left).toBe(140);
  });

  it('keeps the start alignment when flipping top-start to bottom-start', () => {
    const result = computePopoverPosition(
      anchor(20, 200, 80, 32),
      popoverRect,
      viewport,
      {
        placement: 'top-start',
        offset: 4,
      },
    );

    expect(result.placement).toBe('bottom-start');
    expect(result.left).toBe(200);
  });

  it('keeps the end alignment when flipping top-end to bottom-end', () => {
    const result = computePopoverPosition(
      anchor(20, 200, 80, 32),
      popoverRect,
      viewport,
      {
        placement: 'top-end',
        offset: 4,
      },
    );

    expect(result.placement).toBe('bottom-end');
    expect(result.left).toBe(80);
  });

  it('flips bottom-end up to top-end near the bottom edge', () => {
    const result = computePopoverPosition(
      anchor(700, 200, 80, 32),
      popoverRect,
      viewport,
      { placement: 'bottom-end', offset: 4 },
    );

    expect(result.placement).toBe('top-end');
    expect(result.top).toBe(596);
    expect(result.left).toBe(80);
  });

  it('flips left to right when the left side overflows', () => {
    const result = computePopoverPosition(
      anchor(100, 50, 80, 32),
      popoverRect,
      viewport,
      {
        placement: 'left',
        offset: 4,
      },
    );

    expect(result.placement).toBe('right');
    expect(result.left).toBe(134);
  });

  it('keeps the requested side when the opposite side is no better', () => {
    const shortViewport = { width: 1024, height: 200 };

    const result = computePopoverPosition(
      anchor(60, 200, 80, 32),
      popoverRect,
      shortViewport,
      { placement: 'bottom', offset: 4 },
    );

    expect(result.placement).toBe('bottom');
    expect(result.top).toBe(96);
  });

  it('leaves the block axis unclamped so a tall popover never covers its anchor', () => {
    const shortViewport = { width: 1024, height: 200 };

    const result = computePopoverPosition(
      anchor(60, 200, 80, 32),
      popoverRect,
      shortViewport,
      { placement: 'bottom', offset: 4, flip: false },
    );

    expect(result.top).toBe(96);
  });

  it('clamps a side-placed popover down to the bottom margin', () => {
    const result = computePopoverPosition(
      anchor(740, 200, 80, 32),
      popoverRect,
      viewport,
      { placement: 'right', offset: 4, margin: 8 },
    );

    expect(result.top).toBe(660);
  });

  it('clamps a side-placed popover up to the top margin', () => {
    const result = computePopoverPosition(anchor(0, 200, 80, 32), popoverRect, viewport, {
      placement: 'right',
      offset: 4,
      margin: 8,
    });

    expect(result.top).toBe(8);
  });

  it('pins to the start margin when the popover is wider than the viewport', () => {
    const narrowViewport = { width: 150, height: 768 };

    const result = computePopoverPosition(
      anchor(100, 20, 80, 32),
      popoverRect,
      narrowViewport,
      { placement: 'bottom-start', offset: 4, margin: 8 },
    );

    expect(result.left).toBe(8);
  });

  it('lets the popover overflow when clamping is disabled', () => {
    const result = computePopoverPosition(
      anchor(100, 900, 80, 32),
      popoverRect,
      viewport,
      { placement: 'bottom-start', offset: 4, clamp: false },
    );

    expect(result.left).toBe(900);
  });
});

import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import {
  type PopoverPlacement,
  type PopoverPositionResult,
  computePopoverPosition,
} from './popover-positioning';
import { PopoverComponent } from './popover.component';

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
  readonly closeOnOutsideClick = signal<boolean>(true);
  readonly closeOnEscape = signal<boolean>(true);
  readonly closeCount = signal<number>(0);
  readonly popover = viewChild.required(PopoverComponent);

  onClose(): void {
    this.closeCount.update(c => c + 1);
    this.open.set(false);
  }
}

describe('PopoverComponent', () => {
  let fixture: ComponentFixture<PopoverHostComponent>;
  let host: PopoverHostComponent;

  function getSurface(): HTMLElement | null {
    // Surface renders unconditionally (keeps `<ng-content/>` available), toggles via
    // `display: none`, and teleports to `document.body`; query the global DOM and treat
    // a hidden surface as "not open".
    const surface = document.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface || surface.style.display === 'none') {
      return null;
    }
    return surface;
  }

  function getAnchor(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.anchor-btn');
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
});

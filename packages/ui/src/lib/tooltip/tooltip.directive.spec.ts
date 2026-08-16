import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import {
  REAL_GET_COMPUTED_STYLE,
  type TopLayerStubs,
  installTopLayerStubs,
} from '../../test-setup';
import { TooltipDirective, type TooltipPosition } from './tooltip.directive';

@Component({
  selector: 'ea-test-host',
  imports: [TooltipDirective],
  template: `
    <button
      [eaTooltip]="text()"
      [tooltipPosition]="pos()"
      [maxWidth]="maxWidth()"
      [dismissDelay]="dismissDelay()"
      [flip]="flip()"
      [whenClipped]="whenClipped()"
      [attr.aria-describedby]="existingDescribedBy()">
      Trigger
    </button>
  `,
})
class TestHostComponent {
  text = signal('Save your changes');
  pos = signal<TooltipPosition>('top');
  maxWidth = signal<number | undefined>(200);
  dismissDelay = signal(150);
  flip = signal(true);
  whenClipped = signal(false);
  existingDescribedBy = signal<string | null>(null);
}

@Component({
  selector: 'ea-template-test-host',
  imports: [TooltipDirective],
  template: `
    <ng-template #tip>
      <span class="tip-label">Bell Ring</span>
      <code class="tip-code">ea-icon-bell-ring</code>
    </ng-template>
    <button [eaTooltip]="tip">Trigger</button>
  `,
})
class TemplateTestHostComponent {}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  function getButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button');
  }

  function getTooltip(): HTMLElement | null {
    return document.body.querySelector('.ea-tooltip');
  }

  function show(): void {
    getButton().dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
  }

  function hide(): void {
    getButton().dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    // jsdom exposes `elementFromPoint` but it can't hit-test without layout (always
    // returns null), which would make the directive's occlusion check hide the tooltip
    // the moment it shows. Report the trigger so the check sees it as visible, not
    // occluded; the occlusion test overrides this to simulate a covering element.
    (
      document as Document & {
        elementFromPoint: (x: number, y: number) => Element | null;
      }
    ).elementFromPoint = () => getButton();
  });

  afterEach(() => {
    document.body.querySelectorAll('.ea-tooltip').forEach(el => el.remove());
  });

  describe('Show / hide', () => {
    it('does not render a tooltip by default', () => {
      expect(getTooltip()).toBeNull();
    });

    it('renders a tooltip on mouseenter', () => {
      show();

      const tip = getTooltip();

      expect(tip).toBeTruthy();
      expect(tip!.textContent).toBe('Save your changes');
      expect(tip!.getAttribute('role')).toBe('tooltip');
    });

    it('removes the tooltip on mouseleave', () => {
      show();
      hide();

      expect(getTooltip()).toBeNull();
    });

    it('renders on focus', () => {
      // The directive only shows on focus when the trigger is :focus-visible (keyboard
      // focus). jsdom can't produce that state for a dispatched event, so simulate it.
      vi.spyOn(getButton(), 'matches').mockReturnValue(true);

      getButton().dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      fixture.detectChanges();

      expect(getTooltip()).toBeTruthy();
    });

    it('removes on blur', () => {
      getButton().dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      fixture.detectChanges();

      getButton().dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
      fixture.detectChanges();

      expect(getTooltip()).toBeNull();
    });

    it('removes on Escape key pressed anywhere in the document', () => {
      show();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(getTooltip()).toBeNull();
    });

    it('ignores Escape once the tooltip is hidden', () => {
      show();
      hide();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(getTooltip()).toBeNull();
    });

    it('does not show with empty text', () => {
      host.text.set('');
      fixture.detectChanges();

      show();

      expect(getTooltip()).toBeNull();
    });
  });

  describe('Position class', () => {
    it('applies the default top position class', () => {
      show();

      expect(getTooltip()!.classList).toContain('ea-tooltip--top');
    });

    it('applies the bottom position class when set', () => {
      host.pos.set('bottom');
      fixture.detectChanges();

      show();

      expect(getTooltip()!.classList).toContain('ea-tooltip--bottom');
    });

    it('applies left and right position classes', () => {
      host.pos.set('left');
      fixture.detectChanges();

      show();

      expect(getTooltip()!.classList).toContain('ea-tooltip--left');

      hide();
      host.pos.set('right');
      fixture.detectChanges();

      show();

      expect(getTooltip()!.classList).toContain('ea-tooltip--right');
    });
  });

  describe('aria-describedby', () => {
    it('sets aria-describedby to the tooltip id while showing', () => {
      show();

      const tipId = getTooltip()!.id;

      expect(getButton().getAttribute('aria-describedby')).toBe(tipId);
    });

    it('removes aria-describedby on hide when no other tokens exist', () => {
      show();
      hide();

      expect(getButton().getAttribute('aria-describedby')).toBeNull();
    });

    it('appends the tooltip id without clobbering pre-existing tokens', () => {
      host.existingDescribedBy.set('error-1 hint-2');
      fixture.detectChanges();

      show();

      const tokens = getButton().getAttribute('aria-describedby')!.split(/\s+/);

      expect(tokens).toContain('error-1');
      expect(tokens).toContain('hint-2');
      expect(tokens).toContain(getTooltip()!.id);
    });

    it('removes only the tooltip id on hide, preserving other tokens', () => {
      host.existingDescribedBy.set('error-1');
      fixture.detectChanges();

      show();
      hide();

      expect(getButton().getAttribute('aria-describedby')).toBe('error-1');
    });
  });

  describe('Viewport containment', () => {
    it('hands the max width to the stylesheet as a custom property', () => {
      show();

      const tip = getTooltip()!;

      expect(tip.style.getPropertyValue('--ea-tooltip-max-width')).toBe('200px');
      expect(tip.style.maxWidth).toBe('');
      expect(tip.classList).toContain('ea-tooltip--wrapping');
    });

    it('floors the max width at 50px', () => {
      host.maxWidth.set(10);
      fixture.detectChanges();

      show();

      expect(getTooltip()!.style.getPropertyValue('--ea-tooltip-max-width')).toBe('50px');
    });

    it('leaves the bubble on one line when no max width is set', () => {
      host.maxWidth.set(undefined);
      fixture.detectChanges();

      show();

      const tip = getTooltip()!;

      expect(tip.style.getPropertyValue('--ea-tooltip-max-width')).toBe('');
      expect(tip.classList).not.toContain('ea-tooltip--wrapping');
    });
  });

  describe('Flipping', () => {
    // jsdom lays nothing out, so both the viewport the sides are measured
    // against and the trigger's own rect have to be stated.
    function triggerAt(top: number): void {
      getButton().getBoundingClientRect = () => new DOMRect(100, top, 40, 20);
    }

    beforeEach(() => {
      Object.defineProperty(document.documentElement, 'clientHeight', {
        value: 768,
        configurable: true,
      });
      Object.defineProperty(document.documentElement, 'clientWidth', {
        value: 1024,
        configurable: true,
      });
    });

    afterEach(() => {
      Reflect.deleteProperty(document.documentElement, 'clientHeight');
      Reflect.deleteProperty(document.documentElement, 'clientWidth');
    });

    it('moves a bubble with no room above it below the trigger', () => {
      triggerAt(2);

      show();

      expect(getTooltip()!.classList).toContain('ea-tooltip--bottom');
      expect(getTooltip()!.classList).not.toContain('ea-tooltip--top');
    });

    it('keeps the requested side when it fits', () => {
      triggerAt(400);

      show();

      expect(getTooltip()!.classList).toContain('ea-tooltip--top');
    });

    it('holds the side it opened on while it still fits', () => {
      triggerAt(2);
      show();

      triggerAt(400);
      window.dispatchEvent(new Event('resize'));

      expect(getTooltip()!.classList).toContain('ea-tooltip--bottom');
    });

    it('stays on the requested side when flip is off', () => {
      host.flip.set(false);
      fixture.detectChanges();
      triggerAt(2);

      show();

      expect(getTooltip()!.classList).toContain('ea-tooltip--top');
    });
  });

  describe('Clipped triggers', () => {
    // jsdom lays nothing out and resolves every `overflow` to `visible`, so a
    // box has to declare both the sizes that overflow and what it does with them.
    const overflows = new Map<Element, string>();

    function box(
      el: HTMLElement,
      { overflow = 'hidden', scrollWidth = 300, clientWidth = 100 } = {},
    ): void {
      Object.defineProperty(el, 'scrollWidth', {
        value: scrollWidth,
        configurable: true,
      });
      Object.defineProperty(el, 'clientWidth', {
        value: clientWidth,
        configurable: true,
      });
      overflows.set(el, overflow);
    }

    beforeEach(() => {
      overflows.clear();
      vi.spyOn(window, 'getComputedStyle').mockImplementation(
        (element, pseudoElement) => {
          const overflow = overflows.get(element);
          if (overflow === undefined) {
            return REAL_GET_COMPUTED_STYLE(element, pseudoElement);
          }
          const style = document.createElement('div').style;
          // jsdom leaves the `overflow` shorthand unexpanded, and the check
          // reads the longhands
          style.overflowX = overflow;
          style.overflowY = overflow;
          return style as CSSStyleDeclaration;
        },
      );
      host.whenClipped.set(true);
      fixture.detectChanges();
    });

    it('shows nothing while the trigger holds all of its content', () => {
      box(getButton(), { scrollWidth: 100 });

      show();

      expect(getTooltip()).toBeNull();
    });

    it('shows once the trigger cuts its content off', () => {
      box(getButton());

      show();

      expect(getTooltip()).toBeTruthy();
    });

    it('measures descendants, since the box doing the cutting is usually inner', () => {
      const inner = document.createElement('span');
      getButton().appendChild(inner);
      box(getButton(), { scrollWidth: 100 });
      box(inner);

      show();

      expect(getTooltip()).toBeTruthy();
    });

    it('leaves content the user can still scroll to alone', () => {
      box(getButton(), { overflow: 'auto' });

      show();

      expect(getTooltip()).toBeNull();
    });
  });

  describe('Content-hugging width', () => {
    // jsdom lays every box out at 0×0, so the three measurements the pin is
    // derived from are faked: the longest rendered line, and the bubble's own
    // content-box and border-box widths.
    function stubMeasurements(text: number, content: number, borderBox: number): void {
      vi.spyOn(document, 'createRange').mockReturnValue({
        selectNodeContents: () => {},
        getBoundingClientRect: () => new DOMRect(0, 0, text, 16),
      } as unknown as Range);
      const bubbleStyle = document.createElement('div').style;
      bubbleStyle.boxSizing = 'border-box';
      bubbleStyle.width = `${content}px`;
      vi.spyOn(window, 'getComputedStyle').mockImplementation((element, pseudoElement) =>
        element.classList?.contains('ea-tooltip')
          ? (bubbleStyle as CSSStyleDeclaration)
          : REAL_GET_COMPUTED_STYLE(element, pseudoElement),
      );
      vi.spyOn(HTMLDivElement.prototype, 'getBoundingClientRect').mockReturnValue(
        new DOMRect(0, 0, borderBox, 16),
      );
    }

    it('pins the bubble to its longest line plus the box chrome', () => {
      stubMeasurements(120.4, 176.3, 200);

      show();

      // The 23.7px of padding and borders stays outside the width given to the text
      expect(getTooltip()!.style.width).toBe('145px');
    });

    it('re-derives the width when a zoom re-lays out the page', () => {
      stubMeasurements(120.4, 176.3, 200);
      show();

      stubMeasurements(150, 176.3, 200);
      window.dispatchEvent(new Event('resize'));

      expect(getTooltip()!.style.width).toBe('174px');
    });
  });

  describe('Scrollable bubbles', () => {
    function overflowTooltip(tip: HTMLElement): void {
      Object.defineProperty(tip, 'scrollHeight', { value: 400, configurable: true });
      Object.defineProperty(tip, 'clientHeight', { value: 120, configurable: true });
    }

    // A reposition is what re-measures the bubble against the clamp, so the
    // overflow only registers once one runs.
    function showOverflowing(): HTMLElement {
      show();
      const tip = getTooltip()!;
      overflowTooltip(tip);
      window.dispatchEvent(new Event('resize'));
      vi.runOnlyPendingTimers();
      fixture.detectChanges();
      return tip;
    }

    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('marks a bubble scrollable once the clamp cuts its content off', () => {
      const tip = showOverflowing();

      expect(tip.classList).toContain('ea-tooltip--scrollable');
    });

    it('leaves a bubble that fits display-only', () => {
      show();

      expect(getTooltip()!.classList).not.toContain('ea-tooltip--scrollable');
    });

    it('waits out the dismiss delay before hiding a scrollable bubble', () => {
      showOverflowing();

      hide();

      expect(getTooltip()).toBeTruthy();

      vi.advanceTimersByTime(150);

      expect(getTooltip()).toBeNull();
    });

    it('keeps the bubble open when the pointer reaches it in time', () => {
      const tip = showOverflowing();

      hide();
      tip.dispatchEvent(new MouseEvent('mouseenter'));
      vi.advanceTimersByTime(1000);

      expect(getTooltip()).toBeTruthy();
    });

    it('hides once the pointer leaves the bubble itself', () => {
      const tip = showOverflowing();

      hide();
      tip.dispatchEvent(new MouseEvent('mouseenter'));
      tip.dispatchEvent(new MouseEvent('mouseleave'));
      vi.advanceTimersByTime(150);

      expect(getTooltip()).toBeNull();
    });

    it('cancels a pending hide when the pointer returns to the trigger', () => {
      showOverflowing();

      hide();
      show();
      vi.advanceTimersByTime(1000);

      expect(getTooltip()).toBeTruthy();
    });
  });

  describe('Cleanup', () => {
    it('removes the tooltip when the host is destroyed', () => {
      show();

      fixture.destroy();

      expect(getTooltip()).toBeNull();
    });
  });

  describe('Occlusion', () => {
    it('hides the tooltip when the trigger is covered by another element', () => {
      vi.useFakeTimers();

      // jsdom has no `elementFromPoint`; stub it to return document.body so the hit-test
      // sees the trigger as occluded.
      const originalElementFromPoint = (
        document as Document & {
          elementFromPoint?: (x: number, y: number) => Element | null;
        }
      ).elementFromPoint;

      show();
      expect(getTooltip()).toBeTruthy();

      (
        document as Document & {
          elementFromPoint: (x: number, y: number) => Element | null;
        }
      ).elementFromPoint = () => document.body;

      // Resize triggers a reposition; flush the rAF callback that schedules positionTooltip then hide
      window.dispatchEvent(new Event('resize'));
      vi.runOnlyPendingTimers();
      fixture.detectChanges();

      expect(getTooltip()).toBeNull();

      (
        document as Document & {
          elementFromPoint?: (x: number, y: number) => Element | null;
        }
      ).elementFromPoint = originalElementFromPoint;
      vi.useRealTimers();
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

    it('raises the bubble when the trigger sits inside a modal', () => {
      stubs.openAsModal(fixture.nativeElement);

      show();

      expect(getTooltip()?.getAttribute('popover')).toBe('manual');
      expect(stubs.shown()).toEqual([getTooltip()]);
    });

    it('keeps the bubble in the normal layer outside a modal', () => {
      show();

      expect(getTooltip()?.hasAttribute('popover')).toBe(false);
      expect(stubs.shown()).toEqual([]);
    });

    it('stops the sticky-overlay check at the modal the trigger lives in', () => {
      stubs.openAsModal(fixture.nativeElement);
      // The bubble's centre resolves to sibling content inside the modal. The
      // modal itself is `position: fixed`, which the ancestor walk would read
      // as a covering overlay if it did not stop at the shared container.
      const sibling = document.createElement('div');
      fixture.nativeElement.appendChild(sibling);
      // A real declaration, so the directive's own custom-property reads still work
      function styleWith(position: string): CSSStyleDeclaration {
        const { style } = document.createElement('div');
        style.position = position;
        return style;
      }
      vi.spyOn(window, 'getComputedStyle').mockImplementation(element =>
        styleWith(element === fixture.nativeElement ? 'fixed' : 'static'),
      );
      let hit = 0;
      (
        document as Document & {
          elementFromPoint: (x: number, y: number) => Element | null;
        }
      ).elementFromPoint = () => (hit++ === 0 ? getButton() : sibling);

      show();

      expect(getTooltip()).toBeTruthy();
    });
  });

  describe('Template content', () => {
    let templateFixture: ComponentFixture<TemplateTestHostComponent>;

    function templateButton(): HTMLButtonElement {
      return templateFixture.nativeElement.querySelector('button');
    }

    beforeEach(() => {
      templateFixture = TestBed.createComponent(TemplateTestHostComponent);
      templateFixture.detectChanges();
      (
        document as Document & {
          elementFromPoint: (x: number, y: number) => Element | null;
        }
      ).elementFromPoint = () => templateButton();
    });

    it('renders the template nodes inside the tooltip', () => {
      templateButton().dispatchEvent(new MouseEvent('mouseenter'));
      templateFixture.detectChanges();

      const tip = getTooltip();

      expect(tip).toBeTruthy();
      expect(tip!.querySelector('.tip-label')!.textContent).toBe('Bell Ring');
      expect(tip!.querySelector('.tip-code')!.textContent).toBe('ea-icon-bell-ring');
    });

    it('removes the embedded view when the tooltip hides', () => {
      templateButton().dispatchEvent(new MouseEvent('mouseenter'));
      templateFixture.detectChanges();

      templateButton().dispatchEvent(new MouseEvent('mouseleave'));
      templateFixture.detectChanges();

      expect(getTooltip()).toBeNull();
    });
  });
});

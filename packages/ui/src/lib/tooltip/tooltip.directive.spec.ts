import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipDirective, type TooltipPosition } from './tooltip.directive';

@Component({
  selector: 'ea-test-host',
  imports: [TooltipDirective],
  template: `
    <button
      [eaTooltip]="text()"
      [tooltipPosition]="pos()"
      [attr.aria-describedby]="existingDescribedBy()">
      Trigger
    </button>
  `,
})
class TestHostComponent {
  text = signal('Save your changes');
  pos = signal<TooltipPosition>('top');
  existingDescribedBy = signal<string | null>(null);
}

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
      getButton().dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(getTooltip()).toBeTruthy();
    });

    it('removes on blur', () => {
      getButton().dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      getButton().dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(getTooltip()).toBeNull();
    });

    it('removes on Escape key', () => {
      show();
      getButton().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
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

  describe('Cleanup', () => {
    it('removes the tooltip when the host is destroyed', () => {
      show();

      fixture.destroy();

      expect(getTooltip()).toBeNull();
    });
  });

  describe('Occlusion', () => {
    it('hides the tooltip when the trigger is covered by another element', () => {
      jest.useFakeTimers();

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
      jest.runOnlyPendingTimers();
      fixture.detectChanges();

      expect(getTooltip()).toBeNull();

      (
        document as Document & {
          elementFromPoint?: (x: number, y: number) => Element | null;
        }
      ).elementFromPoint = originalElementFromPoint;
      jest.useRealTimers();
    });
  });
});

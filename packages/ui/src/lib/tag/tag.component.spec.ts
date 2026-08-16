import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TooltipDirective } from '../tooltip/tooltip.directive';
import { TagComponent } from './tag.component';

describe('TagComponent', () => {
  let fixture: ComponentFixture<TagComponent>;
  let component: TagComponent;

  function getTag(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.ea-tag');
  }

  function getRemoveButton(): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector('.ea-tag__remove');
  }

  function tooltipDirective(): TooltipDirective {
    return fixture.debugElement
      .query(By.directive(TooltipDirective))
      .injector.get(TooltipDirective);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders the tag element', () => {
      expect(getTag()).toBeTruthy();
    });

    it('wraps the projected content in a label element it can truncate', () => {
      expect(fixture.nativeElement.querySelector('.ea-tag__label')).toBeTruthy();
    });

    it('caps the tag at maxWidth', () => {
      fixture.componentRef.setInput('maxWidth', 120);
      fixture.detectChanges();

      expect(getTag()!.style.getPropertyValue('--ea-tag-max-width')).toBe('120px');
    });

    it('leaves the tag uncapped by default', () => {
      expect(getTag()!.style.getPropertyValue('--ea-tag-max-width')).toBe('');
    });

    it('takes a fluid cap so the chip gives way to its container', () => {
      fixture.componentRef.setInput('maxWidth', '100%');
      fixture.detectChanges();

      expect(getTag()!.style.getPropertyValue('--ea-tag-max-width')).toBe('100%');
    });

    it('paints a caller-supplied colour and picks ink that reads on it', () => {
      fixture.componentRef.setInput('color', '#0b3d91');
      fixture.detectChanges();

      expect(getTag()!.style.getPropertyValue('--ea-tag-color')).toBe('#0b3d91');
      expect(getTag()!.style.getPropertyValue('--ea-tag-ink')).toBe(
        'var(--color-neutral-0)',
      );
    });

    it('picks dark ink on a light colour', () => {
      fixture.componentRef.setInput('color', '#fde68a');
      fixture.detectChanges();

      expect(getTag()!.style.getPropertyValue('--ea-tag-ink')).toBe(
        'var(--color-neutral-950)',
      );
    });

    it('leaves the chip unpainted for a colour it cannot measure', () => {
      fixture.componentRef.setInput('color', 'rebeccapurple');
      fixture.detectChanges();

      expect(getTag()!.style.getPropertyValue('--ea-tag-ink')).toBe('');
      expect(getTag()!.style.getPropertyValue('--ea-tag-color')).toBe('');
    });

    it('anchors the tooltip on the whole tag, above it by default', () => {
      expect(tooltipDirective().tooltipPosition()).toBe('top');
      expect(
        fixture.debugElement.query(By.directive(TooltipDirective)).nativeElement
          .classList,
      ).toContain('ea-tag');
    });

    it('places the tooltip below the tag when asked', () => {
      fixture.componentRef.setInput('tooltip', 'below');
      fixture.detectChanges();

      expect(tooltipDirective().tooltipPosition()).toBe('bottom');
    });

    it('applies the default variant class', () => {
      expect(getTag()!.classList).toContain('ea-tag--default');
    });

    it('applies the correct variant class when set', () => {
      fixture.componentRef.setInput('variant', 'success');
      fixture.detectChanges();

      expect(getTag()!.classList).toContain('ea-tag--success');
    });

    it('applies the default size class', () => {
      expect(getTag()!.classList).toContain('ea-tag--md');
    });

    it('applies the correct size class when set', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(getTag()!.classList).toContain('ea-tag--lg');
    });
  });

  describe('Variants', () => {
    const variants = ['default', 'success', 'warning', 'error', 'info'] as const;

    variants.forEach(variant => {
      it(`renders with ${variant} variant`, () => {
        fixture.componentRef.setInput('variant', variant);
        fixture.detectChanges();

        expect(getTag()!.classList).toContain(`ea-tag--${variant}`);
      });
    });
  });

  describe('Remove button', () => {
    it('does not show remove button by default', () => {
      expect(getRemoveButton()).toBeNull();
    });

    it('shows remove button when removable is true', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      expect(getRemoveButton()).toBeTruthy();
    });

    it('emits removed when remove button is clicked', () => {
      const spy = vi.fn();
      component.removed.subscribe(spy);
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      getRemoveButton()!.click();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('remove button has disabled attribute when disabled', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(getRemoveButton()!.disabled).toBe(true);
    });

    it('keeps the remove button in the tab order by default', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.detectChanges();

      expect(getRemoveButton()!.hasAttribute('tabindex')).toBe(false);
    });

    it('takes the remove button out of the tab order when removeTabbable is false', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.componentRef.setInput('removeTabbable', false);
      fixture.detectChanges();

      expect(getRemoveButton()!.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Disabled', () => {
    it('applies disabled class when disabled is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(getTag()!.classList).toContain('ea-tag--disabled');
    });

    it('does not apply disabled class when disabled is false', () => {
      expect(getTag()!.classList).not.toContain('ea-tag--disabled');
    });
  });
});

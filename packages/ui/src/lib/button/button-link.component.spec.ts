import { Component, type Type, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterLink, provideRouter } from '@angular/router';

import { CheckIconComponent } from '../icons/check.component';
import { ButtonLinkComponent } from './button-link.component';
import {
  type ButtonAlign,
  type ButtonSize,
  type ButtonVariant,
} from './button.component';

@Component({
  imports: [ButtonLinkComponent],
  template: `
    <a
      eaButtonLink
      href="/pricing"
      [variant]="variant()"
      [size]="size()"
      [align]="align()"
      [disabled]="disabled()"
      [fullWidth]="fullWidth()"
      [uppercase]="uppercase()"
      [icon]="icon()"
      (click)="onClick($event)">
      Pricing
    </a>
  `,
})
class HostComponent {
  readonly variant = signal<ButtonVariant>('primary');
  readonly size = signal<ButtonSize>('md');
  readonly align = signal<ButtonAlign>('center');
  readonly disabled = signal(false);
  readonly fullWidth = signal(false);
  readonly uppercase = signal(false);
  readonly icon = signal<Type<unknown> | undefined>(undefined);
  readonly clicks: { preventedOnArrival: boolean }[] = [];

  onClick(event: MouseEvent): void {
    this.clicks.push({ preventedOnArrival: event.defaultPrevented });
    // jsdom cannot follow an href and reports every attempt as an error
    event.preventDefault();
  }
}

@Component({
  imports: [ButtonLinkComponent],
  template: `
    <a
      eaButtonLink
      href="/pricing"
      tabindex="0"
      [disabled]="disabled()">
      Pricing
    </a>
  `,
})
class AuthoredTabindexHostComponent {
  readonly disabled = signal(false);
}

@Component({
  imports: [ButtonLinkComponent, RouterLink],
  template: `
    <a
      eaButtonLink
      routerLink="/pricing"
      [disabled]="disabled()">
      Pricing
    </a>
  `,
})
class RouterHostComponent {
  readonly disabled = signal(false);
}

describe('ButtonLinkComponent', () => {
  describe('with an href', () => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    function getAnchor(): HTMLAnchorElement {
      return fixture.nativeElement.querySelector('a');
    }

    function getBox(): HTMLElement {
      return fixture.nativeElement.querySelector('a > .ea-button');
    }

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    describe('Rendering', () => {
      it('renders on the anchor itself, keeping its href and nesting no button', () => {
        const anchor = getAnchor();

        expect(anchor.getAttribute('href')).toBe('/pricing');
        expect(anchor.querySelector('button')).toBeNull();
        expect(anchor.textContent?.trim()).toBe('Pricing');
      });

      it('applies the default variant and size classes to the box', () => {
        expect(getBox().classList).toContain('ea-button--primary');
        expect(getBox().classList).toContain('ea-button--md');
      });

      it('applies the variant, size, alignment and uppercase classes when set', () => {
        host.variant.set('link');
        host.size.set('lg');
        host.align.set('start');
        host.uppercase.set(true);

        fixture.detectChanges();

        const classes = getBox().classList;
        expect(classes).toContain('ea-button--link');
        expect(classes).toContain('ea-button--lg');
        expect(classes).toContain('ea-button--align-start');
        expect(classes).toContain('ea-button--uppercase');
      });

      it('stretches the anchor itself when full width', () => {
        host.fullWidth.set(true);

        fixture.detectChanges();

        expect(getAnchor().classList).toContain('ea-button--full-width');
        expect(getBox().classList).toContain('ea-button--full-width');
      });

      it('renders the icon hidden from assistive technology', () => {
        host.icon.set(CheckIconComponent);

        fixture.detectChanges();

        const icon = getAnchor().querySelector('.ea-button__icon');
        expect(icon?.getAttribute('aria-hidden')).toBe('true');
        expect(icon?.querySelector('ea-icon-check')).toBeTruthy();
      });
    });

    describe('Enabled', () => {
      it('sets no aria-disabled or tabindex', () => {
        expect(getAnchor().hasAttribute('aria-disabled')).toBe(false);
        expect(getAnchor().hasAttribute('tabindex')).toBe(false);
      });

      it('lets a click through to the page untouched', () => {
        getAnchor().click();

        expect(host.clicks).toEqual([{ preventedOnArrival: false }]);
      });
    });

    describe('Disabled', () => {
      beforeEach(() => {
        host.disabled.set(true);
        fixture.detectChanges();
      });

      it('sets aria-disabled and leaves the tab order', () => {
        expect(getAnchor().getAttribute('aria-disabled')).toBe('true');
        expect(getAnchor().getAttribute('tabindex')).toBe('-1');
      });

      it('dims the box', () => {
        expect(getBox().classList).toContain('ea-button--disabled');
      });

      it('cancels a click before any handler on the anchor sees it', () => {
        const event = new MouseEvent('click', { bubbles: true, cancelable: true });

        getAnchor().dispatchEvent(event);

        expect(event.defaultPrevented).toBe(true);
        expect(host.clicks).toEqual([]);
      });

      it('cancels a click that lands on the label', () => {
        const event = new MouseEvent('click', { bubbles: true, cancelable: true });

        getAnchor().querySelector('.ea-button__label')?.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(true);
        expect(host.clicks).toEqual([]);
      });

      it('cancels a middle click, so the link cannot open in a new tab', () => {
        const event = new MouseEvent('auxclick', {
          bubbles: true,
          cancelable: true,
          button: 1,
        });

        getAnchor().dispatchEvent(event);

        expect(event.defaultPrevented).toBe(true);
      });

      it('lets clicks through again once re-enabled', () => {
        host.disabled.set(false);
        fixture.detectChanges();

        getAnchor().click();

        expect(host.clicks).toEqual([{ preventedOnArrival: false }]);
        expect(getAnchor().hasAttribute('aria-disabled')).toBe(false);
      });
    });
  });

  describe('with an authored tabindex', () => {
    let fixture: ComponentFixture<AuthoredTabindexHostComponent>;

    function getAnchor(): HTMLAnchorElement {
      return fixture.nativeElement.querySelector('a');
    }

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AuthoredTabindexHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(AuthoredTabindexHostComponent);
      fixture.detectChanges();
    });

    it('keeps the authored tabindex while enabled', () => {
      expect(getAnchor().getAttribute('tabindex')).toBe('0');
    });

    it('restores the authored tabindex when re-enabled', () => {
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();

      fixture.componentInstance.disabled.set(false);
      fixture.detectChanges();

      expect(getAnchor().getAttribute('tabindex')).toBe('0');
    });
  });

  describe('with routerLink', () => {
    let fixture: ComponentFixture<RouterHostComponent>;
    let router: Router;

    function getAnchor(): HTMLAnchorElement {
      return fixture.nativeElement.querySelector('a');
    }

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [RouterHostComponent],
        providers: [provideRouter([])],
      }).compileComponents();

      router = TestBed.inject(Router);
      vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
      fixture = TestBed.createComponent(RouterHostComponent);
      fixture.detectChanges();
    });

    it('takes its href from routerLink', () => {
      expect(getAnchor().getAttribute('href')).toBe('/pricing');
    });

    it('navigates through the router when enabled', () => {
      getAnchor().click();

      expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
    });

    it('does not navigate while disabled', () => {
      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();

      getAnchor().click();

      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });
  });
});

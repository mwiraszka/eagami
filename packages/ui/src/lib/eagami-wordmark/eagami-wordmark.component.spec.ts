import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { EagamiWordmarkComponent } from './eagami-wordmark.component';

describe('EagamiWordmarkComponent', () => {
  let fixture: ComponentFixture<EagamiWordmarkComponent>;
  let component: EagamiWordmarkComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EagamiWordmarkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EagamiWordmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getAnchor(): HTMLAnchorElement {
    return fixture.nativeElement.querySelector('a.ea-eagami-wordmark');
  }

  function getLogo(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.ea-eagami-wordmark__logo');
  }

  function getBrand(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.ea-eagami-wordmark__brand');
  }

  function getOverline(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.ea-eagami-wordmark__overline');
  }

  function getTagline(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.ea-eagami-wordmark__tagline');
  }

  describe('Rendering', () => {
    it('creates the component', () => {
      expect(component).toBeTruthy();
    });

    it('renders an anchor linking to eagami.com', () => {
      const anchor = getAnchor();

      expect(anchor).toBeTruthy();
      expect(anchor.getAttribute('href')).toBe('https://eagami.com');
      expect(anchor.getAttribute('target')).toBe('_blank');
      expect(anchor.getAttribute('rel')).toBe('noopener');
    });

    it('renders the logo icon', () => {
      expect(getLogo()).toBeTruthy();
    });
  });

  describe('Variant', () => {
    it('renders "eagami" by default', () => {
      expect(getBrand()?.textContent?.trim()).toBe('eagami');
      expect(getOverline()).toBeNull();
      expect(getTagline()).toBeNull();
    });

    it('renders overline and brand for the byline variant', () => {
      fixture.componentRef.setInput('variant', 'byline');
      fixture.detectChanges();

      expect(getOverline()?.textContent?.trim()).toBe('designed by');
      expect(getBrand()?.textContent?.trim()).toBe('eagami');
      expect(getTagline()).toBeNull();
    });

    it('renders brand and tagline for the tagline variant', () => {
      fixture.componentRef.setInput('variant', 'tagline');
      fixture.detectChanges();

      expect(getBrand()?.textContent?.trim()).toBe('eagami');
      expect(getTagline()?.textContent?.trim()).toBe('elegant web design');
      expect(getOverline()).toBeNull();
    });

    it('sets aria-label to "eagami" for the default variant', () => {
      expect(getAnchor().getAttribute('aria-label')).toBe('eagami');
    });

    it('sets aria-label to "designed by eagami" for the byline variant', () => {
      fixture.componentRef.setInput('variant', 'byline');
      fixture.detectChanges();

      expect(getAnchor().getAttribute('aria-label')).toBe('designed by eagami');
    });

    it('sets aria-label to the full text for the tagline variant', () => {
      fixture.componentRef.setInput('variant', 'tagline');
      fixture.detectChanges();

      expect(getAnchor().getAttribute('aria-label')).toBe('eagami — elegant web design');
    });
  });

  describe('Size', () => {
    it('sets --_size to 24 by default', () => {
      expect(fixture.nativeElement.style.getPropertyValue('--_size')).toBe('24');
    });

    it('sets --_size to the provided value', () => {
      fixture.componentRef.setInput('size', 48);
      fixture.detectChanges();

      expect(fixture.nativeElement.style.getPropertyValue('--_size')).toBe('48');
    });

    it('clamps --_size to a minimum of 10', () => {
      fixture.componentRef.setInput('size', 5);
      fixture.detectChanges();

      expect(fixture.nativeElement.style.getPropertyValue('--_size')).toBe('10');
    });

    it('falls back to 24 when size is cleared or invalid', () => {
      fixture.componentRef.setInput('size', NaN);
      fixture.detectChanges();

      expect(fixture.nativeElement.style.getPropertyValue('--_size')).toBe('24');
    });
  });

  describe('Layout', () => {
    it('does not apply the inline modifier by default', () => {
      expect(getAnchor().classList.contains('ea-eagami-wordmark--inline')).toBe(false);
    });

    it('applies the inline modifier when layout is "inline"', () => {
      fixture.componentRef.setInput('layout', 'inline');
      fixture.detectChanges();

      expect(getAnchor().classList.contains('ea-eagami-wordmark--inline')).toBe(true);
    });

    it('renders overline and brand inline for the byline variant', () => {
      fixture.componentRef.setInput('variant', 'byline');
      fixture.componentRef.setInput('layout', 'inline');
      fixture.detectChanges();

      expect(getOverline()?.textContent?.trim()).toBe('designed by');
      expect(getBrand()?.textContent?.trim()).toBe('eagami');
    });

    it('renders brand and tagline inline for the tagline variant', () => {
      fixture.componentRef.setInput('variant', 'tagline');
      fixture.componentRef.setInput('layout', 'inline');
      fixture.detectChanges();

      expect(getBrand()?.textContent?.trim()).toBe('eagami');
      expect(getTagline()?.textContent?.trim()).toBe('elegant web design');
    });
  });
});

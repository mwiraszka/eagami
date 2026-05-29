import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let fixture: ComponentFixture<AvatarComponent>;

  function getHost(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-avatar');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders with role=img', () => {
      expect(getHost().getAttribute('role')).toBe('img');
    });

    it('applies the default size and shape classes', () => {
      const el = getHost();

      expect(el.classList).toContain('ea-avatar--md');
      expect(el.classList).toContain('ea-avatar--circle');
    });

    it('applies the size class when set', () => {
      fixture.componentRef.setInput('size', 'xl');
      fixture.detectChanges();

      expect(getHost().classList).toContain('ea-avatar--xl');
    });

    it('applies the shape class when set', () => {
      fixture.componentRef.setInput('shape', 'square');
      fixture.detectChanges();

      expect(getHost().classList).toContain('ea-avatar--square');
    });
  });

  describe('Content priority', () => {
    it('renders the user fallback icon when src and initials are absent', () => {
      expect(fixture.nativeElement.querySelector('.ea-avatar__fallback')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.ea-avatar__image')).toBeNull();
      expect(fixture.nativeElement.querySelector('.ea-avatar__initials')).toBeNull();
    });

    it('renders initials when src is absent and initials are provided', () => {
      fixture.componentRef.setInput('initials', 'MW');
      fixture.detectChanges();

      const initials = fixture.nativeElement.querySelector('.ea-avatar__initials');

      expect(initials.textContent.trim()).toBe('MW');
      expect(fixture.nativeElement.querySelector('.ea-avatar__fallback')).toBeNull();
    });

    it('renders an image when src is provided, hiding fallback and initials', () => {
      fixture.componentRef.setInput('src', '/photo.jpg');
      fixture.componentRef.setInput('initials', 'MW');
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.ea-avatar__image')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.ea-avatar__initials')).toBeNull();
      expect(fixture.nativeElement.querySelector('.ea-avatar__fallback')).toBeNull();
    });
  });

  describe('Accessible name', () => {
    it('has no aria-label when alt and initials are empty', () => {
      expect(getHost().getAttribute('aria-label')).toBeNull();
    });

    it('uses alt as the aria-label', () => {
      fixture.componentRef.setInput('alt', 'Profile photo');
      fixture.detectChanges();

      expect(getHost().getAttribute('aria-label')).toBe('Profile photo');
    });

    it('falls back to initials when alt is empty', () => {
      fixture.componentRef.setInput('initials', 'MW');
      fixture.detectChanges();

      expect(getHost().getAttribute('aria-label')).toBe('MW');
    });

    it('prefers alt over initials when both are present', () => {
      fixture.componentRef.setInput('alt', 'Michal');
      fixture.componentRef.setInput('initials', 'MW');
      fixture.detectChanges();

      expect(getHost().getAttribute('aria-label')).toBe('Michal');
    });
  });

  describe('Image error', () => {
    it('hides the broken image element on error', () => {
      fixture.componentRef.setInput('src', '/nope.jpg');
      fixture.detectChanges();

      const img = fixture.nativeElement.querySelector(
        '.ea-avatar__image',
      ) as HTMLImageElement;
      img.dispatchEvent(new Event('error'));

      expect(img.style.display).toBe('none');
    });
  });
});

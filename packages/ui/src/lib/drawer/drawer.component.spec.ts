import type { Mock } from 'vitest';

import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import {
  type DrawerAnimation,
  DrawerComponent,
  type DrawerMode,
  type DrawerPosition,
  type DrawerSize,
} from './drawer.component';

// Mock HTMLDialogElement methods for jsdom
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  });
  HTMLDialogElement.prototype.show = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
  });
});

@Component({
  selector: 'ea-test-host',
  imports: [DrawerComponent],
  template: `
    <ea-drawer
      [(open)]="isOpen"
      [mode]="mode()"
      [position]="position()"
      [size]="size()"
      [animation]="animation()"
      [closeOnBackdrop]="closeOnBackdrop()"
      [closeOnEscape]="closeOnEscape()"
      [showClose]="showClose()">
      <span slot="header">Drawer Title</span>
      Drawer body content
      <span slot="footer">Footer</span>
    </ea-drawer>
  `,
})
class TestHostComponent {
  isOpen = signal(false);
  mode = signal<DrawerMode>('overlay');
  position = signal<DrawerPosition>('right');
  size = signal<DrawerSize>('md');
  animation = signal<DrawerAnimation>('eased');
  closeOnBackdrop = signal(true);
  closeOnEscape = signal(true);
  showClose = signal(true);
}

describe('DrawerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  function getDrawer(): HTMLDialogElement {
    return fixture.nativeElement.querySelector('dialog.ea-drawer');
  }

  function getPanel(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-drawer__panel');
  }

  function getCloseButton(): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector('.ea-drawer__close');
  }

  beforeEach(async () => {
    (HTMLDialogElement.prototype.showModal as Mock).mockClear();
    (HTMLDialogElement.prototype.show as Mock).mockClear();
    (HTMLDialogElement.prototype.close as Mock).mockClear();
    document.body.removeAttribute('style');

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders a dialog element', () => {
      expect(getDrawer()).toBeTruthy();
    });

    it('does not show the drawer by default', () => {
      expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    });

    it('applies the default position class', () => {
      expect(getPanel().classList).toContain('ea-drawer__panel--right');
    });

    it('applies the default size class', () => {
      expect(getPanel().classList).toContain('ea-drawer__panel--md');
    });

    it('applies position classes for each side', () => {
      host.position.set('left');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ea-drawer__panel--left');

      host.position.set('top');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ea-drawer__panel--top');

      host.position.set('bottom');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ea-drawer__panel--bottom');
    });

    it('applies different size classes', () => {
      host.size.set('lg');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ea-drawer__panel--lg');
    });

    it('applies each size class', () => {
      host.size.set('xl');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ea-drawer__panel--xl');
    });
  });

  describe('Animation', () => {
    it('marks the drawer animated for the eased animation', () => {
      expect(getDrawer().classList).toContain('ea-drawer--animated');
      expect(getDrawer().classList).not.toContain('ea-drawer--linear');
    });

    it('adds the linear modifier for the linear animation', () => {
      host.animation.set('linear');
      fixture.detectChanges();

      expect(getDrawer().classList).toContain('ea-drawer--animated');
      expect(getDrawer().classList).toContain('ea-drawer--linear');
    });

    it('drops the animated class when animation is none', () => {
      host.animation.set('none');
      fixture.detectChanges();

      expect(getDrawer().classList).not.toContain('ea-drawer--animated');
      expect(getDrawer().classList).not.toContain('ea-drawer--linear');
    });
  });

  describe('Opening and closing', () => {
    it('opens when open is set to true', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });

    it('closes when open is set to false', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      host.isOpen.set(false);
      fixture.detectChanges();

      expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
    });
  });

  describe('Close button', () => {
    it('renders a close button by default', () => {
      expect(getCloseButton()).toBeTruthy();
    });

    it('hides the close button when showClose is false', () => {
      host.showClose.set(false);
      fixture.detectChanges();

      expect(getCloseButton()).toBeNull();
    });

    it('closes drawer when close button is clicked', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      getCloseButton()!.click();
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });
  });

  describe('Backdrop click', () => {
    it('closes on backdrop click when closeOnBackdrop is true', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      const drawer = getDrawer();
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: drawer });
      drawer.dispatchEvent(event);
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });

    it('does not close on backdrop click when closeOnBackdrop is false', () => {
      host.closeOnBackdrop.set(false);
      host.isOpen.set(true);
      fixture.detectChanges();

      const drawer = getDrawer();
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: drawer });
      drawer.dispatchEvent(event);
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });

    it('does not close when click target is inside the panel', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      const panel = getPanel();
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: panel });
      getDrawer().dispatchEvent(event);
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });
  });

  describe('Escape key', () => {
    it('closes on cancel event when closeOnEscape is true', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      getDrawer().dispatchEvent(new Event('cancel'));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });

    it('prevents close on cancel when closeOnEscape is false', () => {
      host.closeOnEscape.set(false);
      host.isOpen.set(true);
      fixture.detectChanges();

      const event = new Event('cancel', { cancelable: true });
      getDrawer().dispatchEvent(event);
      fixture.detectChanges();

      expect(event.defaultPrevented).toBe(true);
      expect(host.isOpen()).toBe(true);
    });

    it('syncs the open model when the dialog closes on its own', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      // The native close event fires after the dialog has already closed
      getDrawer().removeAttribute('open');
      getDrawer().dispatchEvent(new Event('close'));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });

    it('re-shows when force-closed while closeOnEscape is false', () => {
      host.closeOnEscape.set(false);
      host.isOpen.set(true);
      fixture.detectChanges();
      (HTMLDialogElement.prototype.showModal as Mock).mockClear();

      getDrawer().removeAttribute('open');
      getDrawer().dispatchEvent(new Event('close'));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });
  });

  describe('Push mode', () => {
    it('opens non-modally via show() rather than showModal()', () => {
      host.mode.set('push');
      host.isOpen.set(true);
      fixture.detectChanges();

      expect(HTMLDialogElement.prototype.show).toHaveBeenCalled();
      expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    });

    it('applies the push modifier class to the dialog', () => {
      host.mode.set('push');
      fixture.detectChanges();

      expect(getDrawer().classList).toContain('ea-drawer--push');
    });

    it('pushes the document body content aside on the position side', async () => {
      host.mode.set('push');
      host.position.set('right');
      host.isOpen.set(true);
      fixture.detectChanges();
      // The push offset is measured on the next frame, once the view reflects
      // the current position and size.
      await new Promise(resolve => requestAnimationFrame(resolve));

      expect(document.body.style.getPropertyValue('padding-right')).not.toBe('');
      expect(document.body.style.transition).toContain('padding');
    });

    it('releases the pushed content when the drawer closes', async () => {
      host.mode.set('push');
      host.isOpen.set(true);
      fixture.detectChanges();
      await new Promise(resolve => requestAnimationFrame(resolve));

      host.isOpen.set(false);
      fixture.detectChanges();

      expect(document.body.style.getPropertyValue('padding-right')).toBe('');
    });

    it('reopens in the matching modality when mode changes while open', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);

      host.mode.set('push');
      fixture.detectChanges();

      expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
      expect(HTMLDialogElement.prototype.show).toHaveBeenCalledTimes(1);
      expect(host.isOpen()).toBe(true);
    });

    it('closes on Escape keydown when closeOnEscape is true', () => {
      host.mode.set('push');
      host.isOpen.set(true);
      fixture.detectChanges();

      getDrawer().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });

    it('ignores Escape keydown when closeOnEscape is false', () => {
      host.mode.set('push');
      host.closeOnEscape.set(false);
      host.isOpen.set(true);
      fixture.detectChanges();

      getDrawer().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });
  });

  describe('Content projection', () => {
    it('projects header content', () => {
      const header = fixture.nativeElement.querySelector('.ea-drawer__header');

      expect(header.textContent).toContain('Drawer Title');
    });

    it('projects body content', () => {
      const body = fixture.nativeElement.querySelector('.ea-drawer__body');

      expect(body.textContent).toContain('Drawer body content');
    });

    it('projects footer content', () => {
      const footer = fixture.nativeElement.querySelector('.ea-drawer__footer');

      expect(footer.textContent).toContain('Footer');
    });
  });
});

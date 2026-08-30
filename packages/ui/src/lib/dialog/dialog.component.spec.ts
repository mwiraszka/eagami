import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideEagamiUi } from '../eagami-ui.provider';
import { EagamiI18nService } from '../i18n/i18n.service';
import { frFR } from '../i18n/messages';
import { DialogComponent, type DialogWidth } from './dialog.component';

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
  imports: [DialogComponent],
  template: `
    <ea-dialog
      [(open)]="isOpen"
      [width]="width()"
      [modal]="modal()"
      [closeOnBackdrop]="closeOnBackdrop()"
      [closeOnEscape]="closeOnEscape()"
      [showClose]="showClose()"
      [closeDisabled]="closeDisabled()"
      [manualClose]="manualClose()"
      (closeRequested)="closeRequests.set(closeRequests() + 1)">
      <span slot="header">Test Title</span>
      Dialog body content
      <span slot="status">Uploading</span>
      <span slot="footer">Footer</span>
    </ea-dialog>
  `,
})
class TestHostComponent {
  isOpen = signal(false);
  width = signal<DialogWidth>('md');
  modal = signal(true);
  closeOnBackdrop = signal(true);
  closeOnEscape = signal(true);
  showClose = signal(true);
  closeDisabled = signal(false);
  manualClose = signal(false);
  closeRequests = signal(0);
}

@Component({
  selector: 'ea-test-no-header-host',
  imports: [DialogComponent],
  template: `<ea-dialog
    [(open)]="isOpen"
    [showClose]="showClose()">
    Body only
  </ea-dialog>`,
})
class NoHeaderHostComponent {
  isOpen = signal(true);
  showClose = signal(true);
}

describe('DialogComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  function getDialog(): HTMLDialogElement {
    return fixture.nativeElement.querySelector('dialog');
  }

  function getPanel(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-dialog__panel');
  }

  function getCloseButton(): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector('.ea-dialog__close');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideEagamiUi({ locales: [frFR] })],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders a dialog element', () => {
      expect(getDialog()).toBeTruthy();
    });

    it('does not show the dialog by default', () => {
      expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    });

    it('applies the default size class', () => {
      expect(getPanel().classList).toContain('ea-dialog__panel--md');
    });

    it('applies different size classes', () => {
      host.width.set('lg');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ea-dialog__panel--lg');
    });

    it('applies width classes', () => {
      host.width.set('xl');
      fixture.detectChanges();
      expect(getPanel().classList).toContain('ea-dialog__panel--xl');
    });
  });

  describe('Opening and closing', () => {
    it('opens the dialog when open is set to true', () => {
      host.isOpen.set(true);
      fixture.detectChanges();
      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });

    it('closes the dialog when open is set to false', () => {
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

    it('closes dialog when close button is clicked', () => {
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

      const dialog = getDialog();
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: dialog });
      dialog.dispatchEvent(event);
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });

    it('does not close when a drag out of the panel releases on the backdrop', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      const dialog = getDialog();
      getPanel().dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
      dialog.dispatchEvent(new MouseEvent('pointerup', { bubbles: true }));
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: dialog });
      dialog.dispatchEvent(event);
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });

    it('does not close on backdrop click when closeOnBackdrop is false', () => {
      host.closeOnBackdrop.set(false);
      host.isOpen.set(true);
      fixture.detectChanges();

      const dialog = getDialog();
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: dialog });
      dialog.dispatchEvent(event);
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });
  });

  describe('Escape key', () => {
    it('closes on cancel event when closeOnEscape is true', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      const dialog = getDialog();
      dialog.dispatchEvent(new Event('cancel'));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });

    it('prevents close on cancel when closeOnEscape is false', () => {
      host.closeOnEscape.set(false);
      host.isOpen.set(true);
      fixture.detectChanges();

      const dialog = getDialog();
      const event = new Event('cancel', { cancelable: true });
      dialog.dispatchEvent(event);
      fixture.detectChanges();

      expect(event.defaultPrevented).toBe(true);
      expect(host.isOpen()).toBe(true);
    });
  });

  describe('Non-modal', () => {
    function openNonModal(): void {
      host.modal.set(false);
      host.isOpen.set(true);
      fixture.detectChanges();
    }

    it('opens via show() and floats itself', () => {
      // The prototype spies live across tests, so only the delta says anything
      const modalCalls = vi.mocked(HTMLDialogElement.prototype.showModal).mock.calls
        .length;

      openNonModal();

      expect(HTMLDialogElement.prototype.show).toHaveBeenCalled();
      expect(vi.mocked(HTMLDialogElement.prototype.showModal).mock.calls.length).toBe(
        modalCalls,
      );
      expect(getDialog().classList).toContain('ea-dialog--floating');
    });

    it('closes on an Escape keydown, which show() never turns into a cancel', () => {
      openNonModal();

      getDialog().dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });

    it('leaves Escape alone when closeOnEscape is false', () => {
      host.closeOnEscape.set(false);
      openNonModal();

      getDialog().dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });

    it('reports an Escape keydown instead of closing under manualClose', () => {
      host.manualClose.set(true);
      openNonModal();

      getDialog().dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
      fixture.detectChanges();

      expect(host.closeRequests()).toBe(1);
      expect(host.isOpen()).toBe(true);
    });
  });

  describe('Background scrolling', () => {
    it('shuts off the page scroller while a modal dialog is up', () => {
      host.isOpen.set(true);
      fixture.detectChanges();
      expect(document.documentElement.style.overflow).toBe('hidden');

      host.isOpen.set(false);
      fixture.detectChanges();
      expect(document.documentElement.style.overflow).toBe('');
    });

    it('leaves the page scroller alone for a non-modal dialog', () => {
      host.modal.set(false);
      host.isOpen.set(true);
      fixture.detectChanges();

      expect(document.documentElement.style.overflow).toBe('');
    });

    it('lets go of the scroller when a dialog is taken down while open', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      fixture.destroy();

      expect(document.documentElement.style.overflow).toBe('');
    });
  });

  describe('Manual close', () => {
    function openManual(): void {
      host.manualClose.set(true);
      host.isOpen.set(true);
      fixture.detectChanges();
    }

    it('reports the close button instead of closing', () => {
      openManual();

      getCloseButton()!.click();
      fixture.detectChanges();

      expect(host.closeRequests()).toBe(1);
      expect(host.isOpen()).toBe(true);
    });

    it('vetoes the native cancel so Escape leaves the dialog showing', () => {
      openManual();

      const event = new Event('cancel', { cancelable: true });
      getDialog().dispatchEvent(event);
      fixture.detectChanges();

      expect(event.defaultPrevented).toBe(true);
      expect(host.closeRequests()).toBe(1);
      expect(host.isOpen()).toBe(true);
    });

    it('reports a backdrop click instead of closing', () => {
      openManual();

      const dialog = getDialog();
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: dialog });
      dialog.dispatchEvent(event);
      fixture.detectChanges();

      expect(host.closeRequests()).toBe(1);
      expect(host.isOpen()).toBe(true);
    });

    it('closes as usual when manualClose is off', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      getCloseButton()!.click();
      fixture.detectChanges();

      expect(host.closeRequests()).toBe(0);
      expect(host.isOpen()).toBe(false);
    });
  });

  describe('Close button', () => {
    it('disables the close button on closeDisabled', () => {
      host.closeDisabled.set(true);
      host.isOpen.set(true);
      fixture.detectChanges();

      expect(getCloseButton()!.disabled).toBe(true);
    });
  });

  describe('Content projection', () => {
    it('projects status content between the body and the footer', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      const status = fixture.nativeElement.querySelector('.ea-dialog__status');
      const body = fixture.nativeElement.querySelector('.ea-dialog__body');
      const footer = fixture.nativeElement.querySelector('.ea-dialog__footer');

      expect(status.textContent).toContain('Uploading');
      expect(body.compareDocumentPosition(status)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(footer.compareDocumentPosition(status)).toBe(
        Node.DOCUMENT_POSITION_PRECEDING,
      );
    });

    it('projects header content', () => {
      const header = fixture.nativeElement.querySelector('.ea-dialog__header');
      expect(header.textContent).toContain('Test Title');
    });

    it('renders the close button inside the header row', () => {
      const header = fixture.nativeElement.querySelector('.ea-dialog__header');

      expect(header.contains(getCloseButton())).toBe(true);
    });

    it('keeps the header row for the close button when nothing is projected', () => {
      const bare = TestBed.createComponent(NoHeaderHostComponent);
      bare.detectChanges();

      const header = bare.nativeElement.querySelector('.ea-dialog__header');

      expect(header.classList.contains('ea-dialog__header--hidden')).toBe(false);
    });

    it('hides the header row when nothing is projected and the close button is off', () => {
      const bare = TestBed.createComponent(NoHeaderHostComponent);
      bare.componentInstance.showClose.set(false);
      bare.detectChanges();

      const header = bare.nativeElement.querySelector('.ea-dialog__header');

      expect(header.classList.contains('ea-dialog__header--hidden')).toBe(true);
    });

    it('projects body content', () => {
      const body = fixture.nativeElement.querySelector('.ea-dialog__body');
      expect(body.textContent).toContain('Dialog body content');
    });

    it('projects footer content', () => {
      const footer = fixture.nativeElement.querySelector('.ea-dialog__footer');
      expect(footer.textContent).toContain('Footer');
    });
  });

  describe('Accessible name', () => {
    it('points aria-labelledby at the projected header', () => {
      const dialog = fixture.nativeElement.querySelector('.ea-dialog') as HTMLElement;

      expect(dialog.getAttribute('aria-labelledby')).toBe(`${dialog.id}-header`);
    });

    it('drops aria-labelledby when no header content is projected', () => {
      const bare = TestBed.createComponent(NoHeaderHostComponent);
      bare.detectChanges();

      const dialog = bare.nativeElement.querySelector('.ea-dialog') as HTMLElement;

      expect(dialog.getAttribute('aria-labelledby')).toBeNull();
    });
  });

  describe('Localization', () => {
    it('labels the close button in English by default', () => {
      expect(getCloseButton()!.getAttribute('aria-label')).toBe('Close dialog');
    });

    it('relabels the close button when the locale changes', () => {
      TestBed.inject(EagamiI18nService).setLocale('fr-FR');
      fixture.detectChanges();

      expect(getCloseButton()!.getAttribute('aria-label')).toBe(
        'Fermer la boîte de dialogue',
      );
    });
  });
});

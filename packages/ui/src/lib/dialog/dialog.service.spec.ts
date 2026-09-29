import {
  ApplicationRef,
  Component,
  InjectionToken,
  Injector,
  inject,
  input,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DialogRef } from './dialog-ref';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';

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

const GREETING = new InjectionToken<string>('GREETING');

@Component({
  selector: 'ea-test-confirm-dialog',
  imports: [DialogComponent],
  template: `
    <ea-dialog [manualClose]="manualClose()">
      <span slot="header">{{ title() }}</span>
      <p class="greeting">{{ greeting }}</p>
      <button
        type="button"
        class="confirm"
        (click)="ref.close(true)">
        Confirm
      </button>
    </ea-dialog>
  `,
})
class ConfirmDialogComponent {
  readonly ref = inject<DialogRef<boolean>>(DialogRef);
  readonly greeting = inject(GREETING, { optional: true }) ?? '';
  readonly title = input('Confirm');
  readonly manualClose = input(false);
}

@Component({
  selector: 'ea-test-answering-dialog',
  imports: [DialogComponent],
  template: `
    <ea-dialog (closed)="ref.close('dismissed')">
      <span slot="header">Answer</span>
    </ea-dialog>
  `,
})
class AnsweringDialogComponent {
  readonly ref = inject<DialogRef<string>>(DialogRef);
}

@Component({
  selector: 'ea-test-nested-dialog',
  imports: [DialogComponent],
  template: `
    <ea-dialog class="outer">
      <span slot="header">Outer</span>
      <ea-dialog
        class="inner"
        [open]="true">
        <span slot="header">Inner</span>
      </ea-dialog>
    </ea-dialog>
  `,
})
class NestedDialogComponent {}

@Component({
  selector: 'ea-test-self-closing-dialog',
  template: '',
})
class SelfClosingDialogComponent {
  constructor() {
    inject(DialogRef).close();
  }
}

describe('DialogService', () => {
  let service: DialogService;
  let appRef: ApplicationRef;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
    appRef = TestBed.inject(ApplicationRef);
  });

  function hostOf(selector: string): HTMLElement | null {
    return document.querySelector<HTMLElement>(selector);
  }

  function dialogIn(selector: string): HTMLDialogElement {
    return document.querySelector<HTMLDialogElement>(`${selector} dialog`)!;
  }

  describe('open', () => {
    it('renders the component at the end of the body and shows its dialog', () => {
      service.open(ConfirmDialogComponent);
      appRef.tick();

      expect(document.body.lastElementChild).toBe(hostOf('ea-test-confirm-dialog'));
      expect(dialogIn('ea-test-confirm-dialog').hasAttribute('open')).toBe(true);
    });

    it('lists the dialog as open', () => {
      const ref = service.open(ConfirmDialogComponent);

      expect(service.dialogs()).toEqual([ref]);
    });

    it('sets the given inputs before the first render', () => {
      service.open(ConfirmDialogComponent, { inputs: { title: 'Delete file' } });
      appRef.tick();

      expect(hostOf('ea-test-confirm-dialog')!.textContent).toContain('Delete file');
    });

    it('resolves dependencies through the given injector', () => {
      const injector = Injector.create({
        providers: [{ provide: GREETING, useValue: 'Hello' }],
        parent: TestBed.inject(Injector),
      });

      service.open(ConfirmDialogComponent, { injector });
      appRef.tick();

      expect(hostOf('ea-test-confirm-dialog .greeting')!.textContent).toBe('Hello');
    });

    it('holds the page scroller while the dialog is up', () => {
      const ref = service.open(ConfirmDialogComponent);
      appRef.tick();

      expect(document.documentElement.style.overflow).toBe('hidden');

      ref.close(true);

      expect(document.documentElement.style.overflow).toBe('');
    });

    it('shows nothing when the content closes its ref while being constructed', () => {
      const ref = service.open(SelfClosingDialogComponent);

      expect(ref.closed()).toBe(true);
      expect(service.dialogs()).toEqual([]);
      expect(hostOf('ea-test-self-closing-dialog')).toBeNull();
    });
  });

  describe('Closing with an answer', () => {
    it('settles the result with the value the content closes with', async () => {
      const ref = service.open<boolean>(ConfirmDialogComponent);
      appRef.tick();

      hostOf('ea-test-confirm-dialog .confirm')!.click();

      expect(await ref.result).toBe(true);
    });

    it('takes the component down and drops it from the open dialogs', () => {
      const ref = service.open(ConfirmDialogComponent);
      appRef.tick();

      ref.close(true);

      expect(hostOf('ea-test-confirm-dialog')).toBeNull();
      expect(service.dialogs()).toEqual([]);
    });

    it('hands focus back to where it was when the dialog opened', () => {
      const opener = document.createElement('button');
      document.body.appendChild(opener);
      opener.focus();
      const ref = service.open(ConfirmDialogComponent);
      appRef.tick();
      hostOf('ea-test-confirm-dialog .confirm')!.focus();

      ref.close(true);

      expect(document.activeElement).toBe(opener);
      opener.remove();
    });
  });

  describe('Dismissal', () => {
    it('settles the result with undefined on Escape', async () => {
      const ref = service.open(ConfirmDialogComponent);
      appRef.tick();

      dialogIn('ea-test-confirm-dialog').dispatchEvent(
        new Event('cancel', { cancelable: true }),
      );

      expect(await ref.result).toBeUndefined();
      expect(hostOf('ea-test-confirm-dialog')).toBeNull();
    });

    it('settles the result with undefined on the close button', async () => {
      const ref = service.open(ConfirmDialogComponent);
      appRef.tick();

      hostOf('ea-test-confirm-dialog .ea-dialog__close')!.click();

      expect(await ref.result).toBeUndefined();
    });

    it('lets a closed handler answer in place of undefined', async () => {
      const ref = service.open<string>(AnsweringDialogComponent);
      appRef.tick();

      dialogIn('ea-test-answering-dialog').dispatchEvent(
        new Event('cancel', { cancelable: true }),
      );

      expect(await ref.result).toBe('dismissed');
    });

    it('leaves the ref open under manualClose', () => {
      const ref = service.open(ConfirmDialogComponent, { inputs: { manualClose: true } });
      appRef.tick();

      dialogIn('ea-test-confirm-dialog').dispatchEvent(
        new Event('cancel', { cancelable: true }),
      );

      expect(ref.closed()).toBe(false);
      expect(dialogIn('ea-test-confirm-dialog').hasAttribute('open')).toBe(true);
    });
  });

  describe('Nested dialogs', () => {
    it('binds only the first dialog the content renders', () => {
      const ref = service.open(NestedDialogComponent);
      appRef.tick();

      dialogIn('ea-test-nested-dialog .inner').dispatchEvent(
        new Event('cancel', { cancelable: true }),
      );
      appRef.tick();

      expect(ref.closed()).toBe(false);
      expect(dialogIn('ea-test-nested-dialog .outer').hasAttribute('open')).toBe(true);
      expect(dialogIn('ea-test-nested-dialog .inner').hasAttribute('open')).toBe(false);
    });

    it('closes the ref when the bound dialog is dismissed', () => {
      const ref = service.open(NestedDialogComponent);
      appRef.tick();

      dialogIn('ea-test-nested-dialog .outer').dispatchEvent(
        new Event('cancel', { cancelable: true }),
      );

      expect(ref.closed()).toBe(true);
    });
  });

  describe('Stacking', () => {
    it('keeps the dialog underneath open when the top one closes', () => {
      const first = service.open(ConfirmDialogComponent);
      const second = service.open(AnsweringDialogComponent);
      appRef.tick();

      second.close();

      expect(service.dialogs()).toEqual([first]);
      expect(dialogIn('ea-test-confirm-dialog').hasAttribute('open')).toBe(true);
    });
  });

  describe('closeAll', () => {
    it('closes every dialog, newest first, as dismissed', async () => {
      const first = service.open(ConfirmDialogComponent);
      const second = service.open(AnsweringDialogComponent);
      appRef.tick();
      const order: string[] = [];
      const settled = Promise.all([
        first.result.then(value => order.push(`first:${value}`)),
        second.result.then(value => order.push(`second:${value}`)),
      ]);

      service.closeAll();
      await settled;

      expect(order).toEqual(['second:undefined', 'first:undefined']);
      expect(service.dialogs()).toEqual([]);
      expect(hostOf('ea-test-confirm-dialog')).toBeNull();
      expect(hostOf('ea-test-answering-dialog')).toBeNull();
    });

    it('closes what is still open when the app is torn down', async () => {
      const ref = service.open(ConfirmDialogComponent);
      appRef.tick();

      TestBed.resetTestingModule();

      expect(await ref.result).toBeUndefined();
      expect(hostOf('ea-test-confirm-dialog')).toBeNull();
    });
  });
});

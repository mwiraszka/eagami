import { Component, PLATFORM_ID, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';

@Component({
  imports: [DialogComponent],
  template: `<ea-dialog [(open)]="open"><p>Body</p></ea-dialog>`,
})
class HostComponent {
  readonly open = signal(true);
}

@Component({
  selector: 'ea-test-server-dialog',
  imports: [DialogComponent],
  template: `<ea-dialog><p>Body</p></ea-dialog>`,
})
class ServerDialogComponent {}

describe('DialogComponent SSR safety', () => {
  it('renders an open dialog on the server without touching the DOM', async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();

    const fixture = TestBed.createComponent(HostComponent);

    // The open() effect runs during SSR; it must not call `<dialog>` APIs
    // (showModal) or read document.activeElement on the server.
    expect(() => fixture.detectChanges()).not.toThrow();

    const dialog: HTMLDialogElement = fixture.nativeElement.querySelector('dialog');
    expect(dialog).toBeTruthy();
    expect(dialog.hasAttribute('open')).toBe(false);
  });
});

describe('DialogService SSR safety', () => {
  it('renders nothing from code on the server and settles the result as dismissed', async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    });
    const service = TestBed.inject(DialogService);

    const ref = service.open(ServerDialogComponent);

    expect(ref.closed()).toBe(true);
    expect(await ref.result).toBeUndefined();
    expect(service.dialogs()).toEqual([]);
    expect(document.querySelector('ea-test-server-dialog')).toBeNull();
  });
});

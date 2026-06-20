import { Component, PLATFORM_ID, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

@Component({
  imports: [DialogComponent],
  template: `<ea-dialog [(open)]="open"><p>Body</p></ea-dialog>`,
})
class HostComponent {
  readonly open = signal(true);
}

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

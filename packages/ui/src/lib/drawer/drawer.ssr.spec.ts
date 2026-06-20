import { Component, PLATFORM_ID, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DrawerComponent } from './drawer.component';

@Component({
  imports: [DrawerComponent],
  template: `<ea-drawer [(open)]="open"><p>Body</p></ea-drawer>`,
})
class HostComponent {
  readonly open = signal(true);
}

describe('DrawerComponent SSR safety', () => {
  it('renders an open drawer on the server without touching the DOM', async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();

    const fixture = TestBed.createComponent(HostComponent);

    // The open() effect runs during SSR; it must not call `<dialog>` APIs
    // (showModal) or read document.activeElement on the server.
    expect(() => fixture.detectChanges()).not.toThrow();

    const drawer: HTMLDialogElement = fixture.nativeElement.querySelector('dialog');
    expect(drawer).toBeTruthy();
    expect(drawer.hasAttribute('open')).toBe(false);
  });
});

import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DrawerComponent } from './drawer.component';

// jsdom lacks HTMLDialogElement showModal/close; stub them so the drawer opens and axe can see it
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
  imports: [DrawerComponent],
  template: `
    <ea-drawer
      [(open)]="open"
      [mode]="mode">
      <span slot="header">Drawer Title</span>
      Drawer body content
      <span slot="footer">Footer</span>
    </ea-drawer>
  `,
})
class HostComponent {
  open = true;
  mode: 'overlay' | 'push' = 'overlay';
}

describe('DrawerComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations when open with header and body content', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in non-modal push mode', async () => {
    const el = await render(host => (host.mode = 'push'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

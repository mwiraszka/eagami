import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DrawerComponent } from './drawer.component';

// jsdom doesn't implement HTMLDialogElement's `showModal` / `close`; stub them
// so the drawer actually opens (otherwise axe can't see the content).
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = jest.fn(function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  });
  HTMLDialogElement.prototype.close = jest.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
  });
});

@Component({
  imports: [DrawerComponent],
  template: `
    <ea-drawer [(open)]="open">
      <span slot="header">Drawer Title</span>
      Drawer body content
      <span slot="footer">Footer</span>
    </ea-drawer>
  `,
})
class HostComponent {
  open = true;
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
});

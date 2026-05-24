import { axe } from 'jest-axe';

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MenuItemComponent } from './menu-item.component';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { MenuComponent } from './menu.component';

@Component({
  imports: [MenuComponent, MenuItemComponent, MenuTriggerDirective],
  template: `
    <button [eaMenuTrigger]="menu">Open menu</button>
    <ea-menu
      #menu
      [(open)]="isOpen">
      <ea-menu-item>Edit</ea-menu-item>
      <ea-menu-item>Archive</ea-menu-item>
      <ea-menu-item variant="danger">Delete</ea-menu-item>
    </ea-menu>
  `,
})
class HostComponent {
  isOpen = signal(false);
}

describe('MenuComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  afterEach(() => {
    document.querySelectorAll('.ea-popover__surface').forEach(node => node.remove());
  });

  it('has no detectable violations when the menu is closed', async () => {
    const { el } = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when the menu is open', async () => {
    const { fixture } = await render(host => host.isOpen.set(true));
    // The popover surface is teleported to `document.body`, so axe must scan
    // the whole document to see the open menu list. The `region` rule is a
    // page-level landmark check (every region of the page must be inside a
    // `<main>`/`<nav>`/etc.) that doesn't apply to isolated component tests.
    const results = await axe(document.body, {
      rules: { region: { enabled: false } },
    });
    fixture.destroy();

    expect(results).toHaveNoViolations();
  });
});

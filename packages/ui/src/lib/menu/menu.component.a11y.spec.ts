import { axe } from 'vitest-axe';

import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { revealPopoverSurfaces } from '../../test-setup';
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

  /** Opens the menu and hands back the portaled surface holding the items. */
  function openMenu(
    fixture: ComponentFixture<HostComponent>,
    el: HTMLElement,
  ): HTMLElement {
    el.querySelector<HTMLElement>('button')!.click();
    fixture.detectChanges();
    const [surface] = revealPopoverSurfaces();
    return surface;
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
    // Surface is teleported to `document.body`, so axe scans the whole document. The
    // `region` rule is a page-level landmark check that doesn't apply to isolated components.
    const results = await axe(document.body, {
      rules: { region: { enabled: false } },
    });
    fixture.destroy();

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with the item list open', async () => {
    const { fixture, el } = await render();

    const results = await axe(openMenu(fixture, el));

    expect(results).toHaveNoViolations();
  });
});

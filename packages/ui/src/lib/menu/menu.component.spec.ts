import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemComponent } from './menu-item.component';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { MenuComponent, type MenuPlacement } from './menu.component';

@Component({
  selector: 'ea-test-host',
  imports: [MenuComponent, MenuTriggerDirective, MenuItemComponent],
  template: `
    <button [eaMenuTrigger]="menu">Open</button>
    <ea-menu
      #menu
      [(open)]="isOpen"
      [placement]="placement()"
      [disabled]="disabled()">
      <ea-menu-item (clicked)="onEdit()">Edit</ea-menu-item>
      <ea-menu-item [disabled]="itemDisabled()">Archive</ea-menu-item>
      <ea-menu-item
        variant="danger"
        (clicked)="onDelete()">
        Delete
      </ea-menu-item>
    </ea-menu>
  `,
})
class TestHostComponent {
  isOpen = signal(false);
  placement = signal<MenuPlacement>('bottom-start');
  disabled = signal(false);
  itemDisabled = signal(false);
  editCount = 0;
  deleteCount = 0;

  onEdit(): void {
    this.editCount++;
  }

  onDelete(): void {
    this.deleteCount++;
  }
}

describe('MenuComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  function getTrigger(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button');
  }

  function getList(): HTMLElement | null {
    // List lives in the popover surface, which renders unconditionally and hides via
    // `display: none`; treat a hidden one as "no list".
    const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface || surface.style.display === 'none') {
      return null;
    }
    return surface.querySelector<HTMLElement>('.ea-menu__list');
  }

  function getItems(): HTMLButtonElement[] {
    const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface || surface.style.display === 'none') {
      return [];
    }
    return Array.from(surface.querySelectorAll('.ea-menu-item'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Destroy tears down the teleported surface; sweep any that survived so the next test starts clean
    fixture.destroy();
    document.querySelectorAll('.ea-popover__surface').forEach(node => node.remove());
  });

  describe('Rendering', () => {
    it('renders the trigger', () => {
      expect(getTrigger()).toBeTruthy();
    });

    it('exposes aria-haspopup on the trigger', () => {
      expect(getTrigger().getAttribute('aria-haspopup')).toBe('menu');
    });

    it('does not render the menu list when closed', () => {
      expect(getList()).toBeNull();
    });

    it('renders the menu list when open', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      expect(getList()).toBeTruthy();
    });

    it('renders all menu items when open', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      expect(getItems().length).toBe(3);
    });

    it('forwards the default placement to the popover surface', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      const surface = document.body.querySelector('.ea-popover__surface');

      expect(surface?.classList).toContain('ea-popover__surface--bottom-start');
    });

    it('forwards the placement input to the popover surface', () => {
      host.isOpen.set(true);
      host.placement.set('bottom-end');
      fixture.detectChanges();

      const surface = document.body.querySelector('.ea-popover__surface');

      expect(surface?.classList).toContain('ea-popover__surface--bottom-end');
    });
  });

  describe('Opening and closing', () => {
    it('opens when trigger is clicked', () => {
      getTrigger().click();
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });

    it('closes when trigger is clicked again', () => {
      getTrigger().click();
      fixture.detectChanges();

      getTrigger().click();
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });

    it('does not open when disabled', () => {
      host.disabled.set(true);
      fixture.detectChanges();

      getTrigger().click();
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });

    it('opens on ArrowDown from trigger', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      getTrigger().dispatchEvent(event);
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });

    it('opens on Enter from trigger', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      getTrigger().dispatchEvent(event);
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });

    it('closes on Escape keydown from trigger', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      getTrigger().dispatchEvent(event);
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });

    it('closes when clicking outside', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      document.body.click();
      fixture.detectChanges();

      expect(host.isOpen()).toBe(false);
    });

    it('stays open when clicking inside the menu list', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      const list = getList()!;
      list.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });
  });

  describe('Menu items', () => {
    beforeEach(() => {
      host.isOpen.set(true);
      fixture.detectChanges();
    });

    it('emits clicked and closes the menu on click', () => {
      getItems()[0].click();
      fixture.detectChanges();

      expect(host.editCount).toBe(1);
      expect(host.isOpen()).toBe(false);
    });

    it('does not emit clicked when disabled', () => {
      host.itemDisabled.set(true);
      fixture.detectChanges();

      const archiveItem = getItems()[1];
      archiveItem.click();
      fixture.detectChanges();

      expect(host.isOpen()).toBe(true);
    });

    it('applies danger variant class', () => {
      const deleteItem = getItems()[2];

      expect(deleteItem.classList).toContain('ea-menu-item--danger');
    });

    it('applies disabled class when item is disabled', () => {
      host.itemDisabled.set(true);
      fixture.detectChanges();

      const archiveItem = getItems()[1];

      expect(archiveItem.classList).toContain('ea-menu-item--disabled');
    });

    it('emits clicked for danger items', () => {
      getItems()[2].click();
      fixture.detectChanges();

      expect(host.deleteCount).toBe(1);
    });
  });

  describe('Roving tabindex', () => {
    it('renders items with tabindex -1 before any focus management', () => {
      host.isOpen.set(true);
      fixture.detectChanges();

      expect(getItems().map(item => item.tabIndex)).toEqual([-1, -1, -1]);
    });

    it('sets tabindex 0 only on the focused first item after opening', async () => {
      getTrigger().click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const items = getItems();

      expect(items[0].tabIndex).toBe(0);
      expect(items[1].tabIndex).toBe(-1);
      expect(items[2].tabIndex).toBe(-1);
      expect(document.activeElement).toBe(items[0]);
    });

    it('moves tabindex 0 along with focus on arrow navigation', async () => {
      getTrigger().click();
      fixture.detectChanges();
      await fixture.whenStable();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      const items = getItems();

      expect(items[0].tabIndex).toBe(-1);
      expect(items[1].tabIndex).toBe(0);
      expect(items[2].tabIndex).toBe(-1);
      expect(document.activeElement).toBe(items[1]);
    });

    it('keeps the roving tabindex after the items re-render', async () => {
      getTrigger().click();
      fixture.detectChanges();
      await fixture.whenStable();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      host.itemDisabled.set(true);
      fixture.detectChanges();

      const items = getItems();

      expect(items[0].tabIndex).toBe(-1);
      expect(items[1].tabIndex).toBe(-1);
      expect(items[2].tabIndex).toBe(0);
    });
  });
});

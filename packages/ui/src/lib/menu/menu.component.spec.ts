import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemComponent } from './menu-item.component';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { MenuComponent, MenuPlacement } from './menu.component';

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
    // The menu's projected list lives inside the popover surface, which is
    // rendered unconditionally and hidden via `display: none` when closed.
    // Treat a hidden surface as "no list" so the existing assertions stay
    // intact.
    const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface || surface.style.display === 'none') return null;
    return surface.querySelector<HTMLElement>('.ea-menu__list');
  }

  function getItems(): HTMLButtonElement[] {
    const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface || surface.style.display === 'none') return [];
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
    // `<ea-popover>` teleports its surface to `document.body`. Destroy the
    // fixture so Angular tears down the embedded view, then sweep any surface
    // that survived destruction so the next test starts clean.
    fixture.destroy();
    document.querySelectorAll('.ea-popover__surface').forEach(node => node.remove());
  });

  // ── Rendering ──────────────────────────────────────────────────────────────

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

  // ── Opening and closing ───────────────────────────────────────────────────

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

  // ── Menu items ────────────────────────────────────────────────────────────

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
});

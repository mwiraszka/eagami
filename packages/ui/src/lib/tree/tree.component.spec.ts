import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeComponent } from './tree.component';
import type { TreeNode } from './tree.types';

const SAMPLE_TREE: TreeNode[] = [
  {
    id: 'fruits',
    label: 'Fruits',
    children: [
      { id: 'apple', label: 'Apple' },
      { id: 'banana', label: 'Banana', disabled: true },
      { id: 'cherry', label: 'Cherry' },
    ],
  },
  {
    id: 'vegetables',
    label: 'Vegetables',
    children: [
      { id: 'carrot', label: 'Carrot' },
      {
        id: 'leafy',
        label: 'Leafy greens',
        children: [
          { id: 'spinach', label: 'Spinach' },
          { id: 'kale', label: 'Kale' },
        ],
      },
    ],
  },
];

@Component({
  imports: [TreeComponent],
  template: `
    <ea-tree
      [nodes]="nodes"
      [(selectedId)]="selectedId"
      [(expandedIds)]="expandedIds"
      [disabled]="disabled" />
  `,
})
class HostComponent {
  nodes: TreeNode[] = SAMPLE_TREE;
  selectedId = signal<string | null>(null);
  expandedIds = signal<readonly string[]>([]);
  disabled = false;
}

describe('TreeComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  function getTreeItems(): HTMLElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('[role="treeitem"]'));
  }

  function getItemById(id: string): HTMLElement | null {
    return fixture.nativeElement.querySelector(`[data-treeitem-id="${id}"]`);
  }

  function clickRow(id: string): void {
    const item = getItemById(id);
    const row = item?.querySelector<HTMLElement>(':scope > .ea-tree-node__row');
    if (!row) {
      throw new Error(`No row for ${id}`);
    }
    row.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
  }

  function clickChevron(id: string): void {
    const row = getItemById(id);
    const chevron = row?.querySelector<HTMLElement>('.ea-tree-node__chevron');
    if (!chevron) {
      throw new Error(`No chevron on ${id}`);
    }
    chevron.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders root-level treeitems', () => {
    const items = getTreeItems();
    const rootLabels = items
      .filter(el => el.getAttribute('aria-level') === '1')
      .map(el => el.querySelector('.ea-tree-node__label')?.textContent?.trim());

    expect(rootLabels).toEqual(['Fruits', 'Vegetables']);
  });

  it('hides children of collapsed branches', () => {
    expect(getItemById('apple')).toBeNull();
    expect(getItemById('carrot')).toBeNull();
  });

  it('reveals children after clicking the chevron', () => {
    clickChevron('fruits');

    expect(getItemById('apple')).not.toBeNull();
    expect(host.expandedIds()).toContain('fruits');
  });

  it('selects a node on row click and emits selectedId', () => {
    clickChevron('fruits');
    clickRow('apple');

    expect(host.selectedId()).toBe('apple');
    expect(getItemById('apple')?.getAttribute('aria-selected')).toBe('true');
  });

  it('does not select disabled nodes', () => {
    clickChevron('fruits');
    clickRow('banana');

    expect(host.selectedId()).toBeNull();
  });

  it('chevron click toggles expansion without selecting', () => {
    clickChevron('fruits');

    expect(host.expandedIds()).toContain('fruits');
    expect(host.selectedId()).toBeNull();
  });

  it('auto-expands ancestors when selectedId is set to a deeply-nested node', async () => {
    host.selectedId.set('spinach');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(host.expandedIds()).toEqual(expect.arrayContaining(['vegetables', 'leafy']));
    expect(getItemById('spinach')).not.toBeNull();
  });

  it('renders aria-level, aria-posinset, and aria-setsize correctly', () => {
    clickChevron('fruits');

    const apple = getItemById('apple');
    expect(apple?.getAttribute('aria-level')).toBe('2');
    expect(apple?.getAttribute('aria-posinset')).toBe('1');
    expect(apple?.getAttribute('aria-setsize')).toBe('3');
  });

  it('sets aria-expanded on branch nodes and omits it on leaves', () => {
    const fruits = getItemById('fruits');
    expect(fruits?.getAttribute('aria-expanded')).toBe('false');

    clickChevron('fruits');

    expect(getItemById('fruits')?.getAttribute('aria-expanded')).toBe('true');
    expect(getItemById('apple')?.hasAttribute('aria-expanded')).toBe(false);
  });

  it('disables interaction when the [disabled] flag is set', () => {
    host.disabled = true;
    fixture.detectChanges();

    clickChevron('fruits');

    expect(host.expandedIds()).toEqual([]);
  });

  describe('Keyboard navigation', () => {
    function press(key: string): void {
      const list = fixture.nativeElement.querySelector('.ea-tree__list') as HTMLElement;
      list.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      fixture.detectChanges();
    }

    /** The roving tabindex is the user-visible record of which node has focus. */
    function focusedId(): string | null {
      const el: HTMLElement | null = fixture.nativeElement.querySelector(
        '[role="treeitem"][tabindex="0"]',
      );
      return el?.getAttribute('data-treeitem-id') ?? null;
    }

    it('walks visible nodes with ArrowDown and ArrowUp', () => {
      expect(focusedId()).toBe('fruits');

      press('ArrowDown');

      expect(focusedId()).toBe('vegetables');

      press('ArrowUp');

      expect(focusedId()).toBe('fruits');
    });

    it('skips disabled nodes while walking', () => {
      clickChevron('fruits');

      press('ArrowDown');

      expect(focusedId()).toBe('apple');

      // Banana sits between apple and cherry and is disabled
      press('ArrowDown');

      expect(focusedId()).toBe('cherry');
    });

    it('stops at the ends instead of wrapping', () => {
      press('ArrowUp');

      expect(focusedId()).toBe('fruits');

      press('End');
      press('ArrowDown');

      expect(focusedId()).toBe('vegetables');
    });

    it('jumps to the first and last visible node with Home and End', () => {
      clickChevron('vegetables');

      press('End');

      expect(focusedId()).toBe('leafy');

      press('Home');

      expect(focusedId()).toBe('fruits');
    });

    it('expands a collapsed branch with ArrowRight, then steps into it', () => {
      press('ArrowRight');

      expect(host.expandedIds()).toContain('fruits');
      expect(focusedId()).toBe('fruits');

      press('ArrowRight');

      expect(focusedId()).toBe('apple');
    });

    it('steps past a disabled first child when entering a branch', () => {
      host.expandedIds.set(['vegetables', 'leafy']);
      host.nodes = [
        {
          id: 'vegetables',
          label: 'Vegetables',
          children: [
            { id: 'carrot', label: 'Carrot', disabled: true },
            { id: 'leek', label: 'Leek' },
          ],
        },
      ];
      fixture.detectChanges();

      press('ArrowRight');

      expect(focusedId()).toBe('leek');
    });

    it('does nothing on ArrowRight from a leaf', () => {
      clickChevron('fruits');
      press('ArrowDown');

      press('ArrowRight');

      expect(focusedId()).toBe('apple');
      expect(host.expandedIds()).toEqual(['fruits']);
    });

    it('collapses an expanded branch with ArrowLeft, then climbs to the parent', () => {
      clickChevron('fruits');

      press('ArrowLeft');

      expect(host.expandedIds()).not.toContain('fruits');

      clickChevron('fruits');
      press('ArrowDown');
      press('ArrowLeft');

      expect(focusedId()).toBe('fruits');
    });

    it('selects the focused node on Enter and Space', () => {
      press('Enter');

      expect(host.selectedId()).toBe('fruits');

      press('End');
      press(' ');

      expect(host.selectedId()).toBe('vegetables');
    });

    it('ignores keys entirely while disabled', () => {
      host.disabled = true;
      fixture.detectChanges();

      press('ArrowRight');
      press('ArrowDown');

      expect(host.expandedIds()).toEqual([]);
      expect(host.selectedId()).toBeNull();
    });

    it('mirrors the horizontal arrows under dir="rtl"', () => {
      const list = fixture.nativeElement.querySelector('.ea-tree__list') as HTMLElement;
      // jsdom does not resolve the dir attribute into a computed direction, so
      // report rtl for the tree itself and let every other lookup through
      const computed = window.getComputedStyle.bind(window);
      vi.spyOn(window, 'getComputedStyle').mockImplementation((el, pseudo) =>
        el === list
          ? ({ direction: 'rtl' } as CSSStyleDeclaration)
          : computed(el, pseudo),
      );

      // ArrowLeft points towards the child indent in RTL, so it expands
      press('ArrowLeft');

      expect(host.expandedIds()).toContain('fruits');

      press('ArrowRight');

      expect(host.expandedIds()).not.toContain('fruits');
    });
  });
});

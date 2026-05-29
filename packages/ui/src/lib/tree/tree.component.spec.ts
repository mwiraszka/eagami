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
});

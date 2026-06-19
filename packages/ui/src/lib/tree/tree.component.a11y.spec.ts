import { axe } from 'vitest-axe';

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TreeComponent } from './tree.component';
import type { TreeNode } from './tree.types';

const SAMPLE_TREE: TreeNode[] = [
  {
    id: 'fruits',
    label: 'Fruits',
    children: [
      { id: 'apple', label: 'Apple' },
      { id: 'banana', label: 'Banana', disabled: true },
    ],
  },
  {
    id: 'vegetables',
    label: 'Vegetables',
    children: [{ id: 'carrot', label: 'Carrot' }],
  },
];

@Component({
  imports: [TreeComponent],
  template: `
    <ea-tree
      aria-label="Test tree"
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

describe('TreeComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations in the default collapsed state', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with branches expanded', async () => {
    const el = await render(host => host.expandedIds.set(['fruits', 'vegetables']));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a selected node', async () => {
    const el = await render(host => {
      host.expandedIds.set(['fruits']);
      host.selectedId.set('apple');
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => {
      host.disabled = true;
      host.expandedIds.set(['fruits']);
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

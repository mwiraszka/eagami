import { axe } from 'vitest-axe';

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TransferListComponent } from './transfer-list.component';
import type { TransferListItem } from './transfer-list.types';

const ITEMS: TransferListItem[] = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta' },
  { id: 'c', label: 'Gamma' },
  { id: 'd', label: 'Delta', disabled: true },
];

@Component({
  imports: [TransferListComponent],
  template: `
    <ea-transfer-list
      sourceLabel="Available roles"
      targetLabel="Assigned roles"
      [items]="items"
      [(selectedIds)]="selectedIds"
      [disabled]="disabled" />
  `,
})
class HostComponent {
  items: TransferListItem[] = ITEMS;
  selectedIds = signal<readonly string[]>([]);
  disabled = false;
}

describe('TransferListComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations in the default state', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with items split across panes', async () => {
    const el = await render(host => host.selectedIds.set(['a', 'c']));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

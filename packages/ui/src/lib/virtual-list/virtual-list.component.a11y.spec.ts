import { axe } from 'jest-axe';

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { VirtualListComponent } from './virtual-list.component';

interface Row {
  id: number;
  label: string;
}

const ROWS: Row[] = Array.from({ length: 200 }, (_, i) => ({
  id: i,
  label: `Item ${i}`,
}));

@Component({
  imports: [VirtualListComponent],
  template: `
    <h2 id="vl-heading">Items</h2>
    <ea-virtual-list
      [attr.aria-labelledby]="'vl-heading'"
      role="listbox"
      [items]="items()"
      [itemHeight]="32"
      [viewportHeight]="200">
      <ng-template
        #item
        let-row
        let-i="index">
        <div
          role="option"
          [attr.aria-posinset]="i + 1"
          [attr.aria-setsize]="totalSize"
          tabindex="-1">
          {{ row.label }}
        </div>
      </ng-template>
    </ea-virtual-list>
  `,
})
class HostComponent {
  items = signal<readonly Row[]>(ROWS);
  totalSize = ROWS.length;
}

describe('VirtualListComponent a11y', () => {
  async function render() {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations when consumed with explicit listbox ARIA', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { type DataTableColumn, DataTableComponent } from './data-table.component';

interface TestRow {
  id: number;
  name: string;
  age: number;
}

const TEST_COLUMNS: DataTableColumn<TestRow>[] = [
  { key: 'id', label: 'ID', sortable: true, width: '60px' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'age', label: 'Age', sortable: true, align: 'right' },
];

const TEST_DATA: TestRow[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
];

@Component({
  imports: [DataTableComponent],
  template: `
    <ea-data-table
      [columns]="columns"
      [data]="data" />
  `,
})
class HostComponent {
  columns: DataTableColumn<TestRow>[] = TEST_COLUMNS;
  data: TestRow[] = TEST_DATA;
}

describe('DataTableComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations with rows of data', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the empty state', async () => {
    const el = await render(host => (host.data = []));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

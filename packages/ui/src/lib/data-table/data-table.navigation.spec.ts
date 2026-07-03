import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { type DataTableColumn, DataTableComponent } from './data-table.component';

interface Row {
  id: number;
  name: string;
  age: number;
}

const COLUMNS: DataTableColumn<Row>[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'age', label: 'Age' },
];

const DATA: Row[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
];

describe('DataTableComponent grid keyboard navigation', () => {
  let fixture: ComponentFixture<DataTableComponent<Row>>;

  async function setup(navigable = true): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent<DataTableComponent<Row>>(DataTableComponent);
    document.body.appendChild(fixture.nativeElement);
    fixture.componentRef.setInput('columns', COLUMNS);
    fixture.componentRef.setInput('data', DATA);
    fixture.componentRef.setInput('navigable', navigable);
    fixture.detectChanges();
  }

  function table(): HTMLElement {
    return fixture.nativeElement.querySelector('table')!;
  }

  function cell(row: number, col: number): HTMLElement | null {
    return fixture.nativeElement.querySelector(`[data-ea-cell="${row}-${col}"]`);
  }

  function press(key: string, opts: KeyboardEventInit = {}): void {
    table().dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, ...opts }));
    fixture.detectChanges();
  }

  /** The `data-ea-cell` id of the single tabbable (roving) cell. */
  function rovingCell(): string | null {
    const active = fixture.nativeElement.querySelector('[data-ea-cell][tabindex="0"]');
    return active?.getAttribute('data-ea-cell') ?? null;
  }

  afterEach(() => {
    fixture.nativeElement.remove();
    fixture.destroy();
  });

  it('marks the table as a grid with row and cell roles', async () => {
    await setup();

    expect(table().getAttribute('role')).toBe('grid');
    expect(cell(0, 0)?.getAttribute('role')).toBe('columnheader');
    expect(cell(1, 0)?.getAttribute('role')).toBe('gridcell');
  });

  it('exposes exactly one tabbable cell, starting at the first header', async () => {
    await setup();

    const tabbable = fixture.nativeElement.querySelectorAll(
      '[data-ea-cell][tabindex="0"]',
    );
    expect(tabbable).toHaveLength(1);
    expect(rovingCell()).toBe('0-0');
  });

  it('removes sort buttons from the tab order so the roving cell stays the only stop', async () => {
    await setup();

    const buttons = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLButtonElement>('.ea-data-table__sort-button');

    expect(buttons).toHaveLength(2);
    buttons.forEach(button => {
      expect(button.getAttribute('tabindex')).toBe('-1');
    });
  });

  it('moves the roving cell with the arrow keys', async () => {
    await setup();

    press('ArrowRight');
    expect(rovingCell()).toBe('0-1');

    press('ArrowDown');
    expect(rovingCell()).toBe('1-1');

    press('ArrowLeft');
    expect(rovingCell()).toBe('1-0');

    press('ArrowUp');
    expect(rovingCell()).toBe('0-0');
  });

  it('clamps at the grid edges', async () => {
    await setup();

    press('ArrowLeft');
    press('ArrowUp');
    expect(rovingCell()).toBe('0-0');
  });

  it('jumps to row ends with Home/End and grid corners with Ctrl', async () => {
    await setup();

    press('End');
    expect(rovingCell()).toBe('0-2');

    press('Home');
    expect(rovingCell()).toBe('0-0');

    press('End', { ctrlKey: true });
    expect(rovingCell()).toBe('3-2');

    press('Home', { ctrlKey: true });
    expect(rovingCell()).toBe('0-0');
  });

  it('moves DOM focus to the active cell', async () => {
    await setup();

    press('ArrowDown');

    expect(document.activeElement).toBe(cell(1, 0));
  });

  it('sorts when Enter is pressed on a sortable header', async () => {
    await setup();

    cell(0, 0)!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
    );
    fixture.detectChanges();

    expect(fixture.componentInstance.sort()).toEqual({ column: 'id', direction: 'asc' });
  });

  it('stays a plain table with no focusable body cells when not navigable', async () => {
    await setup(false);

    expect(table().getAttribute('role')).toBeNull();
    expect(cell(1, 0)).toBeNull();
    const bodyCell = fixture.nativeElement.querySelector('tbody td');
    expect(bodyCell.getAttribute('tabindex')).toBeNull();
  });
});

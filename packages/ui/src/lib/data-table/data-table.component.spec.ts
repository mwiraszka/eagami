import { Component, type TemplateRef, computed, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import {
  type DataTableColumn,
  DataTableComponent,
  type DataTableRowContextMenuEvent,
  type DataTableSortState,
} from './data-table.component';

interface TestRow {
  id: number;
  name: string;
  age: number;
}

type PlaceholderTemplate = TemplateRef<{
  $implicit: DataTableColumn<TestRow>;
  index: number;
}>;

@Component({
  imports: [DataTableComponent],
  template: `
    <ea-data-table
      [columns]="columns()"
      [data]="data"
      [loading]="true"
      [loadingRowCount]="2" />
    <ng-template
      #placeholder
      let-col
      let-index="index">
      <span class="custom-placeholder">{{ col.key }}-{{ index }}</span>
    </ng-template>
  `,
})
class PlaceholderHostComponent {
  readonly data: TestRow[] = [];
  private readonly placeholder = viewChild.required<PlaceholderTemplate>('placeholder');
  readonly columns = computed<DataTableColumn<TestRow>[]>(() => [
    { key: 'name', label: 'Name', placeholderTemplate: this.placeholder() },
    { key: 'age', label: 'Age' },
  ]);
}

describe('DataTableComponent', () => {
  let fixture: ComponentFixture<DataTableComponent<TestRow>>;
  let component: DataTableComponent<TestRow>;

  const testColumns: DataTableColumn<TestRow>[] = [
    { key: 'id', label: 'ID', sortable: true, width: '60px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true, align: 'right' },
  ];

  const testData: TestRow[] = [
    { id: 1, name: 'Charlie', age: 30 },
    { id: 2, name: 'Alice', age: 25 },
    { id: 3, name: 'Bob', age: 35 },
  ];

  function getHeaderCells(): HTMLElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.ea-data-table__cell--header'),
    );
  }

  function getSortButtons(): HTMLButtonElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.ea-data-table__sort-button'),
    );
  }

  function getBodyRows(): HTMLElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll(
        '.ea-data-table__body .ea-data-table__row:not(.ea-data-table__row--empty)',
      ),
    );
  }

  function getCellsInRow(row: HTMLElement): HTMLElement[] {
    return Array.from(row.querySelectorAll('.ea-data-table__cell'));
  }

  function getEmptyRow(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.ea-data-table__row--empty');
  }

  function getHost(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-data-table')!;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent<DataTableComponent<TestRow>>(DataTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columns', testColumns);
    fixture.componentRef.setInput('data', testData);
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders a table with header cells matching columns', () => {
      expect(getHeaderCells()).toHaveLength(3);
      expect(getHeaderCells()[0].textContent).toContain('ID');
      expect(getHeaderCells()[1].textContent).toContain('Name');
      expect(getHeaderCells()[2].textContent).toContain('Age');
    });

    it('renders body rows matching data', () => {
      expect(getBodyRows()).toHaveLength(3);
    });

    it('renders cell values from data', () => {
      const firstRowCells = getCellsInRow(getBodyRows()[0]);

      expect(firstRowCells[0].textContent?.trim()).toBe('1');
      expect(firstRowCells[1].textContent?.trim()).toBe('Charlie');
      expect(firstRowCells[2].textContent?.trim()).toBe('30');
    });

    it('applies column width via style', () => {
      expect(getHeaderCells()[0].style.width).toBe('60px');
    });

    it('applies the column width to body cells too so sticky columns stay aligned', () => {
      const firstBodyRowCells = getCellsInRow(getBodyRows()[0]);

      expect(firstBodyRowCells[0].style.width).toBe('60px');
    });

    it('applies right-align class for right-aligned column', () => {
      expect(getHeaderCells()[2].classList).toContain('ea-data-table__cell--align-right');
    });

    it('shows empty message when data is empty', () => {
      fixture.componentRef.setInput('data', []);
      fixture.detectChanges();

      expect(getEmptyRow()).toBeTruthy();
      expect(getEmptyRow()!.textContent).toContain('No data available');
    });

    it('shows custom noDataText', () => {
      fixture.componentRef.setInput('data', []);
      fixture.componentRef.setInput('noDataText', 'Nothing here');
      fixture.detectChanges();

      expect(getEmptyRow()!.textContent).toContain('Nothing here');
    });

    it('announces the empty state via role="status"', () => {
      fixture.componentRef.setInput('data', []);
      fixture.detectChanges();

      const status = getEmptyRow()!.querySelector('[role="status"]');

      expect(status?.textContent).toContain('No data available');
    });

    it('sets colspan on empty row to match column count', () => {
      fixture.componentRef.setInput('data', []);
      fixture.detectChanges();

      const td = getEmptyRow()!.querySelector('td')!;

      expect(td.getAttribute('colspan')).toBe('3');
    });
  });

  describe('Row links', () => {
    const hrefOf = (row: TestRow) => (row.id === 3 ? null : `/rows/${row.id}`);

    function getRowLinks(row: HTMLElement): HTMLAnchorElement[] {
      return Array.from(row.querySelectorAll('.ea-data-table__row-link'));
    }

    beforeEach(() => {
      fixture.componentRef.setInput('clickable', true);
      fixture.componentRef.setInput('rowHref', hrefOf);
      fixture.detectChanges();
    });

    it('links every cell of a row to its target', () => {
      const links = getRowLinks(getBodyRows()[0]);

      expect(links).toHaveLength(3);
      expect(links.every(link => link.getAttribute('href') === '/rows/1')).toBe(true);
      expect(links[0].textContent).toContain('1');
      expect(links[1].textContent).toContain('Charlie');
    });

    it('exposes only the first cell of a row as a link to assistive technology', () => {
      const links = getRowLinks(getBodyRows()[0]);

      expect(links[0].getAttribute('aria-hidden')).toBeNull();
      expect(links[1].getAttribute('aria-hidden')).toBe('true');
      expect(links.every(link => link.getAttribute('tabindex') === '-1')).toBe(true);
    });

    it('leaves a row without a target as plain cells', () => {
      expect(getRowLinks(getBodyRows()[2])).toHaveLength(0);
    });

    it('leaves a row without a target inert', () => {
      const activated: TestRow[] = [];
      component.rowActivate.subscribe(row => activated.push(row));
      const [linked, , inert] = getBodyRows();

      inert.click();
      inert.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

      expect(inert.classList.contains('ea-data-table__row--inert')).toBe(true);
      expect(inert.getAttribute('tabindex')).toBeNull();
      expect(linked.classList.contains('ea-data-table__row--inert')).toBe(false);
      expect(linked.getAttribute('tabindex')).toBe('0');
      expect(activated).toEqual([]);
    });

    it('routes a plain click through rowActivate instead of the browser', () => {
      const activated: TestRow[] = [];
      component.rowActivate.subscribe(row => activated.push(row));
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });

      getRowLinks(getBodyRows()[0])[1].dispatchEvent(event);

      expect(activated).toEqual([testData[0]]);
      expect(event.defaultPrevented).toBe(true);
    });

    it('leaves a modified click to the browser', () => {
      const activated: TestRow[] = [];
      component.rowActivate.subscribe(row => activated.push(row));
      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        metaKey: true,
      });

      getRowLinks(getBodyRows()[0])[1].dispatchEvent(event);

      expect(activated).toEqual([]);
      expect(event.defaultPrevented).toBe(false);
    });

    it('marks the table as linked', () => {
      expect(getHost().classList.contains('ea-data-table--linked')).toBe(true);
    });
  });

  describe('Loading', () => {
    function getPlaceholderRows(): HTMLElement[] {
      return Array.from(
        fixture.nativeElement.querySelectorAll('.ea-data-table__row--placeholder'),
      );
    }

    function getTable(): HTMLTableElement {
      return fixture.nativeElement.querySelector('.ea-data-table__table');
    }

    beforeEach(() => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
    });

    it('renders placeholder rows in place of the data', () => {
      expect(getPlaceholderRows()).toHaveLength(5);
      expect(fixture.nativeElement.textContent).not.toContain('Charlie');
      expect(getEmptyRow()).toBeNull();
    });

    it('renders as many placeholder rows as loadingRowCount asks for', () => {
      fixture.componentRef.setInput('loadingRowCount', 2);
      fixture.detectChanges();

      expect(getPlaceholderRows()).toHaveLength(2);
    });

    it('fills every placeholder cell with a skeleton bar by default', () => {
      const cells = getCellsInRow(getPlaceholderRows()[0]);

      expect(cells).toHaveLength(3);
      expect(cells.every(cell => cell.querySelector('ea-skeleton'))).toBe(true);
    });

    it("keeps each column's width and alignment on its placeholder cells", () => {
      const cells = getCellsInRow(getPlaceholderRows()[0]);

      expect(cells[0].style.width).toBe('60px');
      expect(cells[2].classList).toContain('ea-data-table__cell--align-right');
    });

    it('marks the table busy and hides the placeholders from assistive technology', () => {
      expect(getTable().getAttribute('aria-busy')).toBe('true');
      expect(
        getPlaceholderRows().every(row => row.getAttribute('aria-hidden') === 'true'),
      ).toBe(true);
    });

    it('shows the data again, no longer busy, once loading ends', () => {
      fixture.componentRef.setInput('loading', false);
      fixture.detectChanges();

      expect(getPlaceholderRows()).toHaveLength(0);
      expect(getBodyRows()).toHaveLength(3);
      expect(getTable().hasAttribute('aria-busy')).toBe(false);
    });

    it('neither activates nor reports a placeholder row', () => {
      const activated: TestRow[] = [];
      const requested: DataTableRowContextMenuEvent<TestRow>[] = [];
      component.rowActivate.subscribe(row => activated.push(row));
      component.rowContextMenu.subscribe(request => requested.push(request));
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();
      const row = getPlaceholderRows()[0];

      row.click();
      row.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, button: 2 }));

      expect(activated).toEqual([]);
      expect(requested).toEqual([]);
      expect(row.getAttribute('tabindex')).toBeNull();
    });

    it('keeps grid navigation to the header row while loading', () => {
      fixture.componentRef.setInput('navigable', true);
      fixture.detectChanges();
      const table = getTable();
      const press = (key: string): void => {
        table.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
        fixture.detectChanges();
      };

      press('ArrowRight');
      press('ArrowDown');

      expect(document.activeElement?.getAttribute('data-ea-cell')).toBe('0-1');
      expect(getPlaceholderRows()[0].querySelector('[data-ea-cell]')).toBeNull();
    });

    it("renders a column's placeholder template with the column and row index", () => {
      const host = TestBed.createComponent(PlaceholderHostComponent);
      host.detectChanges();
      const root: HTMLElement = host.nativeElement;

      const custom = Array.from(
        root.querySelectorAll<HTMLElement>('.custom-placeholder'),
        el => el.textContent,
      );

      expect(custom).toEqual(['name-0', 'name-1']);
      expect(root.querySelectorAll('ea-skeleton')).toHaveLength(2);
      host.destroy();
    });
  });

  describe('Row context menu', () => {
    let requests: DataTableRowContextMenuEvent<TestRow>[];

    function contextMenuAt(target: HTMLElement, init: MouseEventInit = {}): MouseEvent {
      const event = new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        button: 2,
        ...init,
      });
      target.dispatchEvent(event);
      return event;
    }

    function shiftF10(target: HTMLElement, init: KeyboardEventInit = {}): KeyboardEvent {
      const event = new KeyboardEvent('keydown', {
        key: 'F10',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
        ...init,
      });
      target.dispatchEvent(event);
      return event;
    }

    beforeEach(() => {
      requests = [];
      component.rowContextMenu.subscribe(request => requests.push(request));
    });

    it('reports a right-click with the row, its element and the pointer', () => {
      const row = getBodyRows()[0];

      const event = contextMenuAt(getCellsInRow(row)[1], { clientX: 30, clientY: 40 });

      expect(requests).toHaveLength(1);
      expect(requests[0].row).toEqual(testData[0]);
      expect(requests[0].rowElement).toBe(row);
      expect(requests[0].point).toEqual({ x: 30, y: 40 });
      expect(requests[0].event).toBe(event);
    });

    it('leaves suppressing the browser menu to the consumer', () => {
      const event = contextMenuAt(getBodyRows()[0]);

      expect(event.defaultPrevented).toBe(false);
    });

    it('reports Shift+F10 on a focused row, pointing below it', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();
      const row = getBodyRows()[1];
      row.getBoundingClientRect = () => new DOMRect(10, 20, 300, 40);

      const event = shiftF10(row);

      expect(requests).toHaveLength(1);
      expect(requests[0].row).toEqual(testData[1]);
      expect(requests[0].point).toEqual({ x: 10, y: 60 });
      expect(requests[0].event).toBe(event);
    });

    it('reports Shift+F10 from a focused grid cell, pointing below the cell', () => {
      fixture.componentRef.setInput('navigable', true);
      fixture.detectChanges();
      const cell = getCellsInRow(getBodyRows()[2])[1];
      cell.getBoundingClientRect = () => new DOMRect(100, 200, 80, 30);

      shiftF10(cell);

      expect(requests[0].row).toEqual(testData[2]);
      expect(requests[0].point).toEqual({ x: 100, y: 230 });
    });

    it('ignores F10 without Shift, or with another modifier', () => {
      const row = getBodyRows()[0];

      shiftF10(row, { shiftKey: false });
      shiftF10(row, { ctrlKey: true });
      row.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));

      expect(requests).toEqual([]);
    });

    it("does not report the browser's follow-up to an unclaimed Shift+F10 again", () => {
      const row = getBodyRows()[0];

      shiftF10(row);
      contextMenuAt(row, { button: 0 });

      expect(requests).toHaveLength(1);
    });

    it('reports the next request once the key is released', () => {
      const row = getBodyRows()[0];
      shiftF10(row);
      row.dispatchEvent(new KeyboardEvent('keyup', { key: 'F10', bubbles: true }));

      contextMenuAt(row);

      expect(requests).toHaveLength(2);
    });

    it('reports a right-click that starts with a pointer press', () => {
      const row = getBodyRows()[0];
      shiftF10(row);
      row.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));

      contextMenuAt(row);

      expect(requests).toHaveLength(2);
    });

    it('expects no follow-up once a Shift+F10 is claimed', () => {
      const claim = component.rowContextMenu.subscribe(request =>
        request.event.preventDefault(),
      );
      const row = getBodyRows()[0];
      shiftF10(row);

      contextMenuAt(row);

      expect(requests).toHaveLength(2);
      claim.unsubscribe();
    });
  });

  describe('Sizing rows', () => {
    const sizingRows: TestRow[] = [
      { id: 999, name: 'Bartholomew Montgomery-Fitzgerald', age: 100 },
    ];

    function getSizingGroup(): HTMLElement | null {
      return fixture.nativeElement.querySelector('.ea-data-table__sizing');
    }

    function getSizingRows(): HTMLElement[] {
      return Array.from(
        fixture.nativeElement.querySelectorAll(
          '.ea-data-table__sizing .ea-data-table__row',
        ),
      );
    }

    it('renders no sizing row group by default', () => {
      expect(getSizingGroup()).toBeNull();
    });

    it('renders each sizing row with the same cells as a data row', () => {
      fixture.componentRef.setInput('sizingRows', sizingRows);
      fixture.detectChanges();

      const cells = getCellsInRow(getSizingRows()[0]);

      expect(getSizingRows()).toHaveLength(1);
      expect(cells).toHaveLength(3);
      expect(cells[1].textContent).toContain('Bartholomew Montgomery-Fitzgerald');
      expect(cells[0].style.width).toBe('60px');
    });

    it('formats sizing cells like data cells', () => {
      const columns = testColumns.map(col =>
        col.key === 'age' ? { ...col, format: (v: unknown) => `${v} years` } : col,
      );
      fixture.componentRef.setInput('columns', columns);
      fixture.componentRef.setInput('sizingRows', sizingRows);
      fixture.detectChanges();

      expect(getCellsInRow(getSizingRows()[0])[2].textContent).toContain('100 years');
    });

    it('keeps sizing rows out of the body and the accessibility tree', () => {
      fixture.componentRef.setInput('sizingRows', sizingRows);
      fixture.detectChanges();

      expect(getBodyRows()).toHaveLength(3);
      expect(getSizingGroup()?.getAttribute('aria-hidden')).toBe('true');
    });

    it('leaves sizing cells out of grid navigation', () => {
      fixture.componentRef.setInput('navigable', true);
      fixture.componentRef.setInput('sizingRows', sizingRows);
      fixture.detectChanges();

      expect(getSizingRows()[0].querySelector('[data-ea-cell]')).toBeNull();
      expect(getBodyRows()[0].querySelector('[data-ea-cell]')).not.toBeNull();
    });
  });

  describe('Density', () => {
    it('applies comfortable class by default', () => {
      expect(getHost().classList).toContain('ea-data-table--comfortable');
    });

    it('applies compact class', () => {
      fixture.componentRef.setInput('density', 'compact');
      fixture.detectChanges();

      expect(getHost().classList).toContain('ea-data-table--compact');
    });

    it('applies spacious class', () => {
      fixture.componentRef.setInput('density', 'spacious');
      fixture.detectChanges();

      expect(getHost().classList).toContain('ea-data-table--spacious');
    });
  });

  describe('Visual options', () => {
    it('applies striped class when enabled', () => {
      fixture.componentRef.setInput('striped', true);
      fixture.detectChanges();

      expect(getHost().classList).toContain('ea-data-table--striped');
    });

    it('does not apply striped class by default', () => {
      expect(getHost().classList).not.toContain('ea-data-table--striped');
    });

    it('applies hoverable class by default', () => {
      expect(getHost().classList).toContain('ea-data-table--hoverable');
    });

    it('does not apply hoverable class when disabled', () => {
      fixture.componentRef.setInput('hoverable', false);
      fixture.detectChanges();

      expect(getHost().classList).not.toContain('ea-data-table--hoverable');
    });

    it('applies nowrap class when enabled', () => {
      fixture.componentRef.setInput('nowrap', true);
      fixture.detectChanges();

      expect(getHost().classList.contains('ea-data-table--nowrap')).toBe(true);
    });

    it('applies bordered class when enabled', () => {
      fixture.componentRef.setInput('bordered', true);
      fixture.detectChanges();

      expect(getHost().classList).toContain('ea-data-table--bordered');
    });

    it('applies sticky class when enabled', () => {
      fixture.componentRef.setInput('stickyHeader', true);
      fixture.detectChanges();

      expect(getHost().classList).toContain('ea-data-table--sticky');
    });
  });

  describe('Sorting', () => {
    it('marks sortable columns with sortable class', () => {
      expect(getHeaderCells()[0].classList).toContain('ea-data-table__cell--sortable');
    });

    it('sets aria-sort to none on unsorted sortable columns', () => {
      expect(getHeaderCells()[0].getAttribute('aria-sort')).toBe('none');
    });

    it('sorts ascending on first click', () => {
      getSortButtons()[1].click();
      fixture.detectChanges();

      const names = getBodyRows().map(r => getCellsInRow(r)[1].textContent?.trim());

      expect(names).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('sets aria-sort to ascending after first click', () => {
      getSortButtons()[1].click();
      fixture.detectChanges();

      expect(getHeaderCells()[1].getAttribute('aria-sort')).toBe('ascending');
    });

    it('sorts descending on second click', () => {
      getSortButtons()[1].click();
      fixture.detectChanges();

      getSortButtons()[1].click();
      fixture.detectChanges();

      const names = getBodyRows().map(r => getCellsInRow(r)[1].textContent?.trim());

      expect(names).toEqual(['Charlie', 'Bob', 'Alice']);
    });

    it('sets aria-sort to descending after second click', () => {
      getSortButtons()[1].click();
      fixture.detectChanges();

      getSortButtons()[1].click();
      fixture.detectChanges();

      expect(getHeaderCells()[1].getAttribute('aria-sort')).toBe('descending');
    });

    it('clears sort on third click', () => {
      getSortButtons()[1].click();
      fixture.detectChanges();

      getSortButtons()[1].click();
      fixture.detectChanges();

      getSortButtons()[1].click();
      fixture.detectChanges();

      const names = getBodyRows().map(r => getCellsInRow(r)[1].textContent?.trim());

      expect(names).toEqual(['Charlie', 'Alice', 'Bob']);
    });

    it('sorts numerically for number columns', () => {
      getSortButtons()[2].click();
      fixture.detectChanges();

      const ages = getBodyRows().map(r => getCellsInRow(r)[2].textContent?.trim());

      expect(ages).toEqual(['25', '30', '35']);
    });

    it('emits sorted on header click', () => {
      const spy = vi.fn();
      component.sorted.subscribe(spy);

      getSortButtons()[1].click();

      expect(spy).toHaveBeenCalledWith<[DataTableSortState]>({
        column: 'name',
        direction: 'asc',
      });
    });

    it('updates sort model on header click', () => {
      getSortButtons()[0].click();

      expect(component.sort()).toEqual({ column: 'id', direction: 'asc' });
    });

    it('switches column when clicking a different sortable header', () => {
      getSortButtons()[0].click();
      fixture.detectChanges();

      getSortButtons()[1].click();
      fixture.detectChanges();

      expect(component.sort()).toEqual({ column: 'name', direction: 'asc' });
    });

    it('does not sort when a non-sortable column is clicked', () => {
      const cols: DataTableColumn<TestRow>[] = [
        { key: 'id', label: 'ID', sortable: false },
        { key: 'name', label: 'Name' },
      ];
      fixture.componentRef.setInput('columns', cols);
      fixture.detectChanges();

      getHeaderCells()[0].click();
      fixture.detectChanges();

      expect(getSortButtons()).toHaveLength(0);
      expect(component.sort().direction).toBeNull();
    });
  });

  describe('Keyboard', () => {
    it('renders each sortable header label inside a native button', () => {
      const buttons = getSortButtons();

      expect(buttons).toHaveLength(3);
      buttons.forEach(button => {
        expect(button.getAttribute('type')).toBe('button');
      });
      expect(buttons[1].textContent).toContain('Name');
    });

    it('does not make the header cell itself focusable', () => {
      expect(getHeaderCells()[0].getAttribute('tabindex')).toBeNull();
    });

    it('keeps the sort button in the natural tab order outside grid mode', () => {
      expect(getSortButtons()[0].getAttribute('tabindex')).toBeNull();
    });

    it('does not set tabindex on non-sortable headers', () => {
      const cols: DataTableColumn<TestRow>[] = [
        { key: 'id', label: 'ID', sortable: false },
      ];
      fixture.componentRef.setInput('columns', cols);
      fixture.detectChanges();

      expect(getHeaderCells()[0].getAttribute('tabindex')).toBeNull();
    });
  });

  describe('Data handling', () => {
    it('handles null values in sort without error', () => {
      const dataWithNull = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: null as unknown as string, age: 30 },
        { id: 3, name: 'Bob', age: 35 },
      ];
      fixture.componentRef.setInput('data', dataWithNull);
      fixture.detectChanges();

      getSortButtons()[1].click();
      fixture.detectChanges();

      expect(getBodyRows()).toHaveLength(3);
    });

    it('does not mutate original data array when sorting', () => {
      const original = [...testData];

      getSortButtons()[1].click();
      fixture.detectChanges();

      expect(testData).toEqual(original);
    });
  });

  describe('Accessible name', () => {
    function getTable(): HTMLTableElement {
      return fixture.nativeElement.querySelector('.ea-data-table__table');
    }

    it('renders no caption and no aria-label by default', () => {
      expect(getTable().querySelector('caption')).toBeNull();
      expect(getTable().hasAttribute('aria-label')).toBe(false);
    });

    it('names the table via aria-label', () => {
      fixture.componentRef.setInput('aria-label', 'Team members');
      fixture.detectChanges();

      expect(getTable().getAttribute('aria-label')).toBe('Team members');
    });

    it('renders a visible caption that supersedes aria-label', () => {
      fixture.componentRef.setInput('aria-label', 'Team members');
      fixture.componentRef.setInput('caption', 'Active staff');
      fixture.detectChanges();

      expect(getTable().querySelector('caption')?.textContent?.trim()).toBe(
        'Active staff',
      );
      expect(getTable().hasAttribute('aria-label')).toBe(false);
    });
  });

  /**
   * In `navigable` mode the table is a grid with a single roving tab stop, so a
   * broken bound leaves focus stranded off the edge or on a cell that no longer
   * exists. Row 0 is the header row; body rows start at 1.
   */
  describe('Grid keyboard navigation', () => {
    function activeCell(): string | null {
      return document.activeElement?.getAttribute('data-ea-cell') ?? null;
    }

    function gridKey(key: string, init: KeyboardEventInit = {}): void {
      const table: HTMLElement = fixture.nativeElement.querySelector(
        '.ea-data-table__table',
      );
      table.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, ...init }));
      fixture.detectChanges();
    }

    beforeEach(() => {
      fixture.componentRef.setInput('navigable', true);
      fixture.detectChanges();
    });

    it('walks across columns and down rows', () => {
      gridKey('ArrowRight');

      expect(activeCell()).toBe('0-1');

      gridKey('ArrowDown');

      expect(activeCell()).toBe('1-1');
    });

    it('stops at the first and last column instead of wrapping', () => {
      gridKey('ArrowLeft');

      expect(activeCell()).toBeNull();

      gridKey('End');

      expect(activeCell()).toBe('0-2');

      gridKey('ArrowRight');

      expect(activeCell()).toBe('0-2');
    });

    it('stops at the header row and the last body row', () => {
      gridKey('ArrowUp');

      expect(activeCell()).toBeNull();

      // Three rows of data plus the header
      for (let i = 0; i < 10; i++) {
        gridKey('ArrowDown');
      }

      expect(activeCell()).toBe('3-0');
    });

    it('jumps a page of rows at a time', () => {
      gridKey('PageDown');

      expect(activeCell()).toBe('3-0');

      gridKey('PageUp');

      expect(activeCell()).toBe('0-0');
    });

    it('jumps to the far corners with ctrl Home and End', () => {
      gridKey('End', { ctrlKey: true });

      expect(activeCell()).toBe('3-2');

      gridKey('Home', { ctrlKey: true });

      expect(activeCell()).toBe('0-0');
    });

    it('leaves unrelated keys to the browser', () => {
      gridKey('a');

      expect(activeCell()).toBeNull();
    });

    it('does nothing at all when navigable is off', () => {
      fixture.componentRef.setInput('navigable', false);
      fixture.detectChanges();

      gridKey('ArrowRight');

      expect(activeCell()).toBeNull();
    });
  });

  describe('Sort comparator', () => {
    interface MixedRow {
      id: number;
      name: string | null;
      score: number | null;
      flag: boolean;
      [key: string]: unknown;
    }

    const mixed: MixedRow[] = [
      { id: 1, name: 'banana', score: 3, flag: true },
      { id: 2, name: null, score: null, flag: false },
      { id: 3, name: 'apple', score: 10, flag: true },
    ];

    function render(column: string, direction: 'asc' | 'desc'): string[] {
      const local = TestBed.createComponent<DataTableComponent<MixedRow>>(
        DataTableComponent<MixedRow>,
      );
      local.componentRef.setInput('columns', [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'score', label: 'Score', sortable: true },
        { key: 'flag', label: 'Flag', sortable: true },
      ]);
      local.componentRef.setInput('data', mixed);
      local.componentRef.setInput('sort', { column, direction });
      local.detectChanges();
      return Array.from(
        local.nativeElement.querySelectorAll(
          '.ea-data-table__row:not(.ea-data-table__row--header)',
        ),
      ).map(row => (row as HTMLElement).querySelector('td')!.textContent!.trim());
    }

    it('orders numbers numerically, not as text', () => {
      // Lexical ordering would put 10 before 3
      expect(render('score', 'asc')).toEqual(['', 'banana', 'apple']);
    });

    it('orders strings with locale comparison', () => {
      expect(render('name', 'asc')).toEqual(['', 'apple', 'banana']);
    });

    it('sorts everything else by its string form', () => {
      const flags = render('flag', 'asc');

      expect(flags).toHaveLength(3);
    });

    it('sinks empty cells to the opposite end when the direction flips', () => {
      const asc = render('score', 'asc');
      const desc = render('score', 'desc');

      expect(asc[0]).toBe('');
      expect(desc[desc.length - 1]).toBe('');
    });

    it('leaves the order untouched with no active sort', () => {
      expect(render('', 'asc')).toEqual(['banana', '', 'apple']);
    });
  });
});

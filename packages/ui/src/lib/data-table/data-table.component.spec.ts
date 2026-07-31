import { type ComponentFixture, TestBed } from '@angular/core/testing';

import {
  type DataTableColumn,
  DataTableComponent,
  type DataTableSortState,
} from './data-table.component';

interface TestRow {
  id: number;
  name: string;
  age: number;
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
});

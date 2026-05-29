import { type ComponentFixture, TestBed } from '@angular/core/testing';

import type { SelectOption } from '../select-option';
import { MultiSelectComponent } from './multi-select.component';

const FRUITS: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
];

describe('MultiSelectComponent', () => {
  let fixture: ComponentFixture<MultiSelectComponent>;
  let component: MultiSelectComponent;

  function getTrigger(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-multi-select__trigger');
  }

  function getPopover(): HTMLElement | null {
    const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface || surface.style.display === 'none') {
      return null;
    }
    return surface.querySelector<HTMLElement>('.ea-multi-select__popover');
  }

  function getOptionRows(): HTMLElement[] {
    const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface) {
      return [];
    }
    return Array.from(
      surface.querySelectorAll(
        '.ea-multi-select__option:not(.ea-multi-select__option--select-all)',
      ),
    );
  }

  function getSelectAllRow(): HTMLElement | null {
    const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    return (
      surface?.querySelector<HTMLElement>('.ea-multi-select__option--select-all') ?? null
    );
  }

  function getSearchInput(): HTMLInputElement | null {
    const surface = document.body.querySelector<HTMLElement>('.ea-popover__surface');
    return (
      surface?.querySelector<HTMLInputElement>('.ea-multi-select__search-input') ?? null
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiSelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', FRUITS);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    document.querySelectorAll('.ea-popover__surface').forEach(node => node.remove());
  });

  describe('Rendering', () => {
    it('renders a trigger', () => {
      expect(getTrigger()).toBeTruthy();
    });

    it('shows placeholder when no value is selected', () => {
      expect(getTrigger().textContent).toContain('Select…');
    });

    it('does not show the popover by default', () => {
      expect(getPopover()).toBeNull();
    });

    it('renders chips for the current selection', () => {
      component.writeValue(['apple', 'cherry']);
      fixture.detectChanges();

      const chips = fixture.nativeElement.querySelectorAll('ea-tag');
      expect(chips.length).toBe(2);
    });

    it('caps chips at maxVisibleChips and shows +N more', () => {
      fixture.componentRef.setInput('maxVisibleChips', 2);
      component.writeValue(['apple', 'banana', 'cherry', 'date']);
      fixture.detectChanges();

      const chips = fixture.nativeElement.querySelectorAll('ea-tag');
      const more = fixture.nativeElement.querySelector('.ea-multi-select__more');
      expect(chips.length).toBe(2);
      expect(more.textContent.trim()).toBe('+2');
    });
  });

  describe('Opening and closing', () => {
    it('opens the popover on trigger click', () => {
      getTrigger().click();
      fixture.detectChanges();

      expect(getPopover()).toBeTruthy();
    });

    it('renders one option row per option', () => {
      getTrigger().click();
      fixture.detectChanges();

      expect(getOptionRows()).toHaveLength(FRUITS.length);
    });

    it('renders a select-all row by default', () => {
      getTrigger().click();
      fixture.detectChanges();

      expect(getSelectAllRow()).toBeTruthy();
    });

    it('omits the select-all row when selectAll is false', () => {
      fixture.componentRef.setInput('selectAll', false);
      getTrigger().click();
      fixture.detectChanges();

      expect(getSelectAllRow()).toBeNull();
    });

    it('renders a search input by default', () => {
      getTrigger().click();
      fixture.detectChanges();

      expect(getSearchInput()).toBeTruthy();
    });

    it('omits the search input when searchable is false', () => {
      fixture.componentRef.setInput('searchable', false);
      getTrigger().click();
      fixture.detectChanges();

      expect(getSearchInput()).toBeNull();
    });
  });

  describe('Toggling options', () => {
    it('selects an option on click', () => {
      getTrigger().click();
      fixture.detectChanges();

      getOptionRows()[0].click();

      expect(component.value()).toEqual(['apple']);
    });

    it('deselects an option on second click', () => {
      component.writeValue(['apple']);
      getTrigger().click();
      fixture.detectChanges();

      getOptionRows()[0].click();

      expect(component.value()).toEqual([]);
    });

    it('preserves options order across toggles', () => {
      getTrigger().click();
      fixture.detectChanges();

      getOptionRows()[2].click();
      getOptionRows()[0].click();

      expect(component.value()).toEqual(['apple', 'cherry']);
    });

    it('emits changed on toggle', () => {
      const spy = jest.fn();
      component.changed.subscribe(spy);
      getTrigger().click();
      fixture.detectChanges();

      getOptionRows()[1].click();

      expect(spy).toHaveBeenCalledWith(['banana']);
    });

    it('skips toggling on disabled options', () => {
      fixture.componentRef.setInput('options', [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B', disabled: true },
      ]);
      getTrigger().click();
      fixture.detectChanges();

      getOptionRows()[1].click();

      expect(component.value()).toEqual([]);
    });
  });

  describe('Chip removal', () => {
    it('removes a chip without opening the popover', () => {
      component.writeValue(['apple', 'cherry']);
      fixture.detectChanges();

      component.removeChip(FRUITS[0]);

      expect(component.value()).toEqual(['cherry']);
      expect(component.isOpen()).toBe(false);
    });

    it('clears all selections via the trigger × button', () => {
      component.writeValue(['apple', 'cherry']);
      fixture.detectChanges();

      const clearBtn = fixture.nativeElement.querySelector(
        '.ea-multi-select__clear',
      ) as HTMLButtonElement;
      clearBtn.click();

      expect(component.value()).toEqual([]);
    });

    it('hides the trigger × button when nothing is selected', () => {
      expect(fixture.nativeElement.querySelector('.ea-multi-select__clear')).toBeNull();
    });
  });

  describe('Search filter', () => {
    it('filters options by case-insensitive label match', () => {
      getTrigger().click();
      fixture.detectChanges();

      component.searchTerm.set('AN');
      fixture.detectChanges();

      expect(getOptionRows()).toHaveLength(1);
      expect(getOptionRows()[0].textContent).toContain('Banana');
    });

    it('renders an empty-state row when no options match', () => {
      getTrigger().click();
      fixture.detectChanges();

      component.searchTerm.set('xyz');
      fixture.detectChanges();

      expect(getOptionRows()).toHaveLength(0);
      const empty = document.body.querySelector('.ea-multi-select__empty');
      expect(empty).toBeTruthy();
    });
  });

  describe('Select all', () => {
    it('selects all filtered options when none are selected', () => {
      getTrigger().click();
      fixture.detectChanges();

      component.toggleSelectAll();

      expect(component.value()).toEqual(['apple', 'banana', 'cherry', 'date']);
    });

    it('clears the filtered selection when all are already selected', () => {
      component.writeValue(['apple', 'banana', 'cherry', 'date']);
      getTrigger().click();
      fixture.detectChanges();

      component.toggleSelectAll();

      expect(component.value()).toEqual([]);
    });

    it('select-all state is "all" when every filtered option is selected', () => {
      component.writeValue(['apple', 'banana', 'cherry', 'date']);
      expect(component.selectAllState()).toBe('all');
    });

    it('select-all state is "some" when partial', () => {
      component.writeValue(['apple']);
      expect(component.selectAllState()).toBe('some');
    });

    it('select-all state is "none" when nothing selected', () => {
      expect(component.selectAllState()).toBe('none');
    });

    it('toggling select-all only affects currently filtered options', () => {
      getTrigger().click();
      fixture.detectChanges();
      component.searchTerm.set('a'); // matches Apple, Banana, Date
      fixture.detectChanges();

      component.toggleSelectAll();

      expect(component.value().sort()).toEqual(['apple', 'banana', 'date']);
    });

    it('skips disabled options on select-all', () => {
      fixture.componentRef.setInput('options', [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B', disabled: true },
        { value: 'c', label: 'C' },
      ]);
      getTrigger().click();
      fixture.detectChanges();

      component.toggleSelectAll();

      expect(component.value()).toEqual(['a', 'c']);
    });
  });

  describe('Keyboard navigation', () => {
    it('opens on Enter from the trigger', () => {
      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();

      expect(getPopover()).toBeTruthy();
    });

    it('opens on ArrowDown from the trigger', () => {
      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(getPopover()).toBeTruthy();
    });

    it('moves focused index with ArrowDown / ArrowUp', () => {
      getTrigger().click();
      fixture.detectChanges();
      const search = getSearchInput()!;

      search.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
      );
      search.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
      );

      expect(component.focusedIndex()).toBe(1);
    });

    it('toggles the focused option on Enter', () => {
      getTrigger().click();
      fixture.detectChanges();
      component.focusedIndex.set(1);

      const search = getSearchInput()!;
      search.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

      expect(component.value()).toEqual(['banana']);
    });

    it('removes the last chip on Backspace when the trigger is focused and closed', () => {
      component.writeValue(['apple', 'banana']);
      fixture.detectChanges();

      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));

      expect(component.value()).toEqual(['apple']);
    });
  });

  describe('Disabled state', () => {
    it('marks the trigger aria-disabled when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(getTrigger().getAttribute('aria-disabled')).toBe('true');
    });

    it('does not open when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      getTrigger().click();
      fixture.detectChanges();

      expect(getPopover()).toBeNull();
    });
  });

  describe('Error and hint', () => {
    it('shows error message when set', () => {
      fixture.componentRef.setInput('errorMsg', 'Required');
      fixture.detectChanges();

      const msg = fixture.nativeElement.querySelector(
        '.ea-multi-select-field__message--error',
      );
      expect(msg.textContent).toContain('Required');
    });

    it('shows hint when set and no error', () => {
      fixture.componentRef.setInput('hint', 'Pick a few');
      fixture.detectChanges();

      const msg = fixture.nativeElement.querySelector(
        '.ea-multi-select-field__message--hint',
      );
      expect(msg.textContent).toContain('Pick a few');
    });

    it('hides hint when error is set', () => {
      fixture.componentRef.setInput('hint', 'Pick a few');
      fixture.componentRef.setInput('errorMsg', 'Required');
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelector('.ea-multi-select-field__message--hint'),
      ).toBeNull();
    });
  });

  describe('CVA', () => {
    it('writes a string array via writeValue', () => {
      component.writeValue(['apple', 'cherry']);

      expect(component.value()).toEqual(['apple', 'cherry']);
    });

    it('writes null/undefined via writeValue → empty array', () => {
      component.writeValue(['apple']);
      component.writeValue(null);

      expect(component.value()).toEqual([]);
    });

    it('calls onChange on selection', () => {
      const onChange: jest.Mock<void, [readonly string[]]> = jest.fn();
      component.registerOnChange(onChange);
      getTrigger().click();
      fixture.detectChanges();

      getOptionRows()[0].click();

      expect(onChange).toHaveBeenCalledWith(['apple']);
    });

    it('disables via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      expect(getTrigger().getAttribute('aria-disabled')).toBe('true');
    });
  });
});

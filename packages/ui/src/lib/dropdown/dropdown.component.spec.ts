import { type ComponentFixture, TestBed } from '@angular/core/testing';

import type { SelectOption, SelectOptionGroup } from '../select-option';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let fixture: ComponentFixture<DropdownComponent>;
  let component: DropdownComponent;

  const testOptions: SelectOption[] = [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Beta' },
    { value: 'c', label: 'Gamma', disabled: true },
  ];

  function getTrigger(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.ea-dropdown__trigger');
  }

  function getMenu(): HTMLElement | null {
    // `<ea-popover>` renders its surface unconditionally in `document.body`,
    // hidden via `display: none`; treat a hidden one as "no menu".
    const surface = document.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface || surface.style.display === 'none') {
      return null;
    }
    return surface.querySelector<HTMLElement>('.ea-dropdown__menu');
  }

  function getOptions(): HTMLElement[] {
    const surface = document.querySelector<HTMLElement>('.ea-popover__surface');
    if (!surface || surface.style.display === 'none') {
      return [];
    }
    return Array.from(surface.querySelectorAll('.ea-dropdown__option'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', testOptions);
    fixture.detectChanges();
  });

  afterEach(() => {
    // Destroy tears down the teleported surface; sweep any that a half-destroyed test left behind
    fixture.destroy();
    document.querySelectorAll('.ea-popover__surface').forEach(node => node.remove());
  });

  describe('Rendering', () => {
    it('renders a trigger button', () => {
      expect(getTrigger()).toBeTruthy();
    });

    it('shows placeholder when no value is selected', () => {
      expect(getTrigger().textContent).toContain('Select…');
    });

    it('shows the selected label when value is set', () => {
      component.value.set('a');
      fixture.detectChanges();
      expect(getTrigger().textContent).toContain('Alpha');
    });

    it('applies the default size class', () => {
      expect(getTrigger().classList).toContain('ea-dropdown__trigger--md');
    });

    it('does not show the menu by default', () => {
      expect(getMenu()).toBeNull();
    });

    it('renders a label when provided', () => {
      fixture.componentRef.setInput('label', 'Country');
      fixture.detectChanges();
      const label = fixture.nativeElement.querySelector('.ea-field-label');
      expect(label.textContent.trim()).toBe('Country');
    });
  });

  describe('Opening and closing', () => {
    it('opens the menu on trigger click', () => {
      getTrigger().click();
      fixture.detectChanges();
      expect(getMenu()).toBeTruthy();
      expect(getOptions()).toHaveLength(3);
    });

    it('closes the menu on second trigger click', () => {
      getTrigger().click();
      fixture.detectChanges();
      getTrigger().click();
      fixture.detectChanges();
      expect(getMenu()).toBeNull();
    });

    it('sets aria-expanded when open', () => {
      getTrigger().click();
      fixture.detectChanges();
      expect(getTrigger().getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('Selection', () => {
    it('selects an option on click', () => {
      getTrigger().click();
      fixture.detectChanges();
      getOptions()[1].click();
      fixture.detectChanges();
      expect(component.value()).toBe('b');
      expect(getTrigger().textContent).toContain('Beta');
    });

    it('emits changed event on selection', () => {
      const spy = vi.fn();
      component.changed.subscribe(spy);
      getTrigger().click();
      fixture.detectChanges();
      getOptions()[0].click();
      expect(spy).toHaveBeenCalledWith('a');
    });

    it('closes the menu after selection', () => {
      getTrigger().click();
      fixture.detectChanges();
      getOptions()[0].click();
      fixture.detectChanges();
      expect(getMenu()).toBeNull();
    });

    it('does not select a disabled option', () => {
      getTrigger().click();
      fixture.detectChanges();
      getOptions()[2].click();
      fixture.detectChanges();
      expect(component.value()).toBe('');
    });
  });

  describe('Disabled state', () => {
    it('disables the trigger when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(getTrigger().disabled).toBe(true);
    });

    it('does not open when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      getTrigger().click();
      fixture.detectChanges();
      expect(getMenu()).toBeNull();
    });
  });

  describe('Keyboard navigation', () => {
    it('opens on Enter key', () => {
      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();
      expect(getMenu()).toBeTruthy();
    });

    it('opens on ArrowDown key', () => {
      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();
      expect(getMenu()).toBeTruthy();
    });

    it('closes on Escape key', () => {
      getTrigger().click();
      fixture.detectChanges();
      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();
      expect(getMenu()).toBeNull();
    });
  });

  describe('Typeahead and focus movement', () => {
    // Two options share a first letter so repeat-key cycling is observable, and
    // the first and last are disabled so the edge jumps have something to skip
    const typeaheadOptions: SelectOption[] = [
      { value: 'almond', label: 'Almond', disabled: true },
      { value: 'beta', label: 'Beta' },
      { value: 'blueberry', label: 'Blueberry' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'date', label: 'Date', disabled: true },
    ];

    function press(key: string, modifiers: KeyboardEventInit = {}): void {
      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key, ...modifiers }));
      fixture.detectChanges();
    }

    function focusedLabel(): string | null {
      const focused = document.querySelector('.ea-dropdown__option--focused');
      return focused?.textContent?.trim() ?? null;
    }

    beforeEach(() => {
      vi.useFakeTimers();
      fixture.componentRef.setInput('options', typeaheadOptions);
      fixture.detectChanges();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('opens the list and focuses the first match when typing', () => {
      press('c');

      expect(getMenu()).toBeTruthy();
      expect(focusedLabel()).toBe('Cherry');
    });

    it('lands on an accented label typed plain', () => {
      fixture.componentRef.setInput('options', [
        ...typeaheadOptions,
        { value: 'jablko', label: 'Łódka' },
      ]);
      fixture.detectChanges();

      press('l');

      expect(focusedLabel()).toBe('Łódka');
    });

    it('narrows to a longer match as the query grows', () => {
      press('b');

      expect(focusedLabel()).toBe('Beta');

      press('l');

      expect(focusedLabel()).toBe('Blueberry');
    });

    it('cycles through matches when the same letter repeats', () => {
      press('b');

      expect(focusedLabel()).toBe('Beta');

      // The query resets after the idle window, so this is a fresh single-letter
      // press rather than a growing query
      vi.advanceTimersByTime(500);
      press('b');

      expect(focusedLabel()).toBe('Blueberry');
    });

    it('never lands typeahead on a disabled option', () => {
      press('a');

      expect(focusedLabel()).not.toBe('Almond');
    });

    it('opens onto the first selectable option when the first is disabled', () => {
      getTrigger().click();
      fixture.detectChanges();

      expect(focusedLabel()).toBe('Beta');
    });

    it('opens onto the selected option when there is one', () => {
      component.writeValue('cherry');
      fixture.detectChanges();

      getTrigger().click();
      fixture.detectChanges();

      expect(focusedLabel()).toBe('Cherry');
    });

    it('ignores keystrokes modified by ctrl, meta, or alt', () => {
      press('c', { ctrlKey: true });

      expect(getMenu()).toBeNull();
    });

    it('ignores non-character keys', () => {
      press('Shift');

      expect(getMenu()).toBeNull();
    });

    it('lets Space extend an in-progress query instead of selecting', () => {
      fixture.componentRef.setInput('options', [
        ...typeaheadOptions,
        { value: 'blue-cheese', label: 'Blue cheese' },
      ]);
      fixture.detectChanges();

      press('b');
      press('l');
      press('u');
      press('e');
      press(' ');

      expect(focusedLabel()).toBe('Blue cheese');
      expect(component.value()).toBe('');
    });

    it('selects the focused option on Space once no query is pending', () => {
      press('ArrowDown');

      expect(focusedLabel()).toBe('Beta');

      press(' ');

      expect(component.value()).toBe('beta');
    });

    it('jumps to the first and last enabled option with Home and End', () => {
      press('Home');

      expect(focusedLabel()).toBe('Beta');

      press('End');

      expect(focusedLabel()).toBe('Cherry');
    });

    it('steps over disabled options with the arrow keys', () => {
      press('End');

      expect(focusedLabel()).toBe('Cherry');

      // Date is disabled, so there is nowhere further down to go
      press('ArrowDown');

      expect(focusedLabel()).toBe('Cherry');

      press('ArrowUp');

      expect(focusedLabel()).toBe('Blueberry');
    });
  });

  describe('Error and hint', () => {
    it('shows error message when set', () => {
      fixture.componentRef.setInput('errorMsg', 'Required');
      fixture.detectChanges();
      const msg = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--error',
      );
      expect(msg.textContent).toContain('Required');
    });

    it('shows hint when set and no error', () => {
      fixture.componentRef.setInput('hint', 'Choose one');
      fixture.detectChanges();
      const msg = fixture.nativeElement.querySelector(
        '.ea-field-messages__message--hint',
      );
      expect(msg.textContent).toContain('Choose one');
    });

    it('hides hint when error is set', () => {
      fixture.componentRef.setInput('hint', 'Choose one');
      fixture.componentRef.setInput('errorMsg', 'Required');
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('.ea-field-messages__message--hint'),
      ).toBeNull();
    });
  });

  describe('CVA', () => {
    it('writes value via writeValue', () => {
      component.writeValue('b');
      fixture.detectChanges();
      expect(component.value()).toBe('b');
    });

    it('calls onChange on selection', () => {
      const onChange = vi.fn();
      component.registerOnChange(onChange);
      getTrigger().click();
      fixture.detectChanges();
      getOptions()[0].click();
      expect(onChange).toHaveBeenCalledWith('a');
    });

    it('disables via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      expect(getTrigger().disabled).toBe(true);
    });
  });

  describe('Option groups', () => {
    const groupedOptions: SelectOptionGroup[] = [
      {
        label: 'Recently used',
        options: [{ value: 'gamma', label: 'Gamma' }],
      },
      {
        label: 'All letters',
        options: [
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Beta' },
        ],
      },
    ];

    function getGroups(): HTMLElement[] {
      const surface = document.querySelector<HTMLElement>('.ea-popover__surface');
      return surface
        ? Array.from(surface.querySelectorAll<HTMLElement>('[role="group"]'))
        : [];
    }

    function getHeadings(): HTMLElement[] {
      const surface = document.querySelector<HTMLElement>('.ea-popover__surface');
      return surface
        ? Array.from(surface.querySelectorAll<HTMLElement>('.ea-dropdown__group-label'))
        : [];
    }

    function openGrouped(groups: SelectOptionGroup[] = groupedOptions): void {
      fixture.componentRef.setInput('options', groups);
      fixture.detectChanges();
      getTrigger().click();
      fixture.detectChanges();
    }

    it('wraps each group in a labelled role="group" container', () => {
      openGrouped();

      expect(getGroups().map(el => el.getAttribute('aria-label'))).toEqual([
        'Recently used',
        'All letters',
      ]);
      expect(getHeadings().map(el => el.textContent?.trim())).toEqual([
        'Recently used',
        'All letters',
      ]);
    });

    it('renders an unlabelled group as a rule with no heading', () => {
      openGrouped([
        { options: groupedOptions[0].options },
        { options: groupedOptions[1].options },
      ]);

      expect(document.querySelectorAll('.ea-dropdown__group--ruled')).toHaveLength(1);
      expect(getHeadings()).toHaveLength(0);
    });

    it('numbers the options across groups, counting options alone', () => {
      openGrouped();

      expect(getOptions().map(el => el.id)).toEqual([
        `${component.id()}-option-0`,
        `${component.id()}-option-1`,
        `${component.id()}-option-2`,
      ]);
    });

    it('walks straight from one group into the next on ArrowDown', () => {
      openGrouped();

      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(
        document.querySelector('.ea-dropdown__option--focused')?.textContent?.trim(),
      ).toBe('Alpha');
    });

    it('runs typeahead across every group', () => {
      openGrouped();

      getTrigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
      fixture.detectChanges();

      expect(
        document.querySelector('.ea-dropdown__option--focused')?.textContent?.trim(),
      ).toBe('Beta');
    });

    it('selects an option from a group like a flat one', () => {
      openGrouped();

      getOptions()[0].click();
      fixture.detectChanges();

      expect(component.value()).toBe('gamma');
      expect(getTrigger().textContent).toContain('Gamma');
    });

    it('leaves a flat option list ungrouped', () => {
      getTrigger().click();
      fixture.detectChanges();

      expect(getGroups()).toHaveLength(0);
      expect(getOptions()).toHaveLength(3);
    });
  });
});

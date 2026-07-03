import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandPaletteComponent } from './command-palette.component';
import type { CommandPaletteItem } from './command-palette.types';

const COMMANDS: CommandPaletteItem[] = [
  { id: 'new', label: 'New file', shortcut: 'Ctrl+N', group: 'File' },
  { id: 'open', label: 'Open file', shortcut: 'Ctrl+O', group: 'File' },
  { id: 'save', label: 'Save', shortcut: 'Ctrl+S', group: 'File', disabled: true },
  { id: 'find', label: 'Find', shortcut: 'Ctrl+F', group: 'Edit', keywords: ['search'] },
  { id: 'replace', label: 'Replace', shortcut: 'Ctrl+H', group: 'Edit' },
  { id: 'theme', label: 'Toggle theme', description: 'Switch light/dark mode' },
];

@Component({
  imports: [CommandPaletteComponent],
  template: `
    <ea-command-palette
      [items]="items"
      [(open)]="open"
      (execute)="lastExecuted = $event.id" />
  `,
})
class HostComponent {
  items: CommandPaletteItem[] = COMMANDS;
  open = signal<boolean>(true);
  lastExecuted: string | null = null;
}

describe('CommandPaletteComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  function getSearchInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('.ea-command-palette__input');
  }

  function getItems(): HTMLElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.ea-command-palette__item'),
    );
  }

  function getActiveItem(): HTMLElement | undefined {
    return getItems().find(el =>
      el.classList.contains('ea-command-palette__item--active'),
    );
  }

  function typeQuery(value: string): void {
    const input = getSearchInput();
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function press(key: string): void {
    getSearchInput().dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    // jsdom does not implement HTMLDialogElement.showModal/close
    HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute('open', '');
    };
    HTMLDialogElement.prototype.close = function () {
      this.removeAttribute('open');
      this.dispatchEvent(new Event('close'));
    };

    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders all non-disabled commands when the query is empty', () => {
    const labels = getItems().map(el =>
      el.querySelector('.ea-command-palette__item-label')?.textContent?.trim(),
    );
    // 'save' is disabled, so `filteredItems` omits it
    expect(labels).toEqual(['Toggle theme', 'New file', 'Open file', 'Find', 'Replace']);
  });

  it('filters by label substring', () => {
    typeQuery('file');

    const labels = getItems().map(el =>
      el.querySelector('.ea-command-palette__item-label')?.textContent?.trim(),
    );
    expect(labels).toEqual(['New file', 'Open file']);
  });

  it('filters by keywords (synonyms)', () => {
    typeQuery('search');

    const labels = getItems().map(el =>
      el.querySelector('.ea-command-palette__item-label')?.textContent?.trim(),
    );
    expect(labels).toEqual(['Find']);
  });

  it('matches by word prefix, not mid-word substring', () => {
    // "c" only appears mid-word in this fixture, and word-prefix matching ignores mid-word hits
    typeQuery('c');

    expect(getItems()).toHaveLength(0);
  });

  it('matches when the query is a prefix of any word', () => {
    typeQuery('rep');

    const labels = getItems().map(el =>
      el.querySelector('.ea-command-palette__item-label')?.textContent?.trim(),
    );
    expect(labels).toEqual(['Replace']);
  });

  it('shows the empty state when nothing matches', () => {
    typeQuery('nonexistent-thing');

    expect(getItems()).toHaveLength(0);
    expect(
      fixture.nativeElement.querySelector('.ea-command-palette__empty'),
    ).toBeTruthy();
  });

  it('moves the active item with ArrowDown / ArrowUp', () => {
    expect(getActiveItem()?.textContent?.trim()).toContain('Toggle theme');

    press('ArrowDown');
    expect(getActiveItem()?.textContent?.trim()).toContain('New file');

    press('ArrowDown');
    press('ArrowUp');
    expect(getActiveItem()?.textContent?.trim()).toContain('New file');
  });

  it('wraps focus from last to first', () => {
    press('End');
    expect(getActiveItem()?.textContent?.trim()).toContain('Replace');

    press('ArrowDown');
    expect(getActiveItem()?.textContent?.trim()).toContain('Toggle theme');
  });

  it('executes the active item on Enter and closes', () => {
    typeQuery('open');
    press('Enter');

    expect(host.lastExecuted).toBe('open');
    expect(host.open()).toBe(false);
  });

  it('clicking an item executes it', () => {
    getItems()[1].click();
    fixture.detectChanges();

    expect(host.lastExecuted).toBe('new');
    expect(host.open()).toBe(false);
  });

  it('closing the dialog mirrors back into open()', () => {
    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    dialog.close();
    fixture.detectChanges();

    expect(host.open()).toBe(false);
  });

  it('clears the active-item highlight when the pointer leaves the list', () => {
    expect(getActiveItem()).toBeTruthy();

    const list = fixture.nativeElement.querySelector(
      '.ea-command-palette__list',
    ) as HTMLElement;
    list.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }));
    fixture.detectChanges();

    expect(getActiveItem()).toBeUndefined();
  });

  it('restores the highlight when the user resumes keyboard nav', () => {
    const list = fixture.nativeElement.querySelector(
      '.ea-command-palette__list',
    ) as HTMLElement;
    list.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }));
    fixture.detectChanges();
    expect(getActiveItem()).toBeUndefined();

    press('ArrowDown');

    expect(getActiveItem()).toBeTruthy();
  });

  it('renders the shortcut hint when provided', () => {
    const kbds = fixture.nativeElement.querySelectorAll(
      '.ea-command-palette__item-shortcut',
    );
    const shortcuts = Array.from(kbds).map(el => (el as HTMLElement).textContent?.trim());
    expect(shortcuts).toEqual(
      expect.arrayContaining(['Ctrl+N', 'Ctrl+O', 'Ctrl+F', 'Ctrl+H']),
    );
  });

  describe('Accessibility attributes', () => {
    it('names the combobox input after its placeholder', () => {
      const input = getSearchInput();

      expect(input.getAttribute('aria-label')).toBe(input.getAttribute('placeholder'));
      expect(input.getAttribute('aria-label')).toBeTruthy();
    });

    it('reports the listbox as expanded only while results exist', () => {
      const input = getSearchInput();
      expect(input.getAttribute('aria-expanded')).toBe('true');
      expect(input.getAttribute('aria-controls')).toBeTruthy();

      typeQuery('nonexistent-thing');

      expect(input.getAttribute('aria-expanded')).toBe('false');
      expect(input.getAttribute('aria-controls')).toBeNull();
    });

    it('announces the empty state via role="status"', () => {
      typeQuery('nonexistent-thing');

      const empty = fixture.nativeElement.querySelector('.ea-command-palette__empty');

      expect(empty?.getAttribute('role')).toBe('status');
    });

    it('wraps each named group in a labelled role="group" section', () => {
      const sections = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
          '.ea-command-palette__section-list',
        ),
      );

      expect(sections.map(el => el.getAttribute('role'))).toEqual(['group', 'group']);
      sections.forEach(section => {
        const headingId = section.getAttribute('aria-labelledby');
        const heading = headingId ? document.getElementById(headingId) : null;

        expect(heading?.classList.contains('ea-command-palette__group')).toBe(true);
        expect(heading?.textContent?.trim()).toBeTruthy();
      });
    });
  });
});

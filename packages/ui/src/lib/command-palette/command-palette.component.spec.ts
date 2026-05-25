import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandPaletteComponent } from './command-palette.component';
import { CommandPaletteItem } from './command-palette.types';

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
    // jsdom does not implement HTMLDialogElement.showModal/close.
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
    // 'save' is disabled and is filtered out by `filteredItems`.
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
    // "c" appears mid-word in "Repla*c*e" and in "Sear*c*h" (Find's keyword),
    // and inside the description "Swit*c*h between light and dar*c*…". Word-
    // prefix matching excludes those — only items starting a word with "c"
    // would appear (none, in this fixture).
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
});

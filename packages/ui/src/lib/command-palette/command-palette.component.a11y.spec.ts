import { axe } from 'vitest-axe';

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { CommandPaletteComponent } from './command-palette.component';
import type { CommandPaletteItem } from './command-palette.types';

const COMMANDS: CommandPaletteItem[] = [
  { id: 'a', label: 'New file', shortcut: 'Ctrl+N', group: 'File' },
  { id: 'b', label: 'Open file', shortcut: 'Ctrl+O', group: 'File' },
  { id: 'c', label: 'Find', shortcut: 'Ctrl+F', group: 'Edit' },
];

@Component({
  imports: [CommandPaletteComponent],
  template: `
    <ea-command-palette
      [items]="items"
      [(open)]="open" />
  `,
})
class HostComponent {
  items: CommandPaletteItem[] = COMMANDS;
  open = signal<boolean>(true);
}

describe('CommandPaletteComponent a11y', () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute('open', '');
    };
    HTMLDialogElement.prototype.close = function () {
      this.removeAttribute('open');
      this.dispatchEvent(new Event('close'));
    };
  });

  async function render() {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations when open', async () => {
    const el = await render();

    const results = await axe(el, { rules: { region: { enabled: false } } });

    expect(results).toHaveNoViolations();
  });
});

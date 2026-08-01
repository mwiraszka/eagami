import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferListComponent } from './transfer-list.component';
import type { TransferListItem } from './transfer-list.types';

const ITEMS: TransferListItem[] = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta' },
  { id: 'c', label: 'Gamma' },
  { id: 'd', label: 'Delta', disabled: true },
  { id: 'e', label: 'Epsilon' },
];

@Component({
  imports: [TransferListComponent],
  template: `
    <ea-transfer-list
      [items]="items"
      [(selectedIds)]="selectedIds"
      [disabled]="disabled" />
  `,
})
class HostComponent {
  items: TransferListItem[] = ITEMS;
  selectedIds = signal<readonly string[]>([]);
  disabled = false;
}

describe('TransferListComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  function getListItems(pane: 'source' | 'target'): HTMLElement[] {
    const listIndex = pane === 'source' ? 0 : 1;
    const list = fixture.nativeElement.querySelectorAll('.ea-transfer-list__list')[
      listIndex
    ] as HTMLElement;
    return Array.from(list.querySelectorAll('.ea-transfer-list__item'));
  }

  function getButton(label: string): HTMLButtonElement {
    return fixture.nativeElement.querySelector(
      `.ea-transfer-list__button[aria-label="${label}"]`,
    );
  }

  function clickItem(
    pane: 'source' | 'target',
    label: string,
    options: { shiftKey?: boolean } = {},
  ): void {
    const items = getListItems(pane);
    const item = items.find(el => el.textContent?.trim() === label);
    if (!item) {
      throw new Error(`No item ${label} in ${pane}`);
    }
    item.dispatchEvent(
      new MouseEvent('click', { bubbles: true, shiftKey: options.shiftKey ?? false }),
    );
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('starts with all items in the source pane', () => {
    expect(getListItems('source').map(el => el.textContent?.trim())).toEqual([
      'Alpha',
      'Beta',
      'Gamma',
      'Delta',
      'Epsilon',
    ]);
    expect(getListItems('target')).toHaveLength(0);
  });

  it('toggles highlight on item click', () => {
    clickItem('source', 'Alpha');

    expect(getListItems('source')[0].classList).toContain(
      'ea-transfer-list__item--highlighted',
    );

    clickItem('source', 'Alpha');

    expect(getListItems('source')[0].classList).not.toContain(
      'ea-transfer-list__item--highlighted',
    );
  });

  it('moves highlighted items to target via ">"', () => {
    clickItem('source', 'Alpha');
    clickItem('source', 'Gamma');
    getButton('Move selected to target').click();
    fixture.detectChanges();

    expect(host.selectedIds()).toEqual(['a', 'c']);
    expect(getListItems('target')).toHaveLength(2);
  });

  it('clears highlight after a successful transfer', () => {
    clickItem('source', 'Alpha');
    getButton('Move selected to target').click();
    fixture.detectChanges();

    expect(
      Array.from(
        fixture.nativeElement.querySelectorAll('.ea-transfer-list__item--highlighted'),
      ),
    ).toHaveLength(0);
  });

  it('moves all non-disabled items via ">>"', () => {
    getButton('Move all to target').click();
    fixture.detectChanges();

    // 'd' is disabled and stays put
    expect(host.selectedIds()).toEqual(['a', 'b', 'c', 'e']);
    expect(getListItems('source').map(el => el.textContent?.trim())).toEqual(['Delta']);
  });

  it('disables transfer buttons when no candidates exist', () => {
    expect(getButton('Move selected to target').disabled).toBe(true);
    expect(getButton('Move selected to source').disabled).toBe(true);
    expect(getButton('Move all to source').disabled).toBe(true);
    expect(getButton('Move all to target').disabled).toBe(false);
  });

  it('cannot highlight disabled items', () => {
    clickItem('source', 'Delta');

    expect(getButton('Move selected to target').disabled).toBe(true);
  });

  it('moves items back via "<"', () => {
    host.selectedIds.set(['a', 'b']);
    fixture.detectChanges();

    clickItem('target', 'Alpha');
    getButton('Move selected to source').click();
    fixture.detectChanges();

    expect(host.selectedIds()).toEqual(['b']);
  });

  it('"move all to source" keeps disabled items in their current pane', () => {
    host.selectedIds.set(['a', 'd']);
    fixture.detectChanges();

    getButton('Move all to source').click();
    fixture.detectChanges();

    // only the non-disabled `a` moves; disabled `d` stays in target
    expect(host.selectedIds()).toEqual(['d']);
  });

  it('disables every button when [disabled]=true', () => {
    host.disabled = true;
    fixture.detectChanges();

    expect(getButton('Move selected to target').disabled).toBe(true);
    expect(getButton('Move all to target').disabled).toBe(true);
    expect(getButton('Move selected to source').disabled).toBe(true);
    expect(getButton('Move all to source').disabled).toBe(true);
  });

  it('shift-click selects the range between anchor and target', () => {
    clickItem('source', 'Alpha');
    clickItem('source', 'Epsilon', { shiftKey: true });

    const highlighted = getListItems('source')
      .filter(el => el.classList.contains('ea-transfer-list__item--highlighted'))
      .map(el => el.textContent?.trim());
    // disabled 'Delta' is skipped by the range builder even though it sits inside the range
    expect(highlighted).toEqual(['Alpha', 'Beta', 'Gamma', 'Epsilon']);
  });

  it('shift-click works in reverse (target above anchor)', () => {
    clickItem('source', 'Gamma');
    clickItem('source', 'Alpha', { shiftKey: true });

    const highlighted = getListItems('source')
      .filter(el => el.classList.contains('ea-transfer-list__item--highlighted'))
      .map(el => el.textContent?.trim());
    expect(highlighted).toEqual(['Alpha', 'Beta', 'Gamma']);
  });

  it('toggles highlight via Space key', () => {
    const item = getListItems('source')[0];
    item.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();

    expect(item.classList).toContain('ea-transfer-list__item--highlighted');
  });

  describe('Keyboard navigation', () => {
    function keydown(el: HTMLElement, key: string): void {
      el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      fixture.detectChanges();
    }

    function tabindexes(pane: 'source' | 'target'): string[] {
      return getListItems(pane).map(el => el.getAttribute('tabindex') ?? '');
    }

    it('makes only the first enabled option tabbable initially', () => {
      expect(tabindexes('source')).toEqual(['0', '-1', '-1', '-1', '-1']);
    });

    it('skips disabled items when picking the initially tabbable option', () => {
      host.items = [
        { id: 'x', label: 'Xray', disabled: true },
        { id: 'y', label: 'Yankee' },
      ];

      fixture.detectChanges();

      expect(tabindexes('source')).toEqual(['-1', '0']);
    });

    it('moves the active option down with ArrowDown and focuses it', () => {
      const items = getListItems('source');

      keydown(items[0], 'ArrowDown');

      expect(tabindexes('source')).toEqual(['-1', '0', '-1', '-1', '-1']);
      expect(document.activeElement).toBe(items[1]);
    });

    it('skips disabled options when arrowing', () => {
      const items = getListItems('source');

      keydown(items[2], 'ArrowDown');

      expect(tabindexes('source')).toEqual(['-1', '-1', '-1', '-1', '0']);
      expect(document.activeElement).toBe(items[4]);
    });

    it('moves the active option up with ArrowUp', () => {
      const items = getListItems('source');

      keydown(items[1], 'ArrowUp');

      expect(tabindexes('source')).toEqual(['0', '-1', '-1', '-1', '-1']);
      expect(document.activeElement).toBe(items[0]);
    });

    it('keeps the active option on ArrowUp from the first option', () => {
      const items = getListItems('source');

      keydown(items[0], 'ArrowUp');

      expect(tabindexes('source')).toEqual(['0', '-1', '-1', '-1', '-1']);
    });

    it('jumps to the first enabled option on Home', () => {
      const items = getListItems('source');

      keydown(items[4], 'Home');

      expect(tabindexes('source')).toEqual(['0', '-1', '-1', '-1', '-1']);
      expect(document.activeElement).toBe(items[0]);
    });

    it('jumps to the last enabled option on End', () => {
      const items = getListItems('source');

      keydown(items[0], 'End');

      expect(tabindexes('source')).toEqual(['-1', '-1', '-1', '-1', '0']);
      expect(document.activeElement).toBe(items[4]);
    });

    it('does not highlight options while arrowing', () => {
      const items = getListItems('source');

      keydown(items[0], 'ArrowDown');

      expect(
        getListItems('source').filter(el =>
          el.classList.contains('ea-transfer-list__item--highlighted'),
        ),
      ).toHaveLength(0);
    });

    it('toggles highlight via Enter on the active option', () => {
      const item = getListItems('source')[1];

      keydown(item, 'Enter');

      expect(item.classList).toContain('ea-transfer-list__item--highlighted');
    });

    it('makes a clicked option the tabbable one', () => {
      clickItem('source', 'Gamma');

      expect(tabindexes('source')).toEqual(['-1', '-1', '0', '-1', '-1']);
    });

    it('tracks the active option per pane independently', () => {
      host.selectedIds.set(['a', 'b']);
      fixture.detectChanges();

      keydown(getListItems('target')[0], 'ArrowDown');

      expect(tabindexes('target')).toEqual(['-1', '0']);
      expect(tabindexes('source')).toEqual(['0', '-1', '-1']);
    });
  });

  describe('Move announcements', () => {
    function getAnnouncement(): HTMLElement {
      return fixture.nativeElement.querySelector('.ea-transfer-list__announcement');
    }

    it('starts empty so nothing is announced before a move', () => {
      expect(getAnnouncement().getAttribute('role')).toBe('status');
      expect(getAnnouncement().textContent?.trim()).toBe('');
    });

    it('reports the count and destination after moving a selection', () => {
      getListItems('source')[0].click();
      fixture.detectChanges();

      getButton('Move selected to target').click();
      fixture.detectChanges();

      expect(getAnnouncement().textContent?.trim()).toBe('1 moved to Selected');
    });

    it('reports every moved item when moving all, then back again', () => {
      getButton('Move all to target').click();
      fixture.detectChanges();

      expect(getAnnouncement().textContent?.trim()).toBe('4 moved to Selected');

      getButton('Move all to source').click();
      fixture.detectChanges();

      expect(getAnnouncement().textContent?.trim()).toBe('4 moved to Available');
    });
  });

  describe('Range selection', () => {
    function keydown(el: HTMLElement, key: string, init: KeyboardEventInit = {}): void {
      el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, ...init }));
      fixture.detectChanges();
    }

    function highlighted(pane: 'source' | 'target'): string[] {
      return getListItems(pane)
        .filter(el => el.getAttribute('aria-selected') === 'true')
        .map(el => el.textContent!.trim());
    }

    it('extends the highlight from the anchor on shift', () => {
      keydown(getListItems('source')[0], ' ');

      keydown(getListItems('source')[2], ' ', { shiftKey: true });

      expect(highlighted('source')).toEqual(['Alpha', 'Beta', 'Gamma']);
    });

    it('extends upwards from a lower anchor too', () => {
      keydown(getListItems('source')[2], ' ');

      keydown(getListItems('source')[0], ' ', { shiftKey: true });

      expect(highlighted('source')).toEqual(['Alpha', 'Beta', 'Gamma']);
    });

    it('never highlights a disabled row inside the range', () => {
      keydown(getListItems('source')[2], ' ');

      keydown(getListItems('source')[4], ' ', { shiftKey: true });

      expect(highlighted('source')).not.toContain('Delta');
    });

    it('falls back to a single toggle when there is no anchor yet', () => {
      keydown(getListItems('source')[1], ' ', { shiftKey: true });

      expect(highlighted('source')).toEqual(['Beta']);
    });

    it('jumps to the first and last enabled row with Home and End', () => {
      keydown(getListItems('source')[0], 'End');

      expect(document.activeElement?.textContent?.trim()).toBe('Epsilon');

      keydown(getListItems('source')[4], 'Home');

      expect(document.activeElement?.textContent?.trim()).toBe('Alpha');
    });
  });
});

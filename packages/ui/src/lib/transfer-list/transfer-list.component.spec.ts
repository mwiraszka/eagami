import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferListComponent } from './transfer-list.component';
import { TransferListItem } from './transfer-list.types';

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
    if (!item) throw new Error(`No item ${label} in ${pane}`);
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

    // 'd' is disabled and stays put.
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

    // Only the non-disabled `a` should move; disabled `d` remains in target.
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
    // 'Delta' is disabled and is skipped by the range builder, even though
    // it sits inside the anchor → target range.
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
});

import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualListComponent } from './virtual-list.component';

interface Row {
  id: number;
  label: string;
}

const ROWS: Row[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  label: `Row ${i}`,
}));

@Component({
  imports: [VirtualListComponent],
  template: `
    <ea-virtual-list
      [items]="items()"
      [itemHeight]="40"
      [viewportHeight]="200"
      [overscan]="2"
      [ariaLabel]="ariaLabel()">
      <ng-template
        #item
        let-row
        let-i="index">
        <div
          class="row"
          [attr.data-row-index]="i">
          {{ row.label }}
        </div>
      </ng-template>
    </ea-virtual-list>
  `,
})
class HostComponent {
  items = signal<readonly Row[]>(ROWS);
  ariaLabel = signal<string | undefined>(undefined);
}

describe('VirtualListComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  function getViewport(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-virtual-list__viewport');
  }

  function getRenderedRowIndexes(): number[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.row')).map(el =>
      Number((el as HTMLElement).dataset['rowIndex']),
    );
  }

  function scrollTo(top: number): void {
    const vp = getViewport();
    vp.scrollTop = top;
    vp.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('mounts only the visible window plus overscan', () => {
    const rendered = getRenderedRowIndexes();

    // viewport 200 / itemHeight 40 is 5 visible rows; at the top, start=0 and end=5+overscan 2
    expect(rendered).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it('reserves the full scroll extent via the spacer', () => {
    const spacer = fixture.nativeElement.querySelector(
      '.ea-virtual-list__spacer',
    ) as HTMLElement;

    expect(spacer.style.height).toBe('40000px'); // 1000 rows * 40px
  });

  it('updates the rendered window when scrolled', () => {
    scrollTo(400); // 10 rows down

    const rendered = getRenderedRowIndexes();
    // firstVisible 10, lastVisible 15; with overscan 2, start=8 and end=17
    expect(rendered).toEqual([8, 9, 10, 11, 12, 13, 14, 15, 16]);
  });

  it('clamps the window to the list bounds at the very end', () => {
    scrollTo(40_000 - 200); // last 200px of scroll

    const rendered = getRenderedRowIndexes();
    // firstVisible 995, lastVisible 1000; end clamps to the 1000-row bound
    expect(rendered[rendered.length - 1]).toBe(999);
    expect(rendered).toContain(995);
  });

  it('positions each rendered row at index * itemHeight', () => {
    scrollTo(400);

    const row10 = fixture.nativeElement.querySelector(
      '[data-row-index="10"]',
    ) as HTMLElement;
    const wrapper = row10.parentElement as HTMLElement;

    expect(wrapper.style.top).toBe('400px');
    expect(wrapper.style.height).toBe('40px');
  });

  it('handles an empty items list', () => {
    fixture.componentInstance.items.set([]);
    fixture.detectChanges();

    expect(getRenderedRowIndexes()).toEqual([]);
    const spacer = fixture.nativeElement.querySelector(
      '.ea-virtual-list__spacer',
    ) as HTMLElement;
    expect(spacer.style.height).toBe('0px');
  });

  describe('Viewport accessibility', () => {
    it('keeps the viewport keyboard-focusable but unlabelled by default', () => {
      expect(getViewport().getAttribute('tabindex')).toBe('0');
      expect(getViewport().hasAttribute('role')).toBe(false);
      expect(getViewport().hasAttribute('aria-label')).toBe(false);
    });

    it('names the viewport as a keyboard-focusable region when ariaLabel is set', () => {
      fixture.componentInstance.ariaLabel.set('Search results');

      fixture.detectChanges();

      expect(getViewport().getAttribute('tabindex')).toBe('0');
      expect(getViewport().getAttribute('role')).toBe('region');
      expect(getViewport().getAttribute('aria-label')).toBe('Search results');
    });
  });
});

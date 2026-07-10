import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineComponent, type TimelineItem } from './timeline.component';

const ITEMS: TimelineItem[] = [
  { heading: 'One', time: '09:00', description: 'First', color: 'success' },
  { heading: 'Two', description: 'Second', current: true },
  { heading: 'Three', description: 'Third' },
];

describe('TimelineComponent', () => {
  let fixture: ComponentFixture<TimelineComponent>;

  function root(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-timeline');
  }

  function items(): HTMLElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.ea-timeline__item'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    fixture.componentRef.setInput('items', ITEMS);
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders one item per entry', () => {
      expect(items().length).toBe(3);
    });

    it('renders heading, time, and description', () => {
      const first = items()[0];

      expect(first.querySelector('.ea-timeline__heading')?.textContent).toContain('One');
      expect(first.querySelector('.ea-timeline__time')?.textContent).toContain('09:00');
      expect(first.querySelector('.ea-timeline__description')?.textContent).toContain(
        'First',
      );
    });

    it('omits the time node when no time is provided', () => {
      expect(items()[1].querySelector('.ea-timeline__time')).toBeNull();
    });

    it('applies the size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(root().classList).toContain('ea-timeline--lg');
    });
  });

  describe('Orientation', () => {
    it('defaults to vertical', () => {
      expect(root().classList).toContain('ea-timeline--vertical');
    });

    it('applies the horizontal modifier', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.detectChanges();

      expect(root().classList).toContain('ea-timeline--horizontal');
    });

    it('applies alternate only in vertical orientation', () => {
      fixture.componentRef.setInput('align', 'alternate');
      fixture.detectChanges();

      expect(root().classList).toContain('ea-timeline--alternate');

      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.detectChanges();

      expect(root().classList).not.toContain('ea-timeline--alternate');
    });
  });

  describe('Nodes', () => {
    it('applies the semantic color modifier', () => {
      expect(items()[0].classList).toContain('ea-timeline__item--success');
    });

    it('marks the current item and sets aria-current', () => {
      const current = items()[1];

      expect(current.classList).toContain('ea-timeline__item--current');
      expect(current.getAttribute('aria-current')).toBe('true');
    });

    it('lets current win over an explicit color', () => {
      fixture.componentRef.setInput('items', [
        { heading: 'x', color: 'error', current: true },
      ]);
      fixture.detectChanges();

      expect(items()[0].classList).toContain('ea-timeline__item--current');
      expect(items()[0].classList).not.toContain('ea-timeline__item--error');
    });

    it('falls back to the default modifier when no color is set', () => {
      expect(items()[2].classList).toContain('ea-timeline__item--default');
    });

    it('does not set aria-current on non-current items', () => {
      expect(items()[0].getAttribute('aria-current')).toBeNull();
    });
  });

  describe('Semantics', () => {
    it('exposes a list with list items', () => {
      expect(root().getAttribute('role')).toBe('list');
      expect(items()[0].getAttribute('role')).toBe('listitem');
    });
  });
});

import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionItemComponent } from './accordion-item.component';
import { AccordionComponent } from './accordion.component';

@Component({
  imports: [AccordionComponent, AccordionItemComponent],
  template: `
    <ea-accordion [multi]="multi()">
      <ea-accordion-item
        value="one"
        label="Section One">
        Content one
      </ea-accordion-item>
      <ea-accordion-item
        value="two"
        label="Section Two">
        Content two
      </ea-accordion-item>
      <ea-accordion-item
        value="three"
        label="Section Three"
        [disabled]="true">
        Content three
      </ea-accordion-item>
    </ea-accordion>
  `,
})
class TestHostComponent {
  multi = signal(false);
}

describe('AccordionComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  function getTriggers(): HTMLButtonElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.ea-accordion-item__trigger'),
    );
  }

  function getPanels(): HTMLElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('[role="region"]'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders trigger buttons for each item', () => {
      expect(getTriggers().length).toBe(3);
    });

    it('renders trigger labels', () => {
      const labels = getTriggers().map(t =>
        t.querySelector('.ea-accordion-item__label')?.textContent?.trim(),
      );
      expect(labels).toEqual(['Section One', 'Section Two', 'Section Three']);
    });

    it('has no panels open by default', () => {
      expect(getPanels().length).toBe(0);
    });
  });

  describe('Single mode (default)', () => {
    it('opens a panel when trigger is clicked', () => {
      getTriggers()[0].click();
      fixture.detectChanges();
      expect(getPanels().length).toBe(1);
      expect(getPanels()[0].textContent?.trim()).toBe('Content one');
    });

    it('closes the current panel when another is opened', () => {
      getTriggers()[0].click();
      fixture.detectChanges();
      getTriggers()[1].click();
      fixture.detectChanges();
      expect(getPanels().length).toBe(1);
      expect(getPanels()[0].textContent?.trim()).toBe('Content two');
    });

    it('closes a panel when its trigger is clicked again', () => {
      getTriggers()[0].click();
      fixture.detectChanges();
      getTriggers()[0].click();
      fixture.detectChanges();
      expect(getPanels().length).toBe(0);
    });

    it('sets aria-expanded on triggers', () => {
      getTriggers()[0].click();
      fixture.detectChanges();
      expect(getTriggers()[0].getAttribute('aria-expanded')).toBe('true');
      expect(getTriggers()[1].getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('Multi mode', () => {
    beforeEach(() => {
      fixture.componentInstance.multi.set(true);
      fixture.detectChanges();
    });

    it('allows multiple panels to be open', () => {
      getTriggers()[0].click();
      fixture.detectChanges();
      getTriggers()[1].click();
      fixture.detectChanges();
      expect(getPanels().length).toBe(2);
    });

    it('closes individual panels independently', () => {
      getTriggers()[0].click();
      fixture.detectChanges();
      getTriggers()[1].click();
      fixture.detectChanges();
      getTriggers()[0].click();
      fixture.detectChanges();
      expect(getPanels().length).toBe(1);
      expect(getPanels()[0].textContent?.trim()).toBe('Content two');
    });

    it('keeps only the first open panel in document order when multi is switched off', () => {
      getTriggers()[1].click();
      fixture.detectChanges();
      getTriggers()[0].click();
      fixture.detectChanges();
      expect(getPanels().length).toBe(2);

      fixture.componentInstance.multi.set(false);
      fixture.detectChanges();

      expect(getPanels().length).toBe(1);
      expect(getPanels()[0].textContent?.trim()).toBe('Content one');
    });
  });

  describe('Disabled items', () => {
    it('disables the trigger button', () => {
      expect(getTriggers()[2].disabled).toBe(true);
    });

    it('does not open when disabled trigger is clicked', () => {
      getTriggers()[2].click();
      fixture.detectChanges();
      expect(getPanels().length).toBe(0);
    });
  });
});

@Component({
  imports: [AccordionComponent, AccordionItemComponent],
  template: `
    <ea-accordion
      [multi]="multi()"
      [(expandedValues)]="expanded">
      <ea-accordion-item
        value="one"
        label="Section One">
        Content one
      </ea-accordion-item>
      <ea-accordion-item
        value="two"
        label="Section Two">
        Content two
      </ea-accordion-item>
      <ea-accordion-item
        value="three"
        label="Section Three">
        Content three
      </ea-accordion-item>
    </ea-accordion>
  `,
})
class ControlledHostComponent {
  multi = signal(false);
  expanded = signal<readonly string[]>(['two']);
}

describe('AccordionComponent expandedValues', () => {
  let fixture: ComponentFixture<ControlledHostComponent>;
  let host: ControlledHostComponent;

  function getTriggers(): HTMLButtonElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.ea-accordion-item__trigger'),
    );
  }

  function openPanels(): string[] {
    const root: HTMLElement = fixture.nativeElement;
    return Array.from(root.querySelectorAll('[role="region"]'), panel =>
      panel.textContent!.trim(),
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlledHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlledHostComponent);
    host = fixture.componentInstance;
  });

  it('starts with the named items expanded', () => {
    fixture.detectChanges();

    expect(openPanels()).toEqual(['Content two']);
    expect(getTriggers()[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('reports a toggle back through the two-way binding', () => {
    fixture.detectChanges();

    getTriggers()[0].click();
    fixture.detectChanges();

    expect(host.expanded()).toEqual(['one']);
    expect(openPanels()).toEqual(['Content one']);
  });

  it('follows a value set from outside', () => {
    fixture.detectChanges();

    host.expanded.set(['three']);
    fixture.detectChanges();

    expect(openPanels()).toEqual(['Content three']);
  });

  it('collapses everything when the value is emptied', () => {
    fixture.detectChanges();

    host.expanded.set([]);
    fixture.detectChanges();

    expect(openPanels()).toEqual([]);
  });

  it('keeps only the first value in document order without multi', () => {
    host.expanded.set(['three', 'one']);

    fixture.detectChanges();

    expect(openPanels()).toEqual(['Content one']);
    expect(host.expanded()).toEqual(['one']);
  });

  it('keeps every value in multi mode', () => {
    host.multi.set(true);
    host.expanded.set(['three', 'one']);

    fixture.detectChanges();

    expect(openPanels()).toEqual(['Content one', 'Content three']);
    expect(host.expanded()).toEqual(['three', 'one']);
  });

  it('adds to the open items when another is toggled in multi mode', () => {
    host.multi.set(true);
    fixture.detectChanges();

    getTriggers()[2].click();
    fixture.detectChanges();

    expect(host.expanded()).toEqual(['two', 'three']);
    expect(openPanels()).toEqual(['Content two', 'Content three']);
  });
});

@Component({
  imports: [AccordionComponent, AccordionItemComponent],
  template: `
    <ea-accordion [(expandedValues)]="expanded">
      @for (value of values; track value) {
        <ea-accordion-item
          [value]="value"
          [label]="value">
          Content {{ value }}
        </ea-accordion-item>
      }
    </ea-accordion>
  `,
})
class RepeatedHostComponent {
  readonly values = ['a', 'b', 'c'];
  expanded = signal<readonly string[]>(['c', 'b']);
}

describe('AccordionComponent expandedValues with repeated items', () => {
  it('keeps the first value in document order once the items render', async () => {
    await TestBed.configureTestingModule({
      imports: [RepeatedHostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(RepeatedHostComponent);
    const root: HTMLElement = fixture.nativeElement;

    fixture.detectChanges();

    expect(
      Array.from(root.querySelectorAll('[role="region"]'), panel =>
        panel.textContent!.trim(),
      ),
    ).toEqual(['Content b']);
    expect(fixture.componentInstance.expanded()).toEqual(['b']);
  });
});

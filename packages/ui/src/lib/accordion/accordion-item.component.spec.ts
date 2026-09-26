import { Component, type Type, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { StarIconComponent } from '../icons/star.component';
import { AccordionItemComponent } from './accordion-item.component';
import { AccordionComponent, type AccordionHeadingLevel } from './accordion.component';

@Component({
  imports: [AccordionComponent, AccordionItemComponent],
  template: `
    <ea-accordion [headingLevel]="headingLevel()">
      <ea-accordion-item
        value="a"
        label="First">
        First body
      </ea-accordion-item>
      <ea-accordion-item
        value="b"
        label="Second"
        [disabled]="bDisabled()">
        Second body
      </ea-accordion-item>
    </ea-accordion>
  `,
})
class HostComponent {
  bDisabled = signal(false);
  headingLevel = signal<AccordionHeadingLevel>(3);
}

describe('AccordionItemComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  function getTriggers(): HTMLButtonElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.ea-accordion-item__trigger'),
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the supplied label on the trigger button', () => {
    expect(getTriggers()[0].textContent).toContain('First');
    expect(getTriggers()[1].textContent).toContain('Second');
  });

  it('starts collapsed by default', () => {
    expect(getTriggers()[0].getAttribute('aria-expanded')).toBe('false');
    expect(fixture.nativeElement.querySelector('.ea-accordion-item__content')).toBeNull();
  });

  it('expands its content panel on trigger click', () => {
    getTriggers()[0].click();
    fixture.detectChanges();

    expect(getTriggers()[0].getAttribute('aria-expanded')).toBe('true');
    const panel = fixture.nativeElement.querySelector('.ea-accordion-item__content');
    expect(panel).toBeTruthy();
    expect(panel.textContent.trim()).toBe('First body');
  });

  it('collapses on a second trigger click', () => {
    getTriggers()[0].click();
    fixture.detectChanges();
    getTriggers()[0].click();
    fixture.detectChanges();

    expect(getTriggers()[0].getAttribute('aria-expanded')).toBe('false');
    expect(fixture.nativeElement.querySelector('.ea-accordion-item__content')).toBeNull();
  });

  it('disables the trigger when disabled is true', () => {
    host.bDisabled.set(true);
    fixture.detectChanges();

    expect(getTriggers()[1].disabled).toBe(true);
  });

  it('does not toggle when disabled', () => {
    host.bDisabled.set(true);
    fixture.detectChanges();

    getTriggers()[1].click();
    fixture.detectChanges();

    expect(getTriggers()[1].getAttribute('aria-expanded')).toBe('false');
  });

  it('wraps each trigger in a heading with aria-level 3 by default', () => {
    const headers = Array.from(
      fixture.nativeElement.querySelectorAll('.ea-accordion-item__header'),
    ) as HTMLElement[];

    expect(headers.length).toBe(2);
    expect(headers[0].getAttribute('role')).toBe('heading');
    expect(headers[0].getAttribute('aria-level')).toBe('3');
    expect(headers[0].contains(getTriggers()[0])).toBe(true);
  });

  it('applies the configured heading level to every item header', () => {
    host.headingLevel.set(2);
    fixture.detectChanges();

    const headers = Array.from(
      fixture.nativeElement.querySelectorAll('.ea-accordion-item__header'),
    ) as HTMLElement[];

    expect(headers.every(h => h.getAttribute('aria-level') === '2')).toBe(true);
  });

  it('wires aria-controls and aria-labelledby between trigger and panel', () => {
    getTriggers()[0].click();
    fixture.detectChanges();

    const trigger = getTriggers()[0];
    const panel = fixture.nativeElement.querySelector(
      '.ea-accordion-item__content',
    ) as HTMLElement;
    const triggerId = trigger.id;
    const controlsId = trigger.getAttribute('aria-controls');

    expect(controlsId).toBe(panel.id);
    expect(panel.getAttribute('aria-labelledby')).toBe(triggerId);
  });
});

@Component({
  imports: [AccordionComponent, AccordionItemComponent],
  template: `
    <ea-accordion size="lg">
      <ea-accordion-item
        value="a"
        label="First"
        [icon]="icon()">
        Body
      </ea-accordion-item>
    </ea-accordion>
  `,
})
class IconHostComponent {
  icon = signal<Type<unknown> | undefined>(undefined);
}

describe('AccordionItemComponent icon', () => {
  let fixture: ComponentFixture<IconHostComponent>;

  function item(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-accordion-item');
  }

  // Comment anchors, scoped-style attributes, and generated id counters vary by build and test order
  function normalized(html: string): string {
    return html
      .replace(/<!--[^>]*-->/g, '')
      .replace(/ _ng(?:content|host)-[\w-]+=""/g, '')
      .replace(/ea-accordion-item-\d+/g, 'ea-accordion-item-N');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconHostComponent);
    fixture.detectChanges();
  });

  // Recorded from 5.51.0
  it('renders exactly as before without an icon', () => {
    expect(normalized(item().outerHTML)).toBe(
      '<div class="ea-accordion-item ea-accordion-item--lg"><div role="heading" class="ea-accordion-item__header" aria-level="3"><button type="button" class="ea-accordion-item__trigger" id="ea-accordion-item-N-trigger" aria-expanded="false" aria-controls="ea-accordion-item-N-content"><span class="ea-accordion-item__label">First</span><ea-icon-chevron-down aria-hidden="true" class="ea-accordion-item__chevron" style="display: inline-flex; width: 1em; height: 1em;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="100%" height="100%" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></ea-icon-chevron-down></button></div></div>',
    );
  });

  it('renders the icon before the label, hidden from assistive technology', () => {
    fixture.componentInstance.icon.set(StarIconComponent);
    fixture.detectChanges();

    const wrapper = item().querySelector('.ea-accordion-item__icon')!;
    expect(wrapper.getAttribute('aria-hidden')).toBe('true');
    expect(wrapper.querySelector('ea-icon-star')).toBeTruthy();
    expect(wrapper.nextElementSibling?.classList).toContain('ea-accordion-item__label');
    expect(item().querySelector('.ea-accordion-item__trigger')!.textContent?.trim()).toBe(
      'First',
    );
  });

  it('removes the icon when it is cleared', () => {
    fixture.componentInstance.icon.set(StarIconComponent);
    fixture.detectChanges();

    fixture.componentInstance.icon.set(undefined);
    fixture.detectChanges();

    expect(item().querySelector('.ea-accordion-item__icon')).toBeNull();
  });
});

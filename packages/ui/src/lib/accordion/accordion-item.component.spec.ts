import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionItemComponent } from './accordion-item.component';
import { AccordionComponent } from './accordion.component';

@Component({
  imports: [AccordionComponent, AccordionItemComponent],
  template: `
    <ea-accordion>
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

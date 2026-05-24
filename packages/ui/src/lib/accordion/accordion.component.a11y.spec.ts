import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AccordionItemComponent } from './accordion-item.component';
import { AccordionComponent } from './accordion.component';

@Component({
  imports: [AccordionComponent, AccordionItemComponent],
  template: `
    <ea-accordion [multi]="multi">
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
        [disabled]="disableThird">
        Content three
      </ea-accordion-item>
    </ea-accordion>
  `,
})
class HostComponent {
  multi = false;
  disableThird = false;
}

describe('AccordionComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture;
  }

  it('has no detectable violations when all items are collapsed', async () => {
    const fixture = await render();

    const results = await axe(fixture.nativeElement as HTMLElement);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when an item is expanded', async () => {
    const fixture = await render();
    const trigger = fixture.nativeElement.querySelector(
      '.ea-accordion-item__trigger',
    ) as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const results = await axe(fixture.nativeElement as HTMLElement);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a disabled item', async () => {
    const fixture = await render(host => (host.disableThird = true));

    const results = await axe(fixture.nativeElement as HTMLElement);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in multi mode with multiple items open', async () => {
    const fixture = await render(host => (host.multi = true));
    const triggers = Array.from(
      fixture.nativeElement.querySelectorAll('.ea-accordion-item__trigger'),
    ) as HTMLButtonElement[];
    triggers[0].click();
    fixture.detectChanges();
    triggers[1].click();
    fixture.detectChanges();

    const results = await axe(fixture.nativeElement as HTMLElement);

    expect(results).toHaveNoViolations();
  });
});

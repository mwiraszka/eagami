import { axe } from 'vitest-axe';

import { Component, type Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FieldLabelComponent } from './field-label.component';

@Component({
  imports: [FieldLabelComponent],
  template: `
    <ea-field-label
      text="Email"
      forId="email-input" />
    <input
      id="email-input"
      type="text" />
  `,
})
class LabelHostComponent {}

@Component({
  imports: [FieldLabelComponent],
  template: `<ea-field-label
    text="Theme"
    labelId="theme-label" />`,
})
class SpanHostComponent {}

@Component({
  imports: [FieldLabelComponent],
  template: `
    <ea-field-label
      text="Email"
      forId="email-input"
      help="We only use it to reach you." />
    <input
      id="email-input"
      type="text" />
  `,
})
class HelpHostComponent {}

describe('FieldLabelComponent a11y', () => {
  async function render(host: Type<unknown>, { openHelp = false } = {}) {
    await TestBed.configureTestingModule({ imports: [host] }).compileComponents();
    const fixture = TestBed.createComponent(host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    if (openHelp) {
      el.querySelector<HTMLButtonElement>('.ea-field-label__help-trigger')!.click();
      fixture.detectChanges();
    }
    return el;
  }

  it('has no violations as a label bound to a control', async () => {
    const el = await render(LabelHostComponent);

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no violations as a standalone span label', async () => {
    const el = await render(SpanHostComponent);

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no violations with help collapsed', async () => {
    const el = await render(HelpHostComponent);

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no violations with help expanded', async () => {
    const el = await render(HelpHostComponent, { openHelp: true });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

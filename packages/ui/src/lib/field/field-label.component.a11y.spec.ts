import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
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

describe('FieldLabelComponent a11y', () => {
  async function render(host: typeof LabelHostComponent | typeof SpanHostComponent) {
    await TestBed.configureTestingModule({ imports: [host] }).compileComponents();
    const fixture = TestBed.createComponent(host);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
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
});

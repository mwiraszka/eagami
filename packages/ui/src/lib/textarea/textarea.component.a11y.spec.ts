import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TextareaComponent } from './textarea.component';

@Component({
  imports: [TextareaComponent],
  template: `
    <ea-textarea
      [label]="label"
      [placeholder]="placeholder"
      [hint]="hint"
      [errorMsg]="errorMsg"
      [disabled]="disabled"
      [readonly]="readonly"
      [showCount]="showCount"
      [maxlength]="maxlength" />
  `,
})
class HostComponent {
  label: string | undefined = 'Notes';
  placeholder = 'Type here';
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
  disabled = false;
  readonly = false;
  showCount = false;
  maxlength: number | undefined = undefined;
}

describe('TextareaComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations in the default state', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a character count', async () => {
    const el = await render(host => {
      host.showCount = true;
      host.maxlength = 200;
      host.hint = 'Up to 200 characters';
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a hint', async () => {
    const el = await render(host => (host.hint = 'Up to 500 characters'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with an error message', async () => {
    const el = await render(host => (host.errorMsg = 'This field is required'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when readonly', async () => {
    const el = await render(host => (host.readonly = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

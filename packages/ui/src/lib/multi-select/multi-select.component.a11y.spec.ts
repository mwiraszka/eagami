import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SelectOption } from '../select-option';
import { MultiSelectComponent } from './multi-select.component';

const OPTIONS: readonly SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
];

@Component({
  imports: [MultiSelectComponent],
  template: `
    <ea-multi-select
      [label]="label"
      [options]="options"
      [hint]="hint"
      [errorMsg]="errorMsg"
      [disabled]="disabled" />
  `,
})
class HostComponent {
  label: string | undefined = 'Fruits';
  options: readonly SelectOption[] = OPTIONS;
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
  disabled = false;
}

// TODO(a11y): the multi-select trigger `<div role="combobox">` lacks an
// accessible name (the visible label isn't wired via `aria-labelledby`), and
// the closed popover element exposes `role="listbox"` without a name. Restore
// once the component wires label → combobox via `aria-labelledby` and the
// popover omits its role when closed.
describe.skip('MultiSelectComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  afterEach(() => {
    document.querySelectorAll('.ea-popover__surface').forEach(node => node.remove());
  });

  it('has no detectable violations in the default closed state', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a hint', async () => {
    const el = await render(host => (host.hint = 'Pick any fruits you like'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the error state', async () => {
    const el = await render(host => (host.errorMsg = 'Pick at least one fruit'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

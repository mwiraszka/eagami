import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import type { SelectOption } from '../select-option';
import { AutocompleteComponent, type AutocompleteSize } from './autocomplete.component';

const FRUITS: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

@Component({
  imports: [AutocompleteComponent],
  template: `
    <ea-autocomplete
      [label]="label"
      [options]="options"
      [size]="size"
      [disabled]="disabled"
      [hint]="hint"
      [errorMsg]="errorMsg" />
  `,
})
class HostComponent {
  label: string | undefined = 'Fruit';
  options: SelectOption[] = FRUITS;
  size: AutocompleteSize = 'md';
  disabled = false;
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
}

describe('AutocompleteComponent a11y', () => {
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

  it('has no detectable violations with a hint', async () => {
    const el = await render(host => (host.hint = 'Start typing to filter'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with an error message', async () => {
    const el = await render(host => (host.errorMsg = 'Please choose a fruit'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

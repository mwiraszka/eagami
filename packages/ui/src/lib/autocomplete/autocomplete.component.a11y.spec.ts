import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { revealPopoverSurfaces } from '../../test-setup';
import type { SelectOption, SelectOptions } from '../select-option';
import { AutocompleteComponent, type AutocompleteSize } from './autocomplete.component';

const FRUITS: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const GROUPED_FRUITS: SelectOptions = [
  { label: 'Recently used', options: [{ value: 'cherry', label: 'Cherry' }] },
  { options: [...FRUITS] },
];

@Component({
  imports: [AutocompleteComponent],
  template: `
    <ea-autocomplete
      [label]="label"
      [ariaLabel]="ariaLabel"
      [options]="options"
      [size]="size"
      [disabled]="disabled"
      [hint]="hint"
      [errorMsg]="errorMsg" />
  `,
})
class HostComponent {
  label: string | undefined = 'Fruit';
  ariaLabel: string | undefined = undefined;
  options: SelectOptions = FRUITS;
  size: AutocompleteSize = 'md';
  disabled = false;
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
}

describe('AutocompleteComponent a11y', () => {
  let fixture: ComponentFixture<HostComponent>;

  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  /** Opens the list and hands back the portaled surface holding the options. */
  function openList(el: HTMLElement): HTMLElement {
    el.querySelector<HTMLElement>('.ea-autocomplete__input')!.dispatchEvent(
      new FocusEvent('focus'),
    );
    fixture.detectChanges();
    const [surface] = revealPopoverSurfaces();
    return surface;
  }

  it('has no detectable violations in the default state', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with only an aria-label', async () => {
    const el = await render(host => {
      host.label = undefined;
      host.ariaLabel = 'Fruit';
    });

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

  it('has no detectable violations with the option list open', async () => {
    const el = await render();

    const results = await axe(openList(el));

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a grouped option list open', async () => {
    const el = await render(host => (host.options = GROUPED_FRUITS));

    const results = await axe(openList(el));

    expect(results).toHaveNoViolations();
  });
});

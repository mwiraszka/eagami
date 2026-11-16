import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { revealPopoverSurfaces } from '../../test-setup';
import type { SelectOption, SelectOptions } from '../select-option';
import { DropdownComponent } from './dropdown.component';

const TEST_OPTIONS: SelectOption[] = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
];

const GROUPED_OPTIONS: SelectOptions = [
  { label: 'Recently used', options: [{ value: 'c', label: 'Gamma' }] },
  { options: [...TEST_OPTIONS] },
];

@Component({
  imports: [DropdownComponent],
  template: `
    <ea-dropdown
      [label]="label"
      [aria-label]="ariaLabel"
      [options]="options"
      [hint]="hint"
      [errorMsg]="errorMsg"
      [disabled]="disabled"
      [clearable]="clearable"
      [searchable]="searchable"
      [value]="value" />
  `,
})
class HostComponent {
  label: string | undefined = 'Country';
  ariaLabel: string | undefined = undefined;
  options: SelectOptions = TEST_OPTIONS;
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
  disabled = false;
  clearable = false;
  searchable = false;
  value = '';
}

@Component({
  imports: [DropdownComponent],
  template: `
    <span id="sort-label">Sort by</span>
    <ea-dropdown
      aria-labelledby="sort-label"
      [options]="options" />
  `,
})
class LabelledByHostComponent {
  options: SelectOption[] = TEST_OPTIONS;
}

describe('DropdownComponent a11y', () => {
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
    el.querySelector<HTMLElement>('.ea-dropdown__trigger')!.click();
    fixture.detectChanges();
    const [surface] = revealPopoverSurfaces();
    return surface;
  }

  afterEach(() => {
    document.querySelectorAll('.ea-popover__surface').forEach(node => node.remove());
  });

  it('has no detectable violations in the default state', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a hint', async () => {
    const el = await render(host => (host.hint = 'Pick one'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the error state', async () => {
    const el = await render(host => (host.errorMsg = 'Required'));

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
    const el = await render(host => (host.options = GROUPED_OPTIONS));

    const results = await axe(openList(el));

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with the clear button showing', async () => {
    const el = await render(host => {
      host.clearable = true;
      host.value = 'a';
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a searchable option list open', async () => {
    const el = await render(host => (host.searchable = true));

    const results = await axe(openList(el));

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations named by aria-label without a visible label', async () => {
    const el = await render(host => {
      host.label = undefined;
      host.ariaLabel = 'Sort by';
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with an aria-label-named list open', async () => {
    const el = await render(host => {
      host.label = undefined;
      host.ariaLabel = 'Sort by';
    });

    const results = await axe(openList(el));

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations named by aria-labelledby', async () => {
    await TestBed.configureTestingModule({
      imports: [LabelledByHostComponent],
    }).compileComponents();
    const labelled = TestBed.createComponent(LabelledByHostComponent);
    labelled.detectChanges();

    const results = await axe(labelled.nativeElement);

    expect(results).toHaveNoViolations();
  });
});

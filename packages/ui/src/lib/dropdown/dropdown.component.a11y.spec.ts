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
      [options]="options"
      [hint]="hint"
      [errorMsg]="errorMsg"
      [disabled]="disabled" />
  `,
})
class HostComponent {
  label = 'Country';
  options: SelectOptions = TEST_OPTIONS;
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
  disabled = false;
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
});

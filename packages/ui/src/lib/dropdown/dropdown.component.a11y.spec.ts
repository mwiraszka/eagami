import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SelectOption } from '../select-option';
import { DropdownComponent } from './dropdown.component';

const TEST_OPTIONS: SelectOption[] = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
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
  options: SelectOption[] = TEST_OPTIONS;
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
  disabled = false;
}

describe('DropdownComponent a11y', () => {
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
});

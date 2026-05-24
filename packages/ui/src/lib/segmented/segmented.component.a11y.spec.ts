import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SelectOption } from '../select-option';
import { SegmentedComponent } from './segmented.component';

const OPTIONS: SelectOption[] = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'kanban', label: 'Kanban' },
];

@Component({
  imports: [SegmentedComponent],
  template: `
    <ea-segmented
      [label]="label"
      [options]="options"
      [(value)]="value"
      [hint]="hint"
      [errorMsg]="errorMsg"
      [disabled]="disabled" />
  `,
})
class HostComponent {
  label: string | undefined = 'View';
  options: SelectOption[] = OPTIONS;
  value = 'list';
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
  disabled = false;
}

describe('SegmentedComponent a11y', () => {
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
    const el = await render(host => (host.hint = 'Switch between view modes'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the error state', async () => {
    const el = await render(host => (host.errorMsg = 'Please choose a view'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

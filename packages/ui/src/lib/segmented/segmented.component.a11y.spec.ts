import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import type { SelectOption } from '../select-option';
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

@Component({
  imports: [SegmentedComponent],
  template: `
    <span id="view-label">View</span>
    <ea-segmented
      aria-labelledby="view-label"
      [options]="options" />
  `,
})
class LabelledByHostComponent {
  options: SelectOption[] = [
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
  ];
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

  it('has no detectable violations when named by a label outside it', async () => {
    await TestBed.configureTestingModule({
      imports: [LabelledByHostComponent],
    }).compileComponents();
    const labelled = TestBed.createComponent(LabelledByHostComponent);
    labelled.detectChanges();

    const results = await axe(labelled.nativeElement);

    expect(results).toHaveNoViolations();
  });
});

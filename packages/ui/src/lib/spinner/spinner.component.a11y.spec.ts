import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SpinnerComponent, type SpinnerSize } from './spinner.component';

@Component({
  imports: [SpinnerComponent],
  template: `
    <ea-spinner
      [size]="size"
      [label]="label" />
  `,
})
class HostComponent {
  size: SpinnerSize = 'md';
  label: string | undefined = undefined;
}

describe('SpinnerComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations with the default label', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a custom label', async () => {
    const el = await render(host => (host.label = 'Saving changes'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

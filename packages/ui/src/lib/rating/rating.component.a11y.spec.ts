import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';

@Component({
  imports: [RatingComponent],
  template: `
    <ea-rating
      [label]="label"
      [(value)]="value"
      [allowHalf]="allowHalf"
      [readonly]="readonly"
      [disabled]="disabled"
      [hint]="hint"
      [errorMsg]="errorMsg" />
  `,
})
class HostComponent {
  label: string | undefined = 'Rate this product';
  value = 3;
  allowHalf = false;
  readonly = false;
  disabled = false;
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
}

describe('RatingComponent a11y', () => {
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
    const el = await render(host => (host.hint = 'Tap a star to rate'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the error state', async () => {
    const el = await render(host => (host.errorMsg = 'Please leave a rating'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in readonly mode with half stars', async () => {
    const el = await render(host => {
      host.readonly = true;
      host.allowHalf = true;
      host.value = 3.5;
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

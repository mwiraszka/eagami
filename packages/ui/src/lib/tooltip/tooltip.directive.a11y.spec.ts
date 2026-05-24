import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TooltipDirective } from './tooltip.directive';

@Component({
  imports: [TooltipDirective],
  template: `
    <button
      type="button"
      [eaTooltip]="text"
      [disabled]="disabled">
      Save changes
    </button>
  `,
})
class HostComponent {
  text = 'Saves your changes to the server';
  disabled = false;
}

describe('TooltipDirective a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations when the tooltip is hidden', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when the host button is disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

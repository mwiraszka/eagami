import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DividerComponent } from './divider.component';

@Component({
  imports: [DividerComponent],
  template: `<ea-divider [label]="label" />`,
})
class HostComponent {
  label: string | undefined = undefined;
}

describe('DividerComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations without a label', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a label', async () => {
    const el = await render(host => (host.label = 'or'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

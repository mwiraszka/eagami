import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  EagamiWordmarkComponent,
  EagamiWordmarkLayout,
  EagamiWordmarkVariant,
} from './eagami-wordmark.component';

@Component({
  imports: [EagamiWordmarkComponent],
  template: `
    <ea-eagami-wordmark
      [variant]="variant"
      [layout]="layout" />
  `,
})
class HostComponent {
  variant: EagamiWordmarkVariant = 1;
  layout: EagamiWordmarkLayout = 'stacked';
}

describe('EagamiWordmarkComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it.each([1, 2, 3] as const)(
    'has no detectable violations for variant %i',
    async variant => {
      const el = await render(host => (host.variant = variant));

      const results = await axe(el);

      expect(results).toHaveNoViolations();
    },
  );

  it('has no detectable violations in the inline layout', async () => {
    const el = await render(host => {
      host.variant = 3;
      host.layout = 'inline';
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

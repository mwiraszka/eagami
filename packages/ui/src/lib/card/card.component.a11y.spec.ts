import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { CardComponent, type CardVariant } from './card.component';

@Component({
  imports: [CardComponent],
  template: `
    <ea-card
      [variant]="variant"
      [headerDivider]="headerDivider">
      <h3 slot="header">{{ header }}</h3>
      <p>{{ body }}</p>
      <span slot="footer">{{ footer }}</span>
    </ea-card>
  `,
})
class HostComponent {
  variant: CardVariant = 'elevated';
  headerDivider = false;
  header = 'Card title';
  body = 'Card body text describing the contents.';
  footer = 'Footer note';
}

describe('CardComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    // jsdom mis-evaluates `:empty` in getComputedStyle, so applied component styles make
    // axe treat text-bearing elements as display:none. Strip styles so axe assesses the
    // semantic DOM, as it did under the style-free jest setup.
    document.querySelectorAll('style').forEach(el => el.remove());
    return fixture.nativeElement as HTMLElement;
  }

  it.each(['elevated', 'outlined', 'filled'] as const)(
    'has no detectable violations for the %s variant',
    async variant => {
      const el = await render(host => (host.variant = variant));

      const results = await axe(el);

      expect(results).toHaveNoViolations();
    },
  );

  it('has no detectable violations with a header divider', async () => {
    const el = await render(host => (host.headerDivider = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

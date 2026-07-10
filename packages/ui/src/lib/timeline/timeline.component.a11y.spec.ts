import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TimelineComponent, type TimelineItem } from './timeline.component';

@Component({
  imports: [TimelineComponent],
  template: `
    <ea-timeline
      [items]="items"
      [orientation]="orientation"
      [align]="align" />
  `,
})
class HostComponent {
  items: TimelineItem[] = [
    {
      heading: 'Order placed',
      time: '09:24',
      description: 'Confirmed',
      color: 'success',
    },
    { heading: 'Out for delivery', description: 'On the way', current: true },
    { heading: 'Delivered', description: 'End of day' },
  ];
  orientation: 'vertical' | 'horizontal' = 'vertical';
  align: 'start' | 'alternate' = 'start';
}

describe('TimelineComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations in the vertical layout', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the horizontal layout', async () => {
    const el = await render(host => (host.orientation = 'horizontal'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the alternate layout', async () => {
    const el = await render(host => (host.align = 'alternate'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

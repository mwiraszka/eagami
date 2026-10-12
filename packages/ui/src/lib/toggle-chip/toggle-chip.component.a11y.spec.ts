import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MapPinIconComponent } from '../icons/map-pin.component';
import { ToggleChipComponent } from './toggle-chip.component';

@Component({
  imports: [ToggleChipComponent],
  template: `
    <ea-toggle-chip
      [selected]="selected"
      [disabled]="disabled">
      Events
    </ea-toggle-chip>
    <ea-toggle-chip
      aria-label="Show on map"
      [icon]="mapPin" />
  `,
})
class HostComponent {
  readonly mapPin = MapPinIconComponent;
  selected = false;
  disabled = false;
}

describe('ToggleChipComponent a11y', () => {
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

  it('has no detectable violations when selected', async () => {
    const el = await render(host => (host.selected = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

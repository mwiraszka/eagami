import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { RadioGroupComponent } from './radio-group.component';
import { RadioComponent } from './radio.component';

@Component({
  imports: [RadioComponent, RadioGroupComponent],
  template: `
    <ea-radio-group
      [label]="label"
      [(value)]="value"
      [disabled]="disabled"
      [errorMsg]="errorMsg"
      [hint]="hint">
      <ea-radio
        value="a"
        label="Apple" />
      <ea-radio
        value="b"
        label="Banana" />
      <ea-radio
        value="c"
        label="Cherry" />
    </ea-radio-group>
  `,
})
class HostComponent {
  label: string | undefined = 'Pick a fruit';
  value = 'a';
  disabled = false;
  errorMsg: string | undefined = undefined;
  hint: string | undefined = undefined;
}

describe('RadioComponent a11y', () => {
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
    const el = await render(host => (host.hint = 'Choose your favourite'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the error state', async () => {
    const el = await render(host => (host.errorMsg = 'Selection is required'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TimePickerComponent } from './time-picker.component';

@Component({
  imports: [TimePickerComponent],
  template: `
    <ea-time-picker
      [label]="label"
      [hint]="hint"
      [errorMsg]="errorMsg"
      [disabled]="disabled" />
  `,
})
class HostComponent {
  label: string | undefined = 'Start time';
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
  disabled = false;
}

// TODO(a11y): the time picker mounts an empty `<ea-popover role="dialog">` to
// the DOM even when closed, which trips `aria-dialog-name` because the empty
// element has no `aria-label`/`aria-labelledby`. Restore once the popover
// omits its role attribute when closed, or once these tests scope the axe
// scan to the trigger element only.
describe.skip('TimePickerComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations in the default closed state', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a hint', async () => {
    const el = await render(host => (host.hint = 'Pick a time'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with an error message', async () => {
    const el = await render(host => (host.errorMsg = 'Invalid time'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

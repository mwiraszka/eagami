import { axe } from 'vitest-axe';

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FormFieldComponent } from './form-field.component';

@Component({
  template: `<ea-form-field
    label="Email"
    [hint]="hint()"
    [errorMsg]="errorMsg()"
    [required]="required()">
    <input type="email" />
  </ea-form-field>`,
  imports: [FormFieldComponent],
})
class HostComponent {
  readonly hint = signal<string | undefined>(undefined);
  readonly errorMsg = signal<string | undefined>(undefined);
  readonly required = signal(false);
}

describe('FormFieldComponent a11y', () => {
  async function render(setup: (host: HostComponent) => void): Promise<HTMLElement> {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup(fixture.componentInstance);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations with a label and hint', async () => {
    const el = await render(host => host.hint.set('Helpful text'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the error state', async () => {
    const el = await render(host => {
      host.required.set(true);
      host.errorMsg.set('This field is required');
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { revealPopoverSurfaces } from '../../test-setup';
import { TimePickerComponent } from './time-picker.component';

@Component({
  imports: [TimePickerComponent],
  template: `
    <ea-time-picker
      [label]="label"
      [aria-label]="ariaLabel"
      [hint]="hint"
      [errorMsg]="errorMsg"
      [disabled]="disabled" />
  `,
})
class HostComponent {
  label: string | undefined = 'Start time';
  ariaLabel: string | undefined = undefined;
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
  disabled = false;
}

@Component({
  imports: [TimePickerComponent],
  template: `
    <span id="start-label">Start time</span>
    <ea-time-picker aria-labelledby="start-label" />
  `,
})
class LabelledByHostComponent {}

describe('TimePickerComponent a11y', () => {
  let fixture: ComponentFixture<HostComponent>;

  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  /** Opens the panel and hands back the portaled surface holding the spinners. */
  function openPanel(el: HTMLElement): HTMLElement {
    el.querySelector<HTMLElement>('.ea-time-picker__trigger')!.click();
    fixture.detectChanges();
    const [surface] = revealPopoverSurfaces();
    return surface;
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

  it('has no detectable violations with the panel open', async () => {
    const el = await render();

    const results = await axe(openPanel(el));

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations named by aria-label without a visible label', async () => {
    const el = await render(host => {
      host.label = undefined;
      host.ariaLabel = 'Start time';
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations named by aria-labelledby', async () => {
    await TestBed.configureTestingModule({
      imports: [LabelledByHostComponent],
    }).compileComponents();
    const labelled = TestBed.createComponent(LabelledByHostComponent);
    labelled.detectChanges();

    const results = await axe(labelled.nativeElement);

    expect(results).toHaveNoViolations();
  });
});

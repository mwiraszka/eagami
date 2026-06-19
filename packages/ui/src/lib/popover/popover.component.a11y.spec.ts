import { axe } from 'vitest-axe';

import { Component, signal, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { PopoverComponent } from './popover.component';

@Component({
  imports: [PopoverComponent],
  template: `
    <button
      #trigger
      type="button">
      Open
    </button>
    <ea-popover
      [anchor]="trigger"
      [open]="open()"
      aria-label="Test popover">
      <div>Popover body</div>
    </ea-popover>
  `,
})
class HostComponent {
  readonly open = signal<boolean>(false);
  readonly popover = viewChild.required(PopoverComponent);
}

describe('PopoverComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  afterEach(() => {
    document.querySelectorAll('.ea-popover__surface').forEach(node => node.remove());
  });

  it('has no detectable violations when closed', async () => {
    const { el } = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when open', async () => {
    const { fixture } = await render(host => host.open.set(true));
    const results = await axe(document.body, {
      rules: { region: { enabled: false } },
    });
    fixture.destroy();

    expect(results).toHaveNoViolations();
  });
});

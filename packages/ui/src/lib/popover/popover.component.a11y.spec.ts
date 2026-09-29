import { axe } from 'vitest-axe';

import { Component, signal, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { revealPopoverSurfaces } from '../../test-setup';
import { type PopoverPlacement } from './popover-positioning';
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
      [placement]="placement()"
      [anchorPoint]="contextMenu() ? { x: 20, y: 20 } : null"
      [contextMenu]="contextMenu()"
      aria-label="Test popover">
      <div>Popover body</div>
      <button type="button">Action</button>
    </ea-popover>
  `,
})
class HostComponent {
  readonly open = signal<boolean>(false);
  readonly placement = signal<PopoverPlacement>('bottom-start');
  readonly contextMenu = signal<boolean>(false);
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

  it('has no detectable violations open as a context menu over its anchor', async () => {
    const { fixture } = await render(host => {
      host.placement.set('inside-top-start');
      host.contextMenu.set(true);
      host.open.set(true);
    });
    const [surface] = revealPopoverSurfaces();

    const results = await axe(surface);
    fixture.destroy();

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

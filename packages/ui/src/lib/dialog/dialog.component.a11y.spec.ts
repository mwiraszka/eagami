import { axe } from 'vitest-axe';

import { ApplicationRef, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';

// jsdom lacks HTMLDialogElement showModal/close; stub them so the dialog opens and axe can see it
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
  });
});

@Component({
  imports: [DialogComponent],
  template: `
    <ea-dialog [(open)]="open">
      <span slot="header">Dialog Title</span>
      Dialog body content
      <span slot="footer">Footer</span>
    </ea-dialog>
  `,
})
class HostComponent {
  open = true;
}

@Component({
  selector: 'ea-test-code-opened-dialog',
  imports: [DialogComponent],
  template: `
    <ea-dialog>
      <span slot="header">Opened from code</span>
      Dialog body content
      <span slot="footer">Footer</span>
    </ea-dialog>
  `,
})
class CodeOpenedDialogComponent {}

describe('DialogComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations when open with header and body content', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when opened from code', async () => {
    TestBed.inject(DialogService).open(CodeOpenedDialogComponent);
    TestBed.inject(ApplicationRef).tick();
    const host = document.querySelector<HTMLElement>('ea-test-code-opened-dialog')!;

    const results = await axe(host);

    expect(results).toHaveNoViolations();
  });
});

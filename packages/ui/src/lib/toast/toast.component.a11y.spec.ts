import { axe } from 'vitest-axe';

import { Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

@Component({
  imports: [ToastComponent],
  template: `<ea-toast />`,
})
class HostComponent {
  readonly toastService = inject(ToastService);
}

describe('ToastComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture;
  }

  afterEach(() => {
    const toastService = TestBed.inject(ToastService);
    toastService.clear();
  });

  it('has no detectable violations with a default toast visible', async () => {
    const fixture = await render(host =>
      host.toastService.show('Your changes have been saved', { duration: 0 }),
    );
    fixture.detectChanges();

    const results = await axe(fixture.nativeElement as HTMLElement);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a success toast visible', async () => {
    const fixture = await render(host =>
      host.toastService.success('Saved successfully', 0),
    );
    fixture.detectChanges();

    const results = await axe(fixture.nativeElement as HTMLElement);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a segmented toast visible', async () => {
    const fixture = await render(host =>
      host.toastService.show([{ text: 'Moved ' }, { text: 'Q3 roadmap', strong: true }], {
        title: [{ text: 'Bob Jones', strong: true }, { text: ' updated the board' }],
        duration: 0,
      }),
    );
    fixture.detectChanges();

    const results = await axe(fixture.nativeElement as HTMLElement);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with an error toast visible', async () => {
    const fixture = await render(host =>
      host.toastService.error('Something went wrong', 0),
    );
    fixture.detectChanges();

    const results = await axe(fixture.nativeElement as HTMLElement);

    expect(results).toHaveNoViolations();
  });
});

import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

@Component({
  imports: [PaginatorComponent],
  template: `
    <ea-paginator
      [totalItems]="totalItems"
      [page]="page"
      [pageSize]="pageSize"
      [disabled]="disabled"
      [showPageSizeSelector]="showPageSizeSelector"
      [showRangeLabel]="showRangeLabel" />
  `,
})
class HostComponent {
  totalItems = 100;
  page = 1;
  pageSize = 10;
  disabled = false;
  showPageSizeSelector = true;
  showRangeLabel = true;
}

describe('PaginatorComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    // jsdom mis-evaluates `:empty` in getComputedStyle, so applied component styles make
    // axe treat text-bearing elements as display:none. Strip styles so axe assesses the
    // semantic DOM, as it did under the style-free jest setup.
    document.querySelectorAll('style').forEach(el => el.remove());
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations on the first page', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations on a middle page', async () => {
    const el = await render(host => (host.page = 5));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations without the page-size selector or range label', async () => {
    const el = await render(host => {
      host.showPageSizeSelector = false;
      host.showRangeLabel = false;
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

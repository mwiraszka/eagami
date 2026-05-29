import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  type BreadcrumbItem,
  BreadcrumbsComponent,
  type BreadcrumbsSeparator,
} from './breadcrumbs.component';

@Component({
  imports: [BreadcrumbsComponent],
  template: `
    <ea-breadcrumbs
      [items]="items"
      [separator]="separator" />
  `,
})
class HostComponent {
  items: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Laptops' },
  ];
  separator: BreadcrumbsSeparator = 'chevron';
}

describe('BreadcrumbsComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations with the default chevron separator', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with the slash separator', async () => {
    const el = await render(host => (host.separator = 'slash'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a disabled item', async () => {
    const el = await render(host => {
      host.items = [
        { label: 'Home', href: '/' },
        { label: 'Archive', href: '/archive', disabled: true },
        { label: 'Item' },
      ];
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

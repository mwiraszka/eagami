import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { revealPopoverSurfaces } from '../../test-setup';
import {
  type BreadcrumbItem,
  BreadcrumbsComponent,
  type BreadcrumbsOverflow,
  type BreadcrumbsSeparator,
} from './breadcrumbs.component';

@Component({
  imports: [BreadcrumbsComponent],
  template: `
    <ea-breadcrumbs
      [items]="items"
      [separator]="separator"
      [maxItems]="maxItems"
      [overflow]="overflow" />
  `,
})
class HostComponent {
  items: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Laptops' },
  ];
  separator: BreadcrumbsSeparator = 'chevron';
  maxItems: number | undefined = undefined;
  overflow: BreadcrumbsOverflow = 'menu';
}

describe('BreadcrumbsComponent a11y', () => {
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

  it('has no detectable violations with a level moved into the menu', async () => {
    const el = await render(host => (host.maxItems = 2));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with the hidden levels menu open', async () => {
    const el = await render(host => (host.maxItems = 2));
    el.querySelector<HTMLElement>('button.ea-breadcrumbs__expand')!.click();
    fixture.detectChanges();
    const [surface] = revealPopoverSurfaces();

    const results = await axe(surface);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when the trail scrolls', async () => {
    const el = await render(host => (host.overflow = 'scroll'));

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

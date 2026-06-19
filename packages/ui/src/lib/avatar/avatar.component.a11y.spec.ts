import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AvatarComponent, type AvatarShape, type AvatarSize } from './avatar.component';

@Component({
  imports: [AvatarComponent],
  template: `
    <ea-avatar
      [src]="src"
      [alt]="alt"
      [initials]="initials"
      [size]="size"
      [shape]="shape" />
  `,
})
class HostComponent {
  src: string | undefined = undefined;
  alt = 'Profile photo';
  initials: string | undefined = undefined;
  size: AvatarSize = 'md';
  shape: AvatarShape = 'circle';
}

describe('AvatarComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations with the fallback icon', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with initials', async () => {
    const el = await render(host => (host.initials = 'MW'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with an image', async () => {
    const el = await render(host => {
      host.src = 'https://example.com/photo.jpg';
      host.alt = 'Profile photo of Michal';
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with the square shape', async () => {
    const el = await render(host => {
      host.shape = 'square';
      host.initials = 'AB';
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

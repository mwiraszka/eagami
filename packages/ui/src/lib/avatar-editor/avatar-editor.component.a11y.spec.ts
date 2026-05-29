import { axe } from 'jest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AvatarEditorComponent, type AvatarEditorShape } from './avatar-editor.component';

@Component({
  imports: [AvatarEditorComponent],
  template: ` <ea-avatar-editor [shape]="shape" /> `,
})
class HostComponent {
  shape: AvatarEditorShape = 'circle';
}

describe('AvatarEditorComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations with the empty dropzone', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with the square shape', async () => {
    const el = await render(host => (host.shape = 'square'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ButtonComponent } from '../button/button.component';
import { InboxIconComponent } from '../icons/inbox.component';
import { EmptyStateComponent } from './empty-state.component';

@Component({
  imports: [ButtonComponent, EmptyStateComponent, InboxIconComponent],
  template: `
    <ea-empty-state
      [title]="title"
      [description]="description">
      <ea-icon-inbox slot="media" />
      <ea-button slot="actions"> Create item </ea-button>
    </ea-empty-state>
  `,
})
class HostComponent {
  title: string | undefined = 'Nothing here yet';
  description: string | undefined = 'Get started by creating your first item.';
}

describe('EmptyStateComponent a11y', () => {
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

  it('has no detectable violations with title, description, media, and action', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with only the media and action slots', async () => {
    const el = await render(host => {
      host.title = undefined;
      host.description = undefined;
    });

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

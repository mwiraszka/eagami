import { axe } from 'vitest-axe';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TabComponent } from './tab.component';
import { TabsComponent, type TabsOrientation } from './tabs.component';

@Component({
  imports: [TabsComponent, TabComponent],
  template: `
    <ea-tabs
      [activeTab]="activeTab"
      [orientation]="orientation">
      <ea-tab
        value="one"
        label="Overview">
        Overview content
      </ea-tab>
      <ea-tab
        value="two"
        label="Details">
        Details content
      </ea-tab>
      <ea-tab
        value="three"
        label="Settings"
        [disabled]="disableThird">
        Settings content
      </ea-tab>
    </ea-tabs>
  `,
})
class HostComponent {
  activeTab = 'one';
  orientation: TabsOrientation = 'horizontal';
  disableThird = false;
}

describe('TabsComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations with the default tab active', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when a different tab is active', async () => {
    const el = await render(host => (host.activeTab = 'two'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the vertical orientation', async () => {
    const el = await render(host => (host.orientation = 'vertical'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a disabled tab', async () => {
    const el = await render(host => (host.disableThird = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

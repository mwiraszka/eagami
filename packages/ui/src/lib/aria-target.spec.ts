import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { resolveAriaTarget } from './aria-target';
import { ButtonComponent } from './button/button.component';
import { MenuTriggerDirective } from './menu/menu-trigger.directive';
import { MenuComponent } from './menu/menu.component';
import { TooltipDirective } from './tooltip/tooltip.directive';

@Component({
  selector: 'ea-test-host',
  imports: [ButtonComponent, MenuComponent, MenuTriggerDirective, TooltipDirective],
  template: `
    <ea-button
      [eaMenuTrigger]="menu"
      eaTooltip="Menu actions">
      Actions
    </ea-button>
    <ea-menu
      #menu
      [(open)]="isOpen">
    </ea-menu>
  `,
})
class TestHostComponent {
  isOpen = signal(false);
}

describe('resolveAriaTarget', () => {
  it('returns the host when it is natively interactive', () => {
    const button = document.createElement('button');

    expect(resolveAriaTarget(button)).toBe(button);
  });

  it('returns the host when it already carries a role', () => {
    const div = document.createElement('div');
    div.setAttribute('role', 'combobox');

    expect(resolveAriaTarget(div)).toBe(div);
  });

  it('resolves the inner control of a roleless wrapper', () => {
    const wrapper = document.createElement('ea-button');
    const inner = document.createElement('button');
    wrapper.appendChild(inner);

    expect(resolveAriaTarget(wrapper)).toBe(inner);
  });

  it('falls back to the host when it wraps no control', () => {
    const span = document.createElement('span');

    expect(resolveAriaTarget(span)).toBe(span);
  });
});

describe('Directive ARIA on a component wrapper', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  function getWrapper(): HTMLElement {
    return fixture.nativeElement.querySelector('ea-button');
  }

  function getInnerButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('ea-button button');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('lands menu-trigger state on the inner button, not the roleless host', () => {
    expect(getInnerButton().getAttribute('aria-haspopup')).toBe('menu');
    expect(getInnerButton().getAttribute('aria-expanded')).toBe('false');
    expect(getWrapper().hasAttribute('aria-haspopup')).toBe(false);
  });

  it('updates the inner button as the menu opens', () => {
    host.isOpen.set(true);
    fixture.detectChanges();

    expect(getInnerButton().getAttribute('aria-expanded')).toBe('true');
    expect(getInnerButton().getAttribute('aria-controls')).toBeTruthy();
  });

  it('leaves no stranded ARIA state on the wrapper element', () => {
    host.isOpen.set(true);
    fixture.detectChanges();

    expect(getWrapper().hasAttribute('aria-expanded')).toBe(false);
    expect(getWrapper().hasAttribute('aria-controls')).toBe(false);
    expect(getWrapper().hasAttribute('aria-describedby')).toBe(false);
  });
});

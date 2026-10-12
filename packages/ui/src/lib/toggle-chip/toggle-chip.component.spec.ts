import { Component, type Type, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonIconComponent } from '../icons/moon.component';
import { ToggleChipComponent, type ToggleChipSize } from './toggle-chip.component';

@Component({
  imports: [ToggleChipComponent],
  template: `
    <ea-toggle-chip
      [(selected)]="selected"
      [size]="size()"
      [icon]="icon()"
      [disabled]="disabled()"
      [aria-label]="ariaLabel()"
      [aria-describedby]="ariaDescribedby()"
      (changed)="changes.push($event)">
      Dark mode
    </ea-toggle-chip>
  `,
})
class HostComponent {
  readonly selected = signal(false);
  readonly size = signal<ToggleChipSize>('md');
  readonly icon = signal<Type<unknown> | undefined>(undefined);
  readonly disabled = signal(false);
  readonly ariaLabel = signal<string | undefined>(undefined);
  readonly ariaDescribedby = signal<string | undefined>(undefined);
  readonly changes: boolean[] = [];
}

describe('ToggleChipComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  function getButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button.ea-toggle-chip');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders a toggle button named by its projected content', () => {
    const button = getButton();

    expect(button.getAttribute('type')).toBe('button');
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(button.textContent?.trim()).toBe('Dark mode');
  });

  it('turns on when clicked, updating the two-way binding and emitting changed', () => {
    getButton().click();
    fixture.detectChanges();

    expect(getButton().getAttribute('aria-pressed')).toBe('true');
    expect(getButton().classList).toContain('ea-toggle-chip--selected');
    expect(host.selected()).toBe(true);
    expect(host.changes).toEqual([true]);
  });

  it('turns back off on a second click', () => {
    getButton().click();
    fixture.detectChanges();

    getButton().click();
    fixture.detectChanges();

    expect(getButton().getAttribute('aria-pressed')).toBe('false');
    expect(host.selected()).toBe(false);
    expect(host.changes).toEqual([true, false]);
  });

  it('reflects a selected state set by the parent', () => {
    host.selected.set(true);

    fixture.detectChanges();

    expect(getButton().getAttribute('aria-pressed')).toBe('true');
  });

  it('blocks toggling while disabled', () => {
    host.disabled.set(true);
    fixture.detectChanges();

    getButton().click();
    fixture.detectChanges();

    expect(getButton().disabled).toBe(true);
    expect(getButton().getAttribute('aria-pressed')).toBe('false');
    expect(host.changes).toEqual([]);
  });

  it('applies the size modifier', () => {
    host.size.set('lg');

    fixture.detectChanges();

    expect(getButton().classList).toContain('ea-toggle-chip--lg');
    expect(getButton().classList).not.toContain('ea-toggle-chip--md');
  });

  it('forwards aria-label for chips without visible text', () => {
    host.ariaLabel.set('Show on map');

    fixture.detectChanges();

    expect(getButton().getAttribute('aria-label')).toBe('Show on map');
  });

  it('omits aria-label when none is given', () => {
    expect(getButton().hasAttribute('aria-label')).toBe(false);
  });

  it('links a description through aria-describedby', () => {
    host.ariaDescribedby.set('dark-mode-hint');

    fixture.detectChanges();

    expect(getButton().getAttribute('aria-describedby')).toBe('dark-mode-hint');
  });

  it('omits aria-describedby when none is given', () => {
    expect(getButton().hasAttribute('aria-describedby')).toBe(false);
  });

  it('renders no icon slot when none is given', () => {
    expect(fixture.nativeElement.querySelector('.ea-toggle-chip__icon')).toBeNull();
  });

  it('renders the given icon before the label, hidden from assistive technology', () => {
    host.icon.set(MoonIconComponent);

    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('.ea-toggle-chip__content');
    const icon = content.firstElementChild;
    expect(icon.classList).toContain('ea-toggle-chip__icon');
    expect(icon.querySelector('ea-icon-moon')).not.toBeNull();
    expect(icon.getAttribute('aria-hidden')).toBe('true');
    expect(content.textContent.trim()).toBe('Dark mode');
  });

  it('hides the check from assistive technology', () => {
    const check = fixture.nativeElement.querySelector('.ea-toggle-chip__check');

    expect(check.getAttribute('aria-hidden')).toBe('true');
  });
});

import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioGroupComponent } from './radio-group.component';
import { RadioComponent } from './radio.component';

@Component({
  imports: [RadioComponent, RadioGroupComponent],
  template: `
    <ea-radio-group
      [(value)]="value"
      [label]="label()"
      [disabled]="disabled()"
      [errorMsg]="errorMsg()"
      [hint]="hint()">
      <ea-radio
        value="a"
        label="A" />
      <ea-radio
        value="b"
        label="B" />
      <ea-radio
        value="c"
        label="C"
        [disabled]="cDisabled()" />
    </ea-radio-group>
  `,
})
class HostComponent {
  value = signal('');
  label = signal<string | undefined>(undefined);
  disabled = signal(false);
  errorMsg = signal<string | undefined>(undefined);
  hint = signal<string | undefined>(undefined);
  cDisabled = signal(false);
}

describe('RadioGroupComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  function getGroup(): HTMLElement {
    return fixture.nativeElement.querySelector('[role="radiogroup"]');
  }

  function getRadioInputs(): HTMLInputElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('input[type="radio"]'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the radio group with role="radiogroup"', () => {
    expect(getGroup()).toBeTruthy();
  });

  it('renders one input per ea-radio child', () => {
    expect(getRadioInputs()).toHaveLength(3);
  });

  it('shares one name across all radios in the group', () => {
    const names = getRadioInputs().map(i => i.name);
    expect(new Set(names).size).toBe(1);
  });

  it('updates the bound value when a radio is selected', () => {
    getRadioInputs()[1].click();
    fixture.detectChanges();

    expect(host.value()).toBe('b');
  });

  it('marks the selected radio as checked', () => {
    host.value.set('b');
    fixture.detectChanges();

    expect(getRadioInputs()[1].checked).toBe(true);
    expect(getRadioInputs()[0].checked).toBe(false);
    expect(getRadioInputs()[2].checked).toBe(false);
  });

  it('does not select when the group is disabled', () => {
    host.disabled.set(true);
    fixture.detectChanges();

    getRadioInputs()[1].click();
    fixture.detectChanges();

    expect(host.value()).toBe('');
  });

  it('does not select an individually disabled radio', () => {
    host.cDisabled.set(true);
    fixture.detectChanges();

    getRadioInputs()[2].click();
    fixture.detectChanges();

    expect(host.value()).toBe('');
  });

  it('renders the group label when set, with aria-labelledby pointing to it', () => {
    host.label.set('Preferred answer');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.ea-field-label');
    expect(label.textContent.trim()).toBe('Preferred answer');
    expect(getGroup().getAttribute('aria-labelledby')).toBe(label.id);
  });

  it('shows the error message when set', () => {
    host.errorMsg.set('Required');
    fixture.detectChanges();

    const msg = fixture.nativeElement.querySelector('.ea-field-messages__message--error');
    expect(msg.textContent).toContain('Required');
    expect(getGroup().getAttribute('aria-invalid')).toBe('true');
  });

  it('shows the hint when set with no error', () => {
    host.hint.set('Pick one');
    fixture.detectChanges();

    const msg = fixture.nativeElement.querySelector('.ea-field-messages__message--hint');
    expect(msg.textContent).toContain('Pick one');
  });

  it('hides the hint when an error is also set', () => {
    host.hint.set('Pick one');
    host.errorMsg.set('Required');
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.ea-field-messages__message--hint'),
    ).toBeNull();
  });

  describe('CVA', () => {
    it('writes a value via writeValue', () => {
      const groupCmp = fixture.debugElement.children[0]
        .componentInstance as RadioGroupComponent;

      groupCmp.writeValue('c');
      fixture.detectChanges();

      expect(host.value()).toBe('c');
    });

    it('calls onChange when select() runs', () => {
      const groupCmp = fixture.debugElement.children[0]
        .componentInstance as RadioGroupComponent;
      const onChange = vi.fn<(value: string) => void>();
      groupCmp.registerOnChange(onChange);

      groupCmp.select('a');

      expect(onChange).toHaveBeenCalledWith('a');
    });

    it('disables via setDisabledState', () => {
      const groupCmp = fixture.debugElement.children[0]
        .componentInstance as RadioGroupComponent;

      groupCmp.setDisabledState(true);
      fixture.detectChanges();

      getRadioInputs()[0].click();
      fixture.detectChanges();

      expect(host.value()).toBe('');
    });
  });
});

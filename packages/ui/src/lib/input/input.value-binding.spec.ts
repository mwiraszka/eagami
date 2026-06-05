import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

@Component({
  template: `<ea-input
    [value]="value()"
    (valueChange)="value.set($event)" />`,
  imports: [InputComponent],
})
class HostComponent {
  readonly value = signal('');
}

describe('InputComponent one-way [value] + (valueChange) round trip', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  function nativeInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input');
  }

  function type(text: string): void {
    const input = nativeInput();
    input.value = text;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('propagates typed text to the parent and keeps it displayed', () => {
    type('hello');

    expect(host.value()).toBe('hello');
    expect(nativeInput().value).toBe('hello');
  });

  it('reflects a value pushed back down from the parent', () => {
    type('temp');
    host.value.set('');
    fixture.detectChanges();

    expect(nativeInput().value).toBe('');
  });
});

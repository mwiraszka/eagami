/// <reference types="node" />
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SunIconComponent } from '../icons/sun.component';
import { FieldLabelComponent } from './field-label.component';

describe('FieldLabelComponent', () => {
  let fixture: ComponentFixture<FieldLabelComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldLabelComponent);
    fixture.componentRef.setInput('text', 'Email');
    el = fixture.nativeElement as HTMLElement;
  });

  it('renders a <label for> when forId is set', () => {
    fixture.componentRef.setInput('forId', 'email-input');
    fixture.detectChanges();

    const label = el.querySelector('label');

    expect(label?.getAttribute('for')).toBe('email-input');
    expect(el.querySelector('span')).toBeNull();
    expect(label?.textContent).toContain('Email');
  });

  it('renders a <span> when forId is absent', () => {
    fixture.detectChanges();

    expect(el.querySelector('label')).toBeNull();
    expect(el.querySelector('span')?.textContent).toContain('Email');
  });

  it('applies the required modifier when required', () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    expect(el.querySelector('.ea-field-label--required')).toBeTruthy();
  });

  it('applies labelId as the element id', () => {
    fixture.componentRef.setInput('labelId', 'email-label');
    fixture.detectChanges();

    expect(el.querySelector('.ea-field-label')?.id).toBe('email-label');
  });

  it('renders the icon before the label text, hidden from assistive tech', () => {
    fixture.componentRef.setInput('icon', SunIconComponent);
    fixture.detectChanges();

    const label = el.querySelector('.ea-field-label')!;
    const icon = label.querySelector('.ea-field-label__icon')!;
    const text = Array.from(label.childNodes).find(
      node => node.nodeType === Node.TEXT_NODE && node.textContent?.includes('Email'),
    )!;

    expect(icon.querySelector('svg')).toBeTruthy();
    expect(icon.getAttribute('aria-hidden')).toBe('true');
    expect(icon.compareDocumentPosition(text) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  // Only the shared label renders the icon, so a component that declares
  // `labelIcon` and forgets to hand it over fails silently in every consumer.
  describe('Consumer wiring', () => {
    const LIB = join(process.cwd(), 'src/lib');

    function read(path: string): string {
      return readFileSync(join(LIB, path), 'utf8');
    }

    it('hands every declared labelIcon input to the shared label', () => {
      const owners = readdirSync(LIB, { recursive: true, encoding: 'utf8' })
        .filter(file => file.endsWith('.component.ts'))
        .filter(file => read(file).includes('readonly labelIcon = input'));

      const unbound = owners.filter(
        file => !read(file.replace(/\.ts$/, '.html')).includes('[icon]="labelIcon()"'),
      );

      expect(owners.length).toBeGreaterThan(15);
      expect(unbound).toEqual([]);
    });
  });
});

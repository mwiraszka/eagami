/// <reference types="node" />
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { type TopLayerStubs, installTopLayerStubs } from '../../test-setup';
import { provideEagamiUi } from '../eagami-ui.provider';
import { EAGAMI_ALL_LOCALES } from '../i18n/messages';
import { SunIconComponent } from '../icons/sun.component';
import { FieldLabelComponent } from './field-label.component';

@Component({
  imports: [FieldLabelComponent],
  template: `
    <ea-field-label
      text="Phone"
      [help]="tip" />
    <ng-template #tip><em>Optional.</em> Only admins can see it.</ng-template>
  `,
})
class TemplateHelpHostComponent {}

describe('FieldLabelComponent', () => {
  let fixture: ComponentFixture<FieldLabelComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldLabelComponent, TemplateHelpHostComponent],
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

  describe('Optional', () => {
    function suffix(): HTMLElement | null {
      return el.querySelector('.ea-field-label__optional');
    }

    function labelText(): string {
      return el
        .querySelector('.ea-field-label')!
        .textContent!.replace(/\s+/g, ' ')
        .trim();
    }

    it('renders no suffix by default', () => {
      fixture.detectChanges();

      expect(suffix()).toBeNull();
    });

    it('follows the label text with a spaced "(optional)" inside the label', () => {
      fixture.componentRef.setInput('forId', 'email-input');
      fixture.componentRef.setInput('optional', true);
      fixture.detectChanges();

      const label = el.querySelector('label')!;

      expect(label.contains(suffix())).toBe(true);
      expect(suffix()?.textContent).toBe('(optional)');
      expect(labelText()).toBe('Email (optional)');
    });

    it('renders the suffix on a span label too', () => {
      fixture.componentRef.setInput('optional', true);
      fixture.detectChanges();

      expect(labelText()).toBe('Email (optional)');
    });

    it('leaves the suffix out while required is set', () => {
      fixture.componentRef.setInput('optional', true);
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      expect(suffix()).toBeNull();
      expect(el.querySelector('.ea-field-label--required')).toBeTruthy();
    });

    it('localizes the suffix', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [provideEagamiUi({ locale: 'pl', locales: EAGAMI_ALL_LOCALES })],
      });
      const localized = TestBed.createComponent(FieldLabelComponent);
      localized.componentRef.setInput('text', 'Telefon');
      localized.componentRef.setInput('optional', true);
      const root = localized.nativeElement as HTMLElement;

      localized.detectChanges();

      expect(root.querySelector('.ea-field-label__optional')?.textContent).toBe(
        '(opcjonalnie)',
      );
    });
  });

  describe('Help', () => {
    function trigger(): HTMLButtonElement | null {
      return el.querySelector('.ea-field-label__help-trigger');
    }

    function status(): HTMLElement | null {
      return el.querySelector('[role="status"]');
    }

    function bubble(): HTMLElement | null {
      return el.querySelector('.ea-field-label__help-bubble');
    }

    function renderWithHelp(): void {
      fixture.componentRef.setInput('forId', 'email-input');
      fixture.componentRef.setInput('help', 'We never share it.');
      fixture.detectChanges();
    }

    function press(): void {
      trigger()!.click();
      fixture.detectChanges();
    }

    it('renders no help button or live region without help', () => {
      fixture.detectChanges();

      expect(trigger()).toBeNull();
      expect(status()).toBeNull();
    });

    it('keeps the button out of the label that names the control', () => {
      renderWithHelp();

      const label = el.querySelector('label')!;

      expect(trigger()).toBeTruthy();
      expect(label.contains(trigger())).toBe(false);
      expect(label.textContent?.trim()).toBe('Email');
    });

    it('gives the button a localized name built from the label text', () => {
      renderWithHelp();

      expect(trigger()?.getAttribute('type')).toBe('button');
      expect(trigger()?.getAttribute('aria-label')).toBe('More information about Email');
    });

    it('starts collapsed, controlling an empty live region', () => {
      renderWithHelp();

      expect(trigger()?.getAttribute('aria-expanded')).toBe('false');
      expect(trigger()?.getAttribute('aria-controls')).toBe(status()?.id);
      expect(status()?.textContent?.trim()).toBe('');
    });

    it('reveals the help inside the live region when pressed', () => {
      renderWithHelp();

      press();

      expect(trigger()?.getAttribute('aria-expanded')).toBe('true');
      expect(status()?.textContent?.trim()).toBe('We never share it.');
    });

    it('hides the help when pressed again', () => {
      renderWithHelp();
      press();

      press();

      expect(trigger()?.getAttribute('aria-expanded')).toBe('false');
      expect(status()?.textContent?.trim()).toBe('');
    });

    it('renders template help', () => {
      const host = TestBed.createComponent(TemplateHelpHostComponent);
      host.detectChanges();
      const root = host.nativeElement as HTMLElement;

      root.querySelector<HTMLButtonElement>('.ea-field-label__help-trigger')!.click();
      host.detectChanges();

      expect(root.querySelector('[role="status"] em')?.textContent).toBe('Optional.');
      expect(root.querySelector('[role="status"]')?.textContent).toContain(
        'Only admins can see it.',
      );
    });

    it('closes on Escape without the key reaching anything else', () => {
      renderWithHelp();
      press();
      const outer = vi.fn();
      document.addEventListener('keydown', outer);
      const escape = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      });

      document.body.dispatchEvent(escape);
      fixture.detectChanges();
      document.removeEventListener('keydown', outer);

      expect(escape.defaultPrevented).toBe(true);
      expect(outer).not.toHaveBeenCalled();
      expect(trigger()?.getAttribute('aria-expanded')).toBe('false');
    });

    it('closes on a click outside it', () => {
      renderWithHelp();
      press();

      document.body.click();
      fixture.detectChanges();

      expect(trigger()?.getAttribute('aria-expanded')).toBe('false');
    });

    it('stays open for a click on the help text itself', () => {
      renderWithHelp();
      press();

      bubble()!.click();
      fixture.detectChanges();

      expect(trigger()?.getAttribute('aria-expanded')).toBe('true');
    });

    it('closes once focus moves on to another control', () => {
      renderWithHelp();
      press();
      const next = document.createElement('input');
      document.body.appendChild(next);

      trigger()!.dispatchEvent(
        new FocusEvent('focusout', { bubbles: true, relatedTarget: next }),
      );
      fixture.detectChanges();
      next.remove();

      expect(trigger()?.getAttribute('aria-expanded')).toBe('false');
    });

    it('starts closed again when the help changes', () => {
      renderWithHelp();
      press();

      fixture.componentRef.setInput('help', 'We only use it for receipts.');
      fixture.detectChanges();

      expect(trigger()?.getAttribute('aria-expanded')).toBe('false');
    });

    it('drops the button and live region once the help is cleared', () => {
      renderWithHelp();
      press();

      fixture.componentRef.setInput('help', undefined);
      fixture.detectChanges();

      expect(trigger()).toBeNull();
      expect(status()).toBeNull();
    });

    it('places the bubble above its trigger', () => {
      Object.defineProperty(document.documentElement, 'clientWidth', {
        value: 1024,
        configurable: true,
      });
      Object.defineProperty(document.documentElement, 'clientHeight', {
        value: 768,
        configurable: true,
      });
      vi.spyOn(HTMLSpanElement.prototype, 'getBoundingClientRect').mockReturnValue(
        new DOMRect(0, 0, 200, 40),
      );
      renderWithHelp();
      trigger()!.getBoundingClientRect = () => new DOMRect(300, 200, 20, 20);

      press();
      Reflect.deleteProperty(document.documentElement, 'clientWidth');
      Reflect.deleteProperty(document.documentElement, 'clientHeight');

      expect(bubble()?.style.top).toBe('156px');
      expect(bubble()?.style.left).toBe('210px');
    });

    describe('Top layer', () => {
      let stubs: TopLayerStubs;

      beforeEach(() => {
        stubs = installTopLayerStubs();
      });

      afterEach(() => {
        stubs.restore();
      });

      it('raises the open bubble without moving it out of the live region', () => {
        renderWithHelp();

        press();

        expect(stubs.shown()).toEqual([bubble()]);
        expect(status()?.contains(bubble())).toBe(true);
      });
    });
  });

  // Only the shared label renders the icon, the help and the optional note, so a
  // component that declares `labelIcon`, `labelHelp` or `optional` and forgets to
  // hand it over fails silently in every consumer.
  describe('Consumer wiring', () => {
    const LIB = join(process.cwd(), 'src/lib');

    function read(path: string): string {
      return readFileSync(join(LIB, path), 'utf8');
    }

    it.each([
      ['labelIcon', '[icon]="labelIcon()"'],
      ['labelHelp', '[help]="labelHelp()"'],
      ['optional', '[optional]="optional()"'],
    ])('hands %s to the shared label in every labelled field', (_input, binding) => {
      const owners = readdirSync(LIB, { recursive: true, encoding: 'utf8' })
        .filter(file => file.endsWith('.component.ts'))
        .filter(file => read(file).includes('extends LabelledFieldControlBase'));

      const unbound = owners.filter(
        file => !read(file.replace(/\.ts$/, '.html')).includes(binding),
      );

      expect(owners.length).toBeGreaterThan(15);
      expect(unbound).toEqual([]);
    });
  });
});

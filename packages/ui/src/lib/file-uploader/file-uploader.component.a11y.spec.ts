import { axe } from 'vitest-axe';

import { Component, type Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { UploadIconComponent } from '../icons/upload.component';
import {
  FileUploaderComponent,
  type FileUploaderVariant,
} from './file-uploader.component';

@Component({
  imports: [FileUploaderComponent],
  template: `
    <ea-file-uploader
      [label]="label"
      [hint]="hint"
      [errorMsg]="errorMsg"
      [disabled]="disabled"
      [variant]="variant"
      [buttonLabel]="buttonLabel"
      [buttonIcon]="buttonIcon"
      [aria-label]="ariaLabel"
      [accept]="accept"
      [value]="value" />
  `,
})
class HostComponent {
  label: string | undefined = 'Attach files';
  hint: string | undefined = undefined;
  errorMsg: string | undefined = undefined;
  disabled = false;
  variant: FileUploaderVariant = 'dropzone';
  buttonLabel: string | undefined = undefined;
  buttonIcon: Type<unknown> | undefined = undefined;
  ariaLabel: string | undefined = undefined;
  accept: string | undefined = undefined;
  value: readonly File[] = [];
}

describe('FileUploaderComponent a11y', () => {
  async function render(setup?: (host: HostComponent) => void) {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    setup?.(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations in the default state', async () => {
    const el = await render();

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations with a hint', async () => {
    const el = await render(host => (host.hint = 'PDFs up to 5 MB'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations in the error state', async () => {
    const el = await render(host => (host.errorMsg = 'Required'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations when disabled', async () => {
    const el = await render(host => (host.disabled = true));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  describe('button variant', () => {
    it('has no detectable violations with a label, hint and constraints', async () => {
      const el = await render(host => {
        host.variant = 'button';
        host.hint = 'One file per import';
        host.accept = '.csv';
      });

      const results = await axe(el);

      expect(results).toHaveNoViolations();
    });

    it('has no detectable violations as an icon-only button', async () => {
      const el = await render(host => {
        host.variant = 'button';
        host.label = undefined;
        host.buttonLabel = '';
        host.buttonIcon = UploadIconComponent;
        host.ariaLabel = 'Update ratings from CSV';
      });

      const results = await axe(el);

      expect(results).toHaveNoViolations();
    });

    it('has no detectable violations in the error state', async () => {
      const el = await render(host => {
        host.variant = 'button';
        host.errorMsg = 'Required';
      });

      const results = await axe(el);

      expect(results).toHaveNoViolations();
    });

    it('has no detectable violations when disabled', async () => {
      const el = await render(host => {
        host.variant = 'button';
        host.disabled = true;
      });

      const results = await axe(el);

      expect(results).toHaveNoViolations();
    });

    it('has no detectable violations with selected files listed', async () => {
      const el = await render(host => {
        host.variant = 'button';
        host.value = [new File(['a,b'], 'ratings.csv', { type: 'text/csv' })];
      });

      const results = await axe(el);

      expect(results).toHaveNoViolations();
    });
  });
});

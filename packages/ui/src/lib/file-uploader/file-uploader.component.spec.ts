import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { FileUploaderComponent, FileUploaderRejection } from './file-uploader.component';

function makeFile(
  name: string,
  sizeBytes: number,
  type = 'application/octet-stream',
): File {
  const blob = new Blob([new ArrayBuffer(sizeBytes)], { type });
  return new File([blob], name, { type, lastModified: 0 });
}

function fileList(...files: File[]): FileList {
  // jsdom has no DataTransfer; fake a FileList with the array-like + item method
  // shape the component code actually reads (Array.from + indexing).
  const list = {
    length: files.length,
    item: (i: number) => files[i] ?? null,
    ...files.reduce<Record<number, File>>((acc, f, i) => ({ ...acc, [i]: f }), {}),
    [Symbol.iterator]: function* () {
      for (const f of files) yield f;
    },
  };
  return list as unknown as FileList;
}

describe('FileUploaderComponent', () => {
  let fixture: ComponentFixture<FileUploaderComponent>;
  let component: FileUploaderComponent;

  function getDropzone(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.ea-file-uploader-field__dropzone');
  }

  function getFileInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input[type="file"]');
  }

  function getRows(): HTMLElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.ea-file-uploader-field__item'),
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploaderComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders the dropzone button and hidden file input', () => {
      expect(getDropzone()).toBeTruthy();
      expect(getFileInput()).toBeTruthy();
    });

    it('renders no file list when value is empty', () => {
      expect(
        fixture.nativeElement.querySelector('.ea-file-uploader-field__list'),
      ).toBeNull();
    });

    it('renders one row per file in writeValue', () => {
      component.writeValue([makeFile('a.txt', 10), makeFile('b.txt', 20)]);
      fixture.detectChanges();
      expect(getRows().length).toBe(2);
    });

    it('renders an error message with role=alert when errorMsg is set', () => {
      fixture.componentRef.setInput('errorMsg', 'Required');
      fixture.detectChanges();
      const msg = fixture.nativeElement.querySelector(
        '.ea-file-uploader-field__message--error',
      );
      expect(msg).toBeTruthy();
      expect(msg.getAttribute('role')).toBe('alert');
      expect(msg.querySelector('.ea-file-uploader-field__message-icon')).toBeTruthy();
    });

    it('renders a constraints line when accept / maxSize / maxFiles are set', () => {
      fixture.componentRef.setInput('accept', 'image/*');
      fixture.componentRef.setInput('maxSize', 2 * 1024 * 1024);
      fixture.componentRef.setInput('maxFiles', 3);
      fixture.detectChanges();
      const text = fixture.nativeElement
        .querySelector('.ea-file-uploader-field__constraints')
        .textContent.trim();
      expect(text).toContain('image/*');
      expect(text).toContain('2 MB');
      expect(text).toContain('3');
    });
  });

  describe('Validation', () => {
    it('accepts files that pass all checks and updates the value model', () => {
      const files = [makeFile('a.png', 100, 'image/png')];
      fixture.componentRef.setInput('accept', 'image/*');
      fixture.detectChanges();
      Object.defineProperty(getFileInput(), 'files', {
        value: fileList(...files),
      });
      getFileInput().dispatchEvent(new Event('change'));
      expect(component.value()).toEqual(files);
    });

    it('rejects files with the wrong MIME and emits reason "type"', () => {
      const accepted: FileUploaderRejection[] = [];
      component.rejected.subscribe(r => accepted.push(...r));
      const bad = makeFile('a.txt', 10, 'text/plain');
      fixture.componentRef.setInput('accept', 'image/*');
      fixture.detectChanges();
      Object.defineProperty(getFileInput(), 'files', { value: fileList(bad) });
      getFileInput().dispatchEvent(new Event('change'));
      expect(component.value()).toEqual([]);
      expect(accepted).toEqual([{ file: bad, reason: 'type' }]);
    });

    it('rejects files larger than maxSize with reason "size"', () => {
      const rejections: FileUploaderRejection[] = [];
      component.rejected.subscribe(r => rejections.push(...r));
      const big = makeFile('big.bin', 2000);
      fixture.componentRef.setInput('maxSize', 1000);
      fixture.detectChanges();
      Object.defineProperty(getFileInput(), 'files', { value: fileList(big) });
      getFileInput().dispatchEvent(new Event('change'));
      expect(component.value()).toEqual([]);
      expect(rejections).toEqual([{ file: big, reason: 'size' }]);
    });

    it('caps total accepted files at maxFiles and emits "count" for overflow', () => {
      const rejections: FileUploaderRejection[] = [];
      component.rejected.subscribe(r => rejections.push(...r));
      fixture.componentRef.setInput('maxFiles', 2);
      fixture.detectChanges();
      const files = [makeFile('a.txt', 10), makeFile('b.txt', 10), makeFile('c.txt', 10)];
      Object.defineProperty(getFileInput(), 'files', { value: fileList(...files) });
      getFileInput().dispatchEvent(new Event('change'));
      expect(component.value().length).toBe(2);
      expect(rejections).toEqual([{ file: files[2], reason: 'count' }]);
    });

    it('replaces the value when multiple=false', () => {
      fixture.componentRef.setInput('multiple', false);
      component.writeValue([makeFile('old.txt', 10)]);
      fixture.detectChanges();
      const next = makeFile('new.txt', 10);
      Object.defineProperty(getFileInput(), 'files', { value: fileList(next) });
      getFileInput().dispatchEvent(new Event('change'));
      expect(component.value()).toEqual([next]);
    });

    it('matches accept tokens against MIME and extension', () => {
      fixture.componentRef.setInput('accept', '.pdf,image/png');
      fixture.detectChanges();
      const pdf = makeFile('doc.pdf', 10, 'application/pdf');
      const png = makeFile('pic.png', 10, 'image/png');
      const jpg = makeFile('pic.jpg', 10, 'image/jpeg');
      Object.defineProperty(getFileInput(), 'files', { value: fileList(pdf, png, jpg) });
      getFileInput().dispatchEvent(new Event('change'));
      expect(component.value()).toEqual([pdf, png]);
    });
  });

  describe('Removal', () => {
    it('removes a file via the X button and emits fileRemoved', () => {
      const a = makeFile('a.txt', 10);
      const b = makeFile('b.txt', 10);
      let removed: File | undefined;
      component.fileRemoved.subscribe(f => (removed = f));
      component.writeValue([a, b]);
      fixture.detectChanges();
      const removeBtn = getRows()[0].querySelector(
        '.ea-file-uploader-field__remove',
      ) as HTMLButtonElement;
      removeBtn.click();
      fixture.detectChanges();
      expect(component.value()).toEqual([b]);
      expect(removed).toBe(a);
    });
  });

  describe('Form integration (CVA)', () => {
    it('writes the form-control value and notifies on changes', () => {
      const fc = new FormControl<readonly File[]>([], { nonNullable: true });
      component.registerOnChange(v => fc.setValue(v as File[]));
      const file = makeFile('a.txt', 10);
      Object.defineProperty(getFileInput(), 'files', { value: fileList(file) });
      getFileInput().dispatchEvent(new Event('change'));
      expect(fc.value).toEqual([file]);
    });

    it('disables the dropzone when setDisabledState(true) is called', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      expect(getDropzone().disabled).toBe(true);
      expect(getFileInput().disabled).toBe(true);
    });
  });

  describe('Icon slot', () => {
    it('renders the default upload-cloud icon when no projected icon is supplied', () => {
      expect(fixture.nativeElement.querySelector('ea-icon-upload-cloud')).toBeTruthy();
    });
  });

  describe('Drag and drop', () => {
    // jsdom doesn't ship a DragEvent constructor; hand-roll one with the
    // `dataTransfer.files` shape the component reads.
    function dragEvent(type: string, ...files: File[]): Event {
      const evt = new Event(type, { bubbles: true });
      if (files.length) {
        Object.defineProperty(evt, 'dataTransfer', {
          value: { files: fileList(...files) },
        });
      }
      return evt;
    }

    function hostClasses(): DOMTokenList {
      return fixture.nativeElement.querySelector('.ea-file-uploader-field').classList;
    }

    it('flags drag-over on dragover and clears it on dragleave', () => {
      getDropzone().dispatchEvent(dragEvent('dragover'));
      fixture.detectChanges();
      expect(hostClasses().contains('ea-file-uploader-field--drag-over')).toBe(true);
      getDropzone().dispatchEvent(dragEvent('dragleave'));
      fixture.detectChanges();
      expect(hostClasses().contains('ea-file-uploader-field--drag-over')).toBe(false);
    });

    it('accepts dropped files into the value model', () => {
      const file = makeFile('a.txt', 10);
      getDropzone().dispatchEvent(dragEvent('drop', file));
      expect(component.value()).toEqual([file]);
    });

    it('ignores drops while disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      getDropzone().dispatchEvent(dragEvent('drop', makeFile('a.txt', 10)));
      expect(component.value()).toEqual([]);
    });
  });

  describe('Focus / blur', () => {
    it('flags focused on dropzone focus and calls onTouched on blur', () => {
      let touched = 0;
      component.registerOnTouched(() => touched++);
      getDropzone().dispatchEvent(new FocusEvent('focus'));
      getDropzone().dispatchEvent(new FocusEvent('blur'));
      expect(touched).toBe(1);
    });
  });

  describe('formatBytes via constraints text', () => {
    function constraintsText(): string {
      return fixture.nativeElement.querySelector('.ea-file-uploader-field__constraints')
        .textContent;
    }

    it('formats KB / MB / GB / TB tiers', () => {
      fixture.componentRef.setInput('maxSize', 500);
      fixture.detectChanges();
      expect(constraintsText()).toContain('500 B');

      fixture.componentRef.setInput('maxSize', 2 * 1024);
      fixture.detectChanges();
      expect(constraintsText()).toContain('2 KB');

      fixture.componentRef.setInput('maxSize', 5 * 1024 * 1024);
      fixture.detectChanges();
      expect(constraintsText()).toContain('5 MB');

      fixture.componentRef.setInput('maxSize', 3 * 1024 * 1024 * 1024);
      fixture.detectChanges();
      expect(constraintsText()).toContain('3 GB');

      fixture.componentRef.setInput('maxSize', 2 * 1024 * 1024 * 1024 * 1024);
      fixture.detectChanges();
      expect(constraintsText()).toContain('2 TB');
    });
  });

  describe('A11y', () => {
    it('opens the picker on Enter and Space, ignoring other keys', () => {
      const inputEl = getFileInput();
      const clickSpy = jest.spyOn(inputEl, 'click');
      getDropzone().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      getDropzone().dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      getDropzone().dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
      expect(clickSpy).toHaveBeenCalledTimes(2);
    });

    it('links the dropzone to messages via aria-describedby', () => {
      fixture.componentRef.setInput('hint', 'Up to 10 MB');
      fixture.detectChanges();
      const described = getDropzone().getAttribute('aria-describedby');
      expect(described).toContain('-hint');
    });
  });
});

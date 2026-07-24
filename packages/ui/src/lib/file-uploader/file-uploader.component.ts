import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  computed,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FieldLabelComponent } from '../field/field-label.component';
import { FieldMessagesComponent } from '../field/field-messages.component';
import {
  type EaErrorMessages,
  injectControlErrorState,
} from '../forms/control-error-state';
import { EagamiI18nService } from '../i18n/i18n.service';
import { ArchiveIconComponent } from '../icons/archive.component';
import { FileTextIconComponent } from '../icons/file-text.component';
import { FileIconComponent } from '../icons/file.component';
import { FilmIconComponent } from '../icons/film.component';
import { ImageIconComponent } from '../icons/image.component';
import { MusicIconComponent } from '../icons/music.component';
import { UploadCloudIconComponent } from '../icons/upload-cloud.component';
import { XIconComponent } from '../icons/x.component';
import { type EaSize } from '../sizes';
import { uniqueId } from '../unique-id';

/** Visual size of the file uploader. */
export type FileUploaderSize = EaSize;

/** Reason a file was rejected during selection. */
export type FileUploaderRejectionReason = 'type' | 'size' | 'count';

/** Detail object emitted on the `rejected` output when one or more files fail validation. */
export interface FileUploaderRejection {
  readonly file: File;
  readonly reason: FileUploaderRejectionReason;
}

/**
 * Multi-file uploader with a drag-and-drop zone and a per-file list. Pure UI:
 * the component manages selection, validation, and removal but does not perform
 * any network I/O; consumers are responsible for uploading the resulting
 * `File[]` and (optionally) feeding progress back via the `progress` map.
 *
 * The dropzone icon (default `<ea-icon-upload-cloud>`) is exposed as a content
 * slot via the `icon` attribute: project any element to override it, and the
 * dropzone's size-aware wrapper handles sizing automatically.
 *
 * @example
 * ```html
 * <ea-file-uploader label="Attach files">
 *   <ea-icon-paperclip icon />
 * </ea-file-uploader>
 * ```
 */
@Component({
  selector: 'ea-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArchiveIconComponent,
    FieldLabelComponent,
    FieldMessagesComponent,
    FileIconComponent,
    FileTextIconComponent,
    FilmIconComponent,
    ImageIconComponent,
    MusicIconComponent,
    NgClass,
    UploadCloudIconComponent,
    XIconComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true,
    },
  ],
})
export class FileUploaderComponent implements ControlValueAccessor {
  private readonly fileInputEl = viewChild<ElementRef<HTMLInputElement>>('fileInputEl');
  private readonly dropzoneEl = viewChild<ElementRef<HTMLButtonElement>>('dropzoneEl');
  protected readonly i18n = inject(EagamiI18nService);

  readonly label = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly errorMsg = input<string | undefined>(undefined);
  /** Per-validator-key message overrides for a bound form control (e.g. `{ required: '...' }`). */
  readonly errorMessages = input<EaErrorMessages | undefined>(undefined);
  readonly size = input<FileUploaderSize>('md');
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly multiple = input<boolean>(true);
  /** Comma-separated MIME types and / or file extensions, e.g. `'image/*,.pdf'`. */
  readonly accept = input<string | undefined>(undefined);
  /** Max size per file in bytes. Files larger than this are rejected. */
  readonly maxSize = input<number | undefined>(undefined);
  /** Max total number of files. Extra files are rejected. */
  readonly maxFiles = input<number | undefined>(undefined);
  /** Toggle the file list under the dropzone. */
  readonly showFileList = input<boolean>(true);
  /**
   * Optional per-file progress (0-100). Keyed by `File` object identity, so
   * consumers must keep the same `File` references between change-detection
   * runs. When unset, no progress bar is rendered.
   */
  readonly progress = input<ReadonlyMap<File, number> | undefined>(undefined);
  readonly id = input<string>(uniqueId('ea-file-uploader'));

  /** Two-way binding to the current `File[]`. Also written by Angular forms. */
  readonly value = model<readonly File[]>([]);

  /** Fires when one or more selected files fail validation. */
  readonly rejected = output<readonly FileUploaderRejection[]>();
  /** Fires whenever a file is removed via its row's X button. */
  readonly fileRemoved = output<File>();

  protected readonly isDragOver = signal(false);
  protected readonly isFocused = signal(false);
  private readonly _formDisabled = signal(false);

  private onChange: (value: readonly File[]) => void = () => {};
  private onTouched: () => void = () => {};

  protected readonly isDisabled = computed(() => this.disabled() || this._formDisabled());
  private readonly errorState = injectControlErrorState({
    errorMsg: this.errorMsg,
    errorMessages: this.errorMessages,
  });
  protected readonly errorText = this.errorState.error;
  protected readonly hasError = this.errorState.hasError;
  protected readonly showError = this.hasError;
  protected readonly showHint = computed(() => !!this.hint() && !this.hasError());

  protected readonly hostClasses = computed(() => ({
    [`ea-file-uploader-field--${this.size()}`]: true,
    'ea-file-uploader-field--error': this.hasError(),
    'ea-file-uploader-field--disabled': this.isDisabled(),
    'ea-file-uploader-field--drag-over': this.isDragOver(),
    'ea-file-uploader-field--focused': this.isFocused(),
  }));

  protected readonly errorId = computed(() => `${this.id()}-error`);
  protected readonly hintId = computed(() => `${this.id()}-hint`);
  protected readonly constraintsId = computed(() => `${this.id()}-constraints`);

  protected readonly describedBy = computed(() => {
    const ids: string[] = [];
    if (this.showError()) {
      ids.push(this.errorId());
    }
    if (this.showHint()) {
      ids.push(this.hintId());
    }
    if (this.constraintsText()) {
      ids.push(this.constraintsId());
    }
    return ids.length ? ids.join(' ') : null;
  });

  /** Joined human-readable description of accept / maxSize / maxFiles limits. */
  protected readonly constraintsText = computed(() => {
    const messages = this.i18n.messages().fileUploader;
    const parts: string[] = [];
    const accept = this.accept();
    const maxSize = this.maxSize();
    const maxFiles = this.maxFiles();
    if (accept) {
      parts.push(messages.constraintsAccept(accept));
    }
    if (maxSize !== undefined) {
      parts.push(messages.constraintsMaxSize(this.formatBytes(maxSize)));
    }
    if (maxFiles !== undefined && this.multiple()) {
      parts.push(messages.constraintsMaxFiles(maxFiles));
    }
    return parts.join(' • ');
  });

  protected readonly promptText = computed(() =>
    this.multiple()
      ? this.i18n.messages().fileUploader.prompt
      : this.i18n.messages().fileUploader.promptSingle,
  );

  writeValue(value: readonly File[] | null | undefined): void {
    this.value.set(value ?? []);
  }

  registerOnChange(fn: (value: readonly File[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  protected openFilePicker(): void {
    if (this.isDisabled()) {
      return;
    }
    this.fileInputEl()?.nativeElement.click();
  }

  protected onDropzoneKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openFilePicker();
    }
  }

  protected onDropzoneFocus(): void {
    this.isFocused.set(true);
  }

  protected onDropzoneBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }

  protected onFileSelected(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const files = inputEl.files ? Array.from(inputEl.files) : [];
    if (files.length) {
      this.acceptFiles(files);
    }
    // Reset so re-picking the same file re-triggers the input
    inputEl.value = '';
  }

  protected onDragOver(event: DragEvent): void {
    if (this.isDisabled()) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
    if (this.isDisabled()) {
      return;
    }
    const files = event.dataTransfer?.files ? Array.from(event.dataTransfer.files) : [];
    if (files.length) {
      this.acceptFiles(files);
    }
  }

  protected removeFile(file: File): void {
    if (this.isDisabled()) {
      return;
    }
    const next = this.value().filter(f => f !== file);
    this.value.set(next);
    this.onChange(next);
    this.fileRemoved.emit(file);
    this.dropzoneEl()?.nativeElement.focus();
  }

  private acceptFiles(incoming: readonly File[]): void {
    const accepted: File[] = [];
    const rejections: FileUploaderRejection[] = [];

    const accept = this.accept();
    const maxSize = this.maxSize();
    const maxFiles = this.maxFiles();
    const multiple = this.multiple();

    const current = multiple ? [...this.value()] : [];
    const headroom = maxFiles !== undefined ? maxFiles - current.length : Infinity;

    for (const file of incoming) {
      if (accept && !matchesAccept(file, accept)) {
        rejections.push({ file, reason: 'type' });
        continue;
      }
      if (maxSize !== undefined && file.size > maxSize) {
        rejections.push({ file, reason: 'size' });
        continue;
      }
      if (accepted.length >= headroom) {
        rejections.push({ file, reason: 'count' });
        continue;
      }
      accepted.push(file);
      if (!multiple) {
        break;
      }
    }

    if (accepted.length) {
      const next = multiple ? [...current, ...accepted] : accepted.slice(0, 1);
      this.value.set(next);
      this.onChange(next);
    }
    if (rejections.length) {
      this.rejected.emit(rejections);
    }
  }

  protected formatBytes(bytes: number): string {
    const units = this.i18n.messages().fileUploader.bytesUnit;
    if (bytes < 1024) {
      return `${bytes} ${units.b}`;
    }
    const kb = bytes / 1024;
    if (kb < 1024) {
      return `${roundTo(kb, 1)} ${units.kb}`;
    }
    const mb = kb / 1024;
    if (mb < 1024) {
      return `${roundTo(mb, 1)} ${units.mb}`;
    }
    const gb = mb / 1024;
    if (gb < 1024) {
      return `${roundTo(gb, 2)} ${units.gb}`;
    }
    const tb = gb / 1024;
    return `${roundTo(tb, 2)} ${units.tb}`;
  }

  protected iconKey(
    file: File,
  ): 'image' | 'film' | 'music' | 'archive' | 'text' | 'file' {
    return iconForFile(file);
  }

  protected progressFor(file: File): number | undefined {
    return this.progress()?.get(file);
  }

  /** Stable track key for the `@for` over `value()`. */
  protected trackFile(_index: number, file: File): string {
    return `${file.name}|${file.size}|${file.lastModified}`;
  }
}

const ARCHIVE_MIMES = new Set([
  'application/zip',
  'application/x-zip-compressed',
  'application/x-tar',
  'application/x-7z-compressed',
  'application/x-rar-compressed',
  'application/x-rar',
  'application/gzip',
  'application/x-gzip',
]);

const ARCHIVE_EXTS = new Set(['zip', 'tar', '7z', 'rar', 'gz', 'tgz', 'bz2']);

function iconForFile(
  file: File,
): 'image' | 'film' | 'music' | 'archive' | 'text' | 'file' {
  const type = file.type;
  if (type.startsWith('image/')) {
    return 'image';
  }
  if (type.startsWith('video/')) {
    return 'film';
  }
  if (type.startsWith('audio/')) {
    return 'music';
  }
  if (ARCHIVE_MIMES.has(type)) {
    return 'archive';
  }
  if (type === 'application/pdf' || type.startsWith('text/')) {
    return 'text';
  }
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext && ARCHIVE_EXTS.has(ext)) {
    return 'archive';
  }
  return 'file';
}

/**
 * Returns true if the file matches the `accept` attribute syntax: a
 * comma-separated list of MIME ranges (`image/*`), full MIMEs (`image/png`),
 * or extensions (`.pdf`).
 */
function matchesAccept(file: File, accept: string): boolean {
  const tokens = accept
    .split(',')
    .map(t => t.trim().toLowerCase())
    .filter(Boolean);
  if (tokens.length === 0) {
    return true;
  }

  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();

  return tokens.some(token => {
    if (token.startsWith('.')) {
      return name.endsWith(token);
    }
    if (token.endsWith('/*')) {
      return type.startsWith(token.slice(0, -1));
    }
    return type === token;
  });
}

function roundTo(value: number, digits: number): string {
  const factor = 10 ** digits;
  return (Math.round(value * factor) / factor).toString();
}

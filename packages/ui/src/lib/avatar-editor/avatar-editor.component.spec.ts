import { type ComponentFixture, TestBed } from '@angular/core/testing';

import {
  AvatarEditorComponent,
  type AvatarEditorCropState,
} from './avatar-editor.component';

// Captures every Image instance so tests can fire onload/onerror without real network requests
class MockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  crossOrigin = '';
  width = 100;
  height = 100;
  private _src = '';

  get src(): string {
    return this._src;
  }

  set src(value: string) {
    this._src = value;
    mockImageInstances.push(this);
  }
}

const mockImageInstances: MockImage[] = [];

function lastImage(): MockImage {
  return mockImageInstances[mockImageInstances.length - 1];
}

function triggerLoad(): void {
  lastImage()?.onload?.();
}

function triggerError(): void {
  lastImage()?.onerror?.();
}

// Two call paths: loadFile sets onload then readAsDataURL(File) (test triggers manually);
// exportCrop sets onloadend then readAsDataURL(Blob) (mock auto-fires via microtask).
interface MockFileReaderEvent {
  target: { result: string };
}

interface MockFileReaderInstance {
  onload: ((e: MockFileReaderEvent) => void) | null;
  onloadend: (() => void) | null;
  result: string;
  readAsDataURL(file: Blob): void;
}

let lastMockFileReader: MockFileReaderInstance | null = null;

function createMockFileReader(): MockFileReaderInstance {
  const instance: MockFileReaderInstance = {
    onload: null,
    onloadend: null,
    result: 'data:image/png;base64,mock',
    readAsDataURL(file: Blob): void {
      lastMockFileReader = instance;
      if (!(file instanceof File)) {
        // exportCrop path: auto-fire onloadend so the returned Promise resolves
        Promise.resolve().then(() => instance.onloadend?.());
      }
    },
  };
  return instance;
}

// getImageData is deliberately left without an implementation: it then returns
// undefined and the component's try/catch takes the CORS-tainted path, which is
// what every spec that doesn't care about pixels wants. Darkness specs hand it
// real pixel data with mockReturnValue.
const ctxSpies = {
  clearRect: vi.fn(),
  fillRect: vi.fn(),
  drawImage: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  closePath: vi.fn(),
  clip: vi.fn(),
  getImageData:
    vi.fn<(x: number, y: number, w: number, h: number) => { data: Uint8ClampedArray }>(),
};

const mockCtx = ctxSpies as unknown as CanvasRenderingContext2D;

const toBlobMock = vi.fn<(cb: BlobCallback, type?: string, quality?: number) => void>(
  cb => cb(new Blob(['img'], { type: 'image/png' })),
);

beforeAll(() => {
  Object.defineProperty(globalThis, 'Image', { value: MockImage, writable: true });
  Object.defineProperty(globalThis, 'FileReader', {
    value: createMockFileReader,
    writable: true,
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: vi.fn(() => mockCtx),
    writable: true,
    configurable: true,
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: toBlobMock,
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  mockImageInstances.length = 0;
  lastMockFileReader = null;
});

function makeFile(type = 'image/jpeg', byteCount = 100): File {
  return new File([new Uint8Array(byteCount)], 'photo.jpg', { type });
}

/** Builds an RGBA buffer of `size × size` pixels from a per-pixel colour function. */
function pixels(
  size: number,
  at: (x: number, y: number) => [number, number, number, number],
): Uint8ClampedArray {
  const data = new Uint8ClampedArray(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const [r, g, b, a] = at(x, y);
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = a;
    }
  }
  return data;
}

/** jsdom has no Touch constructor, so touch points are plain coordinate objects. */
function touchEvent(type: string, points: { clientX: number; clientY: number }[]): Event {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'touches', { value: points });
  return event;
}

describe('AvatarEditorComponent', () => {
  let fixture: ComponentFixture<AvatarEditorComponent>;
  let component: AvatarEditorComponent;

  function host(): HTMLElement {
    return fixture.nativeElement.querySelector('.ea-avatar-editor')!;
  }

  function getDropzone(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.ea-avatar-editor__dropzone');
  }

  function getCanvas(): HTMLCanvasElement | null {
    return fixture.nativeElement.querySelector('.ea-avatar-editor__canvas');
  }

  function getCanvasWrapper(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.ea-avatar-editor__canvas-wrapper');
  }

  function getFileInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('.ea-avatar-editor__file-input')!;
  }

  function getZoomSlider(): HTMLInputElement {
    return fixture.nativeElement.querySelector('.ea-avatar-editor__zoom-slider')!;
  }

  function iconButtons(): HTMLButtonElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.ea-avatar-editor__icon-btn'),
    );
  }

  // Control order per template: revert [0], zoom-out [1], zoom-in [2], remove [3]
  function revertBtn(): HTMLButtonElement {
    return iconButtons()[0];
  }
  function zoomOutBtn(): HTMLButtonElement {
    return iconButtons()[1];
  }
  function zoomInBtn(): HTMLButtonElement {
    return iconButtons()[2];
  }
  function removeBtn(): HTMLButtonElement {
    return iconButtons()[3];
  }

  /**
   * Loads an image via currentSrc through the full two-cycle lifecycle:
   * 1st detectChanges fires the effect (sets _suppressCropStateEmit), triggerLoad runs onload
   * and registers afterNextRender, 2nd detectChanges runs it and clears the suppress flag.
   */
  function loadImage(url = 'https://example.com/photo.jpg'): void {
    fixture.componentRef.setInput('currentSrc', url);
    fixture.detectChanges();
    triggerLoad();
    fixture.detectChanges();
  }

  function selectFile(file: File): void {
    const input = getFileInput();
    Object.defineProperty(input, 'files', { value: [file], configurable: true });
    input.dispatchEvent(new Event('change'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('renders a dropzone before any image is loaded', () => {
      expect(getDropzone()).toBeTruthy();
      expect(getCanvas()).toBeNull();
    });

    it('shows canvas and hides dropzone after image loads', () => {
      loadImage();

      expect(getCanvas()).toBeTruthy();
      expect(getDropzone()).toBeNull();
    });

    it('applies circle shape class by default', () => {
      expect(host().classList).toContain('ea-avatar-editor--circle');
    });

    it('applies square shape class when shape input is square', () => {
      fixture.componentRef.setInput('shape', 'square');
      fixture.detectChanges();

      expect(host().classList).toContain('ea-avatar-editor--square');
    });

    it('applies has-image class after image loads', () => {
      loadImage();

      expect(host().classList).toContain('ea-avatar-editor--has-image');
    });

    it('removes has-image class after removeImage', () => {
      loadImage();

      component.removeImage();
      fixture.detectChanges();

      expect(host().classList).not.toContain('ea-avatar-editor--has-image');
    });

    it('applies canvasSize to the dropzone dimensions', () => {
      fixture.componentRef.setInput('canvasSize', 150);
      fixture.detectChanges();

      expect(getDropzone()!.style.width).toBe('150px');
      expect(getDropzone()!.style.height).toBe('150px');
    });

    it('applies canvasSize to the canvas wrapper dimensions', () => {
      fixture.componentRef.setInput('canvasSize', 300);
      loadImage();

      const wrapper: HTMLElement = fixture.nativeElement.querySelector(
        '.ea-avatar-editor__canvas-wrapper',
      )!;
      expect(wrapper.style.width).toBe('300px');
      expect(wrapper.style.height).toBe('300px');
    });
  });

  describe('Canvas painting', () => {
    it('cuts a circular hole out of the dimming mask for a circle crop', () => {
      loadImage();

      // One fillRect dims the frame, then an arc punches the visible crop out
      expect(ctxSpies.fillRect).toHaveBeenCalledTimes(1);
      expect(ctxSpies.arc).toHaveBeenCalled();
    });

    it('cuts a rectangular hole out of the dimming mask for a square crop', () => {
      fixture.componentRef.setInput('shape', 'square');

      loadImage();

      expect(ctxSpies.fillRect).toHaveBeenCalledTimes(2);
      expect(ctxSpies.arc).not.toHaveBeenCalled();
    });

    it('repaints at the new scale when canvasSize changes', () => {
      loadImage();
      ctxSpies.drawImage.mockClear();

      fixture.componentRef.setInput('canvasSize', 400);
      fixture.detectChanges();

      // A 100×100 source has to be drawn at 400×400 to still cover the frame
      expect(ctxSpies.drawImage).toHaveBeenCalledWith(
        expect.anything(),
        expect.any(Number),
        expect.any(Number),
        400,
        400,
      );
    });
  });

  /**
   * The hover overlay's label sits directly on the photo, so its ink colour is
   * chosen from the brightness of the pixels it covers. Only the pixels that
   * survive the crop mask may count.
   */
  describe('Overlay contrast', () => {
    const SIZE = 16;

    function overlay(): HTMLElement {
      return fixture.nativeElement.querySelector('.ea-avatar-editor__canvas-overlay')!;
    }

    function isOnLight(): boolean {
      return overlay().classList.contains('ea-avatar-editor__canvas-overlay--on-light');
    }

    function loadWithPixels(
      at: (x: number, y: number) => [number, number, number, number],
    ): void {
      fixture.componentRef.setInput('canvasSize', SIZE);
      ctxSpies.getImageData.mockReturnValue({ data: pixels(SIZE, at) });
      loadImage();
      fixture.detectChanges();
    }

    function inCircle(x: number, y: number): boolean {
      const dx = x - SIZE / 2;
      const dy = y - SIZE / 2;
      return dx * dx + dy * dy <= (SIZE / 2) * (SIZE / 2);
    }

    it('keeps white ink on a dark photo', () => {
      loadWithPixels(() => [12, 12, 12, 255]);

      expect(isOnLight()).toBe(false);
    });

    it('switches to dark ink on a bright photo', () => {
      loadWithPixels(() => [250, 250, 250, 255]);

      expect(isOnLight()).toBe(true);
    });

    // 200 reads as light on its own, but averages below the threshold once the
    // black corners are folded in, so the two crops must disagree.
    it('ignores the corners a circle crop masks away', () => {
      loadWithPixels((x, y) => (inCircle(x, y) ? [200, 200, 200, 255] : [0, 0, 0, 255]));

      expect(isOnLight()).toBe(true);
    });

    it('counts the corners a square crop keeps', () => {
      fixture.componentRef.setInput('shape', 'square');

      loadWithPixels((x, y) => (inCircle(x, y) ? [200, 200, 200, 255] : [0, 0, 0, 255]));

      expect(isOnLight()).toBe(false);
    });

    it('does not let transparent pixels darken the average', () => {
      fixture.componentRef.setInput('shape', 'square');

      // A mostly-transparent PNG with a small opaque white mark
      loadWithPixels((x, y) => (x < 4 && y < 4 ? [255, 255, 255, 255] : [0, 0, 0, 0]));

      expect(isOnLight()).toBe(true);
    });

    it('keeps the previous ink colour when every sampled pixel is transparent', () => {
      fixture.componentRef.setInput('shape', 'square');
      loadWithPixels(() => [250, 250, 250, 255]);
      expect(isOnLight()).toBe(true);

      ctxSpies.getImageData.mockReturnValue({
        data: pixels(SIZE, () => [0, 0, 0, 0]),
      });
      component.setZoom(1.5);
      fixture.detectChanges();

      expect(isOnLight()).toBe(true);
    });
  });

  describe('Canvas accessibility', () => {
    it('exposes the canvas as an application described by hidden instructions', () => {
      loadImage();

      const canvas = getCanvas()!;
      const describedBy = canvas.getAttribute('aria-describedby')!;
      const instructions: HTMLElement | null = fixture.nativeElement.querySelector(
        `[id="${describedBy}"]`,
      );

      expect(canvas.getAttribute('role')).toBe('application');
      expect(instructions).toBeTruthy();
    });

    it('opens the file picker on Enter', () => {
      loadImage();
      const clickSpy = vi.spyOn(getFileInput(), 'click');

      getCanvas()!.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }),
      );

      expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it('opens the file picker on Space', () => {
      loadImage();
      const clickSpy = vi.spyOn(getFileInput(), 'click');

      getCanvas()!.dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', cancelable: true }),
      );

      expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it('ignores arrow keys while a new image is still loading', () => {
      loadImage();
      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      getCanvas()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

      expect(spy).not.toHaveBeenCalled();
    });

    it('leaves keys it does not handle to the browser', () => {
      loadImage();
      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);
      const event = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true });

      getCanvas()!.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(false);
      expect(spy).not.toHaveBeenCalled();
    });

    it('marks the canvas wrapper busy while loading', () => {
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges();

      const getWrapper = (): HTMLElement =>
        fixture.nativeElement.querySelector('.ea-avatar-editor__canvas-wrapper')!;

      expect(getWrapper().getAttribute('aria-busy')).toBe('true');

      triggerLoad();
      fixture.detectChanges();
      fixture.detectChanges();

      expect(getWrapper().getAttribute('aria-busy')).toBeNull();
    });

    it('announces validation errors via the alert region', () => {
      selectFile(makeFile('application/pdf'));
      fixture.detectChanges();

      const alert: HTMLElement = fixture.nativeElement.querySelector('[role="alert"]')!;

      expect(alert.textContent!.trim()).toBe('File must be an image');
    });

    it('clears the alert region once a valid file is selected', () => {
      selectFile(makeFile('application/pdf'));
      fixture.detectChanges();

      selectFile(makeFile('image/jpeg'));
      fixture.detectChanges();

      const alert: HTMLElement = fixture.nativeElement.querySelector('[role="alert"]')!;

      expect(alert.textContent!.trim()).toBe('');
    });
  });

  describe('currentSrc loading', () => {
    it('loads image from the provided URL', () => {
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges();

      expect(lastImage().src).toBe('https://example.com/photo.jpg');
    });

    it('sets crossOrigin to anonymous', () => {
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges();

      expect(lastImage().crossOrigin).toBe('anonymous');
    });

    it('sets hasImage to true after onload fires', () => {
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges();
      expect(component.hasImage()).toBe(false);

      triggerLoad();

      expect(component.hasImage()).toBe(true);
    });

    it('initialises zoom to 1 when no cropState is set', () => {
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges();
      triggerLoad();

      expect(component.zoom()).toBe(1);
    });

    it('does not load when currentSrc is undefined', () => {
      fixture.componentRef.setInput('currentSrc', undefined);
      fixture.detectChanges();

      expect(component.hasImage()).toBe(false);
    });

    it('reloads the image when currentSrc changes', () => {
      loadImage('https://example.com/a.jpg');

      fixture.componentRef.setInput('currentSrc', 'https://example.com/b.jpg');
      fixture.detectChanges();

      expect(lastImage().src).toBe('https://example.com/b.jpg');
    });
  });

  describe('cropState restoration', () => {
    it('restores zoom from cropState on load', () => {
      fixture.componentRef.setInput('cropState', {
        zoom: 2,
        offsetX: 0,
        offsetY: 0,
      } satisfies AvatarEditorCropState);
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges();
      triggerLoad();

      expect(component.zoom()).toBe(2);
    });

    it('re-applies cropState when currentSrc swaps to a new URL', () => {
      fixture.componentRef.setInput('cropState', {
        zoom: 1.5,
        offsetX: -5,
        offsetY: -10,
      } satisfies AvatarEditorCropState);
      loadImage('https://example.com/clerk.jpg');

      fixture.componentRef.setInput('currentSrc', 'https://example.com/r2.jpg');
      fixture.detectChanges();
      triggerLoad();

      expect(component.zoom()).toBe(1.5);
    });

    it('clamps restored zoom to maxZoom', () => {
      fixture.componentRef.setInput('maxZoom', 2);
      fixture.componentRef.setInput('cropState', {
        zoom: 5,
        offsetX: 0,
        offsetY: 0,
      } satisfies AvatarEditorCropState);
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges();
      triggerLoad();

      expect(component.zoom()).toBe(2);
    });

    it('clamps restored zoom to minZoom', () => {
      fixture.componentRef.setInput('minZoom', 1);
      fixture.componentRef.setInput('cropState', {
        zoom: 0.5,
        offsetX: 0,
        offsetY: 0,
      } satisfies AvatarEditorCropState);
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges();
      triggerLoad();

      expect(component.zoom()).toBe(1);
    });

    it('uses zoom 1 when cropState is null', () => {
      fixture.componentRef.setInput('cropState', null);
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges();
      triggerLoad();

      expect(component.zoom()).toBe(1);
    });
  });

  describe('cropStateChanged emission', () => {
    it('does not emit during a programmatic load (afterNextRender not yet settled)', () => {
      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);

      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges(); // sets _suppressCropStateEmit
      triggerLoad(); // registers afterNextRender but doesn't run it yet

      component.setZoom(1.5); // attempts emission while still suppressed

      expect(spy).not.toHaveBeenCalled();
    });

    it('emits after load has fully settled', () => {
      loadImage(); // runs afterNextRender so the suppress flag clears

      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);

      component.setZoom(1.5);

      expect(spy).toHaveBeenCalledWith(expect.objectContaining({ zoom: 1.5 }));
    });

    it('clears emission suppression on load error', () => {
      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);

      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges(); // sets _suppressCropStateEmit
      triggerError(); // onerror clears the suppress flag

      component.setZoom(1.5);

      expect(spy).toHaveBeenCalled();
    });

    it('does not emit cropStateChanged during revertImage', () => {
      loadImage();
      component.setZoom(1.5);

      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);

      component.revertImage();

      expect(spy).not.toHaveBeenCalled();
    });

    it('emits cropStateChanged with the correct shape', () => {
      loadImage();

      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);
      component.setZoom(2);

      expect(spy).toHaveBeenCalledWith<[AvatarEditorCropState]>({
        zoom: 2,
        offsetX: expect.any(Number),
        offsetY: expect.any(Number),
      });
    });
  });

  describe('removeImage', () => {
    beforeEach(() => {
      loadImage();
    });

    it('sets hasImage to false', () => {
      component.removeImage();

      expect(component.hasImage()).toBe(false);
    });

    it('resets zoom to 1', () => {
      component.setZoom(2);
      component.removeImage();

      expect(component.zoom()).toBe(1);
    });

    it('emits the removed output', () => {
      const spy = vi.fn();
      component.removed.subscribe(spy);

      component.removeImage();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('enables canRevert when original had an image', () => {
      component.removeImage();

      expect(component.canRevert()).toBe(true);
    });
  });

  describe('revertImage', () => {
    it('restores the original image without a network request', () => {
      loadImage();
      const imageCountBefore = mockImageInstances.length;

      selectFile(makeFile('image/jpeg'));
      lastMockFileReader!.onload!({ target: { result: 'data:image/jpeg;base64,abc' } });
      triggerLoad();
      fixture.detectChanges();

      component.revertImage();

      expect(mockImageInstances.length).toBe(imageCountBefore + 1);
      expect(component.hasImage()).toBe(true);
    });

    it('restores zoom to original value (no cropState)', () => {
      loadImage();
      component.setZoom(2);

      component.revertImage();

      expect(component.zoom()).toBe(1);
    });

    it('restores zoom to original cropState value', () => {
      fixture.componentRef.setInput('cropState', {
        zoom: 1.5,
        offsetX: -10,
        offsetY: -20,
      } satisfies AvatarEditorCropState);
      loadImage();
      component.setZoom(2.5);

      component.revertImage();

      expect(component.zoom()).toBe(1.5);
    });

    it('sets isAtOriginal to true', () => {
      loadImage();
      component.setZoom(2);

      component.revertImage();

      expect(component.isAtOriginal()).toBe(true);
    });

    it('re-enables canRevert after zooming post-revert', () => {
      loadImage();
      component.setZoom(1.5);
      component.revertImage();

      component.setZoom(2);

      expect(component.canRevert()).toBe(true);
    });

    it('disables canRevert again once the zoom returns to the original', () => {
      loadImage();

      component.setZoom(2);
      component.setZoom(1);

      expect(component.canRevert()).toBe(false);
    });

    it('disables canRevert again once a pan returns to the original', () => {
      loadImage();

      getCanvas()!.dispatchEvent(
        new MouseEvent('mousedown', { clientX: 50, clientY: 50 }),
      );
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 20, clientY: 50 }));
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 50, clientY: 50 }));
      document.dispatchEvent(new MouseEvent('mouseup'));

      expect(component.canRevert()).toBe(false);
    });

    it('takes the clamped zoom as the baseline when cropState is out of range', () => {
      fixture.componentRef.setInput('maxZoom', 3);
      fixture.componentRef.setInput('cropState', {
        zoom: 5,
        offsetX: 0,
        offsetY: 0,
      } satisfies AvatarEditorCropState);
      loadImage();

      component.setZoom(2);
      component.setZoom(3);

      expect(component.canRevert()).toBe(false);
    });

    it('disables canRevert while a replacement image is still loading', () => {
      loadImage();
      component.setZoom(2);

      fixture.componentRef.setInput('currentSrc', 'https://example.com/other.jpg');
      fixture.detectChanges();

      expect(component.canRevert()).toBe(false);
    });

    it('keeps canRevert enabled for a new file cropped like the original', () => {
      loadImage();

      selectFile(makeFile('image/jpeg'));
      lastMockFileReader!.onload!({ target: { result: 'data:image/jpeg;base64,abc' } });
      triggerLoad();
      fixture.detectChanges();
      component.setZoom(1);

      expect(component.canRevert()).toBe(true);
    });

    it('restores original image after uploading a new file', () => {
      loadImage();

      selectFile(makeFile('image/jpeg'));
      lastMockFileReader!.onload!({ target: { result: 'data:image/jpeg;base64,abc' } });
      triggerLoad();
      fixture.detectChanges();

      component.revertImage();

      expect(component.isAtOriginal()).toBe(true);
      expect(component.hasImage()).toBe(true);
    });

    it('restores original image after uploading multiple files', () => {
      fixture.componentRef.setInput('cropState', {
        zoom: 1.8,
        offsetX: -5,
        offsetY: -10,
      } satisfies AvatarEditorCropState);
      loadImage();

      selectFile(makeFile('image/jpeg'));
      lastMockFileReader!.onload!({ target: { result: 'data:image/jpeg;base64,first' } });
      triggerLoad();
      fixture.detectChanges();

      selectFile(makeFile('image/jpeg'));
      lastMockFileReader!.onload!({
        target: { result: 'data:image/jpeg;base64,second' },
      });
      triggerLoad();
      fixture.detectChanges();

      component.revertImage();

      expect(component.isAtOriginal()).toBe(true);
      expect(component.zoom()).toBe(1.8);
    });

    it('restores empty state when original had no image', () => {
      selectFile(makeFile('image/jpeg'));
      lastMockFileReader!.onload!({ target: { result: 'data:image/jpeg;base64,abc' } });
      triggerLoad();
      fixture.detectChanges();
      expect(component.hasImage()).toBe(true);

      component.revertImage();

      expect(component.hasImage()).toBe(false);
      expect(component.isAtOriginal()).toBe(true);
      expect(component.canRevert()).toBe(false);
    });

    it('disables canRevert after removeImage when original was empty', () => {
      selectFile(makeFile('image/jpeg'));
      lastMockFileReader!.onload!({ target: { result: 'data:image/jpeg;base64,abc' } });
      triggerLoad();
      fixture.detectChanges();
      expect(component.canRevert()).toBe(true);

      component.removeImage();

      expect(component.canRevert()).toBe(false);
    });

    it('restores original image after removeImage when original had image', () => {
      loadImage();
      component.removeImage();
      expect(component.canRevert()).toBe(true);

      component.revertImage();

      expect(component.hasImage()).toBe(true);
      expect(component.isAtOriginal()).toBe(true);
    });

    it('keeps the captured original when currentSrc is cleared', () => {
      loadImage();
      component.setZoom(2);

      fixture.componentRef.setInput('currentSrc', undefined);
      fixture.detectChanges();
      component.revertImage();

      expect(component.hasImage()).toBe(true);
      expect(component.zoom()).toBe(1);
    });

    it('leaves an in-flight load alone', () => {
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges();

      component.revertImage();

      expect(component.isLoading()).toBe(true);
      expect(component.hasImage()).toBe(false);
    });
  });

  describe('captureOriginal', () => {
    it('snapshots current state so revert returns to it', () => {
      loadImage();
      component.setZoom(2);

      component.captureOriginal();
      component.setZoom(1.5);

      component.revertImage();

      expect(component.zoom()).toBe(2);
      expect(component.isAtOriginal()).toBe(true);
    });

    it('sets isAtOriginal to true immediately', () => {
      loadImage();
      component.setZoom(2);
      expect(component.isAtOriginal()).toBe(false);

      component.captureOriginal();

      expect(component.isAtOriginal()).toBe(true);
    });

    it('disables canRevert right after capture', () => {
      loadImage();
      component.setZoom(2);
      expect(component.canRevert()).toBe(true);

      component.captureOriginal();

      expect(component.canRevert()).toBe(false);
    });

    it('re-enables canRevert after zooming post-capture', () => {
      loadImage();
      component.captureOriginal();

      component.setZoom(1.5);

      expect(component.canRevert()).toBe(true);
    });

    it('snapshots empty state when no image is loaded', () => {
      component.captureOriginal();

      selectFile(makeFile('image/jpeg'));
      lastMockFileReader!.onload!({ target: { result: 'data:image/jpeg;base64,abc' } });
      triggerLoad();
      fixture.detectChanges();
      expect(component.hasImage()).toBe(true);

      component.revertImage();

      expect(component.hasImage()).toBe(false);
      expect(component.isAtOriginal()).toBe(true);
    });
  });

  describe('isLoading', () => {
    it('is false initially', () => {
      expect(component.isLoading()).toBe(false);
    });

    it('is true immediately after currentSrc is set and load begins', () => {
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges();

      expect(component.isLoading()).toBe(true);
    });

    it('is false after image fully loads', () => {
      loadImage();

      expect(component.isLoading()).toBe(false);
    });

    it('is false after a load error', () => {
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges();

      triggerError();

      expect(component.isLoading()).toBe(false);
    });

    it('is false after removeImage', () => {
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges(); // isLoading = true

      component.removeImage();

      expect(component.isLoading()).toBe(false);
    });

    it('is false when currentSrc is cleared', () => {
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges(); // isLoading = true

      fixture.componentRef.setInput('currentSrc', undefined);
      fixture.detectChanges();

      expect(component.isLoading()).toBe(false);
    });

    it('is false during revertImage (restores synchronously)', () => {
      loadImage();
      component.setZoom(2);

      component.revertImage();

      expect(component.isLoading()).toBe(false);
    });
  });

  describe('loading input', () => {
    it('shows skeleton instead of dropzone when loading is true and no currentSrc', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      expect(getDropzone()).toBeNull();
      expect(fixture.nativeElement.querySelector('ea-skeleton')).toBeTruthy();
    });

    it('shows dropzone when loading is false and no currentSrc', () => {
      fixture.componentRef.setInput('loading', false);
      fixture.detectChanges();

      expect(getDropzone()).toBeTruthy();
      expect(fixture.nativeElement.querySelector('ea-skeleton')).toBeNull();
    });

    it('disables all controls when loading is true', () => {
      fixture.componentRef.setInput('loading', true);
      loadImage();
      component.setZoom(2);
      fixture.detectChanges();

      expect(revertBtn().disabled).toBe(true);
      expect(zoomOutBtn().disabled).toBe(true);
      expect(zoomInBtn().disabled).toBe(true);
      expect(getZoomSlider().disabled).toBe(true);
      expect(removeBtn().disabled).toBe(true);
    });
  });

  describe('Zoom', () => {
    beforeEach(() => {
      loadImage();
    });

    it('setZoom clamps value to minZoom', () => {
      fixture.componentRef.setInput('minZoom', 1);
      component.setZoom(0.5);

      expect(component.zoom()).toBe(1);
    });

    it('setZoom clamps value to maxZoom', () => {
      fixture.componentRef.setInput('maxZoom', 3);
      component.setZoom(5);

      expect(component.zoom()).toBe(3);
    });

    it('setZoom rounds to two decimal places', () => {
      component.setZoom(1.567);

      expect(component.zoom()).toBe(1.57);
    });

    it('zoom in button increments zoom by 0.1', () => {
      component.zoom.set(1.0);
      fixture.detectChanges();

      zoomInBtn().click();

      expect(component.zoom()).toBeCloseTo(1.1, 5);
    });

    it('zoom out button decrements zoom by 0.1', () => {
      component.zoom.set(2.0);
      fixture.detectChanges();

      zoomOutBtn().click();

      expect(component.zoom()).toBeCloseTo(1.9, 5);
    });

    it('slider input event updates zoom', () => {
      const slider = getZoomSlider();
      slider.value = '1.8';
      slider.dispatchEvent(new Event('input'));

      expect(component.zoom()).toBeCloseTo(1.8, 5);
    });
  });

  describe('File selection', () => {
    it('emits errored for a non-image file type', () => {
      const spy = vi.fn();
      component.errored.subscribe(spy);

      selectFile(makeFile('application/pdf'));

      expect(spy).toHaveBeenCalledWith('File must be an image');
    });

    it('emits errored when the file exceeds maxFileSize', () => {
      const spy = vi.fn();
      component.errored.subscribe(spy);
      fixture.componentRef.setInput('maxFileSize', 1);

      selectFile(makeFile('image/jpeg', 10));

      expect(spy).toHaveBeenCalledWith(expect.stringContaining('exceeds'));
    });

    it('emits fileSelected for a valid file', () => {
      const spy = vi.fn();
      component.fileSelected.subscribe(spy);
      const file = makeFile('image/jpeg');

      selectFile(file);

      expect(spy).toHaveBeenCalledWith(file);
    });

    it('calls FileReader.readAsDataURL for a valid file', () => {
      selectFile(makeFile('image/jpeg'));

      expect(lastMockFileReader).not.toBeNull();
    });

    it('loads image after FileReader resolves', () => {
      selectFile(makeFile('image/jpeg'));

      lastMockFileReader!.onload!({ target: { result: 'data:image/jpeg;base64,abc' } });
      triggerLoad();

      expect(component.hasImage()).toBe(true);
    });

    it('initialises zoom to 1 after loading a user-selected file', () => {
      component.zoom.set(2);

      selectFile(makeFile('image/jpeg'));
      lastMockFileReader!.onload!({ target: { result: 'data:image/jpeg;base64,abc' } });
      triggerLoad();

      expect(component.zoom()).toBe(1);
    });

    it('resets the file input value after selection', () => {
      selectFile(makeFile('image/jpeg'));
      // value is reset so the same file can be re-selected
      expect(getFileInput().value).toBe('');
    });

    it('does nothing when the picker is dismissed without a file', () => {
      const selected = vi.fn();
      const errored = vi.fn();
      component.fileSelected.subscribe(selected);
      component.errored.subscribe(errored);

      getFileInput().dispatchEvent(new Event('change'));

      expect(selected).not.toHaveBeenCalled();
      expect(errored).not.toHaveBeenCalled();
    });
  });

  describe('Drag and drop', () => {
    it('sets isDragOver to true on dragover', () => {
      getDropzone()!.dispatchEvent(new Event('dragover'));

      expect(component.isDragOver()).toBe(true);
    });

    it('clears isDragOver on dragleave', () => {
      getDropzone()!.dispatchEvent(new Event('dragover'));
      getDropzone()!.dispatchEvent(new Event('dragleave'));

      expect(component.isDragOver()).toBe(false);
    });

    it('applies drag-over class when isDragOver is true', () => {
      getDropzone()!.dispatchEvent(new Event('dragover'));
      fixture.detectChanges();

      expect(host().classList).toContain('ea-avatar-editor--drag-over');
    });

    it('clears isDragOver on drop', () => {
      getDropzone()!.dispatchEvent(new Event('dragover'));
      const event = new Event('drop');
      Object.defineProperty(event, 'dataTransfer', {
        value: { files: [makeFile('image/jpeg')] },
      });
      getDropzone()!.dispatchEvent(event);

      expect(component.isDragOver()).toBe(false);
    });

    it('emits errored on drop of a non-image file', () => {
      const spy = vi.fn();
      component.errored.subscribe(spy);
      const event = new Event('drop');
      Object.defineProperty(event, 'dataTransfer', {
        value: { files: [makeFile('application/pdf')] },
      });

      getDropzone()!.dispatchEvent(event);

      expect(spy).toHaveBeenCalledWith('File must be an image');
    });

    it('ignores a drop that carries no file', () => {
      const selected = vi.fn();
      const errored = vi.fn();
      component.fileSelected.subscribe(selected);
      component.errored.subscribe(errored);
      const event = new Event('drop');
      Object.defineProperty(event, 'dataTransfer', { value: { files: [] } });

      getDropzone()!.dispatchEvent(event);

      expect(selected).not.toHaveBeenCalled();
      expect(errored).not.toHaveBeenCalled();
    });

    it('emits fileSelected on drop of a valid image file', () => {
      const spy = vi.fn();
      component.fileSelected.subscribe(spy);
      const file = makeFile('image/jpeg');
      const event = new Event('drop');
      Object.defineProperty(event, 'dataTransfer', { value: { files: [file] } });

      getDropzone()!.dispatchEvent(event);

      expect(spy).toHaveBeenCalledWith(file);
    });

    it('sets isDragOver to true on dragover of the loaded image preview', () => {
      loadImage();

      getCanvasWrapper()!.dispatchEvent(new Event('dragover'));

      expect(component.isDragOver()).toBe(true);
    });

    it('labels the preview with the drop prompt while a file is held over it', () => {
      loadImage();
      fixture.detectChanges();
      const overlay = (): HTMLElement =>
        fixture.nativeElement.querySelector('.ea-avatar-editor__canvas-overlay');

      expect(overlay().textContent).toContain('Change photo');

      getCanvasWrapper()!.dispatchEvent(new Event('dragover'));
      fixture.detectChanges();

      expect(overlay().textContent).toContain('Drop image or click to browse');
    });

    it('takes the drop target on dragenter', () => {
      loadImage();
      const event = new Event('dragenter');
      const dataTransfer = { dropEffect: 'none' };
      Object.defineProperty(event, 'dataTransfer', { value: dataTransfer });

      getCanvasWrapper()!.dispatchEvent(event);

      expect(component.isDragOver()).toBe(true);
      expect(dataTransfer.dropEffect).toBe('copy');
    });

    it('redraws the canvas when a drop replaces the image already loaded', () => {
      loadImage();
      fixture.detectChanges();
      ctxSpies.drawImage.mockClear();

      const event = new Event('drop');
      Object.defineProperty(event, 'dataTransfer', {
        value: { files: [makeFile('image/jpeg')] },
      });
      getCanvasWrapper()!.dispatchEvent(event);
      lastMockFileReader!.onload!({ target: { result: 'data:image/jpeg;base64,abc' } });
      triggerLoad();

      expect(ctxSpies.drawImage).toHaveBeenCalled();
    });

    it('emits fileSelected on drop onto the loaded image preview', () => {
      loadImage();
      const spy = vi.fn();
      component.fileSelected.subscribe(spy);
      const file = makeFile('image/jpeg');
      const event = new Event('drop');
      Object.defineProperty(event, 'dataTransfer', { value: { files: [file] } });

      getCanvasWrapper()!.dispatchEvent(event);

      expect(spy).toHaveBeenCalledWith(file);
      expect(component.isDragOver()).toBe(false);
    });

    it('holds isDragOver while the pointer crosses onto a child of the drop target', () => {
      loadImage();
      const wrapper = getCanvasWrapper()!;
      wrapper.dispatchEvent(new Event('dragover'));
      const leave = new Event('dragleave');
      Object.defineProperty(leave, 'relatedTarget', { value: getCanvas() });

      wrapper.dispatchEvent(leave);

      expect(component.isDragOver()).toBe(true);
    });

    it('clears isDragOver when the pointer leaves the drop target entirely', () => {
      loadImage();
      const wrapper = getCanvasWrapper()!;
      wrapper.dispatchEvent(new Event('dragover'));
      const leave = new Event('dragleave');
      Object.defineProperty(leave, 'relatedTarget', { value: document.body });

      wrapper.dispatchEvent(leave);

      expect(component.isDragOver()).toBe(false);
    });
  });

  describe('Controls', () => {
    it('revert button is disabled before any image loads', () => {
      expect(revertBtn().disabled).toBe(true);
    });

    it('revert button is disabled on initial load', () => {
      loadImage();
      fixture.detectChanges();

      expect(revertBtn().disabled).toBe(true);
    });

    it('revert button is enabled after zooming', () => {
      loadImage();
      component.setZoom(2);
      fixture.detectChanges();

      expect(revertBtn().disabled).toBe(false);
    });

    it('revert button is enabled after removeImage when original had image', () => {
      loadImage();
      component.removeImage();
      fixture.detectChanges();

      expect(revertBtn().disabled).toBe(false);
    });

    it('revert button is disabled after revertImage is called', () => {
      loadImage();
      component.setZoom(2);

      component.revertImage();
      fixture.detectChanges();

      expect(revertBtn().disabled).toBe(true);
    });

    it('revert button is re-enabled after zooming post-revert', () => {
      loadImage();
      component.setZoom(1.5);
      component.revertImage();

      component.setZoom(2);
      fixture.detectChanges();

      expect(revertBtn().disabled).toBe(false);
    });

    it('zoom in button is disabled before any image loads', () => {
      expect(zoomInBtn().disabled).toBe(true);
    });

    it('zoom in button is disabled at maxZoom', () => {
      fixture.componentRef.setInput('maxZoom', 1);
      loadImage();
      fixture.detectChanges();

      expect(zoomInBtn().disabled).toBe(true);
    });

    it('zoom out button is disabled before any image loads', () => {
      expect(zoomOutBtn().disabled).toBe(true);
    });

    it('zoom out button is disabled at minZoom', () => {
      loadImage(); // zoom initialises at 1, which equals minZoom default of 1
      fixture.detectChanges();

      expect(zoomOutBtn().disabled).toBe(true);
    });

    it('zoom slider is disabled before any image loads', () => {
      expect(getZoomSlider().disabled).toBe(true);
    });

    it('zoom slider is enabled after image loads', () => {
      loadImage();
      fixture.detectChanges();

      expect(getZoomSlider().disabled).toBe(false);
    });

    it('remove button is disabled before any image loads', () => {
      expect(removeBtn().disabled).toBe(true);
    });

    it('remove button is enabled after image loads', () => {
      loadImage();
      fixture.detectChanges();

      expect(removeBtn().disabled).toBe(false);
    });
  });

  describe('exportCrop', () => {
    it('rejects when no image is loaded', async () => {
      await expect(component.exportCrop()).rejects.toThrow('No image loaded');
    });

    it('resolves with a Blob when image is loaded', async () => {
      loadImage();

      const blob = await component.exportCrop();

      expect(blob).toBeInstanceOf(Blob);
    });

    it('emits cropped output with the blob and a dataUrl', async () => {
      loadImage();
      const spy = vi.fn();
      component.cropped.subscribe(spy);

      const blob = await component.exportCrop();

      expect(spy).toHaveBeenCalledWith<[{ blob: Blob; dataUrl: string }]>({
        blob,
        dataUrl: expect.any(String),
      });
    });

    it('clips the export to a circle for a circle crop', async () => {
      loadImage();
      ctxSpies.clip.mockClear();

      await component.exportCrop();

      expect(ctxSpies.clip).toHaveBeenCalled();
    });

    it('exports the full frame for a square crop', async () => {
      fixture.componentRef.setInput('shape', 'square');
      loadImage();
      ctxSpies.clip.mockClear();

      await component.exportCrop();

      expect(ctxSpies.clip).not.toHaveBeenCalled();
    });

    it('rejects when the canvas cannot produce a blob', async () => {
      loadImage();
      toBlobMock.mockImplementationOnce(cb => cb(null));

      await expect(component.exportCrop()).rejects.toThrow('Canvas export failed');
    });
  });
  /**
   * The image must always cover the frame: panning may never expose a gap. Both
   * the keyboard and pointer paths run every offset through the same clamp, and
   * `cropStateChanged` is the public record of where the image ended up.
   */
  describe('Panning and zooming', () => {
    function lastCropState(spy: ReturnType<typeof vi.fn>): AvatarEditorCropState {
      return spy.mock.calls[spy.mock.calls.length - 1][0] as AvatarEditorCropState;
    }

    function keydown(key: string, init: KeyboardEventInit = {}): void {
      getCanvas()!.dispatchEvent(new KeyboardEvent('keydown', { key, ...init }));
      fixture.detectChanges();
    }

    // A 400x200 image in a 200px frame scales to exactly cover it: 200px of
    // horizontal slack and none vertically, so one axis can pan and the other
    // must stay pinned. The dimensions have to be set before onload, since the
    // scale and centring are computed there.
    beforeEach(() => {
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges();
      lastImage().width = 400;
      lastImage().height = 200;
      triggerLoad();
      fixture.detectChanges();
    });

    it('pans by a small step on an arrow key and a large step with shift', () => {
      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);

      keydown('ArrowLeft');
      const small = lastCropState(spy).offsetX;

      keydown('ArrowLeft', { shiftKey: true });
      const large = lastCropState(spy).offsetX;

      expect(large - small).toBe(20);
    });

    it('stops panning once the image edge reaches the frame edge', () => {
      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);

      // Far more presses than the 200px of slack the image actually has
      for (let i = 0; i < 60; i++) {
        keydown('ArrowRight');
        keydown('ArrowDown');
      }

      const state = lastCropState(spy);

      // Exactly flush: any further and a gap would open on the right
      expect(state.offsetX).toBe(-200);
      expect(state.offsetY).toBe(0);
    });

    it('stops panning at the opposite edge too', () => {
      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);

      for (let i = 0; i < 60; i++) {
        keydown('ArrowLeft');
        keydown('ArrowUp');
      }

      const state = lastCropState(spy);

      expect(state.offsetX).toBe(0);
      expect(state.offsetY).toBe(0);
    });

    it('zooms with the plus and minus keys', () => {
      keydown('+');

      expect(component.zoom()).toBeCloseTo(1.1, 5);

      keydown('-');

      expect(component.zoom()).toBeCloseTo(1, 5);
    });

    it('pans on a mouse drag', () => {
      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);

      getCanvas()!.dispatchEvent(
        new MouseEvent('mousedown', { clientX: 50, clientY: 50 }),
      );
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 20, clientY: 50 }));
      document.dispatchEvent(new MouseEvent('mouseup'));

      expect(spy).toHaveBeenCalled();
      expect(lastCropState(spy).offsetX).toBeLessThan(0);
    });

    it('treats a press with no movement as a click that reopens the picker', () => {
      const picker = vi.spyOn(getFileInput(), 'click');

      getCanvas()!.dispatchEvent(
        new MouseEvent('mousedown', { clientX: 50, clientY: 50 }),
      );
      document.dispatchEvent(new MouseEvent('mouseup'));

      expect(picker).toHaveBeenCalled();
    });

    it('does not reopen the picker after an actual drag', () => {
      const picker = vi.spyOn(getFileInput(), 'click');

      getCanvas()!.dispatchEvent(
        new MouseEvent('mousedown', { clientX: 50, clientY: 50 }),
      );
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 50 }));
      document.dispatchEvent(new MouseEvent('mouseup'));

      expect(picker).not.toHaveBeenCalled();
    });

    it('treats a jittery press as a click rather than a drag', () => {
      const picker = vi.spyOn(getFileInput(), 'click');

      getCanvas()!.dispatchEvent(
        new MouseEvent('mousedown', { clientX: 50, clientY: 50 }),
      );
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 52, clientY: 51 }));
      document.dispatchEvent(new MouseEvent('mouseup'));

      expect(picker).toHaveBeenCalled();
    });

    it('pans on a one-finger touch drag', () => {
      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);

      getCanvas()!.dispatchEvent(
        touchEvent('touchstart', [{ clientX: 50, clientY: 50 }]),
      );
      document.dispatchEvent(touchEvent('touchmove', [{ clientX: 20, clientY: 50 }]));
      document.dispatchEvent(touchEvent('touchend', []));

      expect(lastCropState(spy).offsetX).toBeLessThan(0);
    });

    it('does not reopen the picker after a touch drag', () => {
      const picker = vi.spyOn(getFileInput(), 'click');

      getCanvas()!.dispatchEvent(
        touchEvent('touchstart', [{ clientX: 50, clientY: 50 }]),
      );
      document.dispatchEvent(touchEvent('touchmove', [{ clientX: 20, clientY: 50 }]));
      document.dispatchEvent(touchEvent('touchend', []));

      expect(picker).not.toHaveBeenCalled();
    });

    it('treats a tap as a request to change the photo', () => {
      const picker = vi.spyOn(getFileInput(), 'click');

      getCanvas()!.dispatchEvent(
        touchEvent('touchstart', [{ clientX: 50, clientY: 50 }]),
      );
      document.dispatchEvent(touchEvent('touchmove', [{ clientX: 51, clientY: 52 }]));
      document.dispatchEvent(touchEvent('touchend', []));

      expect(picker).toHaveBeenCalled();
    });

    it('never starts a pan from a two-finger gesture', () => {
      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);

      getCanvas()!.dispatchEvent(
        touchEvent('touchstart', [
          { clientX: 50, clientY: 50 },
          { clientX: 90, clientY: 90 },
        ]),
      );
      document.dispatchEvent(touchEvent('touchmove', [{ clientX: 20, clientY: 50 }]));

      expect(spy).not.toHaveBeenCalled();
    });

    it('suspends the pan when a second finger joins mid-drag', () => {
      getCanvas()!.dispatchEvent(
        touchEvent('touchstart', [{ clientX: 50, clientY: 50 }]),
      );
      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);

      document.dispatchEvent(
        touchEvent('touchmove', [
          { clientX: 20, clientY: 50 },
          { clientX: 90, clientY: 90 },
        ]),
      );
      document.dispatchEvent(touchEvent('touchend', []));

      expect(spy).not.toHaveBeenCalled();
    });

    it('stops tracking the pointer once the drag ends', () => {
      getCanvas()!.dispatchEvent(
        new MouseEvent('mousedown', { clientX: 50, clientY: 50 }),
      );
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 20, clientY: 50 }));
      document.dispatchEvent(new MouseEvent('mouseup'));
      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);

      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));

      expect(spy).not.toHaveBeenCalled();
    });

    it('zooms in and out on wheel scroll', () => {
      getCanvas()!.dispatchEvent(new WheelEvent('wheel', { deltaY: -100 }));

      expect(component.zoom()).toBeCloseTo(1.1, 5);

      getCanvas()!.dispatchEvent(new WheelEvent('wheel', { deltaY: 100 }));

      expect(component.zoom()).toBeCloseTo(1, 5);
    });

    it('holds the wheel zoom inside the configured bounds', () => {
      fixture.componentRef.setInput('maxZoom', 1.5);
      fixture.detectChanges();

      for (let i = 0; i < 20; i++) {
        getCanvas()!.dispatchEvent(new WheelEvent('wheel', { deltaY: -100 }));
      }

      expect(component.zoom()).toBe(1.5);
    });
  });

  describe('Teardown and resize', () => {
    it('releases the document drag listeners when destroyed mid-drag', () => {
      loadImage();
      const remove = vi.spyOn(document, 'removeEventListener');

      getCanvas()!.dispatchEvent(new MouseEvent('mousedown', { clientX: 5, clientY: 5 }));
      fixture.destroy();

      const released = remove.mock.calls.map(call => call[0]);

      expect(released).toEqual(
        expect.arrayContaining(['mousemove', 'mouseup', 'touchmove', 'touchend']),
      );
    });

    it('re-clamps the image when the canvas shrinks', () => {
      fixture.componentRef.setInput('currentSrc', 'https://example.com/photo.jpg');
      fixture.detectChanges();
      lastImage().width = 400;
      lastImage().height = 200;
      triggerLoad();
      fixture.detectChanges();
      const spy = vi.fn();
      component.cropStateChanged.subscribe(spy);

      fixture.componentRef.setInput('canvasSize', 50);
      fixture.detectChanges();

      // Offsets left over from the 200px frame would put the image outside a
      // 50px one, showing a gap
      getCanvas()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      fixture.detectChanges();
      const state = spy.mock.calls[spy.mock.calls.length - 1][0] as {
        offsetX: number;
        offsetY: number;
      };

      expect(state.offsetX).toBeLessThanOrEqual(0);
      expect(state.offsetX).toBeGreaterThanOrEqual(-50);
    });
  });
});

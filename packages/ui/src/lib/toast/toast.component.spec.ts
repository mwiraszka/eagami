import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

describe('ToastComponent', () => {
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  function getContainer(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.ea-toast-container');
  }

  function getToasts(): HTMLElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.ea-toast'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  afterEach(() => {
    toastService.clear();
  });

  it('renders nothing when there are no active toasts', () => {
    expect(getContainer()).toBeNull();
  });

  it('renders one element per active toast', () => {
    toastService.show('first', { duration: 0 });
    toastService.show('second', { duration: 0 });
    fixture.detectChanges();

    expect(getToasts()).toHaveLength(2);
  });

  it('applies the variant modifier class', () => {
    toastService.error('boom', 0);
    fixture.detectChanges();

    expect(getToasts()[0].classList).toContain('ea-toast--error');
  });

  it('uses role="alert" for error and warning toasts', () => {
    toastService.error('boom', 0);
    fixture.detectChanges();

    expect(getToasts()[0].getAttribute('role')).toBe('alert');
    expect(getToasts()[0].getAttribute('aria-live')).toBe('assertive');
  });

  it('uses role="status" for info, success, and default toasts', () => {
    toastService.success('ok', 0);
    fixture.detectChanges();

    expect(getToasts()[0].getAttribute('role')).toBe('status');
    expect(getToasts()[0].getAttribute('aria-live')).toBe('polite');
  });

  it('dismisses a toast via its close button', () => {
    toastService.show('hello', { duration: 0 });
    fixture.detectChanges();

    const closeBtn = getToasts()[0].querySelector(
      '.ea-toast__close',
    ) as HTMLButtonElement;
    closeBtn.click();
    fixture.detectChanges();

    expect(getContainer()).toBeNull();
  });

  it('auto-dismisses after the configured duration', () => {
    vi.useFakeTimers();
    toastService.show('disappearing', { duration: 1000 });
    fixture.detectChanges();

    expect(getToasts()).toHaveLength(1);

    vi.advanceTimersByTime(1000);
    fixture.detectChanges();

    expect(getContainer()).toBeNull();
    vi.useRealTimers();
  });

  it('renders the toast message', () => {
    toastService.show('hello world', { duration: 0 });
    fixture.detectChanges();

    expect(getToasts()[0].querySelector('.ea-toast__message')?.textContent?.trim()).toBe(
      'hello world',
    );
  });
});

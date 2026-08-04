import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartIconComponent } from '../icons/heart.component';
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

  it('keeps the container itself out of the live-region tree', () => {
    expect(getContainer()?.hasAttribute('aria-live')).toBe(false);
    expect(getToasts()).toHaveLength(0);
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

  it('renders a custom icon component in place of the variant icon', () => {
    toastService.show('saved', {
      variant: 'success',
      duration: 0,
      icon: HeartIconComponent,
    });
    fixture.detectChanges();

    const toast = getToasts()[0];

    expect(toast.querySelector('ea-icon-heart')).not.toBeNull();
    expect(toast.querySelector('ea-icon-check-circle')).toBeNull();
  });

  it('renders no icon when the override is null', () => {
    toastService.show('saved', { variant: 'success', duration: 0, icon: null });
    fixture.detectChanges();

    expect(getToasts()[0].querySelector('.ea-toast__icon')).toBeNull();
  });

  it('announces errors and warnings assertively and the rest politely', () => {
    toastService.error('boom', 0);
    toastService.warning('careful', 0);
    toastService.success('ok', 0);
    toastService.info('fyi', 0);
    fixture.detectChanges();

    expect(getToasts()[0].getAttribute('role')).toBe('alert');
    expect(getToasts()[1].getAttribute('role')).toBe('alert');
    expect(getToasts()[2].getAttribute('role')).toBe('status');
    expect(getToasts()[3].getAttribute('role')).toBe('status');
  });

  it('pauses auto-dismiss while hovered and resumes on leave', () => {
    const pause = vi.spyOn(toastService, 'pause');
    const resume = vi.spyOn(toastService, 'resume');
    const container = getContainer()!;

    container.dispatchEvent(new MouseEvent('mouseenter'));

    expect(pause).toHaveBeenCalledTimes(1);
    expect(resume).not.toHaveBeenCalled();

    container.dispatchEvent(new MouseEvent('mouseleave'));

    expect(resume).toHaveBeenCalledTimes(1);
  });

  it('pauses auto-dismiss while focus is inside the stack', () => {
    toastService.show('hello', { duration: 0 });
    fixture.detectChanges();
    const pause = vi.spyOn(toastService, 'pause');
    const resume = vi.spyOn(toastService, 'resume');
    const container = getContainer()!;
    const closeBtn = getToasts()[0].querySelector<HTMLButtonElement>('.ea-toast__close')!;

    container.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

    expect(pause).toHaveBeenCalledTimes(1);

    // Focus moving between toasts stays paused; leaving the stack resumes
    container.dispatchEvent(
      new FocusEvent('focusout', { bubbles: true, relatedTarget: closeBtn }),
    );

    expect(resume).not.toHaveBeenCalled();

    container.dispatchEvent(
      new FocusEvent('focusout', { bubbles: true, relatedTarget: document.body }),
    );

    expect(resume).toHaveBeenCalledTimes(1);
  });

  it('dismisses a toast via its close button', () => {
    toastService.show('hello', { duration: 0 });
    fixture.detectChanges();

    const closeBtn = getToasts()[0].querySelector(
      '.ea-toast__close',
    ) as HTMLButtonElement;
    closeBtn.click();
    fixture.detectChanges();

    expect(getToasts()).toHaveLength(0);
  });

  it('auto-dismisses after the configured duration', () => {
    vi.useFakeTimers();
    toastService.show('disappearing', { duration: 1000 });
    fixture.detectChanges();

    expect(getToasts()).toHaveLength(1);

    vi.advanceTimersByTime(1000);
    fixture.detectChanges();

    expect(getToasts()).toHaveLength(0);
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

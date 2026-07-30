import { Injectable, signal } from '@angular/core';

/** Semantic colour scheme of a toast. */
export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

/** A single live toast notification rendered by `ea-toast`. */
export interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
  duration: number;
}

/** Optional configuration for a toast; defaults to `default` variant and 4s duration. */
export interface ToastOptions {
  variant?: ToastVariant;
  duration?: number;
}

/**
 * Application-wide notification service. Use the convenience methods
 * (`success`, `error`, `warning`, `info`) to push a toast, or call
 * {@link show} for full control. A single `<ea-toast />` outlet must be
 * present in the app for toasts to appear.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 0;
  private readonly timers = new Map<
    number,
    { handle: ReturnType<typeof setTimeout> | null; startedAt: number; remaining: number }
  >();
  private paused = false;

  readonly toasts = signal<Toast[]>([]);

  /** Shows a toast and returns its id; pass `duration: 0` to disable auto-dismiss. */
  show(message: string, options: ToastOptions = {}): number {
    const id = this.nextId++;
    const toast: Toast = {
      id,
      message,
      variant: options.variant ?? 'default',
      duration: options.duration ?? 4000,
    };

    this.toasts.update(list => [...list, toast]);

    if (toast.duration > 0) {
      const entry = {
        handle: null as ReturnType<typeof setTimeout> | null,
        startedAt: Date.now(),
        remaining: toast.duration,
      };
      if (!this.paused) {
        entry.handle = setTimeout(() => this.dismiss(id), toast.duration);
      }
      this.timers.set(id, entry);
    }

    return id;
  }

  /**
   * Suspends every auto-dismiss countdown, keeping the time each toast has
   * left. The `<ea-toast />` outlet calls this while the pointer or keyboard
   * focus is on the stack so users get time to read or reach the dismiss
   * button.
   */
  pause(): void {
    if (this.paused) {
      return;
    }
    this.paused = true;
    for (const entry of this.timers.values()) {
      if (entry.handle !== null) {
        clearTimeout(entry.handle);
        entry.handle = null;
        entry.remaining = Math.max(0, entry.remaining - (Date.now() - entry.startedAt));
      }
    }
  }

  /** Resumes auto-dismiss countdowns suspended by {@link pause}. */
  resume(): void {
    if (!this.paused) {
      return;
    }
    this.paused = false;
    for (const [id, entry] of this.timers) {
      entry.startedAt = Date.now();
      entry.handle = setTimeout(() => this.dismiss(id), entry.remaining);
    }
  }

  /** Shows a `success` toast and returns its id. */
  success(message: string, duration?: number): number {
    return this.show(message, { variant: 'success', duration });
  }

  /** Shows an `error` toast and returns its id. */
  error(message: string, duration?: number): number {
    return this.show(message, { variant: 'error', duration });
  }

  /** Shows a `warning` toast and returns its id. */
  warning(message: string, duration?: number): number {
    return this.show(message, { variant: 'warning', duration });
  }

  /** Shows an `info` toast and returns its id. */
  info(message: string, duration?: number): number {
    return this.show(message, { variant: 'info', duration });
  }

  /** Removes the toast with the given id, if it is still active. */
  dismiss(id: number): void {
    const entry = this.timers.get(id);
    if (entry?.handle != null) {
      clearTimeout(entry.handle);
    }
    this.timers.delete(id);
    this.toasts.update(list => list.filter(t => t.id !== id));
  }

  /** Removes all currently visible toasts. */
  clear(): void {
    for (const entry of this.timers.values()) {
      if (entry.handle !== null) {
        clearTimeout(entry.handle);
      }
    }
    this.timers.clear();
    this.toasts.set([]);
  }
}

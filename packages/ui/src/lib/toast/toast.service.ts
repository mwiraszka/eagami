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
      setTimeout(() => this.dismiss(id), toast.duration);
    }

    return id;
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
    this.toasts.update(list => list.filter(t => t.id !== id));
  }

  /** Removes all currently visible toasts. */
  clear(): void {
    this.toasts.set([]);
  }
}

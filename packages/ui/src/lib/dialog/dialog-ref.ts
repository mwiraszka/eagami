import { type Signal, signal, untracked } from '@angular/core';

// A method's parameter is compared bivariantly, so holding the resolver behind one
// keeps a `DialogRef<string>` assignable to a `DialogRef<unknown>`
interface Settler<R> {
  settle(value: R | undefined): void;
}

/**
 * Handle on one dialog opened through `DialogService`. The component it opened
 * injects it to close with an answer, which settles `result` for whoever
 * opened it; a dismissal (Escape, the backdrop, the close button) closes it
 * with `undefined`. Construct one directly to stand in for the service in a
 * spec.
 */
export class DialogRef<R = unknown> {
  private readonly isClosed = signal(false);
  private settler: Settler<R> = { settle: () => undefined };

  /** Whether the dialog has closed. */
  readonly closed: Signal<boolean> = this.isClosed.asReadonly();

  /**
   * Settles when the dialog closes: with the value passed to `close`, or with
   * `undefined` when it was dismissed.
   */
  readonly result: Promise<R | undefined> = new Promise(resolve => {
    this.settler = { settle: resolve };
  });

  /** Closes the dialog and settles `result` with `value`. Only the first call has any effect. */
  close(value?: R): void {
    if (untracked(this.isClosed)) {
      return;
    }
    this.isClosed.set(true);
    this.settler.settle(value);
  }
}

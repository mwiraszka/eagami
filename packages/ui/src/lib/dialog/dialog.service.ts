import { isPlatformBrowser } from '@angular/common';
import {
  ApplicationRef,
  type ComponentRef,
  DOCUMENT,
  DestroyRef,
  EnvironmentInjector,
  Injectable,
  Injector,
  PLATFORM_ID,
  type Signal,
  type Type,
  createComponent,
  inject,
  signal,
  untracked,
} from '@angular/core';

import { DialogRef } from './dialog-ref';

/** Options for {@link DialogService.open}. */
export interface DialogOptions {
  /** Values for the component's inputs, keyed by input name and set before it first renders. */
  inputs?: Readonly<Record<string, unknown>>;
  /**
   * Injector the component resolves its dependencies through, such as the
   * opener's own so providers scoped to it reach the dialog. Defaults to the
   * application's root injector.
   */
  injector?: Injector;
}

class ServiceDialogRef<R> extends DialogRef<R> {
  constructor(private readonly teardown: () => void) {
    super();
  }

  override close(value?: R): void {
    if (untracked(this.closed)) {
      return;
    }
    super.close(value);
    this.teardown();
  }
}

/**
 * Opens dialogs from code. `open` renders a component at the end of `<body>`
 * and returns its {@link DialogRef}. The component lays out its own
 * `<ea-dialog>`, which shows itself straight away and closes the ref with
 * `undefined` on any dismissal, and injects the ref to close it with an
 * answer. Closing the ref takes the component down and hands focus back to
 * wherever it was when the dialog opened. A dialog opened while another is up
 * stacks on top of it.
 *
 * On the server nothing is rendered and the ref closes at once.
 */
@Injectable({ providedIn: 'root' })
export class DialogService {
  private readonly appRef = inject(ApplicationRef);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly openDialogs = signal<readonly DialogRef<unknown>[]>([]);

  /** Dialogs currently open, oldest first. */
  readonly dialogs: Signal<readonly DialogRef<unknown>[]> = this.openDialogs.asReadonly();

  constructor() {
    // The hosts sit outside the app's root element, so they would outlive it
    inject(DestroyRef).onDestroy(() => this.closeAll());
  }

  /** Opens `component` as a dialog and returns its ref, whose `result` settles when it closes. */
  open<R = unknown>(component: Type<unknown>, options: DialogOptions = {}): DialogRef<R> {
    let componentRef: ComponentRef<unknown> | null = null;
    const ref = new ServiceDialogRef<R>(() => {
      this.openDialogs.update(open => open.filter(dialog => dialog !== ref));
      if (componentRef) {
        const host: Element = componentRef.location.nativeElement;
        componentRef.destroy();
        // Destroying a root component leaves its host element in the document
        host.remove();
      }
    });

    if (!this.isBrowser) {
      ref.close();
      return ref;
    }

    const parent = options.injector ?? this.injector;
    const created = createComponent(component, {
      environmentInjector: parent.get(EnvironmentInjector),
      elementInjector: Injector.create({
        providers: [{ provide: DialogRef, useValue: ref }],
        parent,
      }),
    });
    // Content that closed its ref while being constructed is never shown
    if (untracked(ref.closed)) {
      created.destroy();
      return ref;
    }

    componentRef = created;
    for (const [name, value] of Object.entries(options.inputs ?? {})) {
      created.setInput(name, value);
    }
    this.appRef.attachView(created.hostView);
    this.document.body.appendChild(created.location.nativeElement);
    this.openDialogs.update(open => [...open, ref]);
    return ref;
  }

  /** Closes every open dialog, newest first, settling each `result` with `undefined`. */
  closeAll(): void {
    for (const ref of [...untracked(this.openDialogs)].reverse()) {
      ref.close();
    }
  }
}

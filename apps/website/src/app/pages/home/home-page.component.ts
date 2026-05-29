import {
  BarChartIconComponent,
  ButtonComponent,
  ChevronDownIconComponent,
  CreditCardIconComponent,
  EagamiIconComponent,
  GlobeIconComponent,
  InputComponent,
  MailIconComponent,
  MoonIconComponent,
  TextareaComponent,
  ToastService,
  UsersIconComponent,
} from '@eagami/ui';

import { NgComponentOutlet } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  type Type,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  type AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  type ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import { MetaAndTitleService } from '@app/services/meta-and-title.service';

const ICON_BY_SLUG: Record<string, Type<unknown>> = {
  users: UsersIconComponent,
  'credit-card': CreditCardIconComponent,
  globe: GlobeIconComponent,
  moon: MoonIconComponent,
  'bar-chart': BarChartIconComponent,
  mail: MailIconComponent,
};

interface Project {
  title: string;
  description: string;
  url?: string;
  display?: string;
  logo?: string;
  placeholder?: boolean;
}

interface ServiceView {
  title: string;
  description: string;
  icon?: Type<unknown>;
}

type ContactStatus = 'idle' | 'sending' | 'sent' | 'error';

/* Stricter than `Validators.email`, which per the HTML5 spec lets TLD-less
   "a@b" through; a public contact form wants `local@host.tld`. Reuses the
   `email` error key so downstream checks are unchanged. */
const STRICT_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function strictEmailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;
  }
  return STRICT_EMAIL_PATTERN.test(value) ? null : { email: true };
}

@Component({
  selector: 'web-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [
    ButtonComponent,
    ChevronDownIconComponent,
    EagamiIconComponent,
    InputComponent,
    NgComponentOutlet,
    ReactiveFormsModule,
    RouterLink,
    TextareaComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly metaAndTitleService = inject(MetaAndTitleService);
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly i18n = inject(WebI18nService);

  protected readonly messages = this.i18n.messages;

  protected readonly projects = computed<Project[]>(() =>
    this.messages().home.projects.cards.map(c => ({ ...c })),
  );

  private readonly carouselOffset = signal(0);
  protected readonly slideDirection = signal<-1 | 0 | 1>(0);
  protected readonly suppressTransition = signal(false);
  private readonly slideMs = 320;

  protected readonly orderedProjects = computed<Project[]>(() => {
    const offset = this.carouselOffset();
    const projects = this.projects();
    const len = projects.length;
    return Array.from({ length: 5 }, (_, i) => {
      const idx = (((offset - 1 + i) % len) + len) % len;
      return projects[idx];
    });
  });

  /* Sr-only announcement naming the centered project, so screen-reader users
     get feedback when they navigate the carousel. */
  protected readonly carouselStatus = computed(() => {
    const centered = this.orderedProjects()[2];
    if (!centered) {
      return '';
    }
    return this.messages().home.projects.showing(centered.title);
  });

  protected readonly coreServices = computed<ServiceView[]>(() =>
    this.messages().home.services.core.map(s => ({
      title: s.title,
      description: s.description,
    })),
  );

  protected readonly addOnServices = computed<ServiceView[]>(() =>
    this.messages().home.services.addOns.map(s => ({
      title: s.title,
      description: s.description,
      icon: ICON_BY_SLUG[s.iconSlug],
    })),
  );

  protected readonly contactForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, strictEmailValidator],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected readonly contactStatus = signal<ContactStatus>('idle');
  protected readonly contactError = signal<string | null>(null);

  /* Nudged on value change and email blur so the computeds below recompute;
     `touched` doesn't emit through `valueChanges`, hence the manual blur nudge. */
  private readonly contactFormVersion = signal(0);

  protected readonly isContactFormValid = computed(() => {
    this.contactFormVersion();
    return this.contactForm.valid;
  });

  /* Only the email-format error is surfaced (empty fields are conveyed by the
     disabled submit), and only after blur so it doesn't flash while typing. */
  protected readonly contactEmailError = computed<string | undefined>(() => {
    this.contactFormVersion();
    const email = this.contactForm.controls.email;
    return email.touched && email.errors?.['email']
      ? this.messages().home.contact.emailInvalid
      : undefined;
  });

  /* Example messages cycled through the placeholder to prime senders on what to write */
  protected readonly contactMessagePlaceholder = signal('');

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.contactForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.contactFormVersion.update(v => v + 1);
    });

    effect(() => {
      const m = this.messages().home;
      this.metaAndTitleService.updateTitle(m.metaTitle);
      this.metaAndTitleService.updateDescription(m.metaDescription);
    });

    afterNextRender(() => {
      this.runContactPlaceholderAnimation();
      this.setupScrollSpy();
    });
  }

  protected onContactFieldBlur(): void {
    this.contactFormVersion.update(v => v + 1);
  }

  /* Syncs the URL fragment to the in-view section so a refresh restores the
     reader's place. Uses `history.replaceState`, not the router, so it adds no
     history entries and doesn't re-trigger anchor scrolling. */
  private setupScrollSpy(): void {
    const sectionIds = ['services', 'projects', 'contact'];
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return;
    }

    const inView = new Set<string>();

    const syncFragment = (): void => {
      // Topmost in-view section in document order; empty while in the hero
      const activeId = sectionIds.find(id => inView.has(id)) ?? '';
      if (location.hash.slice(1) === activeId) {
        return;
      }

      const url = activeId ? `#${activeId}` : location.pathname + location.search;
      history.replaceState(history.state, '', url);
    };

    /* A section is "in view" while it overlaps the band between the 64px header
       and ~30% down the viewport (see rootMargin below). */
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            inView.add(entry.target.id);
          } else {
            inView.delete(entry.target.id);
          }
        }
        syncFragment();
      },
      { rootMargin: '-64px 0px -70% 0px', threshold: 0 },
    );

    sections.forEach(section => observer.observe(section));
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  private runContactPlaceholderAnimation(): void {
    const TYPE_MS = 45;
    const HOLD_AFTER_TYPE_MS = 2500;
    const CURSOR = '|';

    /* Under `prefers-reduced-motion: reduce` skip the typewriter: rotate full
       hints slowly with no cursor. The hint is decorative; SR users have the label. */
    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let msgIdx = 0;
    let charIdx = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const hints = (): ReadonlyArray<string> =>
      this.messages().home.contact.placeholderHints;

    if (motionReduced) {
      const ROTATE_MS = 6000;
      const rotate = (): void => {
        const h = hints();
        this.contactMessagePlaceholder.set(h[msgIdx % h.length]);
        msgIdx = (msgIdx + 1) % h.length;
        timer = setTimeout(rotate, ROTATE_MS);
      };

      this.destroyRef.onDestroy(() => {
        if (timer !== undefined) {
          clearTimeout(timer);
        }
      });

      rotate();
      return;
    }

    const typeNext = (): void => {
      const h = hints();
      const current = h[msgIdx % h.length];
      charIdx++;
      this.contactMessagePlaceholder.set(current.slice(0, charIdx) + CURSOR);

      if (charIdx >= current.length) {
        timer = setTimeout(() => {
          msgIdx = (msgIdx + 1) % hints().length;
          charIdx = 0;
          this.contactMessagePlaceholder.set(CURSOR);
          timer = setTimeout(typeNext, TYPE_MS);
        }, HOLD_AFTER_TYPE_MS);
        return;
      }

      timer = setTimeout(typeNext, TYPE_MS);
    };

    this.destroyRef.onDestroy(() => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    });

    typeNext();
  }

  protected scrollWork(direction: 1 | -1): void {
    if (this.slideDirection() !== 0) {
      return;
    }

    this.slideDirection.set(direction);

    setTimeout(() => {
      this.suppressTransition.set(true);

      requestAnimationFrame(() => {
        const len = this.projects().length;
        this.slideDirection.set(0);
        this.carouselOffset.update(v => (v + direction + len) % len);

        requestAnimationFrame(() => {
          this.suppressTransition.set(false);
        });
      });
    }, this.slideMs + 20);
  }

  protected submitContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.contactFormVersion.update(v => v + 1);
      return;
    }

    this.contactStatus.set('sending');
    this.contactError.set(null);

    this.http.post('/api/contact', this.contactForm.getRawValue()).subscribe({
      next: () => {
        this.contactStatus.set('sent');
        this.contactForm.reset();
        this.toastService.success(this.messages().home.contact.sentToast);
      },
      error: () => {
        this.contactStatus.set('error');
        const message = this.messages().home.contact.errorMessage;
        this.contactError.set(message);
        this.toastService.error(message);
      },
    });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  type ElementRef,
  afterNextRender,
  afterRenderEffect,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import type { HomeProjectId } from '@app/i18n/web-messages.types';

interface ProjectDetails {
  name: string;
  url: string;
  display: string;
  page: string;
  logo: string;
  video: string;
  poster: string;
}

const PROJECTS: Record<HomeProjectId, ProjectDetails> = {
  chordbomb: {
    name: 'Chordbomb',
    url: 'https://chordbomb.com',
    display: 'chordbomb.com',
    page: 'chordbomb.com/about',
    logo: 'assets/projects/chordbomb.svg',
    video: 'assets/projects/demos/chordbomb.mp4',
    poster: 'assets/projects/demos/chordbomb.jpg',
  },
  londonchess: {
    name: 'London Chess',
    url: 'https://londonchess.ca',
    display: 'londonchess.ca',
    page: 'londonchess.ca/schedule',
    logo: 'assets/projects/londonchess.svg',
    video: 'assets/projects/demos/londonchess.mp4',
    poster: 'assets/projects/demos/londonchess.jpg',
  },
  brewskibets: {
    name: 'Brewski Bets',
    url: 'https://brewskibets.com',
    display: 'brewskibets.com',
    page: 'brewskibets.com',
    logo: 'assets/projects/brewskibets.svg',
    video: 'assets/projects/demos/brewskibets.mp4',
    poster: 'assets/projects/demos/brewskibets.jpg',
  },
  circaesthetics: {
    name: 'CIRC Aesthetics',
    url: 'https://circaesthetics.ca',
    display: 'circaesthetics.ca',
    page: 'circaesthetics.ca/skincare',
    logo: 'assets/projects/circaesthetics.svg',
    video: 'assets/projects/demos/circaesthetics.mp4',
    poster: 'assets/projects/demos/circaesthetics.jpg',
  },
};

@Component({
  selector: 'web-home-project-stories',
  templateUrl: './home-project-stories.component.html',
  styleUrl: './home-project-stories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeProjectStoriesComponent {
  private readonly i18n = inject(WebI18nService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly projects = computed(() => this.i18n.messages().home.projects);

  protected readonly stories = computed(() =>
    this.projects().stories.map(story => ({ ...story, ...PROJECTS[story.id] })),
  );

  protected readonly activeId = signal<HomeProjectId>('chordbomb');

  protected readonly activeStory = computed(
    () => this.stories().find(story => story.id === this.activeId()) ?? this.stories()[0],
  );

  /* One-item list keyed by id, so choosing another story mounts a fresh video
     rather than swapping the source of a playing one */
  protected readonly screenStories = computed(() => [this.activeStory()]);

  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');
  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');

  private readonly inView = signal(false);
  private readonly reducedMotion = signal(false);
  private readonly autoplayBlocked = signal(false);

  protected readonly showControls = computed(
    () => this.reducedMotion() || this.autoplayBlocked(),
  );

  constructor() {
    afterNextRender(() => {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const onMotionChange = (event: MediaQueryListEvent): void =>
        this.reducedMotion.set(event.matches);
      this.reducedMotion.set(motionQuery.matches);
      motionQuery.addEventListener('change', onMotionChange);

      const observer = new IntersectionObserver(
        ([entry]) => this.inView.set(entry.isIntersecting),
        { threshold: 0.35 },
      );
      observer.observe(this.stage().nativeElement);

      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        motionQuery.removeEventListener('change', onMotionChange);
      });
    });

    afterRenderEffect(() => {
      const video = this.video()?.nativeElement;
      if (!video) {
        return;
      }

      if (!this.inView() || this.reducedMotion()) {
        video.pause();
        return;
      }

      video.play().catch((error: unknown) => {
        // A pause while play() is pending rejects with AbortError, which is expected
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          this.autoplayBlocked.set(true);
          return;
        }
        throw error;
      });
    });
  }

  protected select(id: HomeProjectId): void {
    this.activeId.set(id);
  }
}

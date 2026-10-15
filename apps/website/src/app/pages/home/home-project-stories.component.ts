import {
  BarChartIconComponent,
  CalendarDaysIconComponent,
  CreditCardIconComponent,
  Edit2IconComponent,
  FileAudioIconComponent,
  FileSpreadsheetIconComponent,
  GlobeIconComponent,
  HistoryIconComponent,
  LineChartIconComponent,
  LinkIconComponent,
  MailIconComponent,
  MenuIconComponent,
  MoonIconComponent,
  MusicIconComponent,
  PhoneIconComponent,
  PlayCircleIconComponent,
  SearchIconComponent,
  SmartphoneIconComponent,
  TagComponent,
  UserCircleIconComponent,
  UserPlusIconComponent,
  UsersIconComponent,
  WaveformIconComponent,
} from '@eagami/ui';

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  type ElementRef,
  type Type,
  afterNextRender,
  afterRenderEffect,
  computed,
  inject,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';

import { WebI18nService } from '@app/i18n/web-i18n.service';
import type { HomeProjectId, HomeProjectTagId } from '@app/i18n/web-messages.types';

type TagKind =
  'commerce' | 'sound' | 'content' | 'place' | 'people' | 'insight' | 'experience';

const TAG_COLORS: Record<TagKind, { color: string; ink: string }> = {
  commerce: {
    color: 'var(--web-color-bandTagCommerceBg)',
    ink: 'var(--web-color-bandTagCommerceText)',
  },
  sound: {
    color: 'var(--web-color-bandTagSoundBg)',
    ink: 'var(--web-color-bandTagSoundText)',
  },
  content: {
    color: 'var(--web-color-bandTagContentBg)',
    ink: 'var(--web-color-bandTagContentText)',
  },
  place: {
    color: 'var(--web-color-bandTagPlaceBg)',
    ink: 'var(--web-color-bandTagPlaceText)',
  },
  people: {
    color: 'var(--web-color-bandTagPeopleBg)',
    ink: 'var(--web-color-bandTagPeopleText)',
  },
  insight: {
    color: 'var(--web-color-bandTagInsightBg)',
    ink: 'var(--web-color-bandTagInsightText)',
  },
  experience: {
    color: 'var(--web-color-bandTagExperienceBg)',
    ink: 'var(--web-color-bandTagExperienceText)',
  },
};

const TAGS: Record<HomeProjectTagId, { kind: TagKind; icon: Type<unknown> }> = {
  stripe: { kind: 'commerce', icon: CreditCardIconComponent },
  affiliates: { kind: 'commerce', icon: LinkIconComponent },
  songRecognition: { kind: 'sound', icon: MusicIconComponent },
  audioAnalysis: { kind: 'sound', icon: WaveformIconComponent },
  playableChords: { kind: 'sound', icon: PlayCircleIconComponent },
  midiExport: { kind: 'sound', icon: FileAudioIconComponent },
  cms: { kind: 'content', icon: Edit2IconComponent },
  spreadsheetImports: { kind: 'content', icon: FileSpreadsheetIconComponent },
  gameReplays: { kind: 'content', icon: HistoryIconComponent },
  avatarUploads: { kind: 'content', icon: UserCircleIconComponent },
  events: { kind: 'place', icon: CalendarDaysIconComponent },
  accounts: { kind: 'people', icon: UsersIconComponent },
  emailAlerts: { kind: 'people', icon: MailIconComponent },
  friendRequests: { kind: 'people', icon: UserPlusIconComponent },
  tapToCall: { kind: 'people', icon: PhoneIconComponent },
  analytics: { kind: 'insight', icon: BarChartIconComponent },
  charts: { kind: 'insight', icon: LineChartIconComponent },
  search: { kind: 'insight', icon: SearchIconComponent },
  richResults: { kind: 'insight', icon: GlobeIconComponent },
  darkMode: { kind: 'experience', icon: MoonIconComponent },
  installable: { kind: 'experience', icon: SmartphoneIconComponent },
  sectionMenus: { kind: 'experience', icon: MenuIconComponent },
};

interface ProjectDetails {
  name: string;
  url: string;
  display: string;
  page: string;
  logo: string;
  video: string;
  poster: string;
  tags: readonly HomeProjectTagId[];
  // WebVTT metadata cues holding the address on screen through a multi-page recording
  pageTrack?: string;
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
    tags: [
      'songRecognition',
      'audioAnalysis',
      'playableChords',
      'midiExport',
      'stripe',
      'avatarUploads',
      'accounts',
      'analytics',
      'installable',
    ],
  },
  londonchess: {
    name: 'London Chess',
    url: 'https://londonchess.ca',
    display: 'londonchess.ca',
    page: 'londonchess.ca/schedule',
    logo: 'assets/projects/londonchess.svg',
    video: 'assets/projects/demos/londonchess.mp4',
    poster: 'assets/projects/demos/londonchess.jpg',
    tags: [
      'cms',
      'spreadsheetImports',
      'gameReplays',
      'events',
      'accounts',
      'emailAlerts',
      'analytics',
      'charts',
      'search',
      'darkMode',
    ],
  },
  brewskibets: {
    name: 'Brewski Bets',
    url: 'https://brewskibets.com',
    display: 'brewskibets.com',
    page: 'brewskibets.com',
    logo: 'assets/projects/brewskibets.svg',
    video: 'assets/projects/demos/brewskibets.mp4',
    poster: 'assets/projects/demos/brewskibets.jpg',
    tags: [
      'avatarUploads',
      'accounts',
      'friendRequests',
      'analytics',
      'charts',
      'search',
      'darkMode',
      'installable',
    ],
  },
  circaesthetics: {
    name: 'CIRC Aesthetics',
    url: 'https://circaesthetics.ca',
    display: 'circaesthetics.ca',
    page: 'circaesthetics.ca',
    logo: 'assets/projects/circaesthetics.svg',
    video: 'assets/projects/demos/circaesthetics.mp4',
    poster: 'assets/projects/demos/circaesthetics.jpg',
    tags: [
      'affiliates',
      'tapToCall',
      'analytics',
      'richResults',
      'installable',
      'sectionMenus',
    ],
    pageTrack: 'assets/projects/demos/circaesthetics.vtt',
  },
};

@Component({
  selector: 'web-home-project-stories',
  imports: [TagComponent],
  templateUrl: './home-project-stories.component.html',
  styleUrl: './home-project-stories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeProjectStoriesComponent {
  private readonly i18n = inject(WebI18nService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly projects = computed(() => this.i18n.messages().home.projects);

  protected readonly stories = computed(() => {
    const labels = this.projects().tags;
    return this.projects().stories.map(story => {
      const project = PROJECTS[story.id];
      return {
        ...story,
        ...project,
        tags: project.tags.map(id => ({
          id,
          label: labels[id],
          icon: TAGS[id].icon,
          ...TAG_COLORS[TAGS[id].kind],
        })),
      };
    });
  });

  protected readonly activeId = signal<HomeProjectId>('chordbomb');

  protected readonly activeStory = computed(
    () => this.stories().find(story => story.id === this.activeId()) ?? this.stories()[0],
  );

  /* One-item list keyed by id, so choosing another story mounts a fresh video
     rather than swapping the source of a playing one */
  protected readonly screenStories = computed(() => [this.activeStory()]);

  private readonly trackedPage = linkedSignal<HomeProjectId, string | null>({
    source: this.activeId,
    computation: () => null,
  });

  protected readonly currentPage = computed(
    () => this.trackedPage() ?? this.activeStory().page,
  );

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

  protected syncPage(track: TextTrack): void {
    const cue = track.activeCues?.[0];
    if (cue instanceof VTTCue) {
      this.trackedPage.set(cue.text);
    }
  }
}

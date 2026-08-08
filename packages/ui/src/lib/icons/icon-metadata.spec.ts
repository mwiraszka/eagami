/// <reference types="node" />
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraIconComponent } from './camera.component';
import { DribbbleIconComponent } from './dribbble.component';
import { Edit2IconComponent } from './edit-2.component';
import { Github2IconComponent } from './github-2.component';
import { GithubIconComponent } from './github.component';
import { HomeIconComponent } from './home.component';
import {
  type IconCategory,
  IconComponentBase,
  type IconComponentType,
} from './icon-category';
import { InstagramIconComponent } from './instagram.component';
import { StarIconComponent } from './star.component';
import { TrelloIconComponent } from './trello.component';
import { TwitterIconComponent } from './twitter.component';

describe('Icon metadata API', () => {
  describe('IconComponentBase', () => {
    it('applies the inline-flex 1em host style to every icon', () => {
      // Representative icon; the assertion holds for every component extending IconComponentBase
      const fixture: ComponentFixture<HomeIconComponent> =
        TestBed.createComponent(HomeIconComponent);
      fixture.detectChanges();

      const host = fixture.nativeElement as HTMLElement;

      expect(host.style.display).toBe('inline-flex');
      expect(host.style.width).toBe('1em');
      expect(host.style.height).toBe('1em');
    });

    it('renders the SVG with the input strokeWidth on its stroke-width attribute', () => {
      const fixture = TestBed.createComponent(StarIconComponent);
      fixture.detectChanges();
      const svg = fixture.nativeElement.querySelector('svg') as SVGSVGElement;
      // Feather icons default to 2
      expect(svg.getAttribute('stroke-width')).toBe('2');

      fixture.componentRef.setInput('strokeWidth', 1.5);
      fixture.detectChanges();
      expect(svg.getAttribute('stroke-width')).toBe('1.5');
    });

    it('honours per-icon `defaultStrokeWidth` overrides (camera = 1.5)', () => {
      const fixture = TestBed.createComponent(CameraIconComponent);
      fixture.detectChanges();
      const svg = fixture.nativeElement.querySelector('svg') as SVGSVGElement;
      expect(svg.getAttribute('stroke-width')).toBe('1.5');
    });

    it('is extended by every shipped icon component', () => {
      const samples: ReadonlyArray<IconComponentType> = [
        HomeIconComponent,
        GithubIconComponent,
        Github2IconComponent,
        Edit2IconComponent,
      ];

      for (const cls of samples) {
        // Prototype-chain check avoids instantiating each of the 300+ icons
        expect(cls.prototype instanceof IconComponentBase).toBe(true);
      }
    });
  });

  describe('Static metadata', () => {
    // Typing as `IconComponentType` surfaces the optional `isBrand` field; non-brand
    // icons omit the static field, and the interface keeps the access type-safe.
    const home: IconComponentType = HomeIconComponent;
    const github: IconComponentType = GithubIconComponent;
    const github2: IconComponentType = Github2IconComponent;
    const twitter: IconComponentType = TwitterIconComponent;
    const instagram: IconComponentType = InstagramIconComponent;
    const trello: IconComponentType = TrelloIconComponent;
    const dribbble: IconComponentType = DribbbleIconComponent;

    it('exposes slug, category, and tags on every icon class', () => {
      // Sample a Feather icon (no brand mark)
      expect(home.slug).toBe('home');
      expect(home.category).toBe<IconCategory>('feather');
      expect(home.isBrand).toBeUndefined();
      expect(home.tags.length).toBeGreaterThan(0);
      expect(home.tags).toContain('home');
    });

    it('flags brand marks via the `isBrand` field', () => {
      expect(github.isBrand).toBe(true);
      expect(github2.isBrand).toBe(true);
      expect(twitter.isBrand).toBe(true);
      expect(instagram.isBrand).toBe(true);
      expect(trello.isBrand).toBe(true);
      expect(dribbble.isBrand).toBe(true);
    });

    it('uses canonical Feather slugs and routes the brand-filled to `-2`', () => {
      expect(github.slug).toBe('github');
      expect(github.category).toBe<IconCategory>('feather');

      expect(github2.slug).toBe('github-2');
      expect(github2.category).toBe<IconCategory>('eagami');
    });
  });

  // Both lists drifted into per-release batches once already: each release
  // appended its own sorted run at the end, so the file read as sorted locally
  // while being unsorted overall. Assert against the source text, since the
  // runtime `.sort()` in `ICONS` hides the literal's order from every other test.
  describe('Source ordering', () => {
    function read(relativePath: string): string {
      return readFileSync(join(process.cwd(), relativePath), 'utf8');
    }

    it('lists every icon export in one alphabetical run', () => {
      const slugs = [
        ...read('src/public-api.ts').matchAll(
          /export \* from '\.\/lib\/icons\/(.+)\.component';/g,
        ),
      ].map(m => m[1]);

      expect(slugs.length).toBeGreaterThan(400);
      expect(slugs).toEqual([...slugs].sort());
    });

    it('lists every ICONS entry in one alphabetical run', () => {
      const catalogue = read('src/lib/icons/icons-catalogue.ts');
      const entries = [...catalogue.matchAll(/^ {4}(\w+IconComponent),$/gm)].map(
        m => m[1],
      );

      expect(entries.length).toBeGreaterThan(400);
      expect(entries).toEqual([...entries].sort());
    });
  });
});

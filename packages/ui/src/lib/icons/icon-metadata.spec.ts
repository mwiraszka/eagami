import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraIconComponent } from './camera.component';
import { Edit2IconComponent } from './edit-2.component';
import { Github2IconComponent } from './github-2.component';
import { GithubIconComponent } from './github.component';
import { HomeIconComponent } from './home.component';
import { IconCategory, IconComponentBase, IconComponentType } from './icon-category';
import { StarIconComponent } from './star.component';

describe('Icon metadata API', () => {
  describe('IconComponentBase', () => {
    it('applies the inline-flex 1em host style to every icon', () => {
      // Pick a representative icon; the assertion holds for every component
      // that extends IconComponentBase, which after v1.4 means all of them.
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
      // Default for Feather icons is 2.
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
        // `prototype instanceof IconComponentBase` checks the prototype chain
        // without instantiating the component, which keeps the test fast
        // across the 300+ icons that share this base.
        expect(cls.prototype instanceof IconComponentBase).toBe(true);
      }
    });
  });

  describe('Static metadata', () => {
    // Bind references through `IconComponentType` so the optional `isBrand`
    // field surfaces at the type level. Non-brand icons leave the static field
    // off the class entirely; the interface keeps the access type-safe.
    const home: IconComponentType = HomeIconComponent;
    const github: IconComponentType = GithubIconComponent;
    const github2: IconComponentType = Github2IconComponent;

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
    });

    it('uses canonical Feather slugs and routes the brand-filled to `-2`', () => {
      expect(github.slug).toBe('github');
      expect(github.category).toBe<IconCategory>('feather');

      expect(github2.slug).toBe('github-2');
      expect(github2.category).toBe<IconCategory>('eagami');
    });
  });
});

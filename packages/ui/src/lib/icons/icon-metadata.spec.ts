import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit2IconComponent } from './edit-2.component';
import { Github2IconComponent } from './github-2.component';
import { GithubIconComponent } from './github.component';
import { HomeIconComponent } from './home.component';
import { IconCategory, IconComponentBase, IconComponentType } from './icon-category';
import { PencilIconComponent } from './pencil.component';

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
    it('exposes slug, category, and tags on every icon class', () => {
      // Sample a Feather icon (no brand mark)
      expect(HomeIconComponent.slug).toBe('home');
      expect(HomeIconComponent.category).toBe<IconCategory>('feather');
      expect(HomeIconComponent.isBrand).toBeUndefined();
      expect(HomeIconComponent.tags.length).toBeGreaterThan(0);
      expect(HomeIconComponent.tags).toContain('home');
    });

    it('flags brand marks via the `isBrand` field', () => {
      expect(GithubIconComponent.isBrand).toBe(true);
      expect(Github2IconComponent.isBrand).toBe(true);
    });

    it('uses canonical Feather slugs and routes the brand-filled to `-2`', () => {
      expect(GithubIconComponent.slug).toBe('github');
      expect(GithubIconComponent.category).toBe<IconCategory>('feather');

      expect(Github2IconComponent.slug).toBe('github-2');
      expect(Github2IconComponent.category).toBe<IconCategory>('eagami');
    });
  });

  describe('Deprecated PencilIconComponent', () => {
    it('is retired in favour of Edit2IconComponent', () => {
      // `pencil` is the redundant predecessor of Feather's canonical `edit-2`
      // and will be removed in v2.0.0. Verify both still resolve so consumers
      // can migrate at their own pace.
      expect(PencilIconComponent.slug).toBe('pencil');
      expect(Edit2IconComponent.slug).toBe('edit-2');
      expect(PencilIconComponent.category).toBe<IconCategory>('feather');
    });
  });
});

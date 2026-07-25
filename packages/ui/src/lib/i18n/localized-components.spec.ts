import { TestBed } from '@angular/core/testing';

import { AvatarEditorComponent } from '../avatar-editor/avatar-editor.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { RangeSliderComponent } from '../range-slider/range-slider.component';
import { SliderComponent } from '../slider/slider.component';
import { TreeComponent } from '../tree/tree.component';
import { provideEagamiUi } from './i18n.provider';
import { EagamiI18nService } from './i18n.service';
import { EAGAMI_ALL_LOCALES } from './messages';

// Proves the components fixed in the i18n audit actually render/emit localized
// output under a non-English locale (German), not just that the keys exist.
describe('Component localization (de)', () => {
  function withLocale(): void {
    TestBed.configureTestingModule({
      providers: [provideEagamiUi({ locale: 'de', locales: EAGAMI_ALL_LOCALES })],
    });
  }

  it('slider groups the displayed value per the active locale', () => {
    withLocale();
    const fixture = TestBed.createComponent(SliderComponent);
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100000);
    fixture.componentRef.setInput('groupThousands', true);
    fixture.componentRef.setInput('value', 12345);
    fixture.detectChanges();

    const thumb = fixture.nativeElement.querySelector('[aria-valuetext]');

    expect(thumb.getAttribute('aria-valuetext')).toBe((12345).toLocaleString('de'));
    expect(thumb.getAttribute('aria-valuetext')).toBe('12.345');
  });

  it('range-slider groups the displayed values per the active locale', () => {
    withLocale();
    const fixture = TestBed.createComponent(RangeSliderComponent);
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100000);
    fixture.componentRef.setInput('groupThousands', true);
    fixture.componentRef.setInput('value', [12345, 67890]);
    fixture.detectChanges();

    const low = fixture.nativeElement.querySelector(
      '.ea-range-slider__thumb--low',
    ) as HTMLElement;

    expect(low.getAttribute('aria-valuetext')).toBe('12.345');
  });

  it('paginator groups numbers in its range label per the active locale', () => {
    withLocale();
    const fixture = TestBed.createComponent(PaginatorComponent);
    fixture.componentRef.setInput('totalItems', 12345);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('groupThousands', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('12.345');
    expect(fixture.nativeElement.textContent).not.toContain('12,345');
  });

  it('avatar-editor emits the localized error message', () => {
    withLocale();
    const expected =
      TestBed.inject(EagamiI18nService).messages().avatarEditor.invalidType;
    const fixture = TestBed.createComponent(AvatarEditorComponent);
    fixture.detectChanges();

    let emitted = '';
    fixture.componentInstance.errored.subscribe(msg => (emitted = msg));
    // @ts-expect-error calling the private loader directly to exercise validation
    fixture.componentInstance.loadFile(
      new File(['x'], 'note.txt', { type: 'text/plain' }),
    );

    expect(emitted).toBe(expected);
    expect(emitted).toBe('Datei muss ein Bild sein');
  });

  // The tree chevron is decorative (aria-hidden); the treeitem's aria-expanded
  // carries expansion state, so the tree no longer renders localized strings
  it('tree marks the expand chevron as decorative', () => {
    withLocale();
    const fixture = TestBed.createComponent(TreeComponent);
    fixture.componentRef.setInput('nodes', [
      { id: 'a', label: 'A', children: [{ id: 'b', label: 'B' }] },
    ]);
    fixture.detectChanges();

    const chevron = fixture.nativeElement.querySelector('.ea-tree-node__chevron');

    expect(chevron.getAttribute('aria-hidden')).toBe('true');
    expect(chevron.getAttribute('role')).toBeNull();
  });
});

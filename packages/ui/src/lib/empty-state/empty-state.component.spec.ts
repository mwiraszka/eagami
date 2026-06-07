import { Component, type Type } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIconComponent } from '../icons/search.component';
import { EmptyStateComponent } from './empty-state.component';

@Component({
  imports: [EmptyStateComponent],
  template: `
    <ea-empty-state
      [title]="title"
      [description]="description"
      [size]="size"
      [icon]="icon"
      [bordered]="bordered">
      @if (showMedia) {
        <span slot="media">icon</span>
      }
      @if (showAction) {
        <button slot="actions">Do it</button>
      }
    </ea-empty-state>
  `,
})
class HostComponent {
  title?: string;
  description?: string;
  size: 'sm' | 'md' | 'lg' = 'md';
  icon?: Type<unknown>;
  bordered = false;
  showMedia = false;
  showAction = false;
}

describe('EmptyStateComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
  });

  it('renders title when provided', () => {
    host.title = 'No items';
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No items');
  });

  it('renders description when provided', () => {
    host.description = 'Try again';
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Try again');
  });

  it('omits title element when not provided', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ea-empty-state__title')).toBeNull();
  });

  it('applies the size class', () => {
    host.size = 'lg';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ea-empty-state--lg')).toBeTruthy();
  });

  it('projects media into the media slot', () => {
    host.showMedia = true;
    fixture.detectChanges();

    const media = fixture.nativeElement.querySelector('.ea-empty-state__media');

    expect(media.textContent).toContain('icon');
  });

  it('projects actions into the actions slot', () => {
    host.showAction = true;
    fixture.detectChanges();

    const actions = fixture.nativeElement.querySelector('.ea-empty-state__actions');

    expect(actions.querySelector('button')).toBeTruthy();
  });

  it('renders the icon in the media area when provided', () => {
    host.icon = SearchIconComponent;
    fixture.detectChanges();

    const media = fixture.nativeElement.querySelector('.ea-empty-state__media');

    expect(media.querySelector('ea-icon-search')).toBeTruthy();
  });

  it('applies the bordered modifier when set', () => {
    expect(fixture.nativeElement.querySelector('.ea-empty-state--bordered')).toBeNull();

    host.bordered = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ea-empty-state--bordered')).toBeTruthy();
  });
});

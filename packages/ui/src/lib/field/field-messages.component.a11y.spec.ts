import { axe } from 'vitest-axe';

import { TestBed } from '@angular/core/testing';

import { FieldMessagesComponent } from './field-messages.component';

describe('FieldMessagesComponent a11y', () => {
  async function render(
    setup: (ref: { setInput(name: string, value: unknown): void }) => void,
  ) {
    await TestBed.configureTestingModule({
      imports: [FieldMessagesComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(FieldMessagesComponent);
    fixture.componentRef.setInput('id', 'field-1');
    setup(fixture.componentRef);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has no detectable violations rendering a hint', async () => {
    const el = await render(ref => ref.setInput('hint', 'Helpful text'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });

  it('has no detectable violations rendering an error', async () => {
    const el = await render(ref => ref.setInput('error', 'Required'));

    const results = await axe(el);

    expect(results).toHaveNoViolations();
  });
});

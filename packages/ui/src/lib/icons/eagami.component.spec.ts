import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { EagamiIconComponent } from './eagami.component';

describe('EagamiIconComponent', () => {
  let fixture: ComponentFixture<EagamiIconComponent>;

  function getSvg(): SVGSVGElement {
    return fixture.nativeElement.querySelector('svg');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EagamiIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EagamiIconComponent);
    fixture.detectChanges();
  });

  it('is still by default', () => {
    expect(getSvg().classList).not.toContain('ea-icon-eagami--animated');
  });

  it('animates when animated is set', () => {
    fixture.componentRef.setInput('animated', true);

    fixture.detectChanges();

    expect(getSvg().classList).toContain('ea-icon-eagami--animated');
  });

  it('marks the hip strip, leg, knee and foot as the parts that swing', () => {
    const parts = getSvg().querySelectorAll('.ea-icon-eagami__raised-leg');

    expect(parts).toHaveLength(4);
  });
});

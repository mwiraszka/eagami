import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  inject,
  input,
} from '@angular/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[eaTooltip]',
})
export class TooltipDirective implements OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  readonly eaTooltip = input.required<string>();
  readonly tooltipPosition = input<TooltipPosition>('top');

  private tooltipEl: HTMLElement | null = null;
  private readonly tooltipId = `ea-tooltip-${Math.random().toString(36).slice(2, 9)}`;

  private readonly showHandler = () => this.show();
  private readonly hideHandler = () => this.hide();
  private readonly keydownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.tooltipEl) {
      this.hide();
    }
  };

  constructor() {
    const native = this.el.nativeElement;
    native.addEventListener('mouseenter', this.showHandler);
    native.addEventListener('mouseleave', this.hideHandler);
    native.addEventListener('focus', this.showHandler);
    native.addEventListener('blur', this.hideHandler);
    native.addEventListener('keydown', this.keydownHandler);
  }

  ngOnDestroy(): void {
    const native = this.el.nativeElement;
    native.removeEventListener('mouseenter', this.showHandler);
    native.removeEventListener('mouseleave', this.hideHandler);
    native.removeEventListener('focus', this.showHandler);
    native.removeEventListener('blur', this.hideHandler);
    native.removeEventListener('keydown', this.keydownHandler);
    this.hide();
  }

  private show(): void {
    if (this.tooltipEl || !this.eaTooltip()) return;

    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipEl, 'ea-tooltip');
    this.renderer.addClass(this.tooltipEl, `ea-tooltip--${this.tooltipPosition()}`);
    this.renderer.setAttribute(this.tooltipEl, 'role', 'tooltip');
    this.renderer.setAttribute(this.tooltipEl, 'id', this.tooltipId);
    this.tooltipEl!.textContent = this.eaTooltip();

    this.renderer.appendChild(document.body, this.tooltipEl);
    this.appendDescribedBy();
    this.positionTooltip();
  }

  private hide(): void {
    if (this.tooltipEl) {
      this.tooltipEl.remove();
      this.tooltipEl = null;
      this.removeDescribedBy();
    }
  }

  private appendDescribedBy(): void {
    const native = this.el.nativeElement;
    const existing = (native.getAttribute('aria-describedby') ?? '').trim();
    const tokens = existing ? existing.split(/\s+/) : [];
    if (!tokens.includes(this.tooltipId)) tokens.push(this.tooltipId);
    this.renderer.setAttribute(native, 'aria-describedby', tokens.join(' '));
  }

  private removeDescribedBy(): void {
    const native = this.el.nativeElement;
    const existing = (native.getAttribute('aria-describedby') ?? '').trim();
    const tokens = existing.split(/\s+/).filter((t: string) => t && t !== this.tooltipId);
    if (tokens.length) {
      this.renderer.setAttribute(native, 'aria-describedby', tokens.join(' '));
    } else {
      this.renderer.removeAttribute(native, 'aria-describedby');
    }
  }

  private positionTooltip(): void {
    if (!this.tooltipEl) return;

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipEl.getBoundingClientRect();
    const gap = 8;

    let top: number;
    let left: number;

    switch (this.tooltipPosition()) {
      case 'top':
        top = hostRect.top - tooltipRect.height - gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - gap;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + gap;
        break;
    }

    this.renderer.setStyle(this.tooltipEl, 'top', `${top + window.scrollY}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${left + window.scrollX}px`);
  }
}

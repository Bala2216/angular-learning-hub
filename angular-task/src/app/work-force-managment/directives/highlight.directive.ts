import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({ selector: '[cardHighlight]', standalone: true })
export class CardHighlightDirective {

  private el = inject(ElementRef);

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.boxShadow = '0 0 10px #2e47d2ff';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.boxShadow = 'none';
  }
}

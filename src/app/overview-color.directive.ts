import { Directive, ElementRef, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appOverviewColor]'
})
export class OverviewColorDirective implements OnChanges  {

  
  @Input('appOverviewColor') gender: string = 'male';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // @HostListener('mouseenter') onMouseEnter() {
  //   this.highlight(this.highlightColor);
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.highlight('');
  // }

  ngOnChanges(changes: SimpleChanges): void {//console.log('Directive123', this.gender)
    if (this.gender.toLocaleLowerCase() === 'female') {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#D3D3D3');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#000099');
    }
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

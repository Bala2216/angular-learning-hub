import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appGenderColor]'
})
export class EmailDomainDirective implements OnInit {
  @Input('appGenderColor') email: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const domain = this.email?.split('@')[1]?.toLowerCase() || '';

    let bgColor = '#f5f5f5'; 
    if (domain.includes('gmail')) {
      bgColor = '#e0f7fa'; 
    } else if (domain.includes('yahoo')) {
      bgColor = '#fce4ec'; 
    } else if (domain.includes('biz')) {
      bgColor = '#fff3e0'; 
    } else if (domain.includes('org')) {
      bgColor = '#e8f5e9'; 
    }

    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', bgColor);
    this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '8px');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '10px');
  }
}

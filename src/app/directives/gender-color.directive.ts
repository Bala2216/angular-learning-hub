import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appGenderColor]'
})
export class GenderColorDirective implements OnInit {
  @Input('appGenderColor') gender: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.gender.toLowerCase() === 'male') {
      this.el.nativeElement.style.backgroundColor = '#e0f7fa';
    } else if (this.gender.toLowerCase() === 'female') {
      this.el.nativeElement.style.backgroundColor = '#fce4ec';
    }
  }
}

import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() name: string = '';

  ngOnChanges() {
    console.log('Header component changes detected');
  }
  ngOnInit() {
    console.log('Header component initialized');
  }
  // ngDoCheck(): void {
  //   throw new Error('Method not implemented.');
  // }
  // ngAfterContentInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  // ngAfterContentChecked(): void {
  //   throw new Error('Method not implemented.');
  // }
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  // ngAfterViewChecked(): void {
  //   throw new Error('Method not implemented.');
  // }
  // ngOnDestroy(): void {
  //   console.log('Header component destroyed');
  // }
}

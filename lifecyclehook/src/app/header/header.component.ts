import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
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
export class HeaderComponent
  implements
    OnInit,
    OnChanges,
    OnDestroy,
    DoCheck,
    AfterViewInit,
    AfterViewChecked,
    AfterContentInit,
    AfterContentChecked
{
  ngOnInit() {
    console.log('Header component initialized');
  }

  ngOnChanges() {
    console.log('Header component changes detected');
  }
  ngOnDestroy(): void {
    console.log('Header component destroyed');
  }
  ngDoCheck(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterViewChecked(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterContentInit(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterContentChecked(): void {
    throw new Error('Method not implemented.');
  }
}

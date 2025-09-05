import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-life-cycle-hooks',
  imports: [],
  templateUrl: './life-cycle-hooks.html',
  styleUrl: './life-cycle-hooks.css'
})
export class LifeCycleHooks implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  constructor() {
    // Runs when Angular instantiates the component.
    console.log('Cunstroctor called')
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Runs every time the component's inputs have changed.
    console.log('1. ngOnchanges called')
  }

  ngOnInit(): void {
    // Runs once after Angular has initialized all the component's inputs
    // Use for API calls
    console.log('2. ngOnInit called')
  }

  ngDoCheck(): void {
    console.log('3. ngDoCheck called')
  }

  ngAfterContentInit(): void {
    console.log('4. ngAfterContentInit called')
  }

  ngAfterContentChecked(): void {
    console.log('5. ngAfterContentChecked called')
  }

  ngAfterViewInit(): void {
    console.log('6. ngAfterViewInit called')
  }

  ngAfterViewChecked(): void {
    console.log('7. ngAfterViewChecked called')
  }

  ngOnDestroy(): void {
    console.log('8. ngOnDestroy called')
  }
}

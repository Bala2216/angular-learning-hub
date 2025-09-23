import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment } from '../../store/counter/counter.actions';
import { selectCount } from '../../store/counter/counter.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter-app',
  imports: [CommonModule],
  templateUrl: './counter-app.html',
  styleUrl: './counter-app.css',
})
export class CounterApp {
  count$!: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.count$ = this.store.select(selectCount);
  }

  onIncrement() {
    this.store.dispatch(increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
  }
}

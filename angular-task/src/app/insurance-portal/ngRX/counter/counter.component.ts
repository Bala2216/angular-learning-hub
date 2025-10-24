import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { CounterState } from './model/counter.model';
import { decrement, increment, reset } from './store/counter.actions';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `<h1 class="mt-4 text-center text-sm text-gray-600">
      Counter : {{ count$ | async }}
    </h1>
    <p class="mt-4 text-center text-blue-600">
      <button (click)="increment()">Increment ➕</button>
    </p>
    <p class="mt-4 text-center text-blue-600">
      <button (click)="decrement()">Decrement ➖</button>
    </p>

    <p class="mt-4 text-center text-blue-600">
      <button (click)="reset()">Reset 🔁</button>
    </p> `,
})
export class CounterComponent {
  count$: Observable<number>;
  private store = inject(Store<{ counter: CounterState }>);

  constructor() {
    this.count$ = this.store.pipe(select((state) => state.counter.count));
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
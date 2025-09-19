import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUser } from '../../store/action';
import { selectLoading, selectUsers } from '../../store/selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-store-users-component',
  imports: [AsyncPipe],
  templateUrl: './store-users-component.html',
  styleUrl: './store-users-component.css'
})
export class StoreUsersComponent implements OnInit {

  private store = inject(Store);

  users$ = this.store.select(selectUsers);

  loading$ = this.store.select(selectLoading);

  ngOnInit(): void {
    this.store.dispatch(loadUser());
  }
}

import { Component, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, map } from 'rxjs/operators';
import { forkJoin, Observable, of, Subject } from 'rxjs';

import { Store } from '@ngrx/store';
import { loadUsers, clearUsersData } from '../../store/users.actions';
import {
  selectUsers,
  selectUserPostsMap,
  selectAnyLoading,
  selectUsersError
} from '../../store/users.selectore';

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Employee {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  gender?: string;
}

@Component({
  selector: 'app-view-all-employees',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './view-all-employees.component.html',
  styleUrl: './view-all-employees.component.scss'
})
export class ViewAllEmployeesComponent implements OnDestroy {
// NgRx observables
  users$: Observable<Employee[]>;
  userPostsMap$: Observable<{ [userId: number]: any[] }>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  private destroy$ = new Subject<void>();
  constructor(
    private appService: AppService,
    private store: Store
  ) {
    this.users$ = this.store.select(selectUsers);
    this.userPostsMap$ = this.store.select(selectUserPostsMap);
    this.loading$ = this.store.select(selectAnyLoading);
    this.error$ = this.store.select(selectUsersError);
  }

  ngOnInit() {
    // Load all users initially
    this.store.dispatch(loadUsers({ searchTerm: 'all' }));

    
    this.appService.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm => {
        if (searchTerm.trim().length > 0) {
          this.store.dispatch(loadUsers({ searchTerm }));
        } else {
          // Load all users when search is cleared
          this.store.dispatch(loadUsers({ searchTerm: 'all' }));
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

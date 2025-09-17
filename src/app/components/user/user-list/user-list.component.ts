import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, User } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import {
  Subject,
  BehaviorSubject,
  combineLatest
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  takeUntil
} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { addUser } from '../../../store/user/user.actions'; 


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  searchText: string = '';
  role: string = 'Guest';
  newUser: Partial<User> = {
    name: '',
    username: '',
    email: '',
    body: ''
  };

  destroy$ = new Subject<void>();
  private searchSubject = new BehaviorSubject<string>('');
  private roleSubject = new BehaviorSubject<string>(this.role);

  constructor(
    private userService: UserService,
    private store: Store,
    private roleService: RoleService

  ) {}

  ngOnInit(): void {
    this.roleService.role$
      .pipe(
        tap(role => this.roleSubject.next(role)),
        takeUntil(this.destroy$)
      )
      .subscribe();

    combineLatest([
      this.roleSubject.asObservable(),
      this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
    ])
      .pipe(
        tap(([role, search]) => {
          this.role = role;
          this.searchText = search;
        }),
        switchMap(([_, search]) => this.userService.getUsers(search)),
        tap(users => this.users = users),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onSearchChange(search: string): void {
    this.searchSubject.next(search);
  }

  showAddForm = false;

toggleAddForm(): void {
  this.showAddForm = !this.showAddForm;
}

onAddUser(): void {
  if (
    this.newUser.name?.trim() &&
    this.newUser.username?.trim() &&
    this.newUser.email?.trim()
  ) {
    
    this.store.dispatch(addUser({ user: this.newUser as User }));
    this.newUser = { name: '', username: '', email: '', body: '' };
    this.showAddForm = false;
  } else {
    alert('Please fill in all required fields.');
  }
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

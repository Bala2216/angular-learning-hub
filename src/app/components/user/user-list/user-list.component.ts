import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { Subject, BehaviorSubject, combineLatest } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  takeUntil,
} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { addUser, setUsers } from '../../../store/user/user.actions';
import { selectAllUsers } from '../../../store/user/user.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  searchText: string = '';
  role: string = 'Guest';
  newUser: Partial<User> = {
    name: '',
    username: '',
    email: '',
    body: '',
  };

  destroy$ = new Subject<void>();
  private searchSubject = new BehaviorSubject<string>('');
  private roleSubject = new BehaviorSubject<string>(this.role);

  showAddForm = false;

  constructor(
    private store: Store,
    private roleService: RoleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.roleService.role$
      .pipe(
        tap((role) => this.roleSubject.next(role)),
        takeUntil(this.destroy$)
      )
      .subscribe();

    combineLatest([
      this.roleSubject.asObservable(),
      this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([role, search]) => {
        this.role = role;
        this.searchText = search;
        this.fetchUsers(search);
      });
  }

  fetchUsers(searchText: string = ''): void {
    this.userService.getUsers(searchText).subscribe((apiUsers) => {
      const persistedUsers = JSON.parse(
        localStorage.getItem('persistedUsers') || '[]'
      );
      const mergedUsers = [...apiUsers, ...persistedUsers];
      this.users = mergedUsers;
      this.store.dispatch(setUsers({ users: mergedUsers }));
    });
  }

  onSearchChange(search: string): void {
    this.searchSubject.next(search);
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  clearPersistedUsers(): void {
    localStorage.removeItem('persistedUsers');
    this.fetchUsers(this.searchText);
  }

  onAddUser(): void {
    if (
      this.newUser.name?.trim() &&
      this.newUser.username?.trim() &&
      this.newUser.email?.trim()
    ) {
      const newUser = this.newUser as User;

      this.store.dispatch(addUser({ user: newUser }));

      const existingUsers = JSON.parse(
        localStorage.getItem('persistedUsers') || '[]'
      );
      localStorage.setItem(
        'persistedUsers',
        JSON.stringify([...existingUsers, newUser])
      );

      this.users = [...this.users, newUser];

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

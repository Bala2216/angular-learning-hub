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
import { ColDef } from 'ag-grid-community';

import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>([]);
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
    private userService: UserService,
    private cdr: ChangeDetectorRef
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
      const persistedUsers = JSON.parse(localStorage.getItem('persistedUsers') || '[]');
      const mergedUsers = [...apiUsers, ...persistedUsers];
      this.users = mergedUsers;
      this.dataSource.data = mergedUsers;
      this.store.dispatch(setUsers({ users: mergedUsers }));
      this.cdr.detectChanges();
    });
  }

  onSearchChange(search: string): void {
    this.searchSubject.next(search);
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;

    if (this.showAddForm) {
      this.newUser = {
        name: '',
        username: '',
        email: '',
        body: ''
      };
    }
  }

  clearPersistedUsers(): void {
    localStorage.removeItem('persistedUsers');
    this.fetchUsers(this.searchText);
  }

 onAddUser(): void {
  const name = this.newUser.name?.trim();
  const username = this.newUser.username?.trim();
  const email = this.newUser.email?.trim();
  const body = this.newUser.body?.trim() || 'No comment available';

  if (name && username && email) {
    const maxId = this.users.length ? Math.max(...this.users.map(u => u.id)) : 0;
    const newUser: User = {
      id: maxId + 1,
      name,
      username,
      email,
      body
    };

    this.store.dispatch(addUser({ user: newUser }));

    const existingUsers = JSON.parse(localStorage.getItem('persistedUsers') || '[]');
    localStorage.setItem('persistedUsers', JSON.stringify([...existingUsers, newUser]));

    this.users = [...this.users, newUser];
    this.dataSource.data = this.users;

    this.newUser = { name: '', username: '', email: '', body: '' };
    this.showAddForm = false;
    this.cdr.detectChanges(); 
  } else {
    alert('Please fill in all required fields.');
  }
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  agGridColumnDefs: ColDef<User>[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'username', headerName: 'Username' },
    { field: 'email', headerName: 'Email' },
    { field: 'body', headerName: 'Comment' },
  ];

  agGridDefaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  matDisplayedColumns: string[] = ['name', 'username', 'email', 'body'];
}

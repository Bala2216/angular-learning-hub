import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { User, UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { Subject, BehaviorSubject, combineLatest } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  takeUntil
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { addUser, setUsers } from '../../../store/user/user.actions';
import { ColDef } from 'ag-grid-community';
import { MatTableDataSource } from '@angular/material/table';
import { angularMaterialRenderers } from '@jsonforms/angular-material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>([]);
  searchText: string = '';
  role: string = 'Guest';

  destroy$ = new Subject<void>();
  private searchSubject = new BehaviorSubject<string>('');
  private roleSubject = new BehaviorSubject<string>(this.role);

  showAddForm = false;
  showJsonForm = false;

  jsonFormData: any = {};
  jsonSchema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      username: { type: 'string' },
      email: { type: 'string', format: 'email' },
      body: { type: 'string' }
    },
    required: ['name', 'username', 'email', 'body']
  };

  jsonUiSchema = {
    type: 'VerticalLayout',
    elements: [
      { type: 'Control', scope: '#/properties/name' },
      { type: 'Control', scope: '#/properties/username' },
      { type: 'Control', scope: '#/properties/email' },
      { type: 'Control', scope: '#/properties/body' }
    ]
  };

  materialRenderers = angularMaterialRenderers;

  dxGridColumns = ['name', 'username', 'email', 'body'];

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
      this.searchSubject.pipe(debounceTime(300), distinctUntilChanged())
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
    this.showJsonForm = false;
    this.cdr.detectChanges();
  }

  toggleJsonForm(): void {
    this.showJsonForm = !this.showJsonForm;
    this.showAddForm = false;
    this.cdr.detectChanges();
  }

  clearPersistedUsers(): void {
    localStorage.removeItem('persistedUsers');
    this.fetchUsers(this.searchText);
  }

  handleAddUser(user: Partial<User>): void {
    const maxId = this.users.length
      ? Math.max(...this.users.map((u) => u.id))
      : 0;
    const newUser: User = {
      id: maxId + 1,
      name: user.name!,
      username: user.username!,
      email: user.email!,
      body: user.body!
    };

    this.store.dispatch(addUser({ user: newUser }));

    const existingUsers = JSON.parse(
      localStorage.getItem('persistedUsers') || '[]'
    );
    localStorage.setItem(
      'persistedUsers',
      JSON.stringify([...existingUsers, newUser])
    );

    this.users = [...this.users, newUser];
    this.dataSource.data = this.users;
    this.showAddForm = false;
    this.showJsonForm = false;
    this.cdr.detectChanges();
  }

  onJsonFormChange(event: any): void {
    this.jsonFormData = event.data;
  }

  submitJsonForm(): void {
    if (
      this.jsonFormData.name &&
      this.jsonFormData.username &&
      this.jsonFormData.email &&
      this.jsonFormData.body
    ) {
      this.handleAddUser(this.jsonFormData);
      this.jsonFormData = {};
      this.cdr.detectChanges();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  resetJsonForm(): void {
    this.jsonFormData = {};
    this.cdr.detectChanges();
  }

  agGridColumnDefs: ColDef<User>[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'username', headerName: 'Username' },
    { field: 'email', headerName: 'Email' },
    { field: 'body', headerName: 'Comment' }
  ];

  agGridDefaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };

  matDisplayedColumns: string[] = ['name', 'username', 'email', 'body'];

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, User } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  searchText: string = '';
  role: string = 'Guest';

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.roleService.role$.subscribe(role => {
      this.role = role;
    });

    
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300), 
      distinctUntilChanged(), 
      switchMap(search => this.userService.getUsers(search)) 
    ).subscribe(data => {
      this.users = data;
    });

    this.searchSubject.next('');
  }

  onSearchChange(search: string): void {
    this.searchText = search;
    this.searchSubject.next(search);
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}

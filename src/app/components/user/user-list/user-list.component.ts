import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  searchText: string = '';
  role: string = 'Guest';

  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => this.users = data);

    this.roleService.role$.subscribe(role => {
      this.role = role;
    });
  }
}

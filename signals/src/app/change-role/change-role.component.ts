import { Component } from '@angular/core';
import { RoleService } from '../role.service';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-change-role',
  imports: [MatSelectModule, FormsModule],
  standalone: true,
  templateUrl: './change-role.component.html',
  styleUrl: './change-role.component.scss'
})
export class ChangeRoleComponent {
  roles: Role[] = [
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'User', viewValue: 'User'},
    {value: 'Guest', viewValue: 'Guest'},
  ];

  selectedRole: string = '';
  role: Role | undefined;

  constructor(private roleService: RoleService) {}

  changeRole(role: string) {
    this.roleService.setRole(role);
  }
  ngOnInit() {

    this.selectedRole = this.roleService.currentRole() || '';
  }
}

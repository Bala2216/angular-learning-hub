import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule, FormsModule],
  providers: [UserService],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  users: User[] = [];
  searchText: string = '';

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}

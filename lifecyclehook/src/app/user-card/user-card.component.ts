import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule],
  providers: [UserService],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  users: any[] = [];

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}

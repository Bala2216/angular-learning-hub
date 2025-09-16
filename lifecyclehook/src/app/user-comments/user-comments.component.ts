import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-comments',
  imports: [CommonModule],
  templateUrl: './user-comments.component.html',
  styleUrl: './user-comments.component.scss',
})
export class UserCommentsComponent {
  users: any[] = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsersWithComments().subscribe((data) => {
      this.users = data;
    });
  }
}

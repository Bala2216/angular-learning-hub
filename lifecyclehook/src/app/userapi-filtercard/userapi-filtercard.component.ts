import { Component } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-userapi-filtercard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userapi-filtercard.component.html',
  styleUrl: './userapi-filtercard.component.scss',
})
export class UserapiFiltercardComponent {
  users: User[] = [];
  searchControl = new FormControl('');

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.userService.searchUsers(query || ''))
      )
      .subscribe((data) => {
        this.users = data;
      });
  }
}

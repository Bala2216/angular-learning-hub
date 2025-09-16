import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, map } from 'rxjs/operators';
import { forkJoin, of, Subject } from 'rxjs';

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Employee {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  gender?: string;
}

@Component({
  selector: 'app-view-all-employees',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './view-all-employees.component.html',
  styleUrl: './view-all-employees.component.scss'
})
export class ViewAllEmployeesComponent {

  constructor(private appService: AppService) { }
  users: Employee[] = []
  originalUsers: Employee[] = [];
  searchValue: string = '';
  posts: any[] = [];
  userPostsMap: { [userId: number]: any[] } = {};

  ngOnInit() {
    this.appService.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.appService.getUsers(term)),
      switchMap(users => {
        const processedUsers: Employee[] = users.map(user => {
          const employeeWithGender: Employee = { ...user };
          const nameLength = user.name.length;
          employeeWithGender.gender = (nameLength % 2 === 0) ? 'Female' : 'Male';
          return employeeWithGender;
        });
        this.users = processedUsers;
        if (!processedUsers.length) {
          return of([]);
        }
        return forkJoin(processedUsers.map(u => this.appService.getPosts(u.id)));
      })
    ).subscribe(postsArrays => {
      this.posts = postsArrays.flat();
      this.userPostsMap = {};
      this.users.forEach((user, idx) => {
        this.userPostsMap[user.id] = postsArrays[idx];
      });
    });
  }
}

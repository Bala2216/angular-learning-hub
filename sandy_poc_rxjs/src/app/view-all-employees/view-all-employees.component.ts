import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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

constructor(private appService: AppService){}
users:Employee[] = []
originalUsers: Employee[] = [];
searchValue: string = '';

ngOnInit() {
  this.appService.searchTerm$.subscribe((term) => {
      this.searchValue = term

      this.users = this.originalUsers.filter((user: Employee) =>
      user.name.toLowerCase().includes(this.searchValue.toLowerCase())
  );
  });
  this.appService.getUsers().subscribe((users: Employee[]) => {
    users.forEach(user => {
      let nameLength = user.name.length

      if(nameLength % 2 == 0){
        user.gender = 'Female';
      }
      else{
        user.gender = 'Male';
      }
    });
    this.users = users;
    this.originalUsers = [...users]

  });
}
// onSearch(value: string) {
  // this.users = this.originalUsers.filter((user: Employee) =>
  //   user.name.toLowerCase().includes(value.toLowerCase()) ||
  //   user.email.toLowerCase().includes(value.toLowerCase()) ||
  //   user.address.city.toLowerCase().includes(value.toLowerCase()) ||
  //   (user.gender?.toLowerCase().includes(value.toLowerCase()))
  // );

// }
}

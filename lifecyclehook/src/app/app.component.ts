import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserlistComponent } from './userlist/userlist.component';
import { AdduserComponent } from './adduser/adduser.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, UserlistComponent, AdduserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Reactive Forms';
  users: {
    name: string;
    phone: number;
    age: number;
    date: string;
    status: string;
  }[] = [];

  onUserAdded(newUser: {
    name: string;
    phone: number;
    age: number;
    date: string;
    status: string;
  }) {
    this.users.push(newUser);
  }
}

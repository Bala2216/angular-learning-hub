import { Component } from '@angular/core';
import { AdduserComponent } from '../adduser/adduser.component';
import { UserlistComponent } from '../userlist/userlist.component';

@Component({
  selector: 'app-reactiveform',
  imports: [UserlistComponent, AdduserComponent],
  templateUrl: './reactiveform.component.html',
  styleUrl: './reactiveform.component.scss',
})
export class ReactiveformComponent {
  users: {
    name: string;
    phone: number;
    age: number;
    date: string;
    status: string;
  }[] = [];
}

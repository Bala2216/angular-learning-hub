import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserlistComponent } from './userlist/userlist.component';
import { AdduserComponent } from './adduser/adduser.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    UserlistComponent,
    AdduserComponent,
    RouterModule,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Reactive Forms';
  jsontitle = 'Json Forms';
  users: {
    name: string;
    phone: number;
    age: number;
    date: string;
    status: string;
  }[] = [];
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-userlist',
  imports: [CommonModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss',
})
export class UserlistComponent {
  @Input() users: {
    name: string;
    phone: number;
    age: number;
    date: string;
    status: string;
  }[] = [];
}

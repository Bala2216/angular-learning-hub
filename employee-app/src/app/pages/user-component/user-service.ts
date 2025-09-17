import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  address: {
    address: string;
    suite: string;
    city : string;
    state: string;
    postalCode: string;
    geo: {
      lat : string;
      lng : string;
    }
  },
  phone: string;
  website: string;
  university: string;
  company: {
    name : string;
    catchPhrase: string;
    bs: string;
  }
}

export interface Todo {
  id: number;
  todo: string;
}

export interface UserWithTodos extends User {
  todosCount: number;
  userTodos: Todo[];
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }

  getTodos() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../store/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }

}

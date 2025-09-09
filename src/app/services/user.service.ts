import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  name: string;
  gender: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataUrl = 'assets/data/users.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.dataUrl);
  }
}

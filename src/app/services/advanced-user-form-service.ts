import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdvancedUserFormModel } from '../models/advanced-user-form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class advancedUserFormService {
  private baseUrl: string = 'https://dummyjson.com';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  searchUsers(query: string | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/search?q=${query}`);
  }

  getPostsByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts/user/${userId}`);
  }
  
  createUser(user: AdvancedUserFormModel): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/users/add', user);
  }
}

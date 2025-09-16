import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdvancedUserFormModel } from '../models/advanced-user-form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class advancedUserFormService {
  private baseUrl: string = 'https://dummyjson.com/users';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  searchUsers(query: string | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/search?q=${query}`);
  }
  
  createUser(user: AdvancedUserFormModel): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/add', user);
  }
}

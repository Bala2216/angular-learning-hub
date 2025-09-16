import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
}
@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }

   private apiUrl = 'https://jsonplaceholder.typicode.com';

  private userCreated = new BehaviorSubject<any>({});
  getCreated = this.userCreated.asObservable();

  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  setCreated(value: Employee[] ) {
    this.userCreated.next(value);
  }

  getUsers(query: string) {
    return this.http.get<Employee[]>(`${this.apiUrl}/users?name_like=${query}`);
  }
  updateSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }
  getPosts(id: number) {
    return this.http.get<any>(`${this.apiUrl}/posts?id=${id}`);
  }
}
